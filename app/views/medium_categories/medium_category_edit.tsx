import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/medium_category_edit";
import MediumCategoryForm from "./medium_category_form";
import { data, Form, redirect } from "react-router";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "中分類を編集 | Aboshi" },
    {
      name: "description",
      content: "登録済みの中分類と所属する大分類を編集または削除します。",
    },
  ];
}

export async function loader({
  request,
  params: {
    cid
  }
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: lcData, error: e } = await supabase.from('large_categories')
    .select('id, name');
  if (e)
    throw data(e, { status: 418 });
  const { data: mcData, error } = await supabase
    .from('medium_categories')
    .select('name, large_categories(id)')
    .eq('id', parseInt(cid));
  if (error)
    throw data(error, { status: 418 });
  if (mcData.length === 0)
    throw data('Could not find any data', { status: 404 });
  return data(
    {
      lcData,
      mcData,
    },
    { headers }
  );
}

export async function action({
  request,
  params: {
    cid
  }
}: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const lcId = formData.get('large_category_id');
  if ((typeof name === 'string') && (typeof lcId === 'string')) {
    const { supabase, headers } = createClient(request);
    const { error } = await supabase.from('medium_categories')
      .update({
        name,
        large_category_id: parseInt(lcId),
      })
      .eq('id', parseInt(cid));
    if (error)
      throw error;
    return redirect('/medium_categories', { headers });
  }
  throw data(null, 400);
}

export default function MediumCategoryEdit({
  loaderData: {
    lcData,
    mcData: [mc]
  },
  params: { cid }
}: Route.ComponentProps) {
  return (
    <>
      <MediumCategoryForm
        largeCategories={lcData}
        name={mc.name}
        lcId={mc.large_categories.id}
      />
      <Form method="post" action="/deletion">
        <input type="hidden" value={cid} name="id" />
        <input type="hidden" name="table" value="medium_categories" />
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
  );
}