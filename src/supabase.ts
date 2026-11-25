// connects to supabase using the secret key (server only, never send this to a browser!)
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types.js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

// stop right away with a clear message if I forgot the env vars
if (!url || !key) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in env");
}

// passing <Database> here is what makes every query typed
const supabase = createClient<Database>(url, key);

export default supabase;