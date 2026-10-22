import { Type, type FunctionDeclaration } from "@google/genai";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/typing/supabase";

export async function readItems(supabase: SupabaseClient<Database, "public">): Promise<Database["public"]["Tables"]["items"]["Row"][]> {
  const { data, error } = await supabase
    .from('items')
    .select('*');
  if (error)
    throw error;
  return data;
}

export const read_items: FunctionDeclaration = {
  name: 'read_items',
  description: 'Retrieves all items in the database.',
  parameters: {
    type: Type.NULL
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
          description: 'The amount of money moved.',
        },
        is_income: {
          type: Type.BOOLEAN,
          description: '`true` if the item is related to an income; `false`, otherwise.',
        },
        created_at: {
          type: Type.STRING,
          description: 'The timestamp when the record was created.',
        },
        timestamp: {
          type: Type.STRING,
          description: 'The time when the trade of the item occurred.',
        },
        small_category_id: {
          type: Type.NUMBER,
          description: 'The identity of the related small category.',
        },
        method_id: {
          type: Type.NUMBER,
          description: 'The identity of the payment method used for the payment or one charged into.',
        },
      },
      required: [
        'name',
        'user_id',
        'small_category_id',
        'method_id',
        'id',
        'created_at',
        'timestamp',
        'amount',
        'is_income',
      ],
    },
  },
};