import { defineConfig } from "vitepress";

import { languages } from "../../languages/def.js";
import { localeConfig } from "./locales.js";

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  head: [
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
    ],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap",
      },
    ],
    /**
     * See https://github.com/permaweb/ao-cookbook/issues/83
     *
     * For now, we've manually uploaded this file separately, then include
     * it in the header using this config
     *
     * assets/chunks/theme.b4WnDNzP.js -> hN2dnfuji-Z56CxJ-T0Y1sZ-jTuSJUkU2q26DDGBJl0
     */
    [
      "link",
      {
        rel: "modulepreload",
        href: "https://arweave.net/hN2dnfuji-Z56CxJ-T0Y1sZ-jTuSJUkU2q26DDGBJl0.js",
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
      locales[`/${code}/`] = localeConfig(code);
      return locales;
    },
    { root: localeConfig("en") },
  ),

  transformPageData: (pageData) => {
    return {
      i18n: languages[pageData.frontmatter.locale || "en"],
    };
  },
});

export default config;
