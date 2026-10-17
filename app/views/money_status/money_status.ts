export type MoneyStatusDisplay = {
  name: string;
  id: number;
  expense: number;
  income: number;
};

export function getMoneyStatusTotal<T extends object & {
  items: (object & {
    amount: number;
    is_income: boolean;
  })[];
}>(ms: T): {
  expense: number;
  income: number;
} {
  let expense = 0;
  let income = 0;
  for (const { amount, is_income } of ms.items) {
    if (is_income)
      income += amount;
    else
      expense += amount;
  }
  return {
    expense,
    income,
  };
}

export const getTotalAmount = getMoneyStatusTotal;
