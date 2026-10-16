type LargeCategory = {
  name: string;
  id: number;
  medium_categories: {
    small_categories: {
      items: {
        amount: number;
        is_income: boolean;
      }[];
    }[];
  }[];
};

export function getTotalAmount(lc: LargeCategory): {
  expense: number;
  income: number;
} {
  let expense: number = 0;
  let income: number = 0;
  for (const { small_categories } of lc.medium_categories)
    for (const { items } of small_categories)
      for (const { is_income, amount } of items)
        if (is_income)
          income += amount;
        else
          expense += amount;
  return { expense, income };
}

export type LargeCategoryDisplay = {
  id: number;
  name: string;
  expense: number;
  income: number;
}