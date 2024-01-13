import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started/index.md","filePath":"getting-started/index.md"}',
);
const _sfc_main = { name: "getting-started/index.md" };
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
  )}><h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>          _____                   _______                   _____</span></span>
<span class="line"><span>         /\\    \\                 /::\\    \\                 /\\    \\</span></span>
<span class="line"><span>        /::\\    \\               /::::\\    \\               /::\\    \\</span></span>
<span class="line"><span>       /::::\\    \\             /::::::\\    \\             /::::\\    \\</span></span>
<span class="line"><span>      /::::::\\    \\           /::::::::\\    \\           /::::::\\    \\</span></span>
<span class="line"><span>     /:::/\\:::\\    \\         /:::/~~\\:::\\    \\         /:::/\\:::\\    \\</span></span>
<span class="line"><span>    /:::/__\\:::\\    \\       /:::/    \\:::\\    \\       /:::/__\\:::\\    \\</span></span>
<span class="line"><span>   /::::\\   \\:::\\    \\     /:::/    / \\:::\\    \\      \\:::\\   \\:::\\    \\</span></span>
<span class="line"><span>  /::::::\\   \\:::\\    \\   /:::/____/   \\:::\\____\\   ___\\:::\\   \\:::\\    \\</span></span>
<span class="line"><span> /:::/\\:::\\   \\:::\\    \\ |:::|    |     |:::|    | /\\   \\:::\\   \\:::\\    \\</span></span>
<span class="line"><span>/:::/  \\:::\\   \\:::\\____\\|:::|____|     |:::|    |/::\\   \\:::\\   \\:::\\____\\</span></span>
<span class="line"><span>\\::/    \\:::\\  /:::/    / \\:::\\    \\   /:::/    / \\:::\\   \\:::\\   \\::/    /</span></span>
<span class="line"><span> \\/____/ \\:::\\/:::/    /   \\:::\\    \\ /:::/    /   \\:::\\   \\:::\\   \\/____/</span></span>
<span class="line"><span>          \\::::::/    /     \\:::\\    /:::/    /     \\:::\\   \\:::\\    \\</span></span>
<span class="line"><span>           \\::::/    /       \\:::\\__/:::/    /       \\:::\\   \\:::\\____\\</span></span>
<span class="line"><span>           /:::/    /         \\::::::::/    /         \\:::\\  /:::/    /</span></span>
<span class="line"><span>          /:::/    /           \\::::::/    /           \\:::\\/:::/    /</span></span>
<span class="line"><span>         /:::/    /             \\::::/    /             \\::::::/    /</span></span>
<span class="line"><span>        /:::/    /               \\::/____/               \\::::/    /</span></span>
<span class="line"><span>        \\::/    /                 ~~                      \\::/    /</span></span>
<span class="line"><span>         \\/____/                                           \\/____/</span></span></code></pre></div><p>Welcome to aos, getting started with using aos, you just need to have the latest version of nodejs installed on your computer, and a code editor like <code>vim</code> or <code>vscode</code>.</p><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h2><ul><li><a href="https://nodejs.org" target="_blank" rel="noreferrer">NodeJS</a> version 20+</li></ul><h2 id="getting-started-1" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started-1" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
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
  })}"> https://get_ao.g8way.io</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> &amp;&amp; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">aos</span></span></code></pre></div><blockquote><p>NOTE: after the first time you run <code>aos</code> it installs it to your local machine, so the next time you want to run <code>aos</code>, just type <code>aos</code> + [enter]</p></blockquote><h2 id="about" tabindex="-1">About <a class="header-anchor" href="#about" aria-label="Permalink to &quot;About&quot;">​</a></h2><p>aos is a command-line app that connects to your <code>aos</code> Process on the ao Permaweb Computer Grid. The ao Computer Grid, is like the internet, but for compute. Each Process on the Grid can receive messages and send messages. This cli will allow you to pass LUA expressions to your Process, and those expressions get evaluated and return output to your system.</p><h2 id="first-prompt" tabindex="-1">First Prompt <a class="header-anchor" href="#first-prompt" aria-label="Permalink to &quot;First Prompt&quot;">​</a></h2><p>Now that you have installed aos, you should have a Process running a Prompt asking for input. The input of aos is lua expressions, so lets try out our aos console.</p><p>Type:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">&quot;Hello World&quot;</span></span></code></pre></div><p>Then press the &quot;[Enter]&quot; key, you should see it sign and post the message, then check the result which should return:</p><p>&quot;Hello World&quot;</p><h2 id="congrats" tabindex="-1">Congrats 🎉 <a class="header-anchor" href="#congrats" aria-label="Permalink to &quot;Congrats :tada:&quot;">​</a></h2><p>You have just spawned an aos Process, and you are able to interact with that Process using the aos console. For going deeper into aos check out our step by step tutorials in the <code>Guides</code> section of the cookbook:</p><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="./../guides/tutorials/index.html">Tutorials</a></li><li><a href="./../concepts/index.html">Concepts</a></li><li><a href="./../references/index.html">References</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "getting-started/index.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, index as default };
