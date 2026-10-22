import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/sign_in_password";
import { data, redirect } from "react-router";
import PasswordForm from "./password_form";

export function meta(): Route.MetaDescriptors {
  return [
    {
      title: 'パスワードでログイン | Aboshi',
    },
    {
      name: 'description',
      content: 'パスワードで認証します。',
    },
  ];
}

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  console.info(email);
  if (email && typeof email === 'string') {
    if (password && typeof password === 'string') {
      const { supabase, headers } = createClient(request);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error)
        throw data(error, { headers });
      throw redirect('/', { headers });
    }
    return data({ email }, 200);
  }
  throw data('No email address was provided', 400);
}

export default function SingInPassword({
  actionData
}: Route.ComponentProps) {
  if (!actionData) {
    console.error('Invalid data');
    throw new Error('Bad data was sent.');
  }
  return <PasswordForm email={actionData.email} />;
}