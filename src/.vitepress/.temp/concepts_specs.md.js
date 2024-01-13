import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"ao Specs","description":"","frontmatter":{},"headers":[],"relativePath":"concepts/specs.md","filePath":"concepts/specs.md"}',
);
const _sfc_main = { name: "concepts/specs.md" };
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
    )}><h1 id="ao-specs" tabindex="-1">ao Specs <a class="header-anchor" href="#ao-specs" aria-label="Permalink to &quot;ao Specs&quot;">​</a></h1><h3 id="what-is-ao" tabindex="-1">What is <code>ao</code>? <a class="header-anchor" href="#what-is-ao" aria-label="Permalink to &quot;What is \`ao\`?&quot;">​</a></h3><p>The <code>ao</code> computer is the <a href="https://en.wikipedia.org/wiki/Actor_model" target="_blank" rel="noreferrer">actor oriented</a> machine that emerges from the network of nodes that adhere to its core data protocol, running on the <a href="https://arweave.org" target="_blank" rel="noreferrer">Arweave</a> network. This document gives a brief introduction to the protocol and its functionality, as well as its technical details, such that builders can create new implementations and services that integrate with it.</p><p>The <code>ao</code> computer is a single, unified computing environment (a <a href="https://en.wikipedia.org/wiki/Single_system_image" target="_blank" rel="noreferrer">Single System Image</a>), hosted on a heterogenous set of nodes in a distributed network. <code>ao</code> is designed to offer an environment in which an arbitrary number of paralell processes can be resident, coordinating through an open message passing layer. This message passing standard connects the machine&#39;s indepedently operating processes together into a &#39;web&#39; -- in the same way that websites operate on independent servers but are conjoined into a cohesive, unified experience via hyperlinks.</p><p><a href="https://ao.g8way.io/specs" target="_blank" rel="noreferrer">Learn More</a></p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "concepts/specs.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const specs = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, specs as default };
