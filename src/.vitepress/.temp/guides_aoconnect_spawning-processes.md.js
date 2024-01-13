import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Spawning a Process","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aoconnect/spawning-processes.md","filePath":"guides/aoconnect/spawning-processes.md"}',
);
const _sfc_main = { name: "guides/aoconnect/spawning-processes.md" };
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
  )}><h1 id="spawning-a-process" tabindex="-1">Spawning a Process <a class="header-anchor" href="#spawning-a-process" aria-label="Permalink to &quot;Spawning a Process&quot;">​</a></h1><p>A deep dive into the concept of Processes can be found in the <a href="./../../concepts/processes.html">ao Processes</a> concept. This guide focuses on using ao connect to spawn a Process.</p><p>In order to spawn a Process you must have the TXID of an ao Module that has been uploaded to Arweave. The Module is the source code for the Process. The Process itself is an instantiation of that source.</p><p>You must also have the wallet address of a Scheduler Unit (SU). This specified SU will act as the scheduler for this Process. This means that all nodes in the system can tell that they need to read and write to this SU for this Process. You can use the address below.</p><h2 id="wallet-address-of-an-available-scheduler" tabindex="-1">Wallet address of an available Scheduler <a class="header-anchor" href="#wallet-address-of-an-available-scheduler" aria-label="Permalink to &quot;Wallet address of an available Scheduler&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">TZ7o7SIZ06ZEJ14lXwVtng1EtSx60QkPy-kh-kdAXog</span></span></code></pre></div><h2 id="spawning-a-process-in-nodejs" tabindex="-1">Spawning a Process in NodeJS <a class="header-anchor" href="#spawning-a-process-in-nodejs" aria-label="Permalink to &quot;Spawning a Process in NodeJS&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">import</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { readFileSync } </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">from</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;node:fs&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">import</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { createDataItemSigner, spawn } </span><span style="${ssrRenderStyle({
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
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> wallet</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> JSON</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">parse</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">  readFileSync</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;/path/to/arweave/wallet.json&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">).</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">toString</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">);</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">const</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> processId</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> await</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> spawn</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // The Arweave TXID of the ao Module</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  module: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;module TXID&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // The Arweave wallet address of a Scheduler Unit</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  scheduler: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;TZ7o7SIZ06ZEJ14lXwVtng1EtSx60QkPy-kh-kdAXog&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // A signer function containing your wallet</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  signer: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">createDataItemSigner</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(wallet),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  /*</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    Refer to a Processes&#39; source code or documentation</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    for tags that may effect its computation.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  */</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  tags: [</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    { name: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Your-Tag-Name-Here&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, value: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;your-tag-value&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    { name: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Another-Tag&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, value: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;another-value&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  ],</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">});</span></span></code></pre></div><h2 id="spawning-a-process-in-a-browser" tabindex="-1">Spawning a Process in a browser <a class="header-anchor" href="#spawning-a-process-in-a-browser" aria-label="Permalink to &quot;Spawning a Process in a browser&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">import</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { createDataItemSigner, spawn } </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">from</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;@permaweb/ao-sdk&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">const</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> processId</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> await</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> spawn</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // The Arweave TXID of the ao Module</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  module: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;module TXID&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // The Arweave wallet address of a Scheduler Unit</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  scheduler: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;TZ7o7SIZ06ZEJ14lXwVtng1EtSx60QkPy-kh-kdAXog&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // A signer function containing your wallet</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  signer: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">createDataItemSigner</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(globalThis.arweaveWallet),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  /*</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    Refer to a Processes&#39; source code or documentation</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    for tags that may effect its computation.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  */</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  tags: [</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    { name: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Your-Tag-Name-Here&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, value: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;your-tag-value&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    { name: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Another-Tag&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, value: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;another-value&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  ],</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">});</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aoconnect/spawning-processes.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const spawningProcesses = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, spawningProcesses as default };
