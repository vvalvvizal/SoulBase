/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_URL: string;
  readonly VITE_INFURA_KEY: string;
  readonly VITE_QUICKNODE_KEY: string;
  readonly VITE_COINGECKO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
