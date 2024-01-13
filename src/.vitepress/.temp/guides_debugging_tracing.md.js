import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Tracing a Message or Process","description":"","frontmatter":{},"headers":[],"relativePath":"guides/debugging/tracing.md","filePath":"guides/debugging/tracing.md"}',
);
const _sfc_main = { name: "guides/debugging/tracing.md" };
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
  )}><h1 id="tracing-a-message-or-process" tabindex="-1">Tracing a Message or Process <a class="header-anchor" href="#tracing-a-message-or-process" aria-label="Permalink to &quot;Tracing a Message or Process&quot;">​</a></h1><p>Messenger Units (MU&#39;s), provide a trace endpoint which allows you to see what is going on with a Message or Process. You must trace on the MU that you wrote the Message to because MU&#39;s do not share what they have done with each other. It is valid to write to many different MU&#39;s for one process.</p><p>The subsequent processing that can occur in the background after a Message is sent from a user/developer, that is related to the Message, can be very large because there is no telling how many Messages and Spawns are coming from the Process.</p><p><strong>You can access the trace endpoint directly from the browser or using another http client</strong></p><h2 id="tracing-by-message-id" tabindex="-1">Tracing by Message ID <a class="header-anchor" href="#tracing-by-message-id" aria-label="Permalink to &quot;Tracing by Message ID&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">curl</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;https://ao-mu-1.onrender.com/?debug=true&amp;message=txidofmessage&quot;</span></span></code></pre></div><h2 id="tracing-by-process-id" tabindex="-1">Tracing by Process ID <a class="header-anchor" href="#tracing-by-process-id" aria-label="Permalink to &quot;Tracing by Process ID&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">curl</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;https://ao-mu-1.onrender.com/?debug=true&amp;process=txidofprocess&quot;</span></span></code></pre></div><h2 id="tracing-everything-going-on-in-the-mu" tabindex="-1">Tracing everything going on in the MU <a class="header-anchor" href="#tracing-everything-going-on-in-the-mu" aria-label="Permalink to &quot;Tracing everything going on in the MU&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">curl</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;https://ao-mu-1.onrender.com/?debug=true&quot;</span></span></code></pre></div><h2 id="tracing-from-javascript" tabindex="-1">Tracing from javascript <a class="header-anchor" href="#tracing-from-javascript" aria-label="Permalink to &quot;Tracing from javascript&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">fetch</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;https://ao-mu-1.onrender.com/?debug=true&amp;message=txidofmessage&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">((</span><span style="${ssrRenderStyle({
    "--shiki-light": "#E36209",
    "--shiki-dark": "#FFAB70",
  })}">response</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> response.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">json</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">())</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">((</span><span style="${ssrRenderStyle({
    "--shiki-light": "#E36209",
    "--shiki-dark": "#FFAB70",
  })}">data</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> console.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">log</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(data))</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">catch</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">((</span><span style="${ssrRenderStyle({
    "--shiki-light": "#E36209",
    "--shiki-dark": "#FFAB70",
  })}">error</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> console.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">error</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Error:&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, error));</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/debugging/tracing.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tracing = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, tracing as default };
