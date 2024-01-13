import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Installing ao connect","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aoconnect/installing-connect.md","filePath":"guides/aoconnect/installing-connect.md"}',
);
const _sfc_main = { name: "guides/aoconnect/installing-connect.md" };
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
    )}><h1 id="installing-ao-connect" tabindex="-1">Installing ao connect <a class="header-anchor" href="#installing-ao-connect" aria-label="Permalink to &quot;Installing ao connect&quot;">​</a></h1><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><hr><p>In order to install ao connect into your app you must have NodeJS/NPM 18 or higher. <br></p><h2 id="installing" tabindex="-1">Installing <a class="header-anchor" href="#installing" aria-label="Permalink to &quot;Installing&quot;">​</a></h2><h3 id="npm" tabindex="-1">npm <a class="header-anchor" href="#npm" aria-label="Permalink to &quot;npm&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">npm</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> install</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> --save</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> @permaweb/aoconnect</span></span></code></pre></div><h3 id="yarn" tabindex="-1">yarn <a class="header-anchor" href="#yarn" aria-label="Permalink to &quot;yarn&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
    )}">yarn</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> add</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> @permaweb/aoconnect</span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}"> -D</span></span></code></pre></div><br><p>This module can now be used from NodeJS as well as a browser, it can be included as shown below.</p><h4 id="esm-node-browser-aka-type-module" tabindex="-1">ESM (Node &amp; Browser) aka type: <code>module</code> <a class="header-anchor" href="#esm-node-browser-aka-type-module" aria-label="Permalink to &quot;ESM (Node &amp; Browser) aka type: \`module\`&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
    )}">import</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}"> { spawn, message, result } </span><span style="${ssrRenderStyle({
      "--shiki-light": "#D73A49",
      "--shiki-dark": "#F97583",
    })}">from</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}"> &quot;@permaweb/aoconnect&quot;</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}">;</span></span></code></pre></div><h4 id="cjs-node-type-commonjs" tabindex="-1">CJS (Node) type: <code>commonjs</code> <a class="header-anchor" href="#cjs-node-type-commonjs" aria-label="Permalink to &quot;CJS (Node) type: \`commonjs\`&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
      { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
    )}">const</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}"> { </span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}">spawn</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}">, </span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}">message</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}">, </span><span style="${ssrRenderStyle({
      "--shiki-light": "#005CC5",
      "--shiki-dark": "#79B8FF",
    })}">result</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}"> } </span><span style="${ssrRenderStyle({
      "--shiki-light": "#D73A49",
      "--shiki-dark": "#F97583",
    })}">=</span><span style="${ssrRenderStyle({
      "--shiki-light": "#6F42C1",
      "--shiki-dark": "#B392F0",
    })}"> require</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}">(</span><span style="${ssrRenderStyle({
      "--shiki-light": "#032F62",
      "--shiki-dark": "#9ECBFF",
    })}">&quot;@permaweb/aoconnect&quot;</span><span style="${ssrRenderStyle({
      "--shiki-light": "#24292E",
      "--shiki-dark": "#E1E4E8",
    })}">);</span></span></code></pre></div></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aoconnect/installing-connect.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const installingConnect = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, installingConnect as default };
