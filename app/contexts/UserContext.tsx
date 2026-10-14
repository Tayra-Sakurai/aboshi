import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

const UserContext = createContext<User | null>(null);

export default UserContext;