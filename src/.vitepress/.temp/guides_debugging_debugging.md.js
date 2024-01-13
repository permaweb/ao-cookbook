import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Debugging","description":"","frontmatter":{},"headers":[],"relativePath":"guides/debugging/debugging.md","filePath":"guides/debugging/debugging.md"}',
);
const _sfc_main = { name: "guides/debugging/debugging.md" };
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
    )}><h1 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h1><p>Here you can find utilities useful for debugging your ao workflow.</p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/debugging/debugging.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const debugging = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, debugging as default };
