import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Sending Messages in aos","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/messaging.md","filePath":"guides/tutorials/messaging.md"}',
);
const _sfc_main = { name: "guides/tutorials/messaging.md" };
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
  )}><h1 id="sending-messages-in-aos" tabindex="-1">Sending Messages in aos <a class="header-anchor" href="#sending-messages-in-aos" aria-label="Permalink to &quot;Sending Messages in aos&quot;">​</a></h1><p>This tutorial will guide you through the process of sending messages between processes in aos. Messages are a crucial part of the aos environment, allowing processes to communicate and interact with each other.</p><h2 id="step-1-understand-the-message-structure" tabindex="-1">Step 1: Understand the Message Structure <a class="header-anchor" href="#step-1-understand-the-message-structure" aria-label="Permalink to &quot;Step 1: Understand the Message Structure&quot;">​</a></h2><ul><li><strong>Message Basics</strong>: A message in aos is typically a Lua table containing various fields. The most important field is <code>Data</code>, which holds the content of your message.</li><li><strong>Example</strong>: <code>{ Data = &quot;Hello from Process A!&quot; }</code> is a simple message.</li></ul><h2 id="step-2-open-the-aos-cli" tabindex="-1">Step 2: Open the aos CLI <a class="header-anchor" href="#step-2-open-the-aos-cli" aria-label="Permalink to &quot;Step 2: Open the aos CLI&quot;">​</a></h2><ul><li>Launch the aos command-line interface (CLI) by typing <code>aos</code> in your terminal and pressing Enter.</li></ul><h2 id="step-3-use-the-send-function" tabindex="-1">Step 3: Use the Send Function <a class="header-anchor" href="#step-3-use-the-send-function" aria-label="Permalink to &quot;Step 3: Use the Send Function&quot;">​</a></h2><ul><li><strong>Accessing Send</strong>: The <code>Send</code> function is globally available in the aos interactive environment.</li><li><strong>Sending a Message</strong>: To send a message, use the <code>Send</code> function with a message as its argument. For example:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" },
  )}">Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;process12345&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Hello from Process A!&quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div></li><li>This command sends a message with the content &quot;Hello from Process A!&quot;.</li></ul><h4 id="step-4-specify-the-target-process" tabindex="-1">Step 4: Specify the Target Process <a class="header-anchor" href="#step-4-specify-the-target-process" aria-label="Permalink to &quot;Step 4: Specify the Target Process&quot;">​</a></h4><ul><li><strong>Targeting</strong>: To send a message to a specific process, include a <code>Target</code> field in your message.</li><li><strong>Example</strong>: If you want to send a message to a process with the ID <code>12345</code>, your message would look like:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" },
  )}">Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({ Target </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;process12345&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">, Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Hello, Process 12345!&quot; </span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div></li><li>This sends the message directly to the process with the specified ID.</li></ul><h2 id="step-5-using-tags-on-messages" tabindex="-1">Step 5: Using Tags on Messages <a class="header-anchor" href="#step-5-using-tags-on-messages" aria-label="Permalink to &quot;Step 5: Using Tags on Messages&quot;">​</a></h2><h4 id="understanding-tags-in-aos-messages" tabindex="-1">Understanding Tags in aos Messages <a class="header-anchor" href="#understanding-tags-in-aos-messages" aria-label="Permalink to &quot;Understanding Tags in aos Messages&quot;">​</a></h4><ul><li><strong>Purpose of Tags</strong>: Tags in aos messages are used to categorize, route, and process messages efficiently. They play a crucial role in message handling, especially when dealing with multiple processes or complex workflows.</li></ul><h4 id="how-to-use-tags-in-messages" tabindex="-1">How to Use Tags in Messages <a class="header-anchor" href="#how-to-use-tags-in-messages" aria-label="Permalink to &quot;How to Use Tags in Messages&quot;">​</a></h4><ol><li><strong>Adding Tags to a Message</strong>: <ul><li>When constructing a message, you can include a <code>Tags</code> field, which is key with string value assigned.</li><li><strong>Example</strong>:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" },
  )}">Send</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">({</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  Data </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Hello, Process 12345!&quot;</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">  Tags </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">   Action </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;Greeting&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> }</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">})</span></span></code></pre></div></li><li>This message is tagged with an &quot;Action&quot; of &quot;Greeting&quot; , indicating its purpose and intended recipient.</li></ul></li></ol><h2 id="tips-for-using-tags" tabindex="-1">Tips for Using Tags <a class="header-anchor" href="#tips-for-using-tags" aria-label="Permalink to &quot;Tips for Using Tags&quot;">​</a></h2><ul><li><strong>Consistent Tagging</strong>: Develop a consistent tagging system for your application to make message handling more predictable.</li><li><strong>Tag Naming</strong>:</li></ul><p>Choose clear and descriptive names for your tags. This makes it easier to understand the purpose and context of messages at a glance.</p><ul><li><p><strong>Tag Limitations</strong>: Be mindful of the number of tags you use. While tags are powerful for categorization, overuse or overly complex tagging systems can lead to confusion and inefficiency in message handling.</p></li><li><p><strong>Security with Tags</strong>: Remember that tags are not encrypted or hidden, so avoid using sensitive information as tags.</p></li></ul><h4 id="advanced-usage-of-tags" tabindex="-1">Advanced Usage of Tags <a class="header-anchor" href="#advanced-usage-of-tags" aria-label="Permalink to &quot;Advanced Usage of Tags&quot;">​</a></h4><ul><li><strong>Workflow Management</strong>: Tags can be instrumental in managing workflows, especially in systems where messages pass through multiple stages or processes.</li></ul><h2 id="additional-tips" tabindex="-1">Additional Tips: <a class="header-anchor" href="#additional-tips" aria-label="Permalink to &quot;Additional Tips:&quot;">​</a></h2><ul><li><strong>Message Structure</strong>: Explore other fields like <code>Epoch</code>, <code>From</code>, and <code>Nonce</code> for more complex messaging needs.</li><li><strong>Debugging</strong>: Use the <code>Dump</code> function to print messages for debugging.</li><li>**</li></ul><p>Security Considerations**: Be cautious with the content and handling of messages, especially when dealing with sensitive data.</p><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>Sending messages in aos is a fundamental skill that enables inter-process communication, a cornerstone of distributed computing on the aos platform. By following these steps, you can send, receive, and handle messages effectively, allowing you to build more complex and interactive applications in aos. Remember to experiment and explore the full potential of messaging in this versatile environment.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/messaging.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messaging = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, messaging as default };
