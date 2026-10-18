export type SmallCategoryDisplay = {
  id: number;
  name: string;
  mediumCategoryName: string;
  largeCategoryName: string;
  monthlyIncome: number;
  monthlyExpense: number;
  income: number;
  expense: number;
  budget: number;
};

export function getMonthlyTotal<T extends {
  items: {
    amount: number;
    is_income: boolean;
    timestamp: string;
    [x: string]: any;
  }[];
  [y: string]: any;
}>(value: T): {
  monthlyIncome: number;
  monthlyExpense: number;
  income: number;
  expense: number;
} {
  let [monthlyExpense, monthlyIncome, income, expense] = [0, 0, 0, 0];
  for (const { is_income, amount, timestamp } of value.items) {
    if (is_income)
      income += amount;
    else
      expense += amount;
    const ts = new Date(timestamp);
    const today = new Date();
    if (ts.getMonth() === today.getMonth()) {
      if (is_income)
        monthlyIncome += amount;
      else
        monthlyExpense += amount;
    }
  }
  return {
    monthlyExpense,
    monthlyIncome,
    expense,
    income,
  };
}