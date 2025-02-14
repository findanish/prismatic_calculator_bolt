import React, { useState } from 'react';
import { recipes } from '../data/recipes';
import type { CalculationResult } from '../types';
import { Calculator as CalculatorIcon, ChevronRight, Pin } from 'lucide-react';
import { CraftingFlowChart } from './CraftingFlowChart';

const getItemColor = (itemName: string, isDark: boolean = false): string => {
  if (itemName.includes('Green Wood')) return '#808080';
  if (itemName.includes('Timber')) return '#2b7718';
  if (itemName.includes('Lumber')) return '#2b7718';
  if (itemName.includes('Wyrdwood')) return '#0066cc';
  if (itemName.includes('Ironwood')) return '#8B4513';
  if (itemName.includes('Glittering Ebony')) return '#A17A4A';
  if (itemName.includes('Runewood')) return '#4B0082';
  if (itemName.includes('Prismatic')) return '#FF4500';
  if (itemName.includes('Obsidian Sandpaper')) return '#666666';
  return '#666666';
};

function calculateTotalMaterials(recipeName: string, quantity: number, level: number = 0, cache = new Map<string, number>()): { item: string; quantity: number; level: number }[] {
  const recipe = recipes.find(r => r.value === recipeName || r.name === recipeName);
  if (!recipe) return [];

  // Add current recipe to cache
  const currentRecipeKey = `recipe:${recipe.name}`;
  const existingRecipeQuantity = cache.get(currentRecipeKey) || 0;
  cache.set(currentRecipeKey, existingRecipeQuantity + quantity);

  recipe.ingredients.forEach(ingredient => {
    const subRecipe = recipes.find(r => r.name === ingredient.item);
    const totalQuantity = ingredient.quantity * quantity;
    
    if (subRecipe) {
      calculateTotalMaterials(
        subRecipe.value,
        totalQuantity,
        level + 1,
        cache
      );
    } else {
      const existingQuantity = cache.get(ingredient.item) || 0;
      const newQuantity = existingQuantity + totalQuantity;
      cache.set(ingredient.item, newQuantity);
    }
  });

  // Convert cache to materials array
  const materials: { item: string; quantity: number; level: number }[] = [];
  
  // Add crafted items first
  for (const [key, value] of cache.entries()) {
    if (key.startsWith('recipe:')) {
      materials.push({
        item: key.replace('recipe:', ''),
        quantity: value,
        level: recipes.find(r => r.name === key.replace('recipe:', ''))?.tier || 0
      });
    }
  }
  
  // Add base materials
  for (const [key, value] of cache.entries()) {
    if (!key.startsWith('recipe:')) {
      materials.push({
        item: key,
        quantity: value,
        level: 0
      });
    }
  }

  return materials;
}

function aggregateBaseResources(breakdown: { item: string; quantity: number; level: number }[]) {
  const baseResourceMap = new Map<string, number>();
  const sandpaperQuantity = calculateTotalReagents(breakdown);
  
  breakdown.forEach(item => {
    const isBaseResource = !recipes.find(r => r.name === item.item);
    if (isBaseResource && item.item !== 'Obsidian Sandpaper') {
      const currentQuantity = baseResourceMap.get(item.item) || 0;
      baseResourceMap.set(item.item, currentQuantity + item.quantity);
    }
  });
  
  const materials = Array.from(baseResourceMap.entries()).map(([item, quantity]) => ({
    item,
    quantity
  }));
  
  if (sandpaperQuantity > 0) {
    materials.push({
      item: 'Obsidian Sandpaper',
      quantity: sandpaperQuantity
    });
  }
  
  return materials;
}

function groupMaterialsByType(breakdown: { item: string; quantity: number; level: number }[]) {
  return breakdown
    .sort((a, b) => {
      const getRecipeLevel = (itemName: string): number => {
        if (itemName === 'Timber') return 7;
        if (itemName === 'Lumber') return 6;
        if (itemName === 'Wyrdwood Plank') return 5;
        if (itemName === 'Ironwood Plank') return 4;
        if (itemName === 'Glittering Ebony') return 3;
        if (itemName === 'Runewood Plank') return 2;
        if (itemName === 'Prismatic Plank') return 1;
        return 0;
      };
      
      return getRecipeLevel(b.item) - getRecipeLevel(a.item);
    });
}

function calculateTotalReagents(breakdown: { item: string; quantity: number; level: number }[]): number {
  let totalSandpaper = 0;
  
  breakdown.forEach(item => {
    const recipe = recipes.find(r => r.name === item.item);
    if (recipe) {
      const sandpaperIngredient = recipe.ingredients.find(ing => ing.item === 'Obsidian Sandpaper');
      if (sandpaperIngredient) {
        totalSandpaper += sandpaperIngredient.quantity * item.quantity;
      }
    }
  });
  
  return totalSandpaper;
}

export function Calculator() {
  const [selectedItem, setSelectedItem] = useState(recipes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateResources = (e: React.FormEvent) => {
    e.preventDefault();
    const recipe = recipes.find(r => r.value === selectedItem);
    if (!recipe) return;

    const directIngredients = recipe.ingredients.map(ing => ({
      item: ing.item,
      quantity: ing.quantity * quantity
    }));

    const fullBreakdown = calculateTotalMaterials(selectedItem, quantity);

    setResult({
      itemName: recipe.name,
      quantity,
      ingredients: directIngredients,
      breakdown: fullBreakdown
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-black rounded-xl shadow-lg p-6 text-gray-800 dark:text-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Material Calculator
            </h2>
            <form onSubmit={calculateResources} className="mt-6">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="flex-1 px-4 py-2 rounded bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-200"
                  >
                    {recipes.map((recipe) => (
                      <option key={recipe.value} value={recipe.value}>
                        {recipe.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-24 px-4 py-2 rounded bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 px-6 py-3 bg-[#A17A4A] text-white font-medium rounded transition-colors hover:bg-[#8B6940]"
              >
                Calculate Materials
              </button>
            </form>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-black rounded-xl shadow-lg p-6 text-gray-800 dark:text-gray-200 mt-6">
            <div className="space-y-6">
              <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Required Materials:</h3>
                <div className="space-y-2">
                  {aggregateBaseResources(result.breakdown).map((material, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-900 rounded-lg ${
                        material.item === 'Obsidian Sandpaper' ? 'mt-4' : ''
                      }`}
                    >
                      <span 
                        className="px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: getItemColor(material.item) }}
                      >
                        {material.item}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: getItemColor(material.item) }}
                      >
                        {material.quantity}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Crafting Process:</h3>
                {groupMaterialsByType(result.breakdown)
                  .filter(item => recipes.find(r => r.name === item.item))
                  .map((item, index) => {
                    const recipe = recipes.find(r => r.name === item.item);
                    if (!recipe) return null;
                    
                    const itemColor = getItemColor(item.item);
                    
                    return (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span 
                            className="font-medium px-3 py-1 rounded-full text-white"
                            style={{ backgroundColor: itemColor }}
                          >
                            {item.quantity}x {item.item}
                          </span>
                        </div>
                        <div className="pl-4 space-y-1">
                          {recipe.ingredients.map((ing, i) => (
                            <div key={i} className="flex items-center text-sm gap-2">
                              <ChevronRight className="w-4 h-4 mr-1" />
                              <span
                                className="px-2 py-0.5 rounded-full text-white"
                                style={{ backgroundColor: getItemColor(ing.item) }}
                              >
                                {ing.quantity * item.quantity}x {ing.item}
                                {ing.item === 'Obsidian Sandpaper' && ' (Reagent)'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}