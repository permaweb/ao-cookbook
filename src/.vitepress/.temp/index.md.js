import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"ao","text":"The decentralized computer with infinite threads","tagline":"A messaging based approach to interoperability","actions":[{"theme":"brand","text":"Docs","link":"/getting-started/index"}]},"features":[{"title":"Get Started","details":"Dive into building with ao","link":"/getting-started/index"},{"title":"Concepts","details":"Learn about how ao network works","link":"/concepts/index"},{"title":"Guides","details":"Follow Step-by-step guides to start shipping on the ao network","link":"/guides/index"},{"title":"References","details":"Learn the ao terminology","link":"/references/index"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}',
);
const _sfc_main = { name: "index.md" };
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
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "index.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, index as default };
