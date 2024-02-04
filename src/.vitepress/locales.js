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
        link: get_i18n_link(langCode, "/welcome/index"),
      },
    ],
    sidebar: [
      {
        text: get_i18n_str(langCode, "welcome"),
        link: get_i18n_link(langCode, "/welcome/"),
        items: [
          {
            text: get_i18n_str(langCode, "getting-started"),
            link: get_i18n_link(langCode, "/getting-started/"),
          },
        ],
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
          {
            text: get_i18n_str(langCode, "concepts-units"),
            link: get_i18n_link(langCode, "/concepts/units"),
          },
          {
            text: get_i18n_str(langCode, "concepts-how-it-works"),
            link: get_i18n_link(langCode, "/concepts/how-it-works"),
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
                text: get_i18n_str(langCode, "guides-tutorials-aztutorial"),
                link: get_i18n_link(
                  langCode,
                  "/guides/tutorials/aztutorial/index"
                ),
                items: [
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-quickstart"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/quickstart"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-meet-lua"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/lua"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-messaging"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/messaging"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-tour"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/tour"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-prompt"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/prompt"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-pingpong"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/pingpong"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-chatroom"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/chatroom"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-token"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/token"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-dao"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/dao"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-aztutorial-bot"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/aztutorial/bot"
                    ),
                  },
                ],
              },
              {
                text: get_i18n_str(langCode, "guides-tutorials-rabbithole"),
                link: get_i18n_link(
                  langCode,
                  "/guides/tutorials/rabbithole/index"
                ),
                items: [
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-rabbithole-step1"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/rabbithole/step1"
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-tutorials-rabbithole-step2"
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/tutorials/rabbithole/step2"
                    ),
                  },
                ],
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
                text: get_i18n_str(langCode, "guides-aos-modules"),
                link: get_i18n_link(langCode, "/guides/aos/modules/index"),
                items: [
                  {
                    text: get_i18n_str(langCode, "guides-aos-modules-json"),
                    link: get_i18n_link(langCode, "/guides/aos/modules/json"),
                  },
                  {
                    text: get_i18n_str(langCode, "guides-aos-modules-ao"),
                    link: get_i18n_link(langCode, "/guides/aos/modules/ao"),
                  },
                  {
                    text: get_i18n_str(langCode, "guides-aos-modules-base64"),
                    link: get_i18n_link(langCode, "/guides/aos/modules/base64"),
                  },
                  {
                    text: get_i18n_str(langCode, "guides-aos-modules-pretty"),
                    link: get_i18n_link(langCode, "/guides/aos/modules/pretty"),
                  },
                  {
                    text: get_i18n_str(langCode, "guides-aos-modules-utils"),
                    link: get_i18n_link(langCode, "/guides/aos/modules/utils"),
                  },
                ],
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
                  "/guides/aoconnect/installing-connect"
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
                  "/guides/aoconnect/sending-messages"
                ),
              },
              {
                text: get_i18n_str(langCode, "guides-reading-results"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/reading-results"
                ),
              },
              {
                text: get_i18n_str(langCode, "guides-spawning-processes"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/spawning-processes"
                ),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "guides-wallets"),
            link: get_i18n_link(langCode, "/guides/wallets/index"),
            items: [
              {
                text: get_i18n_str(langCode, "guides-wallets-aos-generated"),
                link: get_i18n_link(langCode, "/guides/wallets/aos-generated"),
              },
              {
                text: get_i18n_str(langCode, "guides-wallets-import-wallet"),
                link: get_i18n_link(langCode, "/guides/wallets/import-wallet"),
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
          {
            text: get_i18n_str(langCode, "references-data"),
            link: get_i18n_link(langCode, "/references/data"),
          },
          {
            text: get_i18n_str(langCode, "references-cron"),
            link: get_i18n_link(langCode, "/references/cron"),
          },
        ],
      },
    ],
  },
});
