import { Type, type FunctionDeclaration } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/typing/supabase";

export async function readItems(
  supabase: SupabaseClient<Database, "public">
): Promise<Database["public"]["Tables"]["items"]["Row"][]> {
  const { data, error } = await supabase
    .from("items")
    .select("*");
  if (error)
    throw error;
  return data;
}

export const read_items: FunctionDeclaration = {
  name: "read_items",
  description: "Retrieves all items in the database.",
  parameters: {
    type: Type.NULL,
  },
  response: {
    type: Type.ARRAY,
    items: {
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
  },
};

export async function readSmallCategories(
  supabase: SupabaseClient<Database, "public">
): Promise<Database["public"]["Tables"]["small_categories"]["Row"][]> {
  const { data, error } = await supabase
    .from("small_categories")
    .select("*");
  if (error)
    throw error;
  return data;
}

export const read_small_categories: FunctionDeclaration = {
  name: "read_small_categories",
  description: "Loads all small categories.",
  parameters: {
    type: Type.NULL,
  },
  response: {
    type: Type.ARRAY,
    items: {
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
  },
};

export async function readMediumCategories(
  supabase: SupabaseClient<Database, "public">
): Promise<Database["public"]["Tables"]["medium_categories"]["Row"][]> {
  const { data, error } = await supabase
    .from("medium_categories")
    .select("*");
  if (error)
    throw error;
  return data;
}

export const read_medium_categories: FunctionDeclaration = {
  name: "read_medium_categories",
  description: "Loads all medium categories.",
  parameters: {
    type: Type.NULL,
  },
  response: {
    type: Type.ARRAY,
    items: {
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
  },
};

export async function readLargeCategories(
  supabase: SupabaseClient<Database, "public">
): Promise<Database["public"]["Tables"]["large_categories"]["Row"][]> {
  const { data, error } = await supabase
    .from("large_categories")
    .select("*");
  if (error)
    throw error;
  return data;
}

export const read_large_categories: FunctionDeclaration = {
  name: "read_large_categories",
  description: "Loads all large categories.",
  parameters: {
    type: Type.NULL,
  },
  response: {
    type: Type.ARRAY,
    items: {
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
  },
};

export async function readMoneyStatus(
  supabase: SupabaseClient<Database, "public">
): Promise<Database["public"]["Tables"]["money_status"]["Row"][]> {
  const { data, error } = await supabase
    .from("money_status")
    .select("*");
  if (error)
    throw error;
  return data;
}

export const read_money_status: FunctionDeclaration = {
  name: "read_money_status",
  description: "Loads all payment methods / money statuses.",
  parameters: {
    type: Type.NULL,
  },
  response: {
    type: Type.ARRAY,
    items: {
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
  },
};
