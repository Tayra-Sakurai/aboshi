import type { Database } from "~/typing/supabase";

export type ItemDisplay = {
  id: number;
  name: string;
  /** The name of `money_status` data record which was used as the payment method. */
  methodName: string;
  smallCategoryName: string;
  mediumCategoryName: string;
  largeCategoryName: string;
  expense: number;
  income: number;
  /** Parsed `Date` object from the ISO-style timestamp string. */
  timestamp: Date;
}

export type ItemFormValues = Pick<
  Database["public"]["Tables"]["items"]["Row"],
  "name" | "is_income" | "amount" | "timestamp" | "method_id" | "small_category_id"
>;

export function getItemFormValues(formData: FormData): ItemFormValues | null {
  const name = formData.get("name");
  const methodId = formData.get("method_id");
  const smallCategoryId = formData.get("small_category_id");
  const incomeType = formData.get("is_income");
  const amountValue = formData.get("amount");
  const timestampValue = formData.get("timestamp");

  if (
    typeof name !== "string" ||
    typeof methodId !== "string" ||
    typeof smallCategoryId !== "string" ||
    (incomeType !== "income" && incomeType !== "expense") ||
    typeof amountValue !== "string" ||
    typeof timestampValue !== "string" ||
    name.trim() === "" ||
    amountValue.trim() === ""
  ) {
    return null;
  }

  const method_id = Number(methodId);
  const small_category_id = Number(smallCategoryId);
  const amount = Number(amountValue);
  const timestamp = new Date(timestampValue);

  if (
    !Number.isInteger(method_id) ||
    method_id <= 0 ||
    !Number.isInteger(small_category_id) ||
    small_category_id <= 0 ||
    !Number.isFinite(amount) ||
    !Number.isFinite(timestamp.getTime())
  ) {
    return null;
  }

  return {
    name,
    method_id,
    small_category_id,
    is_income: incomeType === "income",
    amount,
    timestamp: timestamp.toISOString(),
  };
}

export function getItemExpenseIncome({
  is_income,
  amount,
}: Pick<Database["public"]["Tables"]["items"]["Row"], "is_income" | "amount">) {
  return is_income ?
    {
      expense: 0,
      income: amount,
    } :
    {
      expense: amount,
      income: 0,
    };
}