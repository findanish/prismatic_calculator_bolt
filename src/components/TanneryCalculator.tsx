import React, { useState } from 'react';
import { tanneryRecipes } from '../data/tanneryRecipes';
import type { CalculationResult } from '../types';
import { ChevronRight } from 'lucide-react';

const getItemColor = (itemName: string, isDark: boolean = false): string => {
  if (itemName.includes('Coarse Leather')) return '#8B4513';  // Brown
  if (itemName.includes('Rugged Leather')) return '#A0522D'; // Saddle Brown
  if (itemName.includes('Layered Leather')) return '#6B4423'; // Dark Brown
  if (itemName.includes('Infused Leather')) return '#800000'; // Maroon
  if (itemName.includes('Runic Leather')) return '#8B0000'; // Dark Red
  if (itemName.includes('Dark Leather')) return '#2F4F4F'; // Dark Slate Gray
  if (itemName.includes('Prismatic Leather')) return '#4B0082'; // Indigo
  if (itemName.includes('Rawhide')) return '#DEB887'; // Burlywood
  if (itemName.includes('Thick Hide')) return '#D2B48C'; // Tan
  if (itemName.includes('Iron Hide')) return '#A9A9A9'; // Dark Gray
  if (itemName.includes('Dark Hide')) return '#363636'; // Dark Gray
  if (itemName.includes('Scarhide')) return '#8B0000'; // Dark Red
  if (itemName.includes('Aged Tannin')) return '#DAA520'; // Golden Rod
  return '#666666'; // Default Gray
};

function calculateTotalMaterials(recipeName: string, quantity: number, level: number = 0, cache = new Map<string, number>()): { item: string; quantity: number; level: number }[] {
  const recipe = tanneryRecipes.find(r => r.value === recipeName || r.name === recipeName);
  if (!recipe) return [];

  // Add current recipe to cache
  const currentRecipeKey = `recipe:${recipe.name}`;
  const existingRecipeQuantity = cache.get(currentRecipeKey) || 0;
  cache.set(currentRecipeKey, existingRecipeQuantity + quantity);

  recipe.ingredients.forEach(ingredient => {
    const subRecipe = tanneryRecipes.find(r => r.name === ingredient.item);
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
        level: tanneryRecipes.find(r => r.name === key.replace('recipe:', ''))?.tier || 0
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
  const tanninQuantity = calculateTotalReagents(breakdown);
  
  breakdown.forEach(item => {
    const isBaseResource = !tanneryRecipes.find(r => r.name === item.item);
    if (isBaseResource && item.item !== 'Aged Tannin') {
      const currentQuantity = baseResourceMap.get(item.item) || 0;
      baseResourceMap.set(item.item, currentQuantity + item.quantity);
    }
  });
  
  const materials = Array.from(baseResourceMap.entries()).map(([item, quantity]) => ({
    item,
    quantity
  }));
  
  if (tanninQuantity > 0) {
    materials.push({
      item: 'Aged Tannin',
      quantity: tanninQuantity
    });
  }
  
  return materials;
}

function groupMaterialsByType(breakdown: { item: string; quantity: number; level: number }[]) {
  return breakdown
    .sort((a, b) => {
      const getRecipeLevel = (itemName: string): number => {
        if (itemName === 'Coarse Leather') return 7;
        if (itemName === 'Rugged Leather') return 6;
        if (itemName === 'Layered Leather') return 5;
        if (itemName === 'Infused Leather') return 4;
        if (itemName === 'Runic Leather') return 3;
        if (itemName === 'Dark Leather') return 2;
        if (itemName === 'Prismatic Leather') return 1;
        return 0;
      };
      
      return getRecipeLevel(b.item) - getRecipeLevel(a.item);
    });
}

function calculateTotalReagents(breakdown: { item: string; quantity: number; level: number }[]): number {
  let totalTannin = 0;
  
  breakdown.forEach(item => {
    const recipe = tanneryRecipes.find(r => r.name === item.item);
    if (recipe) {
      const tanninIngredient = recipe.ingredients.find(ing => ing.item === 'Aged Tannin');
      if (tanninIngredient) {
        totalTannin += tanninIngredient.quantity * item.quantity;
      }
    }
  });
  
  return totalTannin;
}

export function TanneryCalculator() {
  const [selectedItem, setSelectedItem] = useState(tanneryRecipes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateResources = (e: React.FormEvent) => {
    e.preventDefault();
    const recipe = tanneryRecipes.find(r => r.value === selectedItem);
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
              Tannery Calculator
            </h2>
            <form onSubmit={calculateResources} className="mt-6">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="flex-1 px-4 py-2 rounded bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-200"
                  >
                    {tanneryRecipes.map((recipe) => (
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
                        material.item === 'Aged Tannin' ? 'mt-4' : ''
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
                  .filter(item => tanneryRecipes.find(r => r.name === item.item))
                  .map((item, index) => {
                    const recipe = tanneryRecipes.find(r => r.name === item.item);
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
                            {item.item === 'Runic Leather' && ' (Daily Limit: 10)'}
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
                                {ing.item === 'Aged Tannin' && ' (Reagent)'}
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