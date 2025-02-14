import { CraftingRecipe } from '../types';

export const loomRecipes: CraftingRecipe[] = [
  {
    name: 'Linen',
    value: 'linen',
    tier: 2,
    description: 'Basic weaving material.',
    ingredients: [
      { item: 'Fibers', quantity: 4 }
    ]
  },
  {
    name: 'Sateen',
    value: 'sateen',
    tier: 3,
    description: 'Intermediate weaving material.',
    ingredients: [
      { item: 'Linen', quantity: 4 },
      { item: 'Wireweave', quantity: 1 }
    ]
  },
  {
    name: 'Silk',
    value: 'silk',
    tier: 4,
    description: 'Advanced weaving material.',
    ingredients: [
      { item: 'Silk Thread', quantity: 6 },
      { item: 'Sateen', quantity: 2 },
      { item: 'Wireweave', quantity: 1 }
    ]
  },
  {
    name: 'Infused Silk',
    value: 'infused_silk',
    tier: 5,
    description: 'High-tier weaving material.',
    ingredients: [
      { item: 'Wirefiber', quantity: 8 },
      { item: 'Silk', quantity: 2 },
      { item: 'Wireweave', quantity: 1 }
    ]
  },
  {
    name: 'Phoenixweave',
    value: 'phoenixweave',
    tier: 6,
    description: 'Legendary weaving material.',
    ingredients: [
      { item: 'Infused Silk', quantity: 5 },
      { item: 'Scalecloth', quantity: 2 },
      { item: 'Wireweave', quantity: 1 }
    ]
  },
  {
    name: 'Spinweave Cloth',
    value: 'spinweave_cloth',
    tier: 6,
    description: 'Mythical weaving material.',
    ingredients: [
      { item: 'Spinfiber', quantity: 12 },
      { item: 'Infused Silk', quantity: 2 },
      { item: 'Wireweave', quantity: 1 }
    ]
  },
  {
    name: 'Prismatic Cloth',
    value: 'prismatic_cloth',
    tier: 7,
    description: 'The pinnacle of weaving mastery.',
    ingredients: [
      { item: 'Phoenixweave', quantity: 1 },
      { item: 'Spinweave Cloth', quantity: 10 },
      { item: 'Wireweave', quantity: 4 }
    ]
  }
];