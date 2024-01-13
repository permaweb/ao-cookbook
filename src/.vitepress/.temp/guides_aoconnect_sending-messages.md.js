import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Sending a Message to a Process","description":"","frontmatter":{},"headers":[],"relativePath":"guides/aoconnect/sending-messages.md","filePath":"guides/aoconnect/sending-messages.md"}',
);
const _sfc_main = { name: "guides/aoconnect/sending-messages.md" };
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
  )}><h1 id="sending-a-message-to-a-process" tabindex="-1">Sending a Message to a Process <a class="header-anchor" href="#sending-a-message-to-a-process" aria-label="Permalink to &quot;Sending a Message to a Process&quot;">​</a></h1><p>A deep dive into the concept of Messages can be found in the <a href="./../../concepts/messages.html">ao Messages</a> concept. This guide focuses on using ao connect to send a message to a process.</p><p>Sending a message is the central way in which your app can interact with ao. A message is input to a process. There are 5 parts of a message that you can specify which are &quot;target&quot;, &quot;data&quot;, &quot;tags&quot;, &quot;anchor&quot;, and finally the messages &quot;signature&quot;.</p><p>Refer to your process module&#39;s source code or documentation to see how the message is used in its computation. The ao connect library will translate the parameters you pass it in the code below, construct a message, and send it.</p><h2 id="sending-a-message-in-nodejs" tabindex="-1">Sending a Message in NodeJS <a class="header-anchor" href="#sending-a-message-in-nodejs" aria-label="Permalink to &quot;Sending a Message in NodeJS&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
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
  })}"> { message, createDataItemSigner } </span><span style="${ssrRenderStyle({
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
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">// The only 2 mandatory parameters here are process and signer</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">await</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> message</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  /*</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    The arweave TXID of the process, this will become the &quot;target&quot;.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    This is the process the message is ultimately sent to.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  */</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  process: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;process-id&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // Tags that the process will use as input.</span></span>
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
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // A signer function used to build the message &quot;signature&quot;</span></span>
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
  })}">    The &quot;data&quot; portion of the message</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    If not specified a random string will be generated</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  */</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  data: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;any data&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(console.log)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">catch</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(console.error);</span></span></code></pre></div><h2 id="sending-a-message-in-a-browser" tabindex="-1">Sending a Message in a browser <a class="header-anchor" href="#sending-a-message-in-a-browser" aria-label="Permalink to &quot;Sending a Message in a browser&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">import</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { message, createDataItemSigner } </span><span style="${ssrRenderStyle({
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
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">// The only 2 mandatory parameters here are process and signer</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">await</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> message</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  /*</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    The arweave TXID of the process, this will become the &quot;target&quot;.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    This is the process the message is ultimately sent to.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  */</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  process: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;process-id&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // Tags that the process will use as input.</span></span>
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
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  // A signer function used to build the message &quot;signature&quot;</span></span>
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
  })}">    The &quot;data&quot; portion of the message.</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    If not specified a random string will be generated</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  */</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  data: </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;any data&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(console.log)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  .</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">catch</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(console.error);</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/aoconnect/sending-messages.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sendingMessages = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, sendingMessages as default };
