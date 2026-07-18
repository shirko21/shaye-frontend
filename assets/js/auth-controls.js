"use strict";

(function () {
  var USERS_KEY = "shaye_users";
  var CURRENT_USER_KEY = "shaye_current_user";
  var TOKEN_KEY = "shaye_auth_token";
  var API_USER_KEY = "shaye_api_user";

  function clearSession() {
    if (window.ShayeApi) {
      window.ShayeApi.clearSession();
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(API_USER_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  function logoutUser() {
    var confirmed = window.confirm("آیا می‌خواهید از حساب کاربری خارج شوید؟");

    if (!confirmed) return;

    clearSession();
    window.location.replace("index.html");
  }

  function updateCachedIdentity(apiUser) {
    if (!apiUser || !apiUser.email) return;

    try {
      var users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      if (!Array.isArray(users)) users = [];

      var email = String(apiUser.email).trim().toLowerCase();
      var index = users.findIndex(function (user) {
        return String(user.email || "").trim().toLowerCase() === email;
      });

      if (index === -1) return;

      users[index].id = apiUser.id;
      users[index].fullname = apiUser.fullname || users[index].fullname;
      users[index].username = apiUser.username || users[index].username;
      users[index].phone = apiUser.phone || "";
      users[index].status = apiUser.status || "active";
      users[index].referralCode =
        apiUser.referral_code || users[index].referralCode || "";
      users[index].referredBy =
        apiUser.referred_by_email || users[index].referredBy || "";

      delete users[index].password;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_USER_KEY, email);
    } catch (error) {
      console.warn("Could not refresh the local user cache.", error);
    }
  }

  async function validateSession() {
    if (!window.ShayeApi || !window.ShayeApi.hasSession()) {
      clearSession();
      window.location.replace("login.html");
      return;
    }

    try {
      var result = await window.ShayeApi.getProfile();
      window.ShayeApi.saveUser(result.user);
      updateCachedIdentity(result.user);
    } catch (error) {
      if (
        error &&
        (error.status === 401 || error.code === "UNAUTHORIZED")
      ) {
        clearSession();
        window.location.replace("login.html");
        return;
      }

      console.warn("Session could not be refreshed.", error);
    }
  }

  function bindLogout() {
    var buttons = document.querySelectorAll("[data-logout]");

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", logoutUser);
    }

    validateSession();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLogout);
  } else {
    bindLogout();
  }
})();
