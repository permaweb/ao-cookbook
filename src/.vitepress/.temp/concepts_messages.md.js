import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Messages","description":"","frontmatter":{},"headers":[],"relativePath":"concepts/messages.md","filePath":"concepts/messages.md"}',
);
const _sfc_main = { name: "concepts/messages.md" };
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
  )}><h1 id="messages" tabindex="-1">Messages <a class="header-anchor" href="#messages" aria-label="Permalink to &quot;Messages&quot;">​</a></h1><p>ao Messages is the data protocol of ao, messages are designed from ANS-104 DataItems, so they are native to Arweave. The structure of a message when interacting in a ao Process looks like the following:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Cron </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> false</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Hello aos&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Epoch </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 0</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    From </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Id </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ayVo53qvZswpvxLlhMf8xmGjwxN0LGuHzzQpTLT0_do&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Nonce </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 1</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Owner </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Signature </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;nXtO4fNC7rQ_b0sMp22A6cY68NQXGTnsqGqGcvhAWULSYpAbWVwL4PX_u6lPEMJE_SdMu-9Ci4ohR25Y-d7T4k3v_t3VaLCvyib9XsLFiJ_Py_S2d58BmbDSgtLA05vOatsjzmkRMf-xltMQdjkcvbJseELjKWyzstib7X6U-y4wKhLa9AG5-3IcsjsNMw0U8Dql5yGFPYspb__bAvkTAfHNpYa2bMgkwCsv727LsZ-yZKPMi5kyhnCVNN1gM7OLr679vn6kGr2BzCgXGyFHLfRDzBLrZESymVocsFuStlGQROwi1M2POzSqQLP3FM-ExdxsdsbaUwCRqbS3LTJ_aBLZcXX3kOUPW-uVR28r8pQUl7Gx3e-cU9Vu2xsuGisR1EpKF57cFitIMDU0hM8HOtGhOGh0Y2rrQ1rCOtgEdaKsMHIBIZl6EaJTJXZG05LmoqvfPx67L9wy9kLEeyTsy2sMS9z4ihje4C1RDY8SerfNXtO5ctzkY2QR46EQPK04-mDXa8mt4b3YWvPtbVYspfQUpKXxsD-u66j0Go_oVACcAWVne0VyD7MliUU2LJ7Id-ghNs8f-jn9dSYc86KADdkGmpPXOw6Qh9ND1wHrqPaano15V1rTsbAH6GiQqO0XXZtc6WDjHJShnKSSs0-5xJ-SgnDFSy8CE_S9worynk0&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    TagArray </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">1</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Data-Protocol&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ao&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">2</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Variant&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ao.TN.1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">3</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Type&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Message&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">4</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;From-Process&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">5</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;From-Module&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">6</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Data-Protocol&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ao&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">7</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Type&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Message&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">8</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Variant&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ao.TN.1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">9</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;From-Process&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">            value </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Type </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Message&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Variant </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ao.TN.1&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Data-Protocol&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ao&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;From-Module&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;From-Process&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    },</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Timestamp </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 1704936415711</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Block-Height&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 1340762</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Forwarded-By&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08&quot;</span><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;Hash-Chain&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;hJ0B-0yxKxeL3IIfaIIF7Yr6bFLG2vQayaF8G0EpjbY&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">}</span></span></code></pre></div><p>See the spec for most of these, but one property, you will not find on the spec. It is the <code>From</code> property, this will either be the <code>Process</code> that sent the message or a <code>Signer</code>, if it is a <code>Signer</code> then the value will be the same as the <code>Owner</code> property.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "concepts/messages.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, messages as default };
