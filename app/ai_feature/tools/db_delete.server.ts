import { Type, type FunctionDeclaration } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/typing/supabase";

export type DeleteParams = {
  id: number;
};

export async function deleteItem(
  supabase: SupabaseClient<Database, "public">,
  params: DeleteParams | number
): Promise<{ success: boolean; id: number }> {
  const id = typeof params === "number" ? params : params.id;
  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", id);
  if (error)
    throw error;
  return { success: true, id };
}

export const delete_item: FunctionDeclaration = {
  name: "delete_item",
  description: "Deletes an item by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the item to delete.",
      },
    },
    required: [
      "id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      success: {
        type: Type.BOOLEAN,
        description: "Indicates whether the deletion was successful.",
      },
      id: {
        type: Type.NUMBER,
        description: "The identity of the deleted item.",
      },
    },
    required: [
      "id",
      "success",
    ],
  },
};

export async function deleteSmallCategory(
  supabase: SupabaseClient<Database, "public">,
  params: DeleteParams | number
): Promise<{ success: boolean; id: number }> {
  const id = typeof params === "number" ? params : params.id;
  const { error } = await supabase
    .from("small_categories")
    .delete()
    .eq("id", id);
  if (error)
    throw error;
  return { success: true, id };
}

export const delete_small_category: FunctionDeclaration = {
  name: "delete_small_category",
  description: "Deletes a small category by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the small category to delete.",
      },
    },
    required: [
      "id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      success: {
        type: Type.BOOLEAN,
        description: "Indicates whether the deletion was successful.",
      },
      id: {
        type: Type.NUMBER,
        description: "The identity of the deleted small category.",
      },
    },
    required: [
      "id",
      "success",
    ],
  },
};

export async function deleteMediumCategory(
  supabase: SupabaseClient<Database, "public">,
  params: DeleteParams | number
): Promise<{ success: boolean; id: number }> {
  const id = typeof params === "number" ? params : params.id;
  const { error } = await supabase
    .from("medium_categories")
    .delete()
    .eq("id", id);
  if (error)
    throw error;
  return { success: true, id };
}

export const delete_medium_category: FunctionDeclaration = {
  name: "delete_medium_category",
  description: "Deletes a medium category by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the medium category to delete.",
      },
    },
    required: [
      "id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      success: {
        type: Type.BOOLEAN,
        description: "Indicates whether the deletion was successful.",
      },
      id: {
        type: Type.NUMBER,
        description: "The identity of the deleted medium category.",
      },
    },
    required: [
      "id",
      "success",
    ],
  },
};

export async function deleteLargeCategory(
  supabase: SupabaseClient<Database, "public">,
  params: DeleteParams | number
): Promise<{ success: boolean; id: number }> {
  const id = typeof params === "number" ? params : params.id;
  const { error } = await supabase
    .from("large_categories")
    .delete()
    .eq("id", id);
  if (error)
    throw error;
  return { success: true, id };
}

export const delete_large_category: FunctionDeclaration = {
  name: "delete_large_category",
  description: "Deletes a large category by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the large category to delete.",
      },
    },
    required: [
      "id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      success: {
        type: Type.BOOLEAN,
        description: "Indicates whether the deletion was successful.",
      },
      id: {
        type: Type.NUMBER,
        description: "The identity of the deleted large category.",
      },
    },
    required: [
      "id",
      "success",
    ],
  },
};

export async function deleteMoneyStatus(
  supabase: SupabaseClient<Database, "public">,
  params: DeleteParams | number
): Promise<{ success: boolean; id: number }> {
  const id = typeof params === "number" ? params : params.id;
  const { error } = await supabase
    .from("money_status")
    .delete()
    .eq("id", id);
  if (error)
    throw error;
  return { success: true, id };
}

export const delete_money_status: FunctionDeclaration = {
  name: "delete_money_status",
  description: "Deletes a payment method / money status by its identity.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.NUMBER,
        description: "The identity of the payment method / money status to delete.",
      },
    },
    required: [
      "id",
    ],
  },
  response: {
    type: Type.OBJECT,
    properties: {
      success: {
        type: Type.BOOLEAN,
        description: "Indicates whether the deletion was successful.",
      },
      id: {
        type: Type.NUMBER,
        description: "The identity of the deleted payment method / money status.",
      },
    },
    required: [
      "id",
      "success",
    ],
  },
};
