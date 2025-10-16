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
      { icon: "discord", link: "https://discord.gg/qWgGxJKwNJ" },
      { icon: "github", link: "https://github.com/permaweb/ao-cookbook" },
    ],
    nav: [
      {
        text: get_i18n_str(langCode, "docs"),
        link: get_i18n_link(langCode, "/welcome/ao-core-introduction"),
      },
      {
        text: "LLMs.txt",
        link: get_i18n_link(langCode, "/llms-explanation"),
      },
    ],
    sidebar: [
      {
        text: get_i18n_str(langCode, "welcome"),
        items: [
          {
            text: "Welcome & Quick Start",
            link: get_i18n_link(langCode, "/welcome/"),
          },
          {
            text: "Building with HyperBEAM",
            link: get_i18n_link(langCode, "/welcome/building"),
          },
          {
            text: "Concepts & Migration",
            link: get_i18n_link(langCode, "/welcome/concepts"),
          },
        ],
      },
      {
        text: "AO with HyperBEAM",
        items: [
          {
            text: "Getting Started",
            link: get_i18n_link(langCode, "/guides/hyperbeam/getting-started"),
          },
          {
            text: "Core Concepts",
            collapsed: true,
            items: [
              {
                text: "State Exposure",
                link: get_i18n_link(
                  langCode,
                  "/guides/hyperbeam/core/state-exposure",
                ),
              },
              {
                text: "Dynamic Reads",
                link: get_i18n_link(
                  langCode,
                  "/guides/hyperbeam/core/dynamic-reads",
                ),
              },
            ],
          },
          {
            text: "Building Applications",
            collapsed: true,
            items: [
              {
                text: "JavaScript SDK",
                link: get_i18n_link(
                  langCode,
                  "/guides/hyperbeam/building/javascript-sdk",
                ),
              },
              {
                text: "Web Serving",
                link: get_i18n_link(
                  langCode,
                  "/guides/hyperbeam/building/web-serving",
                ),
              },
              {
                text: "External Data",
                link: get_i18n_link(
                  langCode,
                  "/guides/hyperbeam/building/external-data",
                ),
              },
            ],
          },
          {
            text: "Migration",
            collapsed: true,
            items: [
              {
                text: "Migration Guide",
                link: get_i18n_link(langCode, "/guides/hyperbeam/migration"),
              },
              {
                text: "AOS CLI",
                link: get_i18n_link(langCode, "/guides/hyperbeam/aos-cli"),
              },
            ],
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "tutorials"),
        link: get_i18n_link(langCode, "/tutorials/index"),
        items: [
          {
            text: get_i18n_str(langCode, "tutorials-begin"),
            link: get_i18n_link(langCode, "/tutorials/begin/index"),
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "tutorials-begin-preparations"),
                link: get_i18n_link(langCode, "/tutorials/begin/preparations"),
              },
              {
                text: get_i18n_str(langCode, "tutorials-begin-messaging"),
                link: get_i18n_link(langCode, "/tutorials/begin/messaging"),
              },
              {
                text: get_i18n_str(langCode, "tutorials-begin-chatroom"),
                link: get_i18n_link(langCode, "/tutorials/begin/chatroom"),
              },
              {
                text: get_i18n_str(langCode, "tutorials-begin-token"),
                link: get_i18n_link(langCode, "/tutorials/begin/token"),
              },
              {
                text: get_i18n_str(langCode, "tutorials-begin-tokengating"),
                link: get_i18n_link(langCode, "/tutorials/begin/tokengating"),
              },
              {
                text: get_i18n_str(langCode, "tutorials-begin-dao"),
                link: get_i18n_link(langCode, "/tutorials/begin/dao"),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "tutorials-bots-and-games"),
            link: get_i18n_link(langCode, "/tutorials/bots-and-games/index"),
            collapsed: true,
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
            collapsed: true,
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
                text: get_i18n_str(langCode, "guides-aos-load"),
                link: get_i18n_link(langCode, "/guides/aos/load"),
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
                text: get_i18n_str(langCode, "guides-aos-faq"),
                link: get_i18n_link(langCode, "/guides/aos/faq"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-token"),
                link: get_i18n_link(langCode, "/guides/aos/token"),
              },
              {
                text: get_i18n_str(langCode, "guides-aos-blueprints"),
                link: get_i18n_link(langCode, "/guides/aos/blueprints/index"),
                collapsed: true,
                items: [
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
                      "guides-aos-blueprints-cred-utils",
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/aos/blueprints/cred-utils",
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
                      "guides-aos-blueprints-voting",
                    ),
                    link: get_i18n_link(
                      langCode,
                      "/guides/aos/blueprints/voting",
                    ),
                  },
                ],
              },
              {
                text: get_i18n_str(langCode, "guides-aos-modules"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aos/modules/why-migrate",
                ),
                collapsed: true,
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
                    text: get_i18n_str(langCode, "guides-aos-modules-crypto"),
                    link: get_i18n_link(langCode, "/guides/aos/modules/crypto"),
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
            collapsed: true,
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

              {
                text: get_i18n_str(langCode, "guides-monitoring-cron"),
                link: get_i18n_link(
                  langCode,
                  "/guides/aoconnect/monitoring-cron",
                ),
              },
              {
                text: get_i18n_str(langCode, "guides-assign-data"),
                link: get_i18n_link(langCode, "/guides/aoconnect/assign-data"),
              },
              {
                text: get_i18n_str(langCode, "guides-signers"),
                link: get_i18n_link(langCode, "/guides/aoconnect/signers"),
              },
            ],
          },
          {
            text: "Additional Technologies",
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "guides-dev-cli"),
                link: get_i18n_link(langCode, "/guides/dev-cli/index"),
              },
              {
                text: get_i18n_str(langCode, "guides-sqlite"),
                link: get_i18n_link(langCode, "/guides/snacks/sqlite"),
              },
              {
                text: get_i18n_str(langCode, "guides-weavedrive"),
                link: get_i18n_link(langCode, "/guides/snacks/weavedrive"),
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
            text: "AO System Architecture",
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "concepts-how-it-works"),
                link: get_i18n_link(langCode, "/concepts/how-it-works"),
              },
              {
                text: get_i18n_str(langCode, "concepts-processes"),
                link: get_i18n_link(langCode, "/concepts/processes"),
              },
              {
                text: get_i18n_str(langCode, "concepts-messages"),
                link: get_i18n_link(langCode, "/concepts/messages"),
              },
              {
                text: get_i18n_str(langCode, "concepts-eval"),
                link: get_i18n_link(langCode, "/concepts/eval"),
              },
              {
                text: get_i18n_str(langCode, "concepts-units"),
                link: get_i18n_link(langCode, "/concepts/units"),
              },
              {
                text: get_i18n_str(langCode, "concepts-specs"),
                link: get_i18n_link(langCode, "/concepts/specs"),
              },
            ],
          },
          {
            text: "Programming Environment",
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "concepts-tour"),
                link: get_i18n_link(langCode, "/concepts/tour"),
              },
              {
                text: get_i18n_str(langCode, "concepts-meet-lua"),
                link: get_i18n_link(langCode, "/concepts/lua"),
              },
            ],
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "references"),
        link: get_i18n_link(langCode, "/references/index"),
        items: [
          {
            text: "Programming Languages",
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "references-lua"),
                link: get_i18n_link(langCode, "/references/languages/lua"),
              },
              {
                text: get_i18n_str(langCode, "references-wasm"),
                link: get_i18n_link(langCode, "/references/languages/wasm"),
              },
              {
                text: get_i18n_str(langCode, "references-lua-optimization"),
                link: get_i18n_link(
                  langCode,
                  "/references/languages/lua-optimization",
                ),
              },
            ],
          },
          {
            text: "AO API Reference",
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "references-ao"),
                link: get_i18n_link(langCode, "/references/api/ao"),
              },
              {
                text: get_i18n_str(langCode, "references-messaging"),
                link: get_i18n_link(langCode, "/references/api/messaging"),
              },
              {
                text: get_i18n_str(langCode, "references-handlers"),
                link: get_i18n_link(langCode, "/references/api/handlers"),
              },
              {
                text: get_i18n_str(langCode, "references-token"),
                link: get_i18n_link(langCode, "/references/api/token"),
              },
              {
                text: get_i18n_str(langCode, "references-data"),
                link: get_i18n_link(langCode, "/references/api/data"),
              },
              {
                text: get_i18n_str(langCode, "references-cron"),
                link: get_i18n_link(langCode, "/references/api/cron"),
              },
            ],
          },
          {
            text: "Development Environment",
            collapsed: true,
            items: [
              {
                text: get_i18n_str(langCode, "references-editor-setup"),
                link: get_i18n_link(langCode, "/references/editor-setup"),
              },
              {
                text: get_i18n_str(langCode, "guides-betteridea"),
                link: get_i18n_link(langCode, "/references/betteridea/index"),
              },
            ],
          },
          {
            text: get_i18n_str(langCode, "references-community"),
            link: get_i18n_link(langCode, "/references/community"),
          },
          {
            text: "Deprecated Features",
            collapsed: true,
            items: [
              {
                text: "Overview",
                link: get_i18n_link(langCode, "/references/deprecated/index"),
              },
              {
                text: "Dry Run",
                link: get_i18n_link(langCode, "/references/deprecated/dry-run"),
              },
            ],
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "releasenotes"),
        link: get_i18n_link(langCode, "/releasenotes/index"),
        items: [],
      },
    ],
  },
});
