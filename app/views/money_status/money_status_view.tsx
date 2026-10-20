import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/money_status_view";
import { data, Link as RouterLink } from "react-router";
import Typography from "@mui/material/Typography";
import MoneyStatusTable from "./money_status_table";
import Link from "@mui/material/Link";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "状態一覧 | Aboshi" },
    {
      name: "description",
      content: "登録した状態と、状態ごとの収支項目を確認できます。",
    },
  ];
}

export async function loader({
  request
}: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);
  const { data: d, error } = await supabase
    .from('money_status')
    .select('id, name, items(amount, is_income)');
  if (error) {
    console.error(error);
    throw error;
  }
  return data(d, { headers });
}

export default function MoneyStatusView({
  loaderData
}: Route.ComponentProps) {
  return (
    <>
      <Typography variant="h2" component="h2">状態一覧</Typography>
      <p><Link component={RouterLink} to="/add/money_status">新規</Link></p>
      <MoneyStatusTable moneyStatus={loaderData} />
    </>
  );
}
