import { Type, type FunctionDeclaration } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/typing/supabase";

export type InsertItemParams = {
  name: string;
  amount: number;
  is_income: boolean;
  small_category_id: number;
  method_id: number;
  timestamp?: string;
};

export async function insertItem(
  supabase: SupabaseClient<Database, "public">,
  values: InsertItemParams
): Promise<Database["public"]["Tables"]["items"]["Row"]> {
  const { data, error } = await supabase
    .from("items")
    .insert({
      name: values.name,
      amount: values.amount,
      is_income: values.is_income,
      small_category_id: values.small_category_id,
      method_id: values.method_id,
      timestamp: values.timestamp ?? new Date().toISOString(),
    })
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const insert_item: FunctionDeclaration = {
  name: "insert_item",
  description: "Inserts a new item (income or expense) into the database.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name or description of the item.",
      },
      amount: {
        type: Type.NUMBER,
        description: "The amount of money moved.",
      },
      is_income: {
        type: Type.BOOLEAN,
        description: "`true` if the item is related to an income; `false` if it is an expense.",
      },
      small_category_id: {
        type: Type.NUMBER,
        description: "The identity of the related small category.",
      },
      method_id: {
        type: Type.NUMBER,
        description: "The identity of the payment method or account used.",
      },
      timestamp: {
        type: Type.STRING,
        description: "The ISO 8601 timestamp when the transaction occurred. Defaults to now if omitted.",
      },
    },
    required: [
      "name",
      "amount",
      "is_income",
      "small_category_id",
      "method_id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
      },
      name: {
        type: Type.STRING,
      },
      user_id: {
        type: Type.STRING,
      },
      amount: {
        type: Type.NUMBER,
        description: "The amount of money moved.",
      },
      is_income: {
        type: Type.BOOLEAN,
        description: "`true` if the item is related to an income; `false`, otherwise.",
      },
      created_at: {
        type: Type.STRING,
        description: "The timestamp when the record was created.",
      },
      timestamp: {
        type: Type.STRING,
        description: "The time when the trade of the item occurred.",
      },
      small_category_id: {
        type: Type.NUMBER,
        description: "The identity of the related small category.",
      },
      method_id: {
        type: Type.NUMBER,
        description: "The identity of the payment method used for the payment or one charged into.",
      },
    },
    required: [
      "name",
      "user_id",
      "small_category_id",
      "method_id",
      "id",
      "created_at",
      "timestamp",
      "amount",
      "is_income",
    ],
  },
};

export type InsertSmallCategoryParams = {
  name: string;
  medium_category_id: number;
  monthly_budget?: number;
};

export async function insertSmallCategory(
  supabase: SupabaseClient<Database, "public">,
  values: InsertSmallCategoryParams
): Promise<Database["public"]["Tables"]["small_categories"]["Row"]> {
  const { data, error } = await supabase
    .from("small_categories")
    .insert({
      name: values.name,
      medium_category_id: values.medium_category_id,
      monthly_budget: values.monthly_budget ?? 0,
    })
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const insert_small_category: FunctionDeclaration = {
  name: "insert_small_category",
  description: "Creates a new small category.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of the small category.",
      },
      medium_category_id: {
        type: Type.NUMBER,
        description: "The identity of the related medium category.",
      },
      monthly_budget: {
        type: Type.NUMBER,
        description: "The monthly budget of the expense (defaults to 0 if omitted).",
      },
    },
    required: [
      "name",
      "medium_category_id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity.",
      },
      name: {
        type: Type.STRING,
      },
      created_at: {
        type: Type.STRING,
        description: "The timestamp when the data entry was created.",
      },
      monthly_budget: {
        type: Type.NUMBER,
        description: "The monthly budget of the expense.",
      },
      medium_category_id: {
        type: Type.NUMBER,
        description: "The identity of the related medium category.",
      },
      user_id: {
        type: Type.STRING,
        description: "The user identity of the creator.",
      },
    },
    required: [
      "created_at",
      "id",
      "medium_category_id",
      "monthly_budget",
      "name",
      "user_id",
    ],
  },
};

export type InsertMediumCategoryParams = {
  name: string;
  large_category_id: number;
};

export async function insertMediumCategory(
  supabase: SupabaseClient<Database, "public">,
  values: InsertMediumCategoryParams
): Promise<Database["public"]["Tables"]["medium_categories"]["Row"]> {
  const { data, error } = await supabase
    .from("medium_categories")
    .insert({
      name: values.name,
      large_category_id: values.large_category_id,
    })
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const insert_medium_category: FunctionDeclaration = {
  name: "insert_medium_category",
  description: "Creates a new medium category within a large category.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of the medium category.",
      },
      large_category_id: {
        type: Type.NUMBER,
        description: "The identity of the related large category.",
      },
    },
    required: [
      "name",
      "large_category_id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity.",
      },
      name: {
        type: Type.STRING,
      },
      created_at: {
        type: Type.STRING,
        description: "The timestamp when the data entry was created.",
      },
      large_category_id: {
        type: Type.NUMBER,
        description: "The identity of the related large category.",
      },
      user_id: {
        type: Type.STRING,
        description: "The user identity of the creator.",
      },
    },
    required: [
      "created_at",
      "id",
      "large_category_id",
      "name",
      "user_id",
    ],
  },
};

export type InsertLargeCategoryParams = {
  name: string;
};

export async function insertLargeCategory(
  supabase: SupabaseClient<Database, "public">,
  values: InsertLargeCategoryParams
): Promise<Database["public"]["Tables"]["large_categories"]["Row"]> {
  const { data, error } = await supabase
    .from("large_categories")
    .insert({
      name: values.name,
    })
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const insert_large_category: FunctionDeclaration = {
  name: "insert_large_category",
  description: "Creates a new large category.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of the large category.",
      },
    },
    required: [
      "name",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity.",
      },
      name: {
        type: Type.STRING,
      },
      created_at: {
        type: Type.STRING,
        description: "The timestamp when the data entry was created.",
      },
      user_id: {
        type: Type.STRING,
        description: "The user identity of the creator.",
      },
    },
    required: [
      "created_at",
      "id",
      "name",
      "user_id",
    ],
  },
};

export type InsertMoneyStatusParams = {
  name: string;
};

export async function insertMoneyStatus(
  supabase: SupabaseClient<Database, "public">,
  values: InsertMoneyStatusParams
): Promise<Database["public"]["Tables"]["money_status"]["Row"]> {
  const { data, error } = await supabase
    .from("money_status")
    .insert({
      name: values.name,
    })
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const insert_money_status: FunctionDeclaration = {
  name: "insert_money_status",
  description: "Creates a new payment method / money status.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of the payment method / money status.",
      },
    },
    required: [
      "name",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity.",
      },
      name: {
        type: Type.STRING,
      },
      created_at: {
        type: Type.STRING,
        description: "The timestamp when the data entry was created.",
      },
      user_id: {
        type: Type.STRING,
        description: "The user identity of the creator.",
      },
    },
    required: [
      "created_at",
      "id",
      "name",
      "user_id",
    ],
  },
};
