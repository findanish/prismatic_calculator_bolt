export interface CraftingRecipe {
  name: string;
  value: string;
  tier: number;
  description: string;
  ingredients: {
    item: string;
    quantity: number;
  }[];
}

export interface CalculationResult {
  itemName: string;
  quantity: number;
  ingredients: {
    item: string;
    quantity: number;
  }[];
  breakdown: {
    item: string;
    quantity: number;
    level: number;
  }[];
}