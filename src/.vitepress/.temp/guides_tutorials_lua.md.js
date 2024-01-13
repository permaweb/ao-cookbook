import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Meet Lua Expressions on AOS","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/lua.md","filePath":"guides/tutorials/lua.md"}',
);
const _sfc_main = { name: "guides/tutorials/lua.md" };
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
  _push(`<div${ssrRenderAttrs(
    _attrs,
  )}><h1 id="meet-lua-expressions-on-aos" tabindex="-1">Meet Lua Expressions on AOS <a class="header-anchor" href="#meet-lua-expressions-on-aos" aria-label="Permalink to &quot;Meet Lua Expressions on AOS&quot;">​</a></h1><h2 id="step-1-open-the-aos-command-line-interface" tabindex="-1">Step 1: Open the AOS Command-Line Interface <a class="header-anchor" href="#step-1-open-the-aos-command-line-interface" aria-label="Permalink to &quot;Step 1: Open the AOS Command-Line Interface&quot;">​</a></h2><ul><li>After installing AOS, open your command-line interface (CLI).</li><li>Type <code>aos</code> and press Enter. This will start the AOS CLI.</li></ul><h2 id="step-2-familiarize-with-basic-lua-expressions" tabindex="-1">Step 2: Familiarize with Basic Lua Expressions <a class="header-anchor" href="#step-2-familiarize-with-basic-lua-expressions" aria-label="Permalink to &quot;Step 2: Familiarize with Basic Lua Expressions&quot;">​</a></h2><ul><li><strong>Print a String</strong>: Type <code>&quot;Hello, aos!&quot;</code> and press Enter. This should display &quot;Hello, aos!&quot; in the console.</li><li><strong>Basic Arithmetic</strong>: Try some basic arithmetic, like <code>5 + 3</code>. You should see the result <code>8</code>.</li></ul><h2 id="step-3-learn-about-variables" tabindex="-1">Step 3: Learn About Variables <a class="header-anchor" href="#step-3-learn-about-variables" aria-label="Permalink to &quot;Step 3: Learn About Variables&quot;">​</a></h2><ul><li><strong>Setting a Variable</strong>: Type <code>a = 10</code> and press Enter. This sets the variable <code>a</code> to 10.</li><li><strong>Using the Variable</strong>: Now type <code>a * 2</code>. You should get <code>20</code>, which is the result of multiplying <code>a</code> by 2.</li></ul><h2 id="step-4-experiment-with-conditional-statements" tabindex="-1">Step 4: Experiment with Conditional Statements <a class="header-anchor" href="#step-4-experiment-with-conditional-statements" aria-label="Permalink to &quot;Step 4: Experiment with Conditional Statements&quot;">​</a></h2><ul><li><p><strong>Basic If-Else</strong>: Enter the following Lua code:</p><p>In aos, type <code>.editor</code> and press Enter. This will open an in-line text editor within your command-line interface.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">b </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 15</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> b </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 10</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> then</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    return</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;b is greater than 10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">else</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    return</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;b is not greater than 10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span></code></pre></div><p>Then, type <code>.done</code> and press Enter. This will complete the edit mode and submit the expression to your Process for evaluation.</p><p>As a result, you should get &quot;b is greater than 10&quot;.</p></li></ul><h2 id="step-5-explore-functions" tabindex="-1">Step 5: Explore Functions <a class="header-anchor" href="#step-5-explore-functions" aria-label="Permalink to &quot;Step 5: Explore Functions&quot;">​</a></h2><ul><li><p><strong>Creating a Function</strong>: Define a simple function:</p><p>In aos, type <code>.editor</code> and press Enter. This will open an in-line text editor within your command-line interface.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> greet</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(name)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    return</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Hello, &quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">..</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> name</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span></code></pre></div><p>Then, type <code>.done</code> and press Enter. This will complete the edit mode and submit the expression to your Process for evaluation.</p></li><li><p><strong>Using the Function</strong>: Call the function with <code>greet(&quot;aos User&quot;)</code>. It should return &quot;Hello, aos User&quot;.</p></li></ul><h2 id="step-6-try-table-operations" tabindex="-1">Step 6: Try Table Operations <a class="header-anchor" href="#step-6-try-table-operations" aria-label="Permalink to &quot;Step 6: Try Table Operations&quot;">​</a></h2><ul><li><strong>Creating a Table</strong>: Type <code>myTable = {1, 2, 3}</code> to create a simple table.</li><li><strong>Accessing Table Elements</strong>: Access an element with <code>myTable[2]</code>. It should return <code>2</code>.</li></ul><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>This tutorial provided you with basic steps to get started with Lua expressions in AOS. As you become more comfortable, you can delve into more complex topics and explore the full potential of Lua in the AOS environment. Happy coding!</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/lua.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lua = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, lua as default };
