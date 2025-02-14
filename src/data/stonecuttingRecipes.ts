import { CraftingRecipe } from '../types';

export const stonecuttingRecipes: CraftingRecipe[] = [
  {
    name: 'Stone Block',
    value: 'stone_block',
    tier: 2,
    description: 'Basic stonecutting material.',
    ingredients: [
      { item: 'Stone', quantity: 4 }
    ]
  },
  {
    name: 'Stone Brick',
    value: 'stone_brick',
    tier: 3,
    description: 'Intermediate stonecutting material.',
    ingredients: [
      { item: 'Stone Block', quantity: 4 },
      { item: 'Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Lodestone Brick',
    value: 'lodestone_brick',
    tier: 4,
    description: 'Advanced stonecutting material.',
    ingredients: [
      { item: 'Stone Brick', quantity: 2 },
      { item: 'Lodestone', quantity: 6 },
      { item: 'Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Obsidian Voidstone',
    value: 'obsidian_voidstone',
    tier: 5,
    description: 'High-tier stonecutting material.',
    ingredients: [
      { item: 'Lodestone Brick', quantity: 8 },
      { item: 'Lodestone', quantity: 2 },
      { item: 'Molten Lodestone', quantity: 1 },
      { item: 'Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Charged Sand',
    value: 'charged_sand',
    tier: 5,
    description: 'Energized stonecutting material.',
    ingredients: [
      { item: 'Sandstone Block', quantity: 5 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Runestone',
    value: 'runestone',
    tier: 6,
    description: 'Legendary stonecutting material.',
    ingredients: [
      { item: 'Obsidian Voidstone', quantity: 5 },
      { item: 'Molten Lodestone', quantity: 1 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Runic Voidstone',
    value: 'runic_voidstone',
    tier: 6,
    description: 'Mythical stonecutting material.',
    ingredients: [
      { item: 'Obsidian Voidstone', quantity: 1 },
      { item: 'Powerful Gemstone Dust', quantity: 1 },
      { item: 'Solvent', quantity: 4 }
    ]
  },
  {
    name: 'Prismatic Block',
    value: 'prismatic_block',
    tier: 7,
    description: 'The pinnacle of stonecutting mastery.',
    ingredients: [
      { item: 'Runestone', quantity: 1 },
      { item: 'Runic Voidstone', quantity: 5 },
      { item: 'Solvent', quantity: 4 }
    ]
  },
  {
    name: 'Prismatic Scarab',
    value: 'prismatic_scarab',
    tier: 8,
    description: 'A mystical artifact of immense power.',
    ingredients: [
      { item: 'Prismatic Block', quantity: 1 },
      { item: 'Golden Scarab', quantity: 10 },
      { item: 'Solvent', quantity: 50 },
      { item: 'Azoth', quantity: 500 }
    ]
  }
];