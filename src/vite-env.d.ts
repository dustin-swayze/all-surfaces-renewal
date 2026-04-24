/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_NAME?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_SERVICE_AREA?: string;
  readonly VITE_BUSINESS_HOURS?: string;
  readonly VITE_LOGO_URL?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
