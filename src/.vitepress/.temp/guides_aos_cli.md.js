import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"CLI","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aos/cli.md","filePath":"guides/aos/cli.md"}',
);
const _sfc_main = { name: "guides/aos/cli.md" };
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
    )}><h1 id="cli" tabindex="-1">CLI <a class="header-anchor" href="#cli" aria-label="Permalink to &quot;CLI&quot;">​</a></h1><p>There are some command-line arguments you pass to our aos to do the following:</p><ul><li>[name] - create a new process or loads an existing process for your wallet</li><li>--load [file] - load a file, you can add one or many of this command</li><li>--cron [interval] - only used when creating a process</li><li>--wallet [walletfile] - use a specific wallet</li></ul><h2 id="managing-multiple-processes-with-aos" tabindex="-1">Managing multiple processes with aos <a class="header-anchor" href="#managing-multiple-processes-with-aos" aria-label="Permalink to &quot;Managing multiple processes with aos&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">aos</span></span></code></pre></div><p>Starts or connects to a process with the name <code>default</code></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">aos</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> chatroom</span></span></code></pre></div><p>Starts or connects to a process with the name of <code>chatroom</code></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">aos</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> treasureRoom</span></span></code></pre></div><p>Starts or connects to a process with the name of <code>treasureRoom</code></p><h2 id="load-flag" tabindex="-1">Load flag <a class="header-anchor" href="#load-flag" aria-label="Permalink to &quot;Load flag&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">aos</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> treasureRoom</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> --load</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> greeting.lua</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> --load</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> treasure.lua</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> --load</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> puzzle.lua</span></span></code></pre></div><p>With the load flag I can load many source files to my process</p><h2 id="cron-flag" tabindex="-1">CRON Flag <a class="header-anchor" href="#cron-flag" aria-label="Permalink to &quot;CRON Flag&quot;">​</a></h2><p>If you want to setup your process to react on a schedule we need to tell ao, we do that when we spawn the process.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">aos</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> chatroom</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> --cron</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> 2</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}">-minutes</span></span></code></pre></div></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aos/cli.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cli = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, cli as default };
