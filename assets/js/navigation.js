"use strict";

function goPage(page) {
  if (!page) return;
  window.location.href = page;
}

(function () {
  var pageMap = {
    "dashboard.html": "dashboard.html",
    "wallet.html": "wallet.html",
    "deposit.html": "wallet.html",
    "withdraw.html": "wallet.html",
    "team.html": "team.html",
    "tasks.html": "tasks.html",
    "report.html": "report.html"
  };

  function normalizeButton(button) {
    if (button.getAttribute("data-nav-normalized") === "1") return;

    var spans = button.querySelectorAll(":scope > span");
    if (spans.length >= 2) {
      spans[0].classList.add("nav-icon");
      spans[spans.length - 1].classList.add("nav-label");
    } else {
      var text = String(button.textContent || "").replace(/\s+/g, " ").trim();
      var iconMatch = text.match(/^(\p{Extended_Pictographic}(?:\uFE0F)?)/u);
      var icon = iconMatch ? iconMatch[1] : "•";
      var label = text.replace(icon, "").trim();
      button.textContent = "";

      var iconSpan = document.createElement("span");
      iconSpan.className = "nav-icon";
      iconSpan.textContent = icon;

      var labelSpan = document.createElement("span");
      labelSpan.className = "nav-label";
      labelSpan.textContent = label;

      button.appendChild(iconSpan);
      button.appendChild(labelSpan);
    }

    button.setAttribute("data-nav-normalized", "1");
  }

  function inferPage(button) {
    var page = button.getAttribute("data-page");
    if (page) return page;
    var inline = button.getAttribute("onclick") || "";
    var match = inline.match(/goPage\(['\"]([^'\"]+)['\"]\)/);
    return match ? match[1] : "";
  }



  function enforceViewportFixedNav() {
    var nav = document.querySelector(".bottom-nav");
    if (!nav) return;

    // A transformed ancestor can make position:fixed behave like an ordinary
    // element in Android WebViews. Keep the nav directly under body and clear
    // transforms from the viewport roots.
    if (nav.parentElement !== document.body) {
      document.body.appendChild(nav);
    }

    document.documentElement.style.transform = "none";
    document.body.style.transform = "none";
    nav.style.position = "fixed";
    nav.style.top = "auto";
    nav.style.bottom = "0";
    nav.style.zIndex = "2147483000";
  }

  function bindNavigation() {
    var nav = document.querySelector(".bottom-nav");
    if (!nav) return;

    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", nav.getAttribute("aria-label") || "Main navigation");

    var current = location.pathname.split("/").pop() || "dashboard.html";
    var expected = pageMap[current] || current;
    var buttons = nav.querySelectorAll("button");

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      normalizeButton(button);
      var target = inferPage(button);

      if (target && target === expected) button.classList.add("active");
      else if (target) button.classList.remove("active");

      if (target) {
        button.setAttribute("data-page", target);
        button.setAttribute("aria-current", target === expected ? "page" : "false");
      }

      if (button.getAttribute("data-navigation-ready") !== "1") {
        button.setAttribute("data-navigation-ready", "1");
        button.addEventListener("click", function () {
          var next = this.getAttribute("data-page");
          if (next) goPage(next);
        });
      }
    }

    enforceViewportFixedNav();
    document.documentElement.classList.add("shaye-floating-nav-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){ bindNavigation(); enforceViewportFixedNav(); });
  } else {
    bindNavigation();
  }
})();
