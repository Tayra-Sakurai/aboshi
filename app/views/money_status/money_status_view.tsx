import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/money_status_view";
import { data } from "react-router";
import Typography from "@mui/material/Typography";
import MoneyStatusTable from "./money_status_table";

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
      <MoneyStatusTable moneyStatus={loaderData} />
    </>
  );
}
