import type { FunctionDeclaration } from "@google/genai";
import {
  read_items,
  read_small_categories,
  read_medium_categories,
  read_large_categories,
  read_money_status,
} from "./db_read.server";
import {
  insert_item,
  insert_small_category,
  insert_medium_category,
  insert_large_category,
  insert_money_status,
} from "./db_insert.server";
import {
  update_item,
  update_small_category,
  update_medium_category,
  update_large_category,
  update_money_status,
} from "./db_update.server";
import {
  delete_item,
  delete_small_category,
  delete_medium_category,
  delete_large_category,
  delete_money_status,
} from "./db_delete.server";

export * from "./db_read.server";
export * from "./db_insert.server";
export * from "./db_update.server";
export * from "./db_delete.server";

export const readDeclarations: FunctionDeclaration[] = [
  read_items,
  read_small_categories,
  read_medium_categories,
  read_large_categories,
  read_money_status,
];

export const insertDeclarations: FunctionDeclaration[] = [
  insert_item,
  insert_small_category,
  insert_medium_category,
  insert_large_category,
  insert_money_status,
];

export const updateDeclarations: FunctionDeclaration[] = [
  update_item,
  update_small_category,
  update_medium_category,
  update_large_category,
  update_money_status,
];

export const deleteDeclarations: FunctionDeclaration[] = [
  delete_item,
  delete_small_category,
  delete_medium_category,
  delete_large_category,
  delete_money_status,
];

export const allDatabaseDeclarations: FunctionDeclaration[] = [
  ...readDeclarations,
  ...insertDeclarations,
  ...updateDeclarations,
  ...deleteDeclarations,
];
