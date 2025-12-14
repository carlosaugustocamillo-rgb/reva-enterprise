import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0?dev';

const supabaseUrl = window.__SUPABASE_URL__;
const supabaseAnonKey = window.__SUPABASE_ANON_KEY__;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase não configurado. Defina window.__SUPABASE_URL__ e window.__SUPABASE_ANON_KEY__ no index.html.'
  );
}
