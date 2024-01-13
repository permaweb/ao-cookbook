import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"ao connect","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aoconnect/aoconnect.md","filePath":"guides/aoconnect/aoconnect.md"}',
);
const _sfc_main = { name: "guides/aoconnect/aoconnect.md" };
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
    )}><h1 id="ao-connect" tabindex="-1">ao connect <a class="header-anchor" href="#ao-connect" aria-label="Permalink to &quot;ao connect&quot;">​</a></h1><p>ao connect is a Javascript/Typescript library to interact with the system from Node JS or the browser.</p><p>Guides in this section provide snippets on how to utilize ao connect. All snippets are written in Javascript but should translate easily to Typescript.</p><nav class="table-of-contents"><ul></ul></nav></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aoconnect/aoconnect.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const aoconnect = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, aoconnect as default };
