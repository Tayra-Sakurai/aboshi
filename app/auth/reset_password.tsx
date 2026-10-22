import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/reset_password";
import { data } from "react-router";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');

  if (email && typeof email === 'string') {
    const { supabase, headers } = createClient(request);
    const { error } = await supabase.auth
      .resetPasswordForEmail(
        email,
        {
          redirectTo: `${new URL(request.url).origin}/auth/set_password`,
        }
      );
    if (error)
      throw data(error, { headers });
    return data(email, { headers });
  }
}

export default function ResetPassword() {
  return <p>パスワード再設定用のリンクが送信されました。</p>;
}