import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Token Guide","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/token.md","filePath":"guides/tutorials/token.md"}',
);
const _sfc_main = { name: "guides/tutorials/token.md" };
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
  )}><h1 id="token-guide" tabindex="-1">Token Guide <a class="header-anchor" href="#token-guide" aria-label="Permalink to &quot;Token Guide&quot;">​</a></h1><p>This guide brings you through the process of building a token using aos. It is based on the ao standard token <a href="./../../references/token.html">spec</a>.</p><p>To begin you will need to have aos <a href="./../aos/installing.html">installed</a>. Now you are ready to build.</p><h2 id="setting-up-the-development-environment" tabindex="-1">Setting up the development environment <a class="header-anchor" href="#setting-up-the-development-environment" aria-label="Permalink to &quot;Setting up the development environment&quot;">​</a></h2><p>This guide will load code from the local file system into aos. So you will want to create a directory to edit the .lua files and run aos.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">mkdir</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> token</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">cd</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> token</span></span></code></pre></div><p>Now create a file from your favorite editor inside the token directory called token.lua, now we are ready to run aos. From within the token directory run.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> mytoken</span></span></code></pre></div><p>The second part of this command (mytoken) creates a named aos on your local machine which will tie a process id to that name. This feature of naming in aos allows us to run multiple aos processes on one machine. You are now in the aos shell.</p><h2 id="writing-the-token-code" tabindex="-1">Writing the Token code <a class="header-anchor" href="#writing-the-token-code" aria-label="Permalink to &quot;Writing the Token code&quot;">​</a></h2><p>Lets write the Lua code that will be the token. This code will run in aos so we have access to the aos libraries and globals, see <a href="./../aos/intro.html">intro</a> for an outline of these.</p><h3 id="initializing-the-token-state" tabindex="-1">Initializing the Token state <a class="header-anchor" href="#initializing-the-token-state" aria-label="Permalink to &quot;Initializing the Token state&quot;">​</a></h3><p>Open up token.lua in your editor and add the following code.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> json </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> require</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;json&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> not</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { [ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 100000000000000</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> } </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">~=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;My Coin&#39; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;My Coin&#39; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Ticker </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">~=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;COIN&#39; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Ticker </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;COIN&#39; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Denomination </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">~=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 10</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Denomination </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 10</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> not</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Logo </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Logo </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;optional arweave TXID of logo image&#39; </span><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">end</span></span></code></pre></div><p>The first line of this code imports a module for later use. The second line <code>if not Balances then Balances = { [ao.id] = 100000000000000 } end</code> is initializing a Balances table which is the way the Process tracks who posses the token. We initialize our token process <code>ao.id</code> to start with all the balance.</p><p>The next 4 lines define the initialization parameters of the token including an optional arweave tx containing an image for the token. The Denomination variable is not optional while Name, Ticker, and Logo are. The code <code>if Denomination ~= 10 then Denomination = 10 end</code> tells us the number of the token that should be treated as a single unit.</p><h3 id="info-and-balances-handlers" tabindex="-1">Info and Balances Handlers <a class="header-anchor" href="#info-and-balances-handlers" aria-label="Permalink to &quot;Info and Balances Handlers&quot;">​</a></h3><p>Now lets add our first Handler to handle incoming Messages.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">add</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;info&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingTag</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Action&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Info&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">), </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      { Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Name </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Name, Ticker </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Ticker, Logo </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Logo, Denomination </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(Denomination) } })</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><p>This code means that if someone Sends a message with the Tag, Action = &quot;info&quot;, our token will Send back a message with all of the information defined above. Note the <code>Target = msg.From</code>, this tells ao we are replying to the process that sent us this message.</p><p>Now we can add 2 Handlers which provide information about token Balances.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">add</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;balance&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingTag</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Action&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Balance&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">), </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> bal </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;0&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">  -- If not Target is provided, then return the Senders balance</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> (msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Target</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> and</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Target</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">]) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    bal </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Target</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">])</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  elseif</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    bal </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">])</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Balance </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> bal, Ticker </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Ticker, Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> json.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">encode</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">tonumber</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(bal)) }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  })</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">add</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;balances&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingTag</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Action&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Balances&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">             function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg) ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> json.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">encode</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(Balances) }) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><p>The first Handler above <code>Handlers.add(&#39;balance&#39;</code> handles a process or person requesting their own balance or the balance of a Target. Then replies with a message containing the info. The second Handler <code>Handlers.add(&#39;balances&#39;</code> just replies with the entire Balances table.</p><h3 id="handling-token-transfers" tabindex="-1">Handling Token Transfers <a class="header-anchor" href="#handling-token-transfers" aria-label="Permalink to &quot;Handling Token Transfers&quot;">​</a></h3><p>Before we begin testing we will add 2 more Handlers one which allows for the transfer of tokens between processes or users.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">add</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;transfer&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingTag</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Action&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Transfer&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">), </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">  assert</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">type</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">==</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;string&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Recipient is required!&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">  assert</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">type</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Quantity</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">==</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;string&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Quantity is required!&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> not</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 0</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> not</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> 0</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tonumber</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Quantity</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">  assert</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">type</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(qty) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">==</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;number&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;qty must be number&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">&gt;=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">then</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">-</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">+</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    --[[</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">      Only Send the notifications to the Sender and Recipient</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">      if the Cast tag is not set on the Transfer message</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    ]]</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}"> --</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> not</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Cast</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> then</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">      -- Send Debit-Notice to the Sender</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Debit-Notice&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Recipient </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Quantity </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(qty) }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      })</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">      -- Send Credit-Notice to the Recipient</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Credit-Notice&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Sender </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Quantity </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(qty) }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      })</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    end</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  else</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Transfer-Error&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Message-Id&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Error </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Insufficient Balance!&#39; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    })</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  end</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><p>In summary, this code checks to make sure the Recipient and Quantity Tags have been provided, initializes the balances of the person sending the message and the Recipient if they dont exist and then attempts to transfer the specified quantity to the Recipient in the Balances table</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">-</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">+</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty</span></span></code></pre></div><p>If the transfer was successful a Debit-Notice is sent to the sender of the original message and a Credit-Notice is sent to the Recipient.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" },
  )}">-- Send Debit-Notice to the Sender</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Debit-Notice&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Recipient </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Quantity </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(qty) }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">-- Send Credit-Notice to the Recipient</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Recipient</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Credit-Notice&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Sender </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Quantity </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tostring</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(qty) }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div><p>If there was insufficient balance for the transfer it sends back a failure message</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> { Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Transfer-Error&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Message-Id&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Error </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Insufficient Balance!&#39; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div><p>The line <code>if not msg.Tags.Cast then</code> Means were not producing any messages to crank if the Cast tag was set. This is part of the ao protocol.</p><h3 id="minting" tabindex="-1">Minting <a class="header-anchor" href="#minting" aria-label="Permalink to &quot;Minting&quot;">​</a></h3><p>We will add 1 final Handler that allows the creator of this token to mint more of the token.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">add</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;mint&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingTag</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Action&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Mint&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">), </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg, env)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">  assert</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">type</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Quantity</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">) </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">==</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;string&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Quantity is required!&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  if</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> ==</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> env.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Process</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> then</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    -- Add tokens to the token pool, according to Quantity</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}"> tonumber</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Quantity</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Balances[env.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Process</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Balances[env.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Process</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">+</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> qty</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  else</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">From</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Mint-Error&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        [</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&#39;Message-Id&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">] </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> msg.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">        Error </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;Only the Process Owner can mint new &#39; </span><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">..</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> Ticker </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">..</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39; tokens!&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">      }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    })</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">  end</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><h2 id="loading-and-testing" tabindex="-1">Loading and Testing <a class="header-anchor" href="#loading-and-testing" aria-label="Permalink to &quot;Loading and Testing&quot;">​</a></h2><p>Ok now we are ready to load this file into aos and test. From the aos prompt load in the file.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> .load</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> token.lua</span></span></code></pre></div><p>Now we can send Messages to our aos process id, from the same aos prompt to see if is working. If we use ao.id as the Target we are sending a message to ourselves.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target = ao.id, Tags = { Action = &quot;Info&quot; }})</span></span></code></pre></div><p>Check the latest inbox message, if its not there yet wait a few seconds and check again.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Inbox[#Inbox].Data</span></span></code></pre></div><p>This should print the Info defined in the contract.</p><p>Now try a transfer</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target = ao.id, Tags = { Action = &quot;Transfer&quot;, Recipient = &#39;another wallet or processid&#39;, Quantity = &#39;10000&#39; }})</span></span></code></pre></div><p>And check the balances</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target = ao.id, Tags = { Action = &quot;Balances&quot; }})</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Inbox[#Inbox].Data</span></span></code></pre></div><p>You should see a balance for the Recipient you sent to.</p><p>Finally, attempt to mint some tokens</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">Send(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">{ </span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">Target</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> ao.id,</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Tags</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> {</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Action</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Mint&quot;,</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Quantity</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> =</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &#39;1000&#39;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> }}</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><p>And check the balances</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" },
  )}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target = ao.id, Tags = { Action = &quot;Balances&quot; }})</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">aos&gt;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> Inbox[#Inbox].Data</span></span></code></pre></div><p>That concludes the token example we hope it was helpful!</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/token.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const token = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, token as default };
