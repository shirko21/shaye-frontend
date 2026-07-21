"use strict";

const USERS_KEY = "shaye_users";
const CURRENT_USER_KEY = "shaye_current_user";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function loadUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("خطا در خواندن کاربران:", error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showMessage(text, type) {
  const message = document.getElementById("message");
  if (!message) return;

  message.textContent = text;
  message.className = type || "";
}

function createCachedUser(apiUser) {
  const now = apiUser.created_at || new Date().toISOString();

  return {
    id: apiUser.id,
    fullname: apiUser.fullname || normalizeEmail(apiUser.email).split("@")[0],
    username: apiUser.username || "",
    email: normalizeEmail(apiUser.email),
    phone: apiUser.phone || "",
    balance: Number(apiUser.balance) || 0,
    isAdmin: Boolean(apiUser.is_admin),
    status: apiUser.status || "active",

    wallet: {
      address: "",
      network: "BEP20",
      status: "pending"
    },

    investmentBalance: 0,
    withdrawBalance: Number(apiUser.balance) || 0,
    activeVip: 0,
    referralProfit: 0,
    dailyProfit: 0,
    transactions: [],

    wheelSpins: 1,
    wheelSpinsUsed: 0,
    wheelHistory: [],
    wheelReferralRewards: [],

    referralCode: apiUser.referral_code || "",
    referredBy: apiUser.referred_by_email || "",
    usedInviteCode: "",

    vipActivatedAt: "",
    vipExpiresAt: "",
    lastTaskClaimId: "",
    lastTaskClaimedAt: "",
    profitDaysClaimed: 0,

    createdAt: now
  };
}

function syncApiUser(apiUser, options) {
  if (!apiUser || !apiUser.email) {
    throw new Error("API user is missing an email address");
  }

  const users = loadUsers();
  const email = normalizeEmail(apiUser.email);
  const index = users.findIndex(function (user) {
    return normalizeEmail(user.email) === email;
  });
  const user = index === -1 ? createCachedUser(apiUser) : users[index];

  user.id = apiUser.id;
  user.fullname = apiUser.fullname || user.fullname || email.split("@")[0];
  user.username = apiUser.username || user.username || "";
  user.email = email;
  user.phone = apiUser.phone || "";
  user.balance = Number(apiUser.balance) || 0;
  user.isAdmin = Boolean(apiUser.is_admin);
  user.status = apiUser.status || "active";
  user.referralCode =
    apiUser.referral_code || apiUser.referralCode || user.referralCode || "";
  user.referredBy =
    apiUser.referred_by_email || apiUser.referredByEmail || user.referredBy || "";

  if (options && options.inviteCode) {
    user.usedInviteCode = String(options.inviteCode).trim().toUpperCase();
  }

  if (!user.createdAt) {
    user.createdAt = apiUser.created_at || new Date().toISOString();
  }

  delete user.password;

  if (index === -1) users.push(user);
  else users[index] = user;

  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, email);
  return user;
}

function setSubmitting(form, submitting, loadingText) {
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  if (!button) return;

  if (!button.dataset.originalText) {
    button.dataset.originalText = button.textContent;
  }

  button.disabled = submitting;
  button.textContent = submitting
    ? loadingText
    : button.dataset.originalText;
}

function apiErrorMessage(error) {
  if (window.ShayeApi) return window.ShayeApi.getErrorMessage(error);
  return "ارتباط با سرور آماده نیست. لطفاً دوباره تلاش کنید.";
}

function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (!loginForm || !registerForm) return;

  loginForm.classList.add("active");
  registerForm.classList.remove("active");

  const tabs = document.querySelectorAll(".tab");
  if (tabs.length >= 2) {
    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
  }

  showMessage("", "");
}

function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (!loginForm || !registerForm) return;

  registerForm.classList.add("active");
  loginForm.classList.remove("active");

  const tabs = document.querySelectorAll(".tab");
  if (tabs.length >= 2) {
    tabs[1].classList.add("active");
    tabs[0].classList.remove("active");
  }

  showMessage("", "");
}

function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;

  input.type = input.type === "password" ? "text" : "password";
}

async function loginUser(event) {
  event.preventDefault();

  const form = event.currentTarget || document.getElementById("loginForm");
  const email = normalizeEmail(document.getElementById("loginEmail").value);
  const password = document.getElementById("loginPassword").value;

  showMessage("", "");

  if (!email || !password) {
    showMessage("لطفاً ایمیل و رمز عبور را وارد کنید.", "error");
    return;
  }

  if (!window.ShayeApi) {
    showMessage("ارتباط با سرور آماده نیست.", "error");
    return;
  }

  setSubmitting(form, true, "در حال ورود...");

  try {
    const result = await window.ShayeApi.login({ email, password });
    window.ShayeApi.saveSession(result);
    syncApiUser(result.user);

    showMessage("ورود موفق بود؛ در حال انتقال به حساب...", "success");

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 500);
  } catch (error) {
    console.error("Login error:", error);
    showMessage(apiErrorMessage(error), "error");
  } finally {
    setSubmitting(form, false, "");
  }
}

async function registerUser(event) {
  event.preventDefault();

  const form = event.currentTarget || document.getElementById("registerForm");
  const email = normalizeEmail(document.getElementById("registerEmail").value);
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const inviteCode = document.getElementById("inviteCode").value.trim();

  showMessage("", "");

  if (!email || !password || !confirmPassword) {
    showMessage("لطفاً همه فیلدهای ضروری را کامل کنید.", "error");
    return;
  }

  if (email.length > 150 || !EMAIL_PATTERN.test(email)) {
    showMessage("ایمیل واردشده معتبر نیست.", "error");
    return;
  }

  if (password.length < 8 || password.length > 128) {
    showMessage("رمز عبور باید بین ۸ تا ۱۲۸ کاراکتر باشد.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("رمز عبور و تکرار آن یکسان نیست.", "error");
    return;
  }

  if (!window.ShayeApi) {
    showMessage("ارتباط با سرور آماده نیست.", "error");
    return;
  }

  setSubmitting(form, true, "در حال ثبت‌نام...");

  try {
    const result = await window.ShayeApi.register({
      email,
      password,
      inviteCode: inviteCode ? inviteCode.toUpperCase() : ""
    });

    window.ShayeApi.saveSession(result);
    syncApiUser(result.user, { inviteCode });

    showMessage("ثبت‌نام موفق بود؛ در حال ورود به حساب...", "success");

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 500);
  } catch (error) {
    console.error("Register error:", error);
    showMessage(apiErrorMessage(error), "error");
  } finally {
    setSubmitting(form, false, "");
  }
}

function prefillInviteCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref") || params.get("invite") || params.get("code");

  if (!code) return;

  const inviteInput = document.getElementById("inviteCode");
  if (inviteInput) {
    inviteInput.value = String(code).trim().toUpperCase();
    if (
      document.getElementById("loginForm") &&
      document.getElementById("registerForm")
    ) {
      showRegister();
    }
  }
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(function () {
    loader.classList.add("hide");
  }, 650);
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) loginForm.addEventListener("submit", loginUser);
  if (registerForm) registerForm.addEventListener("submit", registerUser);

  prefillInviteCode();
  hideLoader();
});
