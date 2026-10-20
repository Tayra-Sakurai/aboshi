import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/logout";
import { data, redirect } from "react-router";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "ログアウト | Aboshi" },
    {
      name: "description",
      content: "Aboshiからログアウトしています。",
    },
  ];
}

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { error } = await supabase.auth
    .signOut();
  if (error)
    throw data(error, {
      headers,
      status: 400,
    });
  throw redirect('/auth/login', { headers });
}

export async function action({
  request
}: Route.ActionArgs) {
  const { supabase, headers } = createClient(request);
  const { error } = await supabase
    .auth
    .signOut();
  if (error)
    throw data(error, {
      headers,
      status: 400,
    });
  throw redirect('/auth/login', { headers });
}

export default function Logout() {
  return (
    <p>ログアウトしています。しばらくお待ちください。</p>
  );
}