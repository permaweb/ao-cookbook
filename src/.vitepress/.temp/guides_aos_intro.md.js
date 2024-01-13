import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aos/intro.md","filePath":"guides/aos/intro.md"}',
);
const _sfc_main = { name: "guides/aos/intro.md" };
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
  )}><h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>aos is a different approach to building Processes or Contracts, the ao computer is a decentralized computer network that allows compute to run anywhere and aos in a unique interactive shell. You can use aos as your personal operating system, your development environment for building ao Processes, and your bot Army.</p><p>Lets go over some basic commands.</p><p>If you want to display the contents of any variable through the console, simply type the variable name.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Name</span></span></code></pre></div><p>Inbox is a collection of messages that your Process has received.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Inbox[</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">1</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">]</span></span></code></pre></div><p>If you want to get a count of messages, just add the <code>#</code> infront of inbox</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">#</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">Inbox</span></span></code></pre></div><p>You can personalize you <code>aos</code> Process, for example, if you want a custom prompt, just overwrite the <code>prompt</code> function.</p><p>Use either <code>.editor</code> or <code>.load file</code> to load this function on your process.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> Prompt</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  return</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;inbox: &quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">..</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> #</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">inbox </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">..</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;&gt; &quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span></code></pre></div><h2 id="globals" tabindex="-1">Globals <a class="header-anchor" href="#globals" aria-label="Permalink to &quot;Globals&quot;">​</a></h2><p>In aos process there are some Globals that can make development a little more intuitive.</p><table><thead><tr><th>Name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td>Inbox</td><td>This is a lua Table that stores all the messages that are received and not handlers by any handlers.</td><td>Table(Array)</td></tr><tr><td>Send(Message)</td><td>This is a global function that is available in the interactive environment that allows you to send messages to Processes</td><td>function</td></tr><tr><td>Spawn(Module, Message)</td><td>This is a global function that is available in the aos interactive environment that allows you to spawn processes</td><td></td></tr><tr><td>Name</td><td>a string that is set on init that describes the name of your process</td><td>string</td></tr><tr><td>Owner</td><td>a string that is set on the init of the process that documents the owner of the process, warning if you change this value, it can brick you ability to interact with your process</td><td>string</td></tr><tr><td>Handlers</td><td>a lua Table that contains helper functions that allows you to create handlers that execute functionality based on the pattern matching function on inbound messages</td><td>table</td></tr><tr><td>Dump</td><td>a function that takes any lua Table and generates a print friendly output of the data</td><td>function</td></tr><tr><td>Utils</td><td>a functional utility library with functions like map, reduce, filter</td><td>module</td></tr><tr><td>ao</td><td>this is a core function library for sending messages and spawing processes</td><td>module</td></tr></tbody></table><h2 id="modules" tabindex="-1">Modules <a class="header-anchor" href="#modules" aria-label="Permalink to &quot;Modules&quot;">​</a></h2><p>In aos there are some built in common lua modules that are already available for you to work with, these modules can be referenced with a &quot;require&quot; function.</p><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>json</td><td>a json module that allows you to encode and decode json documents</td></tr><tr><td>ao</td><td>contains ao specific functions like send and spawn</td></tr><tr><td>.base64</td><td>a base64 module that allows you to encode and decode base64 text</td></tr><tr><td>.pretty</td><td>a pretty print module using the function tprint to output formatted syntax</td></tr><tr><td>.utils</td><td>an utility function library</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aos/intro.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const intro = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, intro as default };
