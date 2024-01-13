import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Installing aos","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aos/installing.md","filePath":"guides/aos/installing.md"}',
);
const _sfc_main = { name: "guides/aos/installing.md" };
function _sfc_ssrRender(
  _ctx,
  _push,
  _parent,
  _attrs,
  $props,
  $setup,
  $data,
  $options,
) {
  _push(
    `<div${ssrRenderAttrs(
      _attrs,
    )}><h1 id="installing-aos" tabindex="-1">Installing aos <a class="header-anchor" href="#installing-aos" aria-label="Permalink to &quot;Installing aos&quot;">​</a></h1><p>Installing aos only requires <code>NodeJS</code> - <a href="https://nodejs.org" target="_blank" rel="noreferrer">https://nodejs.org</a></p><blockquote><p>NOTE: If you are on windows you may get better results with WSL Console.</p></blockquote><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">npm</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> i</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> -g</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> https://get_ao.g8way.io</span></span></code></pre></div><p>Once installed you can run by typing <code>aos</code></p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aos/installing.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const installing = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, installing as default };
