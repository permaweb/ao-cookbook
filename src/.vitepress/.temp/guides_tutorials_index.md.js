import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Welcome to aos Tutorials","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/index.md","filePath":"guides/tutorials/index.md"}',
);
const _sfc_main = { name: "guides/tutorials/index.md" };
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
    )}><h1 id="welcome-to-aos-tutorials" tabindex="-1">Welcome to aos Tutorials <a class="header-anchor" href="#welcome-to-aos-tutorials" aria-label="Permalink to &quot;Welcome to aos Tutorials&quot;">​</a></h1><p>These are short guides or snacks that should help you get comfortable with aos.</p><h2 id="tutorials" tabindex="-1">Tutorials <a class="header-anchor" href="#tutorials" aria-label="Permalink to &quot;Tutorials&quot;">​</a></h2><ul><li><a href="./lua.html">Meet Lua</a></li><li><a href="./prompt.html">Customize Your Prompt</a></li><li><a href="./tour.html">Tour</a></li><li><a href="./messaging.html">Messaging</a></li><li><a href="./pingpong.html">PingPong</a></li><li><a href="./chatroom.html">Chatroom</a></li><li><a href="./token.html">Token</a></li><li><a href="./dao.html">DAO</a></li><li><a href="./bot.html">Bot</a></li></ul></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/index.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, index as default };
