import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Meet Lua","description":"","frontmatter":{},"headers":[],"relativePath":"references/lua.md","filePath":"references/lua.md"}',
);
const _sfc_main = { name: "references/lua.md" };
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
    )}><h1 id="meet-lua" tabindex="-1">Meet Lua <a class="header-anchor" href="#meet-lua" aria-label="Permalink to &quot;Meet Lua&quot;">​</a></h1><h3 id="understanding-lua" tabindex="-1">Understanding Lua <a class="header-anchor" href="#understanding-lua" aria-label="Permalink to &quot;Understanding Lua&quot;">​</a></h3><ul><li><strong>Background</strong>: Lua is a lightweight, high-level, multi-paradigm programming language designed primarily for embedded systems and clients. It&#39;s known for its efficiency, simplicity, and flexibility.</li><li><strong>Key Features</strong>: Lua offers powerful data description constructs, dynamic typing, efficient memory management, and good support for object-oriented programming.</li></ul><h3 id="setting-up" tabindex="-1">Setting Up <a class="header-anchor" href="#setting-up" aria-label="Permalink to &quot;Setting Up&quot;">​</a></h3><ol><li><strong>Installation</strong>: Visit <a href="http://www.lua.org/download.html" target="_blank" rel="noreferrer">Lua&#39;s official website</a> to download and install Lua.</li><li><strong>Environment</strong>: You can use a simple text editor and command line, or an IDE like ZeroBrane Studio or Eclipse with a Lua plugin.</li></ol><h3 id="basic-syntax-and-concepts-in-aos" tabindex="-1">Basic Syntax and Concepts (in aOS) <a class="header-anchor" href="#basic-syntax-and-concepts-in-aos" aria-label="Permalink to &quot;Basic Syntax and Concepts (in aOS)&quot;">​</a></h3><ul><li><strong>Hello World</strong>:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" },
    )}">&quot;Hello, World!&quot;</span></span></code></pre></div></li><li><strong>Variables and Types</strong>: Lua is dynamically typed. Basic types include <code>nil</code>, <code>boolean</code>, <code>number</code>, <code>string</code>, <code>function</code>, <code>userdata</code>, <code>thread</code>, and <code>table</code>.</li><li><strong>Control Structures</strong>: Includes <code>if</code>, <code>while</code>, <code>repeat...until</code>, and <code>for</code>.</li><li><strong>Functions</strong>: First-class citizens in Lua, supporting closures and higher-order functions.</li><li><strong>Tables</strong>: The only data structuring mechanism in Lua, which can be used to represent arrays, sets, records, etc.</li></ul><h3 id="hands-on-practice" tabindex="-1">Hands-On Practice <a class="header-anchor" href="#hands-on-practice" aria-label="Permalink to &quot;Hands-On Practice&quot;">​</a></h3><ul><li><strong>Experiment with Lua&#39;s Interactive Mode</strong>: Run <code>aos</code> in your terminal and start experimenting with Lua commands.</li><li><strong>Write Simple Scripts</strong>: Create <code>.lua</code> files and run them using the Lua interpreter. Use <code>.load file.lua</code> feature to upload lua code on your <code>aOS</code> process.</li></ul><h3 id="resources" tabindex="-1">Resources <a class="header-anchor" href="#resources" aria-label="Permalink to &quot;Resources&quot;">​</a></h3><ul><li><strong>Official Documentation</strong>: <a href="https://www.lua.org/manual/5.3/" target="_blank" rel="noreferrer">Lua 5.3 Reference Manual</a></li><li><strong>Online Tutorials</strong>: Websites like <a href="https://www.learn-lua.org/" target="_blank" rel="noreferrer">Learn Lua</a> are great for interactive learning.</li><li><strong>Books</strong>: &quot;Programming in Lua&quot; (first edition available <a href="http://www.lua.org/pil/contents.html" target="_blank" rel="noreferrer">online</a>) is a comprehensive resource.</li><li><strong>Community</strong>: Join forums or communities like <a href="http://lua-users.org/" target="_blank" rel="noreferrer">Lua Users</a> for support and discussions.</li></ul><h3 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h3><ul><li><strong>Keep It Simple</strong>: Lua is designed to be simple and flexible. Embrace this philosophy in your code.</li><li><strong>Performance</strong>: Learn about Lua&#39;s garbage collection and efficient use of tables.</li><li><strong>Integration</strong>: Consider how Lua can be embedded into other applications, particularly C/C++ projects.</li></ul><h3 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h3><p>Lua is a powerful language, especially in the context of embedded systems and game development. Its simplicity and efficiency make it a great choice for specific use cases. Enjoy your journey into Lua programming!</p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "references/lua.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lua = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, lua as default };
