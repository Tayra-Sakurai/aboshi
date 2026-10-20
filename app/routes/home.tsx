import type { Route } from "./+types/home";
import Dashboard from "~/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ホーム | Aboshi" },
    {
      name: "description",
      content: "収支項目や分類、状態を閲覧・追加できるAboshiのホーム画面です。",
    },
  ];
}

export default function Home() {
  return (
    <Dashboard
    />
  );
}
