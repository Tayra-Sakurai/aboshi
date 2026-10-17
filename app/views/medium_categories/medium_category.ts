export type MediumCategoryDisplay = {
  name: string;
  id: number;
  largeCategoryName: string;
  expense: number;
  income: number;
};

export function getMediumCategoryTotal<T extends Object & {
  small_categories: (Object & {
    items: (Object & {
      amount: number;
      is_income: boolean;
    })[];
  })[];
}>(mc: T): {
  expense: number;
  income: number;
} {
  let expense = 0;
  let income = 0;
  for (const { items } of mc.small_categories)
    for (const { amount, is_income } of items)
      if (is_income)
        income += amount;
      else
        expense += amount;
  return {
    expense,
    income
  };
}