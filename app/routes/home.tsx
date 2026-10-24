import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/home";
import Dashboard from "~/dashboard/dashboard";
import { data, redirect } from "react-router";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "ホーム | Aboshi" },
    {
      name: "description",
      content: "収支項目や分類、状態を閲覧・追加できるAboshiのホーム画面です。",
    },
  ];
}

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user)
    throw redirect('/auth/login', { headers });
  return data(user, { headers });
}

export default function Home() {
  return <Dashboard />;
}
