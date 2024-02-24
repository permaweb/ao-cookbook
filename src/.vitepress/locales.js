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
    logo: {
      light: { src: "/ao_pictograph_lightmode.svg", height: 26, width: 26 },
      dark: { src: "/ao_pictograph_darkmode.svg", height: 26, width: 26 },
    },
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
        link: get_i18n_link(langCode, "/welcome/index"),
        items: [
          {
            text: get_i18n_str(langCode, "getting-started"),
            link: get_i18n_link(langCode, "/getting-started/index"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "tutorials"),
        link: get_i18n_link(langCode, "/tutorials/index"),
        items: [
          {
            text: get_i18n_str(langCode, "tutorials-getting-started"),
            link: get_i18n_link(langCode, "/tutorials/getting-started/index"),
            items: [
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-getting-started-preparations",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/getting-started/preparations",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-getting-started-messaging",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/getting-started/messaging",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-getting-started-chatroom",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/getting-started/chatroom",
                ),
              },
              {
                text: get_i18n_str(langCode, "tutorials-getting-started-token"),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/getting-started/token",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-getting-started-tokengating",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/getting-started/tokengating",
                ),
              },
              {
                text: get_i18n_str(langCode, "tutorials-getting-started-dao"),
                link: get_i18n_link(langCode, "/tutorials/getting-started/dao"),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "tutorials-bots-and-games"),
            link: get_i18n_link(langCode, "/tutorials/bots-and-games/index"),
            items: [
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-ao-effect",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/ao-effect",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-announcements",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/announcements",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-game-state",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/game-state",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-decisions",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/decisions",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-attacking",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/attacking",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-bringing-together",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/bringing-together",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-arena-mechanics",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/arena-mechanics",
                ),
              },
              {
                text: get_i18n_str(
                  langCode,
                  "tutorials-bots-and-games-build-game",
                ),
                link: get_i18n_link(
                  langCode,
                  "/tutorials/bots-and-games/build-game",
                ),
              },
            ],
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "guides"),
        link: get_i18n_link(langCode, "/guides/index"),
        items: [
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
                text: get_i18n_str(langCode, "guides-aos-prompt"),
                link: get_i18n_link(langCode, "/guides/aos/prompt"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-pingpong"),
                link: get_i18n_link(langCode, "/guides/aos/pingpong"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-editor"),
                link: get_i18n_link(langCode, "/guides/aos/editor"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-inbox-and-handlers"),
                link: get_i18n_link(langCode, "/guides/aos/inbox-and-handlers"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-troubleshooting"),
                link: get_i18n_link(langCode, "/guides/aos/troubleshooting"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-load"),
                link: get_i18n_link(langCode, "/guides/aos/load"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-token"),
                link: get_i18n_link(langCode, "/guides/aos/token"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-blueprints"),
                link: get_i18n_link(langCode, "/guides/aos/blueprints/index"),
                items: [
                  {
                    text: get_i18n_str(langCode, "guides-aos-blueprints-token"),
                    link: get_i18n_link(
                      langCode,
                      "/guides/aos/blueprints/token",
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-aos-blueprints-chatroom",
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/aos/blueprints/chatroom",
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-aos-blueprints-voting",
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/aos/blueprints/voting",
                    ),
                  },
                  {
                    text: get_i18n_str(
                      langCode,
                      "guides-aos-blueprints-staking",
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/aos/blueprints/staking",
                    ),
                  },
                ],
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
        text: get_i18n_str(langCode, "concepts"),
        link: get_i18n_link(langCode, "/concepts/index"),
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
          {
            text: get_i18n_str(langCode, "concepts-meet-lua"),
            link: get_i18n_link(langCode, "/concepts/lua"),
          },
          {
            text: get_i18n_str(langCode, "concepts-tour"),
            link: get_i18n_link(langCode, "/concepts/tour"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "references"),
        link: get_i18n_link(langCode, "/references/index"),
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
          {
            text: get_i18n_str(langCode, "references-editor-setup"),
            link: get_i18n_link(langCode, "/references/editor-setup"),
          },
        ],
      },
    ],
  },
});
