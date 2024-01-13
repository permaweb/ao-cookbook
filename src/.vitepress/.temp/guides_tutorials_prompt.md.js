import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.yVxbj29m.js";
const __pageData = JSON.parse(
  '{"title":"Customizing the Prompt in aos","description":"","frontmatter":{},"headers":[],"relativePath":"guides/tutorials/prompt.md","filePath":"guides/tutorials/prompt.md"}',
);
const _sfc_main = { name: "guides/tutorials/prompt.md" };
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
  )}><h1 id="customizing-the-prompt-in-aos" tabindex="-1">Customizing the Prompt in aos <a class="header-anchor" href="#customizing-the-prompt-in-aos" aria-label="Permalink to &quot;Customizing the Prompt in aos&quot;">​</a></h1><h2 id="step-1-open-aos-and-start-the-editor" tabindex="-1">Step 1: Open aos and Start the Editor <a class="header-anchor" href="#step-1-open-aos-and-start-the-editor" aria-label="Permalink to &quot;Step 1: Open aos and Start the Editor&quot;">​</a></h2><ul><li>Launch the aos command-line interface.</li><li>Enter <code>.editor</code> to open the inline text editor.</li></ul><h2 id="step-2-write-the-custom-prompt-function" tabindex="-1">Step 2: Write the Custom Prompt Function <a class="header-anchor" href="#step-2-write-the-custom-prompt-function" aria-label="Permalink to &quot;Step 2: Write the Custom Prompt Function&quot;">​</a></h2><ul><li>In the editor, define your custom prompt function. For example:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" },
  )}">function</span><span style="${ssrRenderStyle({
    "--shiki-light": "#6F42C1",
    "--shiki-dark": "#B392F0",
  })}"> customPrompt</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">    return</span><span style="${ssrRenderStyle({
    "--shiki-light": "#032F62",
    "--shiki-dark": "#9ECBFF",
  })}"> &quot;YourName@aos&gt; &quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">end</span></span></code></pre></div>Customize <code>&quot;YourName@aos&gt; &quot;</code> to your preferred prompt text.</li></ul><h2 id="step-3-overwrite-the-default-prompt" tabindex="-1">Step 3: Overwrite the Default Prompt <a class="header-anchor" href="#step-3-overwrite-the-default-prompt" aria-label="Permalink to &quot;Step 3: Overwrite the Default Prompt&quot;">​</a></h2><ul><li>Next, overwrite the existing <code>Prompt</code> function with your new function:<div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="${ssrRenderStyle(
    { "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" },
  )}">Prompt </span><span style="${ssrRenderStyle({
    "--shiki-light": "#D73A49",
    "--shiki-dark": "#F97583",
  })}">=</span><span style="${ssrRenderStyle({
    "--shiki-light": "#24292E",
    "--shiki-dark": "#E1E4E8",
  })}"> customPrompt</span></span></code></pre></div></li></ul><h2 id="step-4-exit-and-run-your-code" tabindex="-1">Step 4: Exit and Run Your Code <a class="header-anchor" href="#step-4-exit-and-run-your-code" aria-label="Permalink to &quot;Step 4: Exit and Run Your Code&quot;">​</a></h2><ul><li>To exit the editor and execute your code, type <code>.done</code> and then press Enter.</li><li>Your aos prompt should now display the new custom format.</li></ul><h2 id="step-5-save-for-future-use-optional" tabindex="-1">Step 5: Save for Future Use (Optional) <a class="header-anchor" href="#step-5-save-for-future-use-optional" aria-label="Permalink to &quot;Step 5: Save for Future Use (Optional)&quot;">​</a></h2><ul><li>If you wish to use this prompt in future aos sessions, save your script in a Lua file.</li><li>In subsequent sessions, load this script to apply your custom prompt.</li></ul><h2 id="additional-guidance" tabindex="-1">Additional Guidance: <a class="header-anchor" href="#additional-guidance" aria-label="Permalink to &quot;Additional Guidance:&quot;">​</a></h2><ul><li><strong>Creativity in Prompt Design</strong>: You&#39;re encouraged to incorporate various elements into your prompt, including dynamic data, special symbols, or colors.</li><li><strong>Syntax Accuracy</strong>: Ensure correct Lua syntax to avoid any errors in your prompt.</li><li><strong>Reverting Back</strong>: To return to the original prompt, restart aos or reset <code>Prompt</code> to its default function.</li></ul><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>This tutorial guides you through customizing your aos prompt, enhancing your command-line interface experience. Experiment with different styles and functionalities to create a prompt that best fits your needs in the aos environment.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "guides/tutorials/prompt.md",
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prompt = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);
export { __pageData, prompt as default };
