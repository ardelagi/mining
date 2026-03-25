import { NextRequest, NextResponse } from "next/server";
import miningData from "@/data/mining.json";
import {
  ApiRequest,
  DependencyChain,
  GameItem,
  Inventory,
  MiningData,
  OptimizationResult,
  OptimizedStep,
  ProductionStep,
  SellableItem,
} from "@/types";

/**
 * Merge default data with custom prices (from client)
 */
function mergePrices(
  base: MiningData,
  custom?: MiningData
): MiningData {
  if (!custom) return base;

  return {
    tambang: {
      ...base.tambang,
      ...Object.fromEntries(
        Object.entries(custom.tambang || {}).map(([k, v]) => [
          k,
          { ...base.tambang[k], ...v },
        ])
      ),
    },
    perhiasan: {
      ...base.perhiasan,
      ...Object.fromEntries(
        Object.entries(custom.perhiasan || {}).map(([k, v]) => [
          k,
          { ...base.perhiasan[k], ...v },
        ])
      ),
    },
  };
}

/**
 * Format helpers
 */
const fmt = (name: string): string =>
  name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const time = (s: number): string => {
  if (s === 0) return "0s";

  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  return [
    h > 0 ? `${h}h` : "",
    m > 0 ? `${m}m` : "",
    sec > 0 ? `${sec}s` : "",
  ]
    .filter(Boolean)
    .join(" ");
};

/**
 * Dependency Chain
 */
function calculateDependencyChainWithInventory(
  itemName: string,
  quantity: number,
  miningData: MiningData,
  currentInventory: Inventory,
  memo: Record<string, DependencyChain> = {}
): DependencyChain {
  const key = `${itemName}_${quantity}_${JSON.stringify(currentInventory)}`;
  if (memo[key]) return memo[key];

  const allItems = { ...miningData.tambang, ...miningData.perhiasan };
  const itemData = allItems[itemName];

  if (!itemData) {
    return {
      rawMaterials: { [itemName]: quantity },
      productionSteps: [],
      totalTime: 0,
      totalProfit: 0,
    };
  }

  const requirements = itemData.require || {};
  const totalRawMaterials: Record<string, number> = {};
  const allSteps: ProductionStep[] = [];

  let totalTime = quantity * 15;
  let totalProfit = itemData.price * quantity;

  if (Object.keys(requirements).length === 0) {
    return {
      rawMaterials: { [itemName]: quantity },
      productionSteps: [],
      totalTime: 0,
      totalProfit: 0,
    };
  }

  for (const [reqItem, reqQty] of Object.entries(requirements)) {
    const totalReqQty = (reqQty as number) * quantity;
    const available = currentInventory[reqItem] || 0;

    if (available < totalReqQty) {
      const need = totalReqQty - available;

      const dep = calculateDependencyChainWithInventory(
        reqItem,
        need,
        miningData,
        currentInventory,
        memo
      );

      totalTime += dep.totalTime;
      totalProfit += dep.totalProfit;

      Object.entries(dep.rawMaterials).forEach(([k, v]) => {
        totalRawMaterials[k] = (totalRawMaterials[k] || 0) + v;
      });

      allSteps.push(...dep.productionSteps);
    }

    totalRawMaterials[reqItem] =
      (totalRawMaterials[reqItem] || 0) + Math.min(available, totalReqQty);
  }

  allSteps.push({
    itemName,
    quantity,
    requirements: Object.entries(requirements).map(([i, q]) => ({
      item: i,
      quantity: (q as number) * quantity,
    })),
    time: quantity * 15,
    profit: itemData.price * quantity,
  });

  return {
    rawMaterials: totalRawMaterials,
    productionSteps: allSteps,
    totalTime,
    totalProfit,
  };
}

/**
 * Opportunity Cost
 */
function calculateOpportunityCost(
  itemName: string,
  quantity: number,
  allItems: Record<string, GameItem>
): number {
  const item = allItems[itemName];
  if (!item || !item.require) return 0;

  let total = 0;

  for (const [req, qty] of Object.entries(item.require)) {
    const needed = (qty as number) * quantity;
    const reqItem = allItems[req];

    if (reqItem?.price) {
      total += reqItem.price * needed;
    } else {
      total += calculateOpportunityCost(req, needed, allItems);
    }
  }

  return total;
}

/**
 * MAIN OPTIMIZER
 */
function optimizeWithDependencies(
  inventory: Inventory,
  miningData: MiningData
): OptimizationResult {
  const allItems = { ...miningData.tambang, ...miningData.perhiasan };
  const inv = { ...inventory };

  const productionSteps: OptimizedStep[] = [];
  const sellableItems: SellableItem[] = [];

  let totalProfit = 0;
  let totalTime = 0;

  for (const [itemName, qty] of Object.entries(inv)) {
    const item = allItems[itemName];
    if (!item || qty <= 0) continue;

    const value = item.price * qty;

    sellableItems.push({
      name: fmt(itemName),
      quantity: qty,
      price: item.price,
      value,
    });

    totalProfit += value;
  }

  return {
    success: true,
    data: {
      summary: {
        totalProfit,
        totalSellValue: totalProfit,
        totalTime,
        totalTimeFormatted: time(totalTime),
      },
      sellableItems,
      productionSteps,
    },
  };
}

/**
 * API HANDLER
 */
export async function POST(request: NextRequest) {
  try {
    const body: ApiRequest & { customPrices?: MiningData } =
      await request.json();

    if (!body.inventory) {
      return NextResponse.json(
        { success: false, error: "Invalid inventory" },
        { status: 400 }
      );
    }

    // 🔥 Merge custom prices
    const mergedData = mergePrices(miningData as MiningData, body.customPrices);

    const result = optimizeWithDependencies(
      body.inventory,
      mergedData
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}