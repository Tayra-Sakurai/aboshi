import Stack from "@mui/material/Stack";
import { data, Outlet, redirect } from "react-router";
import type { Route } from "./+types/view_base";
import { createClient } from "~/utils/supabase.server";

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.warn('Unauthorized access');
    throw redirect('/auth/login', {
      headers
    });
  }
  return data(null, { headers });
}

export default function ViewBase() {
  return (
    <Stack
      spacing={2}
      direction="column"
    >
      <Outlet />
    </Stack>
  );
}