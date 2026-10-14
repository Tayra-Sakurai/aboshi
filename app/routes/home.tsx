import type { Route } from "./+types/home";
import Dashboard from "~/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aboshi" },
    { name: "description", content: "Aboshiトップ" },
  ];
}

export default function Home() {
  return (
    <Dashboard
    />
  );
}
