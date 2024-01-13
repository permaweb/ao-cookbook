import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Handlers (Version 0.0.3)","description":"","frontmatter":{},"headers":[],"relativePath":"references/handlers.md","filePath":"references/handlers.md"}',
);
const _sfc_main = { name: "references/handlers.md" };
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
  )}><h1 id="handlers-version-0-0-3" tabindex="-1">Handlers (Version 0.0.3) <a class="header-anchor" href="#handlers-version-0-0-3" aria-label="Permalink to &quot;Handlers (Version 0.0.3)&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The Handlers library provides a flexible way to manage and execute a series of handlers based on patterns. Each handler consists of a pattern function, a handle function, and a name. This library is suitable for scenarios where different actions need to be taken based on varying input criteria.</p><h2 id="module-structure" tabindex="-1">Module Structure <a class="header-anchor" href="#module-structure" aria-label="Permalink to &quot;Module Structure&quot;">​</a></h2><ul><li><code>Handlers._version</code>: String representing the version of the Handlers library.</li><li><code>Handlers.list</code>: Table storing the list of registered handlers.</li></ul><h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h2><h3 id="handlers-add-name-pattern-handler" tabindex="-1"><code>Handlers.add(name, pattern, handler)</code> <a class="header-anchor" href="#handlers-add-name-pattern-handler" aria-label="Permalink to &quot;\`Handlers.add(name, pattern, handler)\`&quot;">​</a></h3><p>adds a new handler or updates an existing handler by name</p><h3 id="handlers-append-name-pattern-handle" tabindex="-1"><code>Handlers.append(name, pattern, handle)</code> <a class="header-anchor" href="#handlers-append-name-pattern-handle" aria-label="Permalink to &quot;\`Handlers.append(name, pattern, handle)\`&quot;">​</a></h3><p>Appends a new handler to the end of the handlers list.</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>pattern</code> (function): Function that determines if the handler should be executed.</li><li><code>handle</code> (function): The handler function to execute.</li><li><code>name</code> (string): A unique name for the handler.</li></ul><h3 id="handlers-prepend-name-pattern-handle" tabindex="-1"><code>Handlers.prepend(name, pattern, handle)</code> <a class="header-anchor" href="#handlers-prepend-name-pattern-handle" aria-label="Permalink to &quot;\`Handlers.prepend(name, pattern, handle)\`&quot;">​</a></h3><p>Prepends a new handler to the beginning of the handlers list.</p><h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li>Same as <code>handlers.append</code>.</li></ul><h3 id="handlers-before-handlename" tabindex="-1"><code>Handlers.before(handleName)</code> <a class="header-anchor" href="#handlers-before-handlename" aria-label="Permalink to &quot;\`Handlers.before(handleName)\`&quot;">​</a></h3><p>Returns an object that allows adding a new handler before a specified handler.</p><h4 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>handleName</code> (string): The name of the handler before which the new handler will be added.</li></ul><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><ul><li>An object with an <code>add</code> method to insert the new handler.</li></ul><h3 id="handlers-after-handlename" tabindex="-1"><code>Handlers.after(handleName)</code> <a class="header-anchor" href="#handlers-after-handlename" aria-label="Permalink to &quot;\`Handlers.after(handleName)\`&quot;">​</a></h3><p>Returns an object that allows adding a new handler after a specified handler.</p><h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>handleName</code> (string): The name of the handler after which the new handler will be added.</li></ul><h4 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><ul><li>An object with an <code>add</code> method to insert the new handler.</li></ul><h3 id="handlers-remove-name" tabindex="-1"><code>Handlers.remove(name)</code> <a class="header-anchor" href="#handlers-remove-name" aria-label="Permalink to &quot;\`Handlers.remove(name)\`&quot;">​</a></h3><p>Removes a handler from the handlers list by name.</p><h4 id="parameters-4" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-4" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>name</code> (string): The name of the handler to be removed.</li></ul><h3 id="handlers-evaluate-msg-env" tabindex="-1"><code>Handlers.evaluate(msg, env)</code> <a class="header-anchor" href="#handlers-evaluate-msg-env" aria-label="Permalink to &quot;\`Handlers.evaluate(msg, env)\`&quot;">​</a></h3><p>Evaluates each handler against a given message and environment. Handlers are called in the order they appear in the handlers list.</p><h4 id="parameters-5" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-5" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>msg</code> (table): The message to be processed by the handlers.</li><li><code>env</code> (table): The environment in which the handlers are executed.</li></ul><h4 id="returns-2" tabindex="-1">Returns <a class="header-anchor" href="#returns-2" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><ul><li><code>response</code> (varies): The response from the handler(s). Returns a default message if no handler matches.</li></ul><h2 id="usage-example" tabindex="-1">Usage Example <a class="header-anchor" href="#usage-example" aria-label="Permalink to &quot;Usage Example&quot;">​</a></h2><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" },
  )}">-- Define pattern and handle functions</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> myPattern</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    -- Determine if the handler should be executed</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}"> function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> myHandle</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(msg, env, response)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">    -- Handler logic</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">-- Add a new handler</span></span>
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
  })}">&quot;myHandler&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, myPattern, myHandle)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#6A737D",
    "--shiki-dark": "#6A737D",
  })}">-- Evaluate a message</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">local</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> response </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">evaluate</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ key </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;value&quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">}, { envKey </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;envValue&quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div><h2 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h2><ul><li>Handlers are executed in the order they appear in <code>handlers.list</code>.</li><li>The pattern function should return <code>0</code> to skip the handler, <code>-1</code> to break after the handler is executed, or <code>1</code> to continue with the next handler.</li><li>The <code>evaluate</code> function can concatenate responses from multiple handlers.</li></ul><h2 id="handlers-utils" tabindex="-1">Handlers.utils <a class="header-anchor" href="#handlers-utils" aria-label="Permalink to &quot;Handlers.utils&quot;">​</a></h2><p>The Handlers.utils module provides two functions that are common matching patterns and one function that is a common handle function.</p><ul><li>hasMatchingData(data)</li><li>hasMatchingTag(name, value)</li><li>reply(txt)</li></ul><h3 id="handlers-utils-hasmatchingdata-data-string" tabindex="-1">Handlers.utils.hasMatchingData(data : string) <a class="header-anchor" href="#handlers-utils-hasmatchingdata-data-string" aria-label="Permalink to &quot;Handlers.utils.hasMatchingData(data : string)&quot;">​</a></h3><p>This helper returns a function that requires a message argument, so you can drop this into the pattern argument of any handler. The function compares the data on the incoming message with the string provided as an argument.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
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
  })}">&quot;ping&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingData</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;ping&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><p>If a message comes into the process with data set to ping, this handler will match on it and invoke the handle function.</p><h3 id="handlers-hasmatchingtag-name-string-value-string" tabindex="-1">Handlers.hasMatchingTag(name : string, value : string) <a class="header-anchor" href="#handlers-hasmatchingtag-name-string-value-string" aria-label="Permalink to &quot;Handlers.hasMatchingTag(name : string, value : string)&quot;">​</a></h3><p>This helper returns a function that requires a message argument, so you can drop this into any pattern argument on the Handlers module. The function compares the Tag Name and Value, if they are equal then it invokes the handle function.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
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
  })}">&quot;ping&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingData</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;ping&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div><h3 id="handlers-reply-text-string" tabindex="-1">Handlers.reply(text : string) <a class="header-anchor" href="#handlers-reply-text-string" aria-label="Permalink to &quot;Handlers.reply(text : string)&quot;">​</a></h3><p>This helper is a simple handle function, it basically places the text value in to the Data property of the outbound message.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
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
  })}">&quot;ping&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">hasMatchingData</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;ping&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">),</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">    Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">utils</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">reply</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">&quot;pong&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">)</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "references/handlers.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const handlers = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, handlers as default };
