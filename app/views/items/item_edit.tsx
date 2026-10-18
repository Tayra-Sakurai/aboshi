import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/item_edit";
import { data, Form, redirect } from "react-router";
import ItemForm from "./item_form";
import { getItemFormValues } from "./item_funcs";

export async function loader({
  request,
  params: { cid },
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const [
    { data: largeCategories, error: largeCategoriesError },
    { data: mediumCategories, error: mediumCategoriesError },
    { data: smallCategories, error: smallCategoriesError },
    { data: methods, error: methodsError },
    { data: item, error: itemError },
  ] = await Promise.all([
    supabase.from("large_categories").select("id, name"),
    supabase.from("medium_categories").select("id, name, large_categories(id, name)"),
    supabase
      .from("small_categories")
      .select("id, name, medium_categories(id, name, large_categories(id, name))"),
    supabase.from("money_status").select("id, name"),
    supabase
      .from("items")
      .select(
        "name, is_income, amount, timestamp, small_categories(id, medium_categories(id, large_categories(id))), money_status(id)"
      )
      .eq("id", Number.parseInt(cid))
      .maybeSingle(),
  ]);

  if (largeCategoriesError)
    throw largeCategoriesError;
  if (mediumCategoriesError)
    throw mediumCategoriesError;
  if (smallCategoriesError)
    throw smallCategoriesError;
  if (methodsError)
    throw methodsError;
  if (itemError)
    throw itemError;
  if (!item)
    throw data("Could not find the requested item.", { status: 404, headers });

  return data({
    largeCategories,
    mediumCategories,
    smallCategories,
    methods,
    item,
  }, { headers });
}

export async function action({
  request,
  params: { cid },
}: Route.ActionArgs) {
  const formData = await request.formData();
  const values = getItemFormValues(formData);
  if (!values)
    throw data(null, 400);

  const { supabase, headers } = createClient(request);
  const { error } = await supabase
    .from("items")
    .update(values)
    .eq("id", Number.parseInt(cid));
  if (error)
    throw error;
  return redirect("/items", { headers });
}

export default function ItemEdit({
  loaderData,
  params: { cid },
}: Route.ComponentProps) {
  return (
    <>
      <ItemForm
        itemData={loaderData.item}
        largeCategories={loaderData.largeCategories}
        mediumCategories={loaderData.mediumCategories}
        smallCategories={loaderData.smallCategories}
        methods={loaderData.methods}
      />
      <Form action="/deletion" method="post">
        <input type="hidden" name="id" value={cid} />
        <input type="hidden" name="table" value="items" />
        <input type="hidden" name="redirect_to" value="/items" />
        <Button
          color="error"
          variant="contained"
          type="submit"
          startIcon={<DeleteIcon />}
          fullWidth
        >
          削除
        </Button>
      </Form>
    </>
  );
}
