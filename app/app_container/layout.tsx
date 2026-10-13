import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import NavigationBar from "./navbar";
import { createClient } from "~/utils/supabase.server";

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default function Layout({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <NavigationBar
        email={loaderData?.email}
      />
      <Outlet />
    </>
  );
}