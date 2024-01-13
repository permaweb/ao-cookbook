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
        items: [],
      },
      {
        text: get_i18n_str(langCode, "concepts"),
        link: get_i18n_link(langCode, "/concepts/"),
        items: [
          {
            text: get_i18n_str(langCode, "concepts-specs"),
            link: get_i18n_link(langCode, "/concepts/specs"),
          },
          {
            text: get_i18n_str(langCode, "concepts-messages"),
            link: get_i18n_link(langCode, "/concepts/messages"),
          },
          {
            text: get_i18n_str(langCode, "concepts-processes"),
            link: get_i18n_link(langCode, "/concepts/processes"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "guides"),
        link: get_i18n_link(langCode, "/guides/"),
        items: [
          {
            text: get_i18n_str(langCode, "guides-tutorials"),
            link: get_i18n_link(langCode, "/guides/tutorials/index"),
            items: [
              {
                text: get_i18n_str(langCode, "guides-tutorials-meet-lua"),
                link: get_i18n_link(langCode, "/guides/tutorials/lua"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-prompt"),
                link: get_i18n_link(langCode, "/guides/tutorials/prompt"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-tour"),
                link: get_i18n_link(langCode, "/guides/tutorials/tour"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-messaging"),
                link: get_i18n_link(langCode, "/guides/tutorials/messaging"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-pingpong"),
                link: get_i18n_link(langCode, "/guides/tutorials/pingpong"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-chatroom"),
                link: get_i18n_link(langCode, "/guides/tutorials/chatroom"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-token"),
                link: get_i18n_link(langCode, "/guides/tutorials/token"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-dao"),
                link: get_i18n_link(langCode, "/guides/tutorials/dao"),
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-bot"),
                link: get_i18n_link(langCode, "/guides/tutorials/bot"),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "guides-aos"),
            link: get_i18n_link(langCode, "/guides/aos/index"),
            items: [
              {
                text: get_i18n_str(langCode, "guides-aos-intro"),
                link: get_i18n_link(langCode, "/guides/aos/intro"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-installing"),
                link: get_i18n_link(langCode, "/guides/aos/installing"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-cli"),
                link: get_i18n_link(langCode, "/guides/aos/cli"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-load"),
                link: get_i18n_link(langCode, "/guides/aos/load"),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "guides-aoconnect"),
            link: get_i18n_link(langCode, "/guides/aoconnect/aoconnect"),
            items: [
              {
                text: get_i18n_str(langCode, "guides-installing-connect"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/installing-connect",
                ),
              },
              {
                text: get_i18n_str(langCode, "guides-connecting"),
                link: get_i18n_link(langCode, "/guides/aoconnect/connecting"),
              },
              {
                text: get_i18n_str(langCode, "guides-sending-messages"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/sending-messages",
                ),
              },
              {
                text: get_i18n_str(langCode, "guides-reading-results"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/reading-results",
                ),
              },
              {
                text: get_i18n_str(langCode, "guides-spawning-processes"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/spawning-processes",
                ),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "guides-debugging"),
            link: get_i18n_link(langCode, "/guides/debugging/debugging"),
            items: [
              {
                text: get_i18n_str(langCode, "guides-tracing"),
                link: get_i18n_link(langCode, "/guides/debugging/tracing"),
              },
            ],
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
          {
            text: get_i18n_str(langCode, "references-ao"),
            link: get_i18n_link(langCode, "/references/ao"),
          },
          {
            text: get_i18n_str(langCode, "references-handlers"),
            link: get_i18n_link(langCode, "/references/handlers"),
          },
          {
            text: get_i18n_str(langCode, "references-token"),
            link: get_i18n_link(langCode, "/references/token"),
          },
        ],
      },
    ],
  },
});
