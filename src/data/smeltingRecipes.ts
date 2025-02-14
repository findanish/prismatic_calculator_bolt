import { CraftingRecipe } from '../types';

export const smeltingRecipes: CraftingRecipe[] = [
  {
    name: 'Iron Ingot',
    value: 'iron_ingot',
    tier: 2,
    description: 'Basic smelting material.',
    ingredients: [
      { item: 'Iron Ore', quantity: 4 }
    ]
  },
  {
    name: 'Steel Ingot',
    value: 'steel_ingot',
    tier: 3,
    description: 'Intermediate smelting material.',
    ingredients: [
      { item: 'Iron Ingot', quantity: 3 },
      { item: 'Obsidian Flux', quantity: 1 },
      { item: 'Charcoal', quantity: 2 }
    ]
  },
  {
    name: 'Starmetal Ingot',
    value: 'starmetal_ingot',
    tier: 4,
    description: 'Advanced smelting material.',
    ingredients: [
      { item: 'Starmetal Ore', quantity: 6 },
      { item: 'Steel Ingot', quantity: 2 },
      { item: 'Obsidian Flux', quantity: 1 },
      { item: 'Charcoal', quantity: 2 }
    ]
  },
  {
    name: 'Orichalcum Ingot',
    value: 'orichalcum_ingot',
    tier: 5,
    description: 'High-tier smelting material.',
    ingredients: [
      { item: 'Starmetal Ingot', quantity: 2 },
      { item: 'Obsidian Flux', quantity: 1 },
      { item: 'Charcoal', quantity: 2 }
    ]
  },
  {
    name: 'Asmodeum',
    value: 'asmodeum',
    tier: 6,
    description: 'Legendary smelting material.',
    ingredients: [
      { item: 'Orichalcum Ingot', quantity: 5 },
      { item: 'Cinnabar', quantity: 2 },
      { item: 'Obsidian Flux', quantity: 1 },
      { item: 'Charcoal', quantity: 2 }
    ]
  },
  {
    name: 'Voidbent Ingot',
    value: 'voidbent_ingot',
    tier: 6,
    description: 'Void-infused ingot with unique properties.',
    ingredients: [
      { item: 'Void Ore', quantity: 1 },
      { item: 'Void Essence', quantity: 1 },
      { item: 'Energy Core', quantity: 10 }
    ]
  },
  {
    name: 'Mythril Ingot',
    value: 'mythril_ingot',
    tier: 6,
    description: 'Mythical smelting material.',
    ingredients: [
      { item: 'Mythril Ore', quantity: 12 },
      { item: 'Orichalcum Ingot', quantity: 2 },
      { item: 'Obsidian Flux', quantity: 1 },
      { item: 'Charcoal', quantity: 2 }
    ]
  },
  {
    name: 'Prismatic Ingot',
    value: 'prismatic_ingot',
    tier: 7,
    description: 'The pinnacle of smelting mastery.',
    ingredients: [
      { item: 'Asmodeum', quantity: 1 },
      { item: 'Mythril Ingot', quantity: 10 },
      { item: 'Obsidian Flux', quantity: 4 },
      { item: 'Charcoal', quantity: 4 }
    ]
  }
];