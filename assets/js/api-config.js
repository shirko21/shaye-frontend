"use strict";

(function (global) {
  var TEST_API_BASE_URL =
    "https://refactored-train-9vvj99975wy2x75q-3000.app.github.dev/api";
  var existing = global.SHAYE_API_CONFIG || {};
  var savedBaseUrl = "";
  var isPublishedGithubPages =
    global.location &&
    global.location.hostname === "shirko21.github.io";

  try {
    savedBaseUrl = localStorage.getItem("shaye_api_base_url") || "";

    // A stale localhost/testing override must not break the published site.
    if (isPublishedGithubPages && savedBaseUrl) {
      localStorage.removeItem("shaye_api_base_url");
      savedBaseUrl = "";
    }
  } catch (error) {
    console.warn("Could not read the saved API address.", error);
  }

  global.SHAYE_API_CONFIG = {
    baseUrl:
      String(
        existing.baseUrl ||
          savedBaseUrl ||
          TEST_API_BASE_URL
      )
        .trim()
        .replace(/\/+$/, ""),
    timeoutMs: Number(existing.timeoutMs) || 15000
  };
})(window);
