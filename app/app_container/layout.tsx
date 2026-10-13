import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import NavigationBar from "./navbar";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}