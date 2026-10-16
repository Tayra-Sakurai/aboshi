import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "~/typing/supabase";

export function createSupabaseBrowserClient() {
  const supabase = createBrowserClient<Database, "public">(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
  );
  return supabase;
}