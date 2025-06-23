/*
 * DocSelector Component Loader
 * Loads the standalone DocSelector component from Arweave
 * Configure for each cookbook by updating the currentCookbook and links below.
 */

// Configuration for the DocSelector component
window.DocSelectorConfig = {
  currentCookbook: "AO", // AO, HYPERBEAM, ARWEAVE
  links: {
    AO: "/",
    HYPERBEAM: "https://hyperbeam.arweave.net/",
    ARWEAVE: "https://cookbook.arweave.net/",
  },
};

// Load the DocSelector component from Arweave
(function loadDocSelector() {
  // Create and inject the script tag
  const script = document.createElement("script");
  script.src =
    "https://arweave.net/WauaqtQwCTnyEzxpr-lF6N5_0UOlLkz7GosdoHWfBqI";
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
