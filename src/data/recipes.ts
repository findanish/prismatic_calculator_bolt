import { CraftingRecipe } from '../types';

export const recipes: CraftingRecipe[] = [
  {
    name: 'Timber',
    value: 'timber', 
    tier: 2,
    description: 'Crafting Material.',
    ingredients: [
      { item: 'Green Wood', quantity: 4 }
    ]
  },
  {
    name: 'Lumber',
    value: 'lumber', 
    tier: 3,
    description: 'Crafting Material.',
    ingredients: [
      { item: 'Aged Wood', quantity: 4 },
      { item: 'Timber', quantity: 2 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Wyrdwood Plank',
    value: 'wyrdwood_plank', 
    tier: 4,
    description: 'Crafting Material.',
    ingredients: [
      { item: 'Wyrdwood', quantity: 6 },
      { item: 'Lumber', quantity: 2 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Ironwood Plank',
    value: 'ironwood_plank', 
    tier: 5,
    description: 'Crafting Material.',
    ingredients: [
      { item: 'Ironwood', quantity: 8 },
      { item: 'Wyrdwood Plank', quantity: 2 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Glittering Ebony',
    value: 'glittering_ebony', 
    tier: 6,
    description: 'Ironwood that has been transmuted to be even stronger.',
    ingredients: [
      { item: 'Ironwood Plank', quantity: 5 },
      { item: 'Wildwood', quantity: 2 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Runewood Plank',
    value: 'runewood_plank', 
    tier: 6,
    description: 'Crafting Material.',
    ingredients: [
      { item: 'Runewood', quantity: 12 },
      { item: 'Ironwood Plank', quantity: 2 },
      { item: 'Obsidian Sandpaper', quantity: 1 }
    ]
  },
  {
    name: 'Prismatic Plank',
    value: 'prismatic_plank', 
    tier: 7,
    description: 'An exceptionally strong plank that has desirable properties.',
    ingredients: [
      { item: 'Glittering Ebony', quantity: 1 },
      { item: 'Runewood Plank', quantity: 10 },
      { item: 'Obsidian Sandpaper', quantity: 4 }
    ]
  }
];