import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copia .env.example a .env.local y complétalo.",
  );
}

// Sin genérico Database: el esquema es pequeño y se tipa a mano en
// ./database.types.ts (Lead, Task, Company, …) en cada punto de uso.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
