import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import NavigationBar from "./navbar";
import { createClient } from "~/utils/supabase.server";
import UserContext from "~/contexts/UserContext";

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
  console.info(loaderData);
  return (
    <>
      <NavigationBar
        email={loaderData?.email}
      />
      <UserContext.Provider value={loaderData}>
      <Outlet />
      </UserContext.Provider>
    </>
  );
}