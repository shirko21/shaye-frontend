"use strict";

(function () {
  var CURRENT_USER_KEY = "shaye_current_user";

  function logoutUser() {
    var confirmed = window.confirm("آیا می‌خواهید از حساب کاربری خارج شوید؟");

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.replace("index.html");
  }

  function bindLogout() {
    var buttons = document.querySelectorAll("[data-logout]");

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", logoutUser);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLogout);
  } else {
    bindLogout();
  }
})();