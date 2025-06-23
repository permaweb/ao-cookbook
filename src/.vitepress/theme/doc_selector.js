/*
 * DocSelector Component Loader
 * Loads the standalone DocSelector component from Arweave
 * Configure for each cookbook by updating the currentCookbook and links below.
 */

// Configuration for the DocSelector component
window.DocSelectorConfig = {
  currentCookbook: "AO", // AO, HYPERBEAM, ARWEAVE
  links: {
    AO: "https://cookbook_ao.arweave.net/welcome/ao-core-introduction.html",
    HYPERBEAM:
      "https://hyperbeam.arweave.net/build/introduction/what-is-hyperbeam.html",
    ARWEAVE: "https://cookbook.arweave.net/getting-started/index.html",
  },
};

// Load the DocSelector component from Arweave
(function loadDocSelector() {
  // Create and inject the script tag
  const script = document.createElement("script");
  script.src =
    "https://arweave.net/iBGiiqdp3fXEwh72vggiEcEfCGoZciMwueNPDg9M89g";
  script.async = true;
  script.onload = () => {
    console.log("DocSelector component loaded successfully from Arweave");
  };
  script.onerror = () => {
    console.error("Failed to load DocSelector component from Arweave");
  };

  // Add the script to the document head
  document.head.appendChild(script);
})();
