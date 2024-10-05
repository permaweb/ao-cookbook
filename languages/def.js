// UI elements strings json file for new languages
import { createRequire } from "node:module";

const enStrings = createRequire(import.meta.url)("./strings/en.json");
const zhStrings = createRequire(import.meta.url)("./strings/zh.json");
const jaStrings = createRequire(import.meta.url)("./strings/ja.json");
/**
 * Start adding new languages by making a new language object inside the array
 *
 * @see file://./README.md#add-a-new-language
 */
const languages = [
  {
    display: "中文", // Name of the language displayed in UI
    name: "中文", // Name of the language in English, used by OpenAI translation
    code: "zh", // 2 letter language code (ISO 639‑1)
    strings: zhStrings, // JSON object of translated UI element strings
  },
  {
    display: "日本語", // Name of the language displayed in UI
    name: "Japanese", // Name of the language in English, used by OpenAI translation
    code: "ja", // 2 letter language code (ISO 639‑1)
    strings: jaStrings, // JSON object of translated UI element strings
  },
];

const i18n_strs = languages.reduce((langs, currentLang) => {
  langs[currentLang.code] = currentLang.strings;
  return langs;
}, {});

const get_i18n_str = (langCode = "en", key, fallbackStr) => {
  const engStr = enStrings[key] || fallbackStr;
  if (langCode === "en") return engStr;
  return i18n_strs[langCode][key] || engStr;
};

export { languages, get_i18n_str };
