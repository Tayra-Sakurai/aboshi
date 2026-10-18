import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/small_category_edit";
import { data, Form, redirect } from "react-router";
import SmallCategoryForm from "./small_category_form";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";

export async function loader({
  request,
  params: {
    cid
  }
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: large_categories, error: e } = await supabase
    .from('large_categories')
    .select('id, name');
  if (e)
    throw e;
  const { data: medium_categories, error: err } = await supabase
    .from('medium_categories')
    .select('id, name, large_categories(id, name)');
  if (err)
    throw err;
  const { data: d, error } = await supabase
    .from('small_categories')
    .select('name, medium_categories(id, large_categories(id)), monthly_budget')
    .eq('id', parseInt(cid));
  if (error)
    throw error;
  if (d.length === 0)
    throw new TypeError('Unexpected array.');
  return data({
    data: d[0],
    large_categories,
    medium_categories,
  }, {
    headers,
  });
}

export async function action({
  request,
  params: {
    cid
  }
}: Route.ActionArgs) {
  const { supabase, headers } = createClient(request);
  const formData = await request.formData();
  const name = formData.get('name');
  const monthly_budget_str = formData.get('monthly_budget');
  const medium_category_id_str = formData.get('medium_category_id');
  if (
    (typeof name === 'string') &&
    (typeof monthly_budget_str === 'string') &&
    (typeof medium_category_id_str === 'string')
  ) {
    const monthly_budget = parseFloat(monthly_budget_str);
    const medium_category_id = parseInt(medium_category_id_str);
    const { error } = await supabase
      .from('small_categories')
      .update({
        medium_category_id,
        monthly_budget,
        name,
      })
      .eq('id', parseInt(cid));
    if (error)
      return data(error, { headers });
    throw redirect('/small_categories', { headers });
  }
  throw data(null, 400);
}

export default function SmallCategoryEdit({
  loaderData,
  actionData,
  params: {
    cid
  }
}: Route.ComponentProps) {
  return (
    <>
      {actionData && <Alert severity="error">{actionData.message}</Alert>}
      <SmallCategoryForm {...loaderData} />
      <Form method="post" action="/deletion">
        <input type="hidden" value={cid} name="id" />
        <input type="hidden" value="small_categories" name="table" />
        <input type="hidden" value="/small_categories" name="redirect_to" />
        <Button
          type="submit"
          color="error"
          startIcon={<DeleteIcon />}
          fullWidth
          variant="contained"
        >
          削除
        </Button>
      </Form>
    </>
  )
}