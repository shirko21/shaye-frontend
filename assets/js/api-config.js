"use strict";

(function (global) {
  var existing = global.SHAYE_API_CONFIG || {};
  var savedBaseUrl = "";

  try {
    savedBaseUrl = localStorage.getItem("shaye_api_base_url") || "";
  } catch (error) {
    console.warn("Could not read the saved API address.", error);
  }

  global.SHAYE_API_CONFIG = {
    baseUrl:
      String(existing.baseUrl || savedBaseUrl || "http://localhost:3000/api")
        .trim()
        .replace(/\/+$/, ""),
    timeoutMs: Number(existing.timeoutMs) || 15000
  };
})(window);
