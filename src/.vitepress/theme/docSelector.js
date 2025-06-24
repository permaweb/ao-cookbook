/*
 * DocSelector Component Loader
 * Background preloading implementation for instant rendering
 * Loads component on ANY page, shows/hides instantly based on navigation
 */

// State management
let debounceTimer = null;
let observer = null;
let isDocSelectorVisible = false;
let currentPath = "";
let componentReady = false;
let componentElements = [];

// VitePress theme detection
function detectTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

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
  theme: detectTheme(),
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

  const script = document.createElement("script");
  script.src =
    "https://arweave.net/WrQd8ePNa8lzjN4DEiOuOL635km5qCcB3P-rcnnzm9U";
  script.async = true;

  script.onload = () => {
    console.log("DocSelector loaded in background");

    // Give component time to initialize
    setTimeout(() => {
      componentReady = true;

      // Apply initial visibility based on current page
      if (shouldShowDocSelector()) {
        showDocSelector();
      } else {
        hideDocSelector();
        console.log("DocSelector preloaded and hidden on index page");
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
      console.log("Component not ready yet, navigation will apply when ready");
      return;
    }

    if (shouldShowDocSelector(newPath)) {
      if (!isDocSelectorVisible) {
        showDocSelector();
      }
    } else {
      if (isDocSelectorVisible) {
        hideDocSelector();
      }
    }
  }
}

// Update theme for preloaded component
function updateTheme() {
  const newTheme = detectTheme();

  if (newTheme !== window.DocSelectorConfig.theme) {
    console.log(
      `Theme change: ${window.DocSelectorConfig.theme} → ${newTheme}`,
    );
    window.DocSelectorConfig.theme = newTheme;

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      // Try to update via API first
      if (
        window.DocSelectorComponent &&
        typeof window.DocSelectorComponent.updateTheme === "function"
      ) {
        try {
          window.DocSelectorComponent.updateTheme(newTheme);
          console.log(`Updated theme to ${newTheme} via API`);
          return;
        } catch (error) {
          console.log("API update failed, will reload");
        }
      }

      // Fallback: reload component (it will maintain visibility state)
      const wasVisible = isDocSelectorVisible;

      // Clean up previous instance
      const existingScripts = document.querySelectorAll(
        'script[src*="WrQd8ePNa8lzjN4DEiOuOL635km5qCcB3P-rcnnzm9U"]',
      );
      existingScripts.forEach((script) => script.remove());

      // Clear component elements
      if (componentElements.length > 0) {
        componentElements.forEach((el) => el.remove());
        componentElements = [];
      }

      // Reset state
      componentReady = false;
      isDocSelectorVisible = false;

      // Reload in background
      setTimeout(() => {
        loadDocSelectorInBackground();

        // Restore visibility state after reload
        if (wasVisible) {
          setTimeout(() => {
            if (shouldShowDocSelector()) {
              showDocSelector();
            }
          }, 300);
        }
      }, 50);
    }, 150);
  }
}

// Initialize with background preloading
function initialize() {
  currentPath = window.location.pathname;

  // ALWAYS load DocSelector in background (even on index page)
  loadDocSelectorInBackground();

  // Set up theme change detection
  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver(() => updateTheme());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Navigation detection
  window.addEventListener("popstate", handleNavigation);

  // SPA navigation polling (lightweight since we're just comparing strings)
  setInterval(handleNavigation, 300);

  // Cleanup
  window.addEventListener("beforeunload", () => {
    if (observer) observer.disconnect();
  });

  console.log("DocSelector background preloading initialized");
}

// Start immediately
initialize();
