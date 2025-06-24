// https://vitepress.dev/guide/custom-theme

import { h } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import "./style.css";
import "./docSelector.js";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },

  enhanceApp({ app, router, siteData }) {
    /**
     * Original issue: https://github.com/permaweb/ao-cookbook/issues/17
     *
     * The path manifest for the site will contain mappings to index.html pages like
     * '/getting-started/index.html' 👍
     *
     * But the Vue Router seems to be tranparently removing the 'index.html'
     * bit from the url on navigation (presumably to make it 'prettier') eg:
     *
     * nav to '/getting-started/index.html' will work but then url will be
     * '/getting-started/' 👎
     *
     * This causes a subsequent refresh of the page to not be resolved by the Gateway --
     * the path manifest doesn't contain a mapping for it, so the Gateway reasonbly
     * returns a 404
     *
     * To get around ths, we use a Vue Router onAfterRouteChanged() lifecycle hook
     * to check if the url ends with a '/'. If it does, then we update the url to include 'index.html'.
     *
     * This way, on page refresh, the Gateway can correctly resolve the asset from the path manifest
     */
    router.onAfterRouteChanged = (to) => {
      /**
       * Should not run when building
       */
      if (import.meta.env.SSR) return;

      if (to.endsWith("/") && to !== "/") {
        history.replaceState({}, null, `${to}index.html`);
      }
    };
  },
};
