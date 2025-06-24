/*
 * DocSelector Component Loader
 * Background preloading implementation for instant rendering
 * Loads component on ANY page, shows/hides instantly based on navigation
 */

// Only run in browser environment
if (typeof window !== "undefined") {
  // State management
  let isDocSelectorVisible = false;
  let currentPath = "";
  let componentReady = false;
  let componentElements = [];

  // Check if current page should show DocSelector
  function shouldShowDocSelector(pathname = window.location.pathname) {
    return !(pathname === "/" || pathname === "/index.html");
  }

  // Configuration
  window.DocSelectorConfig = {
    currentCookbook: "AO", // AO, HYPERBEAM, ARWEAVE
    links: {
      AO: "https://cookbook_ao.arweave.net/welcome/ao-core-introduction.html",
      HYPERBEAM:
        "https://hyperbeam.arweave.net/build/introduction/what-is-hyperbeam.html",
      ARWEAVE: "https://cookbook.arweave.net/getting-started/index.html",
    },
    theme: "auto",
  };

  // Find all DocSelector elements
  function findComponentElements() {
    const selectors = [
      '[data-doc-selector="true"]',
      "[data-doc-selector]",
      ".doc-selector",
      "#doc-selector",
      '[class*="doc-selector"]',
      '[id*="doc-selector"]',
    ];

    componentElements = [];
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => componentElements.push(el));
    });

    return componentElements.length > 0;
  }

  // Instantly hide DocSelector
  function hideDocSelector() {
    if (findComponentElements()) {
      componentElements.forEach((el) => {
        el.style.display = "none";
      });
      console.log(
        `Instantly hid ${componentElements.length} DocSelector elements`,
      );
    }
    isDocSelectorVisible = false;
  }

  // Instantly show DocSelector
  function showDocSelector() {
    if (findComponentElements()) {
      componentElements.forEach((el) => {
        el.style.display = "";
      });
      console.log(
        `Instantly showed ${componentElements.length} DocSelector elements`,
      );
      isDocSelectorVisible = true;
    } else if (componentReady) {
      // Component should be ready but elements not found - wait a bit
      setTimeout(() => {
        if (findComponentElements()) {
          componentElements.forEach((el) => {
            el.style.display = "";
          });
          isDocSelectorVisible = true;
        }
      }, 100);
    }
  }

  // Load DocSelector script in background (always)
  function loadDocSelectorInBackground() {
    console.log("Loading DocSelector in background...");

    // Pre-emptively add CSS to hide DocSelector on index page
    if (!shouldShowDocSelector()) {
      const style = document.createElement("style");
      style.id = "doc-selector-hide";
      style.textContent = `
        [data-doc-selector="true"],
        [data-doc-selector],
        .doc-selector,
        #doc-selector,
        [class*="doc-selector"],
        [id*="doc-selector"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      console.log("Added CSS to pre-hide DocSelector on index page");
    }

    const script = document.createElement("script");
    script.src =
      "https://arweave.net/uUdfnAHLxvRswVdGTiLg4_RXYUIb_4BvyTxVQ8m1X28";
    script.async = true;

    script.onload = () => {
      console.log("DocSelector loaded in background");

      // IMMEDIATELY hide on index page to prevent flash
      if (!shouldShowDocSelector()) {
        // Use a small delay to ensure component has rendered
        setTimeout(() => {
          hideDocSelector();
          console.log("DocSelector immediately hidden on index page");
        }, 50);
      }

      // Give component time to initialize before setting ready state
      setTimeout(() => {
        componentReady = true;

        // Apply final visibility state based on current page
        if (shouldShowDocSelector()) {
          // Remove hide CSS if moving to non-index page
          const hideStyle = document.getElementById("doc-selector-hide");
          if (hideStyle) {
            hideStyle.remove();
          }
          showDocSelector();
        } else {
          // Ensure it stays hidden (redundant but safe)
          hideDocSelector();
        }
      }, 200);
    };

    script.onerror = () => {
      console.error("Failed to load DocSelector in background");
    };

    document.head.appendChild(script);
  }

  // Handle navigation changes (instant show/hide)
  function handleNavigation() {
    const newPath = window.location.pathname;

    if (newPath !== currentPath) {
      console.log(`Navigation: ${currentPath} → ${newPath}`);
      currentPath = newPath;

      if (!componentReady) {
        console.log(
          "Component not ready yet, navigation will apply when ready",
        );
        return;
      }

      if (shouldShowDocSelector(newPath)) {
        if (!isDocSelectorVisible) {
          // Remove hide CSS when showing DocSelector
          const hideStyle = document.getElementById("doc-selector-hide");
          if (hideStyle) {
            hideStyle.remove();
          }
          showDocSelector();
        }
      } else {
        if (isDocSelectorVisible) {
          hideDocSelector();
        }
        // Add hide CSS when on index page
        if (!document.getElementById("doc-selector-hide")) {
          const style = document.createElement("style");
          style.id = "doc-selector-hide";
          style.textContent = `
            [data-doc-selector="true"],
            [data-doc-selector],
            .doc-selector,
            #doc-selector,
            [class*="doc-selector"],
            [id*="doc-selector"] {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
        }
      }
    }
  }

  // Initialize with background preloading
  function initialize() {
    currentPath = window.location.pathname;

    // ALWAYS load DocSelector in background (even on index page)
    loadDocSelectorInBackground();

    // Navigation detection
    window.addEventListener("popstate", handleNavigation);

    // SPA navigation polling (lightweight since we're just comparing strings)
    setInterval(handleNavigation, 300);

    console.log("DocSelector background preloading initialized");
  }

  // Start immediately
  initialize();
} // End of browser-only code block
