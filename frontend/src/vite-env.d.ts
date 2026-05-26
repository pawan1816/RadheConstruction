/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SITE_NAME: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_GOOGLE_MAPS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}