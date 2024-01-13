import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Connecting to specific ao nodes","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aoconnect/connecting.md","filePath":"guides/aoconnect/connecting.md"}',
);
const _sfc_main = { name: "guides/aoconnect/connecting.md" };
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
  )}><h1 id="connecting-to-specific-ao-nodes" tabindex="-1">Connecting to specific ao nodes <a class="header-anchor" href="#connecting-to-specific-ao-nodes" aria-label="Permalink to &quot;Connecting to specific ao nodes&quot;">​</a></h1><p>When including ao connect in your code you have the ability to connect to a specific MU and CU, as well as being able to specifiy an Arweave gateway. This can be done by importing the &quot;connect&quot; function and extracting the functions from a call to the &quot;connect&quot; function.</p><p>You may want to do this if you want to know which MU is being called when you send your message so that later you can debug from the specified MU. You also may want to read a result from a specific CU. You may in fact just prefer a particular MU and CU for a different reason. You can specify the gateway in order to use something other than the default, which is arweave.net.</p><h2 id="importing-without-a-call-to-connect" tabindex="-1">Importing without a call to connect <a class="header-anchor" href="#importing-without-a-call-to-connect" aria-label="Permalink to &quot;Importing without a call to connect&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" },
  )}">// Here aoconnect will implicitly use the default nodes/units</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">import</span><span style="${ssrRenderStyle({
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
  })}">;</span></span></code></pre></div><h2 id="connecting-to-a-specific-mu-cu-and-gateway" tabindex="-1">Connecting to a specific MU, CU, and gateway <a class="header-anchor" href="#connecting-to-a-specific-mu-cu-and-gateway" aria-label="Permalink to &quot;Connecting to a specific MU, CU, and gateway&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">import</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { connect } </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">from</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;@permaweb/aoconnect&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">const</span><span style="${ssrRenderStyle({
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
  })}"> connect</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  MU_URL: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;https://ao-mu-1.onrender.com&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  CU_URL: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;https://ao-cu-1.onrender.com&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  GATEWAY_URL: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;https://g8way.io&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">});</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">// now spawn, message, and result can be used the same way as if they were imported directly</span></span></code></pre></div><br><p><strong>All three of these parameters to connect are optional and it is valid to specify only 1 or 2 of them, or none. You could pass in just the MU_URL, for example.</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">import</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { connect } </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">from</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;@permaweb/aoconnect&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">const</span><span style="${ssrRenderStyle({
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
  })}"> connect</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  MU_URL: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;https://ao-mu-1.onrender.com&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">});</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aoconnect/connecting.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const connecting = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, connecting as default };
