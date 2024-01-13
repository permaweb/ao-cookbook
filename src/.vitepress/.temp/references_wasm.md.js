import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Meet Web Assembly","description":"","frontmatter":{},"headers":[],"relativePath":"references/wasm.md","filePath":"references/wasm.md"}',
);
const _sfc_main = { name: "references/wasm.md" };
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
    )}><h1 id="meet-web-assembly" tabindex="-1">Meet Web Assembly <a class="header-anchor" href="#meet-web-assembly" aria-label="Permalink to &quot;Meet Web Assembly&quot;">​</a></h1><p>WebAssembly (often abbreviated as Wasm) is a modern binary instruction format providing a portable compilation target for high-level languages like C, C++, and Rust. It enables deployment on the web for client and server applications, offering a high level of performance and efficiency. WebAssembly is designed to maintain the security and sandboxing features of web browsers, making it a suitable choice for web-based applications. It&#39;s a key technology for web developers, allowing them to write code in multiple languages and compile it into bytecode that runs in the browser at near-native speed.</p><p>The significance of WebAssembly lies in its ability to bridge the gap between web and native applications. It allows complex applications and games, previously limited to desktop environments, to run in the browser with comparable performance. This opens up new possibilities for web development, including the creation of high-performance web apps, games, and even the porting of existing desktop applications to the web. WebAssembly operates alongside JavaScript, complementing it by enabling performance-critical components to be written in languages better suited for such tasks, thereby enhancing the capabilities and performance of web applications.</p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "references/wasm.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wasm = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, wasm as default };
