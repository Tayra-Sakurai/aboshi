import DeleteIcon from "@mui/icons-material/Delete";
import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/money_status_edit";
import MoneyStatusForm from "./money_status_form";
import { data, Form, redirect } from "react-router";
import Button from "@mui/material/Button";

export async function loader({
  request,
  params: {
    cid
  }
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: d, error } = await supabase
    .from('money_status')
    .select('name')
    .eq('id', parseInt(cid));
  if (error) {
    throw error;
  }
  if (!d || d.length === 0) {
    throw data('Could not find any data', { status: 404 });
  }
  return data(d[0], { headers });
}

export async function action({
  request,
  params: {
    cid
  }
}: Route.ActionArgs) {
  const formData = await request.formData();
  const { supabase, headers } = createClient(request);
  const name = formData.get('name');
  if (typeof name === 'string') {
    const { error } = await supabase
      .from('money_status')
      .update({
        name,
      })
      .eq('id', parseInt(cid));
    if (error)
      throw error;
    return redirect('/money_status', { headers });
  }
  throw data(null, 400);
}

export default function MoneyStatusEdit({
  loaderData,
  params: {
    cid
  }
}: Route.ComponentProps) {
  return (
    <>
      <MoneyStatusForm name={loaderData.name} />
      <Form action="/deletion" method="post">
        <input type="hidden" name="id" value={cid} />
        <input type="hidden" name="table" value="money_status" />
        <input type="hidden" name="redirect_to" value="/money_status" />
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
