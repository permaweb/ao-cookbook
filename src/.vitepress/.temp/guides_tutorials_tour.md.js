import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"aos Brief Tour","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/tour.md","filePath":"guides/tutorials/tour.md"}',
);
const _sfc_main = { name: "guides/tutorials/tour.md" };
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
    )}><h1 id="aos-brief-tour" tabindex="-1">aos Brief Tour <a class="header-anchor" href="#aos-brief-tour" aria-label="Permalink to &quot;aos Brief Tour&quot;">​</a></h1><p>Welcome to a quick tour of aos! This tutorial will walk you through the key global functions and variables available in the aos environment, giving you a foundational understanding of how to interact with and utilize aos effectively.</p><h2 id="_1-introduction-to-inbox" tabindex="-1">1. Introduction to Inbox <a class="header-anchor" href="#_1-introduction-to-inbox" aria-label="Permalink to &quot;1. Introduction to Inbox&quot;">​</a></h2><ul><li><strong>What It Is</strong>: <code>Inbox</code> is a Lua table that stores all messages received by your process but not yet handled.</li><li><strong>How to Use</strong>: Check <code>Inbox</code> to see incoming messages. Iterate through <code>Inbox[x]</code> to process these messages.</li></ul><h2 id="_2-sending-messages-with-send-message" tabindex="-1">2. Sending Messages with Send(Message) <a class="header-anchor" href="#_2-sending-messages-with-send-message" aria-label="Permalink to &quot;2. Sending Messages with Send(Message)&quot;">​</a></h2><ul><li><strong>Functionality</strong>: <code>Send(Message)</code> is a global function to send messages to other processes.</li><li><strong>Usage Example</strong>: <code>Send({Target = &quot;...&quot;, Data = &quot;Hello, Process!&quot;})</code> sends a message with the data &quot;Hello, Process!&quot; to a specified process.</li></ul><h4 id="_3-creating-processes-with-spawn-module-message" tabindex="-1">3. Creating Processes with Spawn(Module, Message) <a class="header-anchor" href="#_3-creating-processes-with-spawn-module-message" aria-label="Permalink to &quot;3. Creating Processes with Spawn(Module, Message)&quot;">​</a></h4><ul><li><strong>Purpose</strong>: Use <code>Spawn(Module, Message)</code> to create new processes.</li><li><strong>Example</strong>: <code>Spawn(&quot;MyModule&quot;, {Data = &quot;Start&quot;})</code> starts a new process using &quot;MyModule&quot; with the provided message.</li></ul><h4 id="_4-understanding-name-and-owner" tabindex="-1">4. Understanding Name and Owner <a class="header-anchor" href="#_4-understanding-name-and-owner" aria-label="Permalink to &quot;4. Understanding Name and Owner&quot;">​</a></h4><ul><li><strong>Name</strong>: A string set during initialization, representing the process&#39;s name.</li><li><strong>Owner</strong>: Indicates the owner of the process. Changing this might restrict your ability to interact with your process.</li><li><strong>Important Note</strong>: Treat these as read-only to avoid issues.</li></ul><h4 id="_5-utilizing-handlers" tabindex="-1">5. Utilizing Handlers <a class="header-anchor" href="#_5-utilizing-handlers" aria-label="Permalink to &quot;5. Utilizing Handlers&quot;">​</a></h4><ul><li><strong>What They Are</strong>: <code>Handlers</code> is a table of helper functions for creating message handlers.</li><li><strong>Usage</strong>: Define handlers in <code>Handlers</code> to specify actions for different incoming messages based on pattern matching.</li></ul><h4 id="_6-data-representation-with-dump" tabindex="-1">6. Data Representation with Dump <a class="header-anchor" href="#_6-data-representation-with-dump" aria-label="Permalink to &quot;6. Data Representation with Dump&quot;">​</a></h4><ul><li><strong>Function</strong>: <code>Dump</code> converts any Lua table into a print-friendly format.</li><li><strong>How to Use</strong>: Useful for debugging or viewing complex table structures. Example: <code>Dump(Inbox)</code> prints the contents of <code>Inbox</code>.</li></ul><h4 id="_7-leveraging-utils-module" tabindex="-1">7. Leveraging Utils Module <a class="header-anchor" href="#_7-leveraging-utils-module" aria-label="Permalink to &quot;7. Leveraging Utils Module&quot;">​</a></h4><ul><li><strong>Contents</strong>: \`Utils</li></ul><p><code>contains a collection of functional utilities like</code>map<code>, </code>reduce<code>, and </code>filter\`.</p><ul><li><strong>Usage</strong>: Great for data manipulation and functional programming patterns in Lua. For example, <code>Utils.map(myTable, function(x) return x * 2 end)</code> to double the values in a table.</li></ul><h4 id="_8-exploring-the-ao-core-library" tabindex="-1">8. Exploring the ao Core Library <a class="header-anchor" href="#_8-exploring-the-ao-core-library" aria-label="Permalink to &quot;8. Exploring the ao Core Library&quot;">​</a></h4><ul><li><strong>Description</strong>: <code>ao</code> is a core module that includes key functions for message handling and process management.</li><li><strong>Key Features</strong>: Includes functions for sending messages (<code>send</code>) and spawning processes (<code>spawn</code>), along with environment variables.</li></ul><h4 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h4><p>This brief tour introduces you to the primary globals and functionalities within the aos environment. With these tools at your disposal, you can create and manage processes, handle messages, and utilize Lua&#39;s capabilities to build efficient and responsive applications on the aos platform. Experiment with these features to get a deeper understanding and to see how they can be integrated into your specific use cases. Happy coding in aos!</p></div>`,
  );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/tour.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tour = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, tour as default };
