import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/deletion";
import { redirect } from "react-router";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const table = formData.get('table');
  const id = formData.get('id');
  const redirectTo = formData.get('redirect_to');
  if ((table === 'large_categories') && (typeof id === 'string')) {
    const { supabase } = createClient(request);
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', parseInt(id));
    if (error)
      console.error(error);
    return redirect(
      (typeof redirectTo === 'string') ?
        redirectTo :
        '/'
    );
  }
  return redirect('/');
}

export default function Deletion() {
  return <p>削除中です</p>;
}