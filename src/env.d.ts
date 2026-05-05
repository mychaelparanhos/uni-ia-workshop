/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_CHECKOUT_URL: string;
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_LOTE_ATIVO: '1' | '2' | '3';
  readonly PUBLIC_GTM_ID: string;
  readonly PUBLIC_META_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export {};
