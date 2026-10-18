import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/item_add";
import { data, redirect } from "react-router";
import ItemForm from "./item_form";
import { getItemFormValues } from "./item_funcs";

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const [
    { data: largeCategories, error: largeCategoriesError },
    { data: mediumCategories, error: mediumCategoriesError },
    { data: smallCategories, error: smallCategoriesError },
    { data: methods, error: methodsError },
  ] = await Promise.all([
    supabase.from("large_categories").select("id, name"),
    supabase.from("medium_categories").select("id, name, large_categories(id, name)"),
    supabase
      .from("small_categories")
      .select("id, name, medium_categories(id, name, large_categories(id, name))"),
    supabase.from("money_status").select("id, name"),
  ]);

  if (largeCategoriesError)
    throw largeCategoriesError;
  if (mediumCategoriesError)
    throw mediumCategoriesError;
  if (smallCategoriesError)
    throw smallCategoriesError;
  if (methodsError)
    throw methodsError;

  return data({
    largeCategories,
    mediumCategories,
    smallCategories,
    methods,
  }, { headers });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = getItemFormValues(formData);
  if (!values)
    throw data(null, 400);

  const { supabase, headers } = createClient(request);
  const { error } = await supabase.from("items").insert(values);
  if (error)
    throw error;
  return redirect("/items", { headers });
}

export default function ItemAdd({ loaderData }: Route.ComponentProps) {
  return (
    <ItemForm
      largeCategories={loaderData.largeCategories}
      mediumCategories={loaderData.mediumCategories}
      smallCategories={loaderData.smallCategories}
      methods={loaderData.methods}
    />
  );
}
