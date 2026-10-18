import { data, Outlet } from "react-router";
import type { Route } from "./+types/layout";
import NavigationBar from "./navbar";
import { createClient } from "~/utils/supabase.server";
import UserContext from "~/contexts/UserContext";
import BottomNavs from "./bottom_navs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  console.info(request.headers.getSetCookie())
  const code = new URL(request.url).searchParams.get('code');
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error(error);
      return null;
    }
  }
  const { data: { user }} = await supabase.auth.getUser();
  return data(user, { headers });
}

export default function Layout({
  loaderData
}: Route.ComponentProps) {
  console.info(loaderData);
  return (
    <Stack
      sx={{
        minHeight: '100svh',
        bgcolor(theme) {
          return theme.palette.background.default;
        },
        color(theme) {
          return theme.palette.text.primary;
        },
      }}
    >
      <NavigationBar
        email={loaderData?.email}
      />
      <UserContext.Provider value={loaderData}>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </UserContext.Provider>
      <BottomNavs />
    </Stack>
  );
}