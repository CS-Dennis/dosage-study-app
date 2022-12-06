export const allUnits = [
  'mg',
  'mcg',
  'teaspoon',
  'tablespoon',
  'oz',
  'ml',
  'cup',
  'quart',
  'pint',
  'grain',
  'gram',
  'kg',
  'lb',
];

// 1 mg -> 1000 mcg
// 1 teaspoon -> 5 ml
// 1 tablespoon -> 3 teaspoons
// 1 oz -> 30 ml
// 1 cup -> 8 oz
// 1 quart -> 2 pints
// 1 pint -> 2 cups
// 1 grain (gr) -> 60 mg
// 1 gram (g) -> 1000 mg
// 1 kg -> 22 lbs
// 1 lbs -> 16 oz
export const unitMatch = selectedUnit => {
  const dictionary = {
    mg: {mcg: 1000, grain: 1 / 60, gram: 1 / 1000},
    mcg: {mg: 1 / 1000},
    teaspoon: {ml: 5, tablespoon: 1 / 3},
    ml: {tablespoon: 1 / 15, teaspoon: 1 / 5, oz: 1 / 30},
    tablespoon: {teaspoon: 3, ml: 15},
    oz: {ml: 30, cup: 1 / 8, lb: 1 / 16, pint: 1 / 16},
    cup: {ml: 240, oz: 8, pint: 1 / 2, quart: 1 / 4},
    quart: {ml: 960, pint: 2, cup: 4, oz: 32},
    pint: {ml: 480, quart: 1 / 2, cup: 2, oz: 16},
    lb: {oz: 16, kg: 1 / 2.205},
    kg: {lb: 2.205},
    grain: {mg: 60, mcg: 60000, gram: 60 / 1000},
    gram: {mg: 1000, mcg: 1000000, grain: 1000 / 60},
  };

  return dictionary[selectedUnit];
};
