/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POS_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
