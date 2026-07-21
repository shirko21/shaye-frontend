"use strict";

(function (global) {
  var TOKEN_KEY = "shaye_auth_token";
  var API_USER_KEY = "shaye_api_user";
  var CURRENT_USER_KEY = "shaye_current_user";

  function ApiError(message, status, code, details) {
    this.name = "ApiError";
    this.message = message || "API request failed";
    this.status = Number(status) || 0;
    this.code = code || "API_ERROR";
    this.details = details || null;
  }

  ApiError.prototype = Object.create(Error.prototype);
  ApiError.prototype.constructor = ApiError;

  function getConfig() {
    return global.SHAYE_API_CONFIG || {};
  }

  function getBaseUrl() {
    var baseUrl = String(getConfig().baseUrl || "")
      .trim()
      .replace(/\/+$/, "");

    if (!/^https?:\/\//i.test(baseUrl)) {
      throw new ApiError(
        "API base URL is not configured",
        0,
        "API_NOT_CONFIGURED"
      );
    }

    return baseUrl;
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY) || "";
  }

  function getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem(API_USER_KEY)) || null;
    } catch (error) {
      return null;
    }
  }

  function saveUser(user) {
    if (!user || !user.email) {
      throw new ApiError("API user is missing", 0, "INVALID_API_RESPONSE");
    }

    localStorage.setItem(API_USER_KEY, JSON.stringify(user));
    localStorage.setItem(
      CURRENT_USER_KEY,
      String(user.email).trim().toLowerCase()
    );
  }

  function saveSession(payload) {
    if (!payload || !payload.token || !payload.user) {
      throw new ApiError(
        "Authentication response is incomplete",
        0,
        "INVALID_API_RESPONSE"
      );
    }

    localStorage.setItem(TOKEN_KEY, String(payload.token));
    saveUser(payload.user);
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(API_USER_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  async function request(path, options) {
    options = options || {};

    if (typeof global.fetch !== "function") {
      throw new ApiError(
        "Fetch API is unavailable",
        0,
        "FETCH_UNAVAILABLE"
      );
    }

    var headers = {
      Accept: "application/json"
    };

    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    if (options.auth) {
      var token = getToken();

      if (!token) {
        throw new ApiError("Authentication is required", 401, "UNAUTHORIZED");
      }

      headers.Authorization = "Bearer " + token;
    }

    var controller =
      typeof global.AbortController === "function"
        ? new global.AbortController()
        : null;
    var timeoutMs = Number(getConfig().timeoutMs) || 15000;
    var timeoutId = null;

    if (controller) {
      timeoutId = global.setTimeout(function () {
        controller.abort();
      }, timeoutMs);
    }

    var response;

    try {
      response = await global.fetch(getBaseUrl() + path, {
        method: options.method || "GET",
        headers: headers,
        body:
          options.body === undefined
            ? undefined
            : JSON.stringify(options.body),
        signal: controller ? controller.signal : undefined
      });
    } catch (error) {
      if (timeoutId) global.clearTimeout(timeoutId);

      if (error && error.name === "AbortError") {
        throw new ApiError("Request timed out", 0, "REQUEST_TIMEOUT");
      }

      if (error instanceof ApiError) throw error;

      throw new ApiError(
        "Could not connect to the server",
        0,
        "NETWORK_ERROR",
        error
      );
    }

    if (timeoutId) global.clearTimeout(timeoutId);

    var payload = null;

    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      var code = payload && payload.code
        ? String(payload.code)
        : "HTTP_" + response.status;

      if (
        response.status === 401 &&
        options.auth &&
        options.clearOnUnauthorized !== false
      ) {
        clearSession();
      }

      throw new ApiError(
        payload && payload.message
          ? String(payload.message)
          : "API request failed",
        response.status,
        code,
        payload
      );
    }

    if (!payload || typeof payload !== "object") {
      throw new ApiError(
        "API returned an invalid response",
        response.status,
        "INVALID_API_RESPONSE"
      );
    }

    return payload;
  }

  function register(input) {
    var body = {
      email: input.email,
      password: input.password
    };

    if (input.inviteCode) body.inviteCode = input.inviteCode;

    return request("/auth/register", {
      method: "POST",
      body: body
    });
  }

  function login(input) {
    return request("/auth/login", {
      method: "POST",
      body: {
        email: input.email,
        password: input.password
      }
    });
  }

  function getProfile() {
    return request("/user/profile", {
      auth: true
    });
  }

  function verifyPassword(password) {
    return request("/auth/verify-password", {
      method: "POST",
      auth: true,
      clearOnUnauthorized: false,
      body: { password: password }
    });
  }

  function getErrorMessage(error) {
    var messages = {
      API_NOT_CONFIGURED: "آدرس سرور هنوز تنظیم نشده است.",
      FETCH_UNAVAILABLE: "مرورگر شما امکان اتصال به سرور را ندارد.",
      NETWORK_ERROR: "ارتباط با سرور برقرار نشد. اینترنت و آدرس API را بررسی کنید.",
      REQUEST_TIMEOUT: "پاسخ سرور طول کشید. دوباره تلاش کنید.",
      INVALID_API_RESPONSE: "پاسخ سرور معتبر نبود.",
      EMAIL_EXISTS: "این ایمیل قبلاً ثبت شده است.",
      INVALID_INVITE_CODE: "کد دعوت واردشده معتبر نیست.",
      INVALID_CREDENTIALS: "ایمیل یا رمز عبور اشتباه است.",
      ACCOUNT_INACTIVE: "حساب شما فعال نیست.",
      INVALID_PASSWORD: "گذرواژه واردشده نادرست است.",
      UNAUTHORIZED: "نشست شما پایان یافته است؛ دوباره وارد شوید."
    };

    if (error && messages[error.code]) return messages[error.code];
    return "عملیات انجام نشد. لطفاً دوباره تلاش کنید.";
  }

  global.ShayeApi = {
    TOKEN_KEY: TOKEN_KEY,
    API_USER_KEY: API_USER_KEY,
    CURRENT_USER_KEY: CURRENT_USER_KEY,
    ApiError: ApiError,
    request: request,
    register: register,
    login: login,
    getProfile: getProfile,
    verifyPassword: verifyPassword,
    getToken: getToken,
    hasSession: function () {
      return Boolean(getToken());
    },
    getStoredUser: getStoredUser,
    saveUser: saveUser,
    saveSession: saveSession,
    clearSession: clearSession,
    getErrorMessage: getErrorMessage
  };
})(window);
