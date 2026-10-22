import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/setup_password";
import PasswordForm from "./password_form";
import { redirect } from "react-router";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const password = formData.get('password');
  if (password && typeof password === 'string') {
    const { supabase, headers } = createClient(request);
    const { error } = await supabase
      .auth
      .updateUser({
        password,
      });
    if (error)
      throw error;
    throw redirect('/', { headers });
  }
}

export default function SetupPassword() {
  return <PasswordForm setup />;
}