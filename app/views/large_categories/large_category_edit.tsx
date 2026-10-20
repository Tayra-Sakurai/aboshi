import DeleteIcon from "@mui/icons-material/Delete";
import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/large_category_edit";
import LargeCategoryForm from "./large_category_form";
import { Form, redirect } from "react-router";
import Button from "@mui/material/Button";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "大分類を編集 | Aboshi" },
    {
      name: "description",
      content: "登録済みの大分類を編集または削除します。",
    },
  ];
}

export async function loader({
  request,
  params: {
    cid
  }
}: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const { data, error } = await supabase.from('large_categories')
    .select('name')
    .eq('id', parseInt(cid));
  if (error) {
    throw error;
  }
  return data[0];
}

export async function action({
  request,
  params: {
    cid
  }
}: Route.ActionArgs) {
  const formData = await request.formData();
  const { supabase } = createClient(request);
  const name = formData.get('name');
  if (typeof name === 'string') {
    const { error } = await supabase.from('large_categories')
      .update({
        name,
      })
      .eq('id', parseInt(cid));
    if (error)
      throw error;
    return redirect('/');
  }
}

export default function LargeCategoryEdit({
  loaderData,
  params: {
    cid
  }
}: Route.ComponentProps) {
  return (
    <>
      <LargeCategoryForm name={loaderData.name} />
      <Form action="/deletion" method="post">
        <input type="hidden" name="id" value={cid} />
        <input type="hidden" name="table" value="large_categories" />
        <input type="hidden" name="redirect_to" value="/" />
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