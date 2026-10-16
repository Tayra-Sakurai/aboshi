import Stack from "@mui/material/Stack";
import { Outlet } from "react-router";

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