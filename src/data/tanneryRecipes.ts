import { CraftingRecipe } from '../types';

export const tanneryRecipes: CraftingRecipe[] = [
  {
    name: 'Coarse Leather',
    value: 'coarse_leather',
    tier: 2,
    description: 'Basic tanning material.',
    ingredients: [
      { item: 'Rawhide', quantity: 4 }
    ]
  },
  {
    name: 'Rugged Leather',
    value: 'rugged_leather',
    tier: 3,
    description: 'Intermediate tanning material.',
    ingredients: [
      { item: 'Coarse Leather', quantity: 4 },
      { item: 'Aged Tannin', quantity: 1 }
    ]
  },
  {
    name: 'Layered Leather',
    value: 'layered_leather',
    tier: 4,
    description: 'Advanced tanning material.',
    ingredients: [
      { item: 'Thick Hide', quantity: 6 },
      { item: 'Rugged Leather', quantity: 2 },
      { item: 'Aged Tannin', quantity: 1 }
    ]
  },
  {
    name: 'Infused Leather',
    value: 'infused_leather',
    tier: 5,
    description: 'High-tier tanning material.',
    ingredients: [
      { item: 'Layered Leather', quantity: 2 },
      { item: 'Iron Hide', quantity: 8 },
      { item: 'Aged Tannin', quantity: 1 }
    ]
  },
  {
    name: 'Runic Leather',
    value: 'runic_leather',
    tier: 6,
    description: 'Legendary tanning material. Limited to 10 per day.',
    ingredients: [
      { item: 'Infused Leather', quantity: 5 },
      { item: 'Scarhide', quantity: 2 },
      { item: 'Aged Tannin', quantity: 1 }
    ]
  },
  {
    name: 'Dark Leather',
    value: 'dark_leather',
    tier: 6,
    description: 'Mythical tanning material.',
    ingredients: [
      { item: 'Dark Hide', quantity: 16 },
      { item: 'Infused Leather', quantity: 2 },
      { item: 'Aged Tannin', quantity: 1 }
    ]
  },
  {
    name: 'Prismatic Leather',
    value: 'prismatic_leather',
    tier: 7,
    description: 'The pinnacle of tanning mastery.',
    ingredients: [
      { item: 'Runic Leather', quantity: 1 },
      { item: 'Dark Leather', quantity: 12 },
      { item: 'Aged Tannin', quantity: 4 }
    ]
  }
];