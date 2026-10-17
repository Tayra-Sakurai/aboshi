import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/money_status_add";
import MoneyStatusForm from "./money_status_form";
import { data, redirect } from "react-router";

export async function action({
  request
}: Route.ActionArgs) {
  const { supabase, headers } = createClient(request);
  const formData = await request.formData();
  const name = formData.get('name');
  if (typeof name === 'string') {
    const { error } = await supabase
      .from('money_status')
      .insert({
        name,
      });
    if (error)
      throw data(error, 500);
    return redirect('/money_status', { headers });
  }
  throw data(null, 400);
}

export default function MoneyStatusAdd() {
  return <MoneyStatusForm />;
}
