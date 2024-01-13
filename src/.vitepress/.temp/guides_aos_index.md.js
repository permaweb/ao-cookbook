import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"aos","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aos/index.md","filePath":"guides/aos/index.md"}',
);
const _sfc_main = { name: "guides/aos/index.md" };
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
    )}><h1 id="aos" tabindex="-1">aos <a class="header-anchor" href="#aos" aria-label="Permalink to &quot;aos&quot;">​</a></h1><p>ao is a hyper parallel computer that enables distributed compute, aos is an operating system on top of that computer. With aos you can interact with processes and you can code processes in a very simple an intuitive way. All you need is a termnial and an editor. The language chosen for aos is lua, it is a robust and deterministic dynamic language that is a lot of fun to work with.</p><p>If you have done so yet, take 15 minutes and go through our <code>Getting Started</code> Tutorial?</p><p><a href="/getting-started/index.html">Try It</a></p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aos/index.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, index as default };
