import { defineConfig } from "vitepress";

import { languages } from "../../languages/def.js";
import { localeConfig } from "./locales.js";

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  themeConfig: {
    /**
     * Enable Search
     */
    search: {
      provider: "local",
    },
  },
  head: [
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/ao_pictograph_lightmode.svg",
      },
    ],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap",
      },
    ],
  ],

  markdown: {
    lineNumbers: false,
  },

  /**
   * The copy that comprises the layout and theme of the site
   * must also be internationalized, so we create a locale configuration
   * for each language we support
   *
   * See https://vitepress.dev/guide/i18n#internationalization
   */
  locales: languages.reduce(
    (locales, { code }) => {
      locales[code] = localeConfig(code);
      return locales;
    },
    { root: localeConfig("en") },
  ),

  transformPageData: (pageData) => {
    return {
      i18n: languages[pageData.frontmatter.locale || "en"],
    };
  },
  /**
   * Needed for shim for
   */
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunks/[name].js",
        },
      },
    },
  },
});

export default config;
