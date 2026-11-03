// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Faqih Yugo Susilo | Full-Stack Engineer";
export const SITE_DESCRIPTION =
  "Portfolio & CV resmi Faqih Yugo Susilo. Full-Stack Engineer dengan pengalaman 4 tahun dalam membangun aplikasi enterprise, integrasi sistem, dan teknologi AI modern (RAG, Qdrant, LLM).";
export const TWITTER_HANDLE = "";
export const MY_NAME = "Faqih Yugo Susilo";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
