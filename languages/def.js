// UI elements strings json file for new languages
import { createRequire } from "node:module";

const enStrings = createRequire(import.meta.url)("./strings/en.json");
/**
 * Start adding new languages by making a new language object inside the array
 *
 * @see file://./README.md#add-a-new-language
 */
const languages = [];

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
