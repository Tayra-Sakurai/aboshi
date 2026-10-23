import { Type, type FunctionDeclaration } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/typing/supabase";

export type UpdateItemParams = {
  id: number;
  name?: string;
  amount?: number;
  is_income?: boolean;
  small_category_id?: number;
  method_id?: number;
  timestamp?: string;
};

export async function updateItem(
  supabase: SupabaseClient<Database, "public">,
  values: UpdateItemParams
): Promise<Database["public"]["Tables"]["items"]["Row"]> {
  const { id, ...updates } = values;
  const { data, error } = await supabase
    .from("items")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const update_item: FunctionDeclaration = {
  name: "update_item",
  description: "Updates an existing item by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the item to update.",
      },
      name: {
        type: Type.STRING,
        description: "The updated name or description of the item.",
      },
      amount: {
        type: Type.NUMBER,
        description: "The updated amount of money moved.",
      },
      is_income: {
        type: Type.BOOLEAN,
        description: "`true` if the item is related to an income; `false` if it is an expense.",
      },
      small_category_id: {
        type: Type.NUMBER,
        description: "The updated identity of the related small category.",
      },
      method_id: {
        type: Type.NUMBER,
        description: "The updated identity of the payment method or account used.",
      },
      timestamp: {
        type: Type.STRING,
        description: "The updated ISO 8601 timestamp.",
      },
    },
    required: [
      "id",
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

export type UpdateSmallCategoryParams = {
  id: number;
  name?: string;
  medium_category_id?: number;
  monthly_budget?: number;
};

export async function updateSmallCategory(
  supabase: SupabaseClient<Database, "public">,
  values: UpdateSmallCategoryParams
): Promise<Database["public"]["Tables"]["small_categories"]["Row"]> {
  const { id, ...updates } = values;
  const { data, error } = await supabase
    .from("small_categories")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const update_small_category: FunctionDeclaration = {
  name: "update_small_category",
  description: "Updates an existing small category by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the small category to update.",
      },
      name: {
        type: Type.STRING,
        description: "The updated name of the small category.",
      },
      medium_category_id: {
        type: Type.NUMBER,
        description: "The updated identity of the related medium category.",
      },
      monthly_budget: {
        type: Type.NUMBER,
        description: "The updated monthly budget of the expense.",
      },
    },
    required: [
      "id",
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

export type UpdateMediumCategoryParams = {
  id: number;
  name?: string;
  large_category_id?: number;
};

export async function updateMediumCategory(
  supabase: SupabaseClient<Database, "public">,
  values: UpdateMediumCategoryParams
): Promise<Database["public"]["Tables"]["medium_categories"]["Row"]> {
  const { id, ...updates } = values;
  const { data, error } = await supabase
    .from("medium_categories")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const update_medium_category: FunctionDeclaration = {
  name: "update_medium_category",
  description: "Updates an existing medium category by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the medium category to update.",
      },
      name: {
        type: Type.STRING,
        description: "The updated name of the medium category.",
      },
      large_category_id: {
        type: Type.NUMBER,
        description: "The updated identity of the related large category.",
      },
    },
    required: [
      "id",
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

export type UpdateLargeCategoryParams = {
  id: number;
  name?: string;
};

export async function updateLargeCategory(
  supabase: SupabaseClient<Database, "public">,
  values: UpdateLargeCategoryParams
): Promise<Database["public"]["Tables"]["large_categories"]["Row"]> {
  const { id, ...updates } = values;
  const { data, error } = await supabase
    .from("large_categories")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const update_large_category: FunctionDeclaration = {
  name: "update_large_category",
  description: "Updates an existing large category by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the large category to update.",
      },
      name: {
        type: Type.STRING,
        description: "The updated name of the large category.",
      },
    },
    required: [
      "id",
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

export type UpdateMoneyStatusParams = {
  id: number;
  name?: string;
};

export async function updateMoneyStatus(
  supabase: SupabaseClient<Database, "public">,
  values: UpdateMoneyStatusParams
): Promise<Database["public"]["Tables"]["money_status"]["Row"]> {
  const { id, ...updates } = values;
  const { data, error } = await supabase
    .from("money_status")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    throw error;
  return data;
}

export const update_money_status: FunctionDeclaration = {
  name: "update_money_status",
  description: "Updates an existing payment method / money status by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the payment method / money status to update.",
      },
      name: {
        type: Type.STRING,
        description: "The updated name of the payment method / money status.",
      },
    },
    required: [
      "id",
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
