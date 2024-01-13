import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Creating a Pingpong Process in aos","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/pingpong.md","filePath":"guides/tutorials/pingpong.md"}',
);
const _sfc_main = { name: "guides/tutorials/pingpong.md" };
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
  )}><h1 id="creating-a-pingpong-process-in-aos" tabindex="-1">Creating a Pingpong Process in aos <a class="header-anchor" href="#creating-a-pingpong-process-in-aos" aria-label="Permalink to &quot;Creating a Pingpong Process in aos&quot;">​</a></h1><p>This tutorial will guide you through creating a simple &quot;ping-pong&quot; process in aos. In this process, whenever it receives a message with the data &quot;ping&quot;, it will automatically reply with &quot;pong&quot;. This is a basic example of message handling and interaction between processes in aos.</p><h2 id="step-1-open-the-aos-cli" tabindex="-1">Step 1: Open the aos CLI <a class="header-anchor" href="#step-1-open-the-aos-cli" aria-label="Permalink to &quot;Step 1: Open the aos CLI&quot;">​</a></h2><ul><li>Start by opening your command-line interface and typing <code>aos</code> to enter the aos environment.</li></ul><h2 id="step-2-access-the-editor" tabindex="-1">Step 2: Access the Editor <a class="header-anchor" href="#step-2-access-the-editor" aria-label="Permalink to &quot;Step 2: Access the Editor&quot;">​</a></h2><ul><li>Type <code>.editor</code> in the aos CLI to open the inline text editor. This is where you&#39;ll write your ping-pong handler code.</li></ul><h2 id="step-3-write-the-pingpong-handler" tabindex="-1">Step 3: Write the Pingpong Handler <a class="header-anchor" href="#step-3-write-the-pingpong-handler" aria-label="Permalink to &quot;Step 3: Write the Pingpong Handler&quot;">​</a></h2><ul><li>In the editor, enter the following Lua code to add a handler for the pingpong pattern:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Handlers.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#005CC5",
    "--shiki-dark": "#79B8FF",
  })}">add</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">(</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}">  &quot;pingpong&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  Handlers.</span><span style="${ssrRenderStyle({
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
  })}">  Handlers.</span><span style="${ssrRenderStyle({
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
  })}">)</span></span></code></pre></div></li><li>This line of code does three things: <ol><li>It adds a new handler named &quot;pingpong&quot;.</li><li>It uses <code>Handlers.utils.hasMatchingData(&quot;ping&quot;)</code> to check if incoming messages contain the data &quot;ping&quot;.</li><li>If the message contains &quot;ping&quot;, <code>Handlers.utils.reply(&quot;pong&quot;)</code> automatically sends back a message with the data &quot;pong&quot;.</li></ol></li></ul><h2 id="step-4-exit-the-editor" tabindex="-1">Step 4: Exit the Editor <a class="header-anchor" href="#step-4-exit-the-editor" aria-label="Permalink to &quot;Step 4: Exit the Editor&quot;">​</a></h2><ul><li>After writing your code, type <code>.done</code> and press Enter to exit the editor and run the script.</li></ul><h2 id="step-5-test-the-pingpong-process" tabindex="-1">Step 5: Test the Pingpong Process <a class="header-anchor" href="#step-5-test-the-pingpong-process" aria-label="Permalink to &quot;Step 5: Test the Pingpong Process&quot;">​</a></h2><ul><li>To test the process, send a message with the data &quot;ping&quot; to the process. You can do this by typing the following command in the aos CLI:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" },
  )}">Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> ao.</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">id</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;ping&quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div></li><li>The process should respond with a message containing &quot;pong&quot; in the <code>Inbox</code>.</li></ul><h2 id="step-6-monitor-the-inbox" tabindex="-1">Step 6: Monitor the Inbox <a class="header-anchor" href="#step-6-monitor-the-inbox" aria-label="Permalink to &quot;Step 6: Monitor the Inbox&quot;">​</a></h2><ul><li>Check your Inbox to see the &quot;ping&quot; message and your Outbox to confirm the &quot;pong&quot; reply.</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Inbox[</span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">#</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">Inbox].</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}">Data</span></span></code></pre></div><h2 id="step-7-experiment-and-observe" tabindex="-1">Step 7: Experiment and Observe <a class="header-anchor" href="#step-7-experiment-and-observe" aria-label="Permalink to &quot;Step 7: Experiment and Observe&quot;">​</a></h2><ul><li>Experiment by sending different messages and observe how only the &quot;ping&quot; messages trigger the &quot;pong&quot; response.</li></ul><h2 id="step-8-save-your-process-optional" tabindex="-1">Step 8: Save Your Process (Optional) <a class="header-anchor" href="#step-8-save-your-process-optional" aria-label="Permalink to &quot;Step 8: Save Your Process (Optional)&quot;">​</a></h2><ul><li>If you want to use this process in the future, save the handler code in a Lua file for easy loading</li></ul><p>into aos sessions.</p><h2 id="additional-tips" tabindex="-1">Additional Tips: <a class="header-anchor" href="#additional-tips" aria-label="Permalink to &quot;Additional Tips:&quot;">​</a></h2><ul><li><strong>Debugging</strong>: Use the <code>Dump</code> function to print the contents of your Inbox and Outbox for debugging purposes.</li><li><strong>Handler Efficiency</strong>: The simplicity of the handler function is key. Ensure that it&#39;s efficient and only triggers under the correct conditions.</li></ul><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>Congratulations! You have now created a basic ping-pong process in aos. This tutorial provides a foundation for understanding message handling and process interaction within the aos environment. As you become more comfortable with these concepts, you can expand to more complex processes and interactions, exploring the full potential of aos.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/pingpong.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pingpong = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, pingpong as default };
