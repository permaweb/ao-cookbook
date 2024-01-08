import { get_i18n_str } from "../../languages/def.js";

const get_i18n_link = (code, link) =>
  `${code === "en" ? "" : "/" + code}${link}`;

/**
 * @type {import('vitepress').LocaleSpecificConfig<import('vitepress').DefaultTheme.Config>}
 */
export const localeConfig = (langCode) => ({
  label: get_i18n_str(langCode, "label"),
  lang: get_i18n_str(langCode, "lang"),
  title: get_i18n_str(langCode, "title"),
  description: get_i18n_str(langCode, "description"),
  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/permaweb/ao-cookbook" },
    ],
    nav: [
      {
        text: get_i18n_str(langCode, "docs"),
        link: get_i18n_link(langCode, "/getting-started/index"),
      },
    ],
    sidebar: [
      {
        text: get_i18n_str(langCode, "getting-started"),
        link: get_i18n_link(langCode, "/getting-started/"),
        items: [
          {
            text: get_i18n_str(langCode, "getting-started-aos"),
            link: get_i18n_link(langCode, "/getting-started/aos"),
          },
          {
            text: get_i18n_str(langCode, "getting-started-ao-dev-cli"),
            link: get_i18n_link(langCode, "/getting-started/ao-cli"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "concepts"),
        link: get_i18n_link(langCode, "/concepts/"),
        items: [
          {
            text: get_i18n_str(langCode, "concepts-environment"),
            link: get_i18n_link(langCode, "/concepts/environment"),
          },
          {
            text: get_i18n_str(langCode, "concepts-ao-lib"),
            link: get_i18n_link(langCode, "/concepts/ao-lib"),
          },
          {
            text: get_i18n_str(langCode, "concepts-architecture"),
            link: get_i18n_link(langCode, "/concepts/architecture"),
          },
          {
            text: get_i18n_str(langCode, "concepts-specs"),
            link: get_i18n_link(langCode, "/concepts/specs"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "guides"),
        link: get_i18n_link(langCode, "/guides/"),
        items: [
          {
            text: get_i18n_str(langCode, "guides-how-do-i"),
            link: get_i18n_link(langCode, "/guides/how-do-i"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "references"),
        link: get_i18n_link(langCode, "/references/"),
        items: [
          {
            text: get_i18n_str(langCode, "references-lua"),
            link: get_i18n_link(langCode, "/references/lua"),
          },
          {
            text: get_i18n_str(langCode, "references-wasm"),
            link: get_i18n_link(langCode, "/references/wasm"),
          },
        ],
      },
    ],
  },
});
