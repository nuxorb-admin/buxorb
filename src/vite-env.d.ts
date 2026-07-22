/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_DEMO_SAAS_PASSPHRASE: string;
  readonly VITE_TENANT_BASE_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
