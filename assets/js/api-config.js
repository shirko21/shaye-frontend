"use strict";

(function (global) {
  var TEST_API_BASE_URL =
    "https://refactored-train-9vvj99975wy2x75q-3000.app.github.dev/api";
  var existing = global.SHAYE_API_CONFIG || {};
  var savedBaseUrl = "";
  var hostname =
    global.location && global.location.hostname
      ? global.location.hostname
      : "";
  var isPublishedGithubPages = hostname === "shirko21.github.io";
  var isCodespacesPreview = /\.app\.github\.dev$/i.test(hostname);

  try {
    savedBaseUrl = localStorage.getItem("shaye_api_base_url") || "";

    // Stale development overrides must not break the published site.
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
        isCodespacesPreview
          ? global.location.origin + "/api"
          : existing.baseUrl || savedBaseUrl || TEST_API_BASE_URL
      )
        .trim()
        .replace(/\/+$/, ""),
    timeoutMs: Number(existing.timeoutMs) || 15000
  };
})(window);
