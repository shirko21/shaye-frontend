"use strict";

const USERS_KEY = "shaye_users";
const CURRENT_USER_KEY = "shaye_current_user";

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

function createReferralCode(email, users) {
  const base =
    normalizeEmail(email)
      .split("@")[0]
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 6)
      .toUpperCase() || "USER";

  let code = "";

  do {
    code = "SH" + base + Math.floor(1000 + Math.random() * 9000);
  } while (
    users.some(function (user) {
      return String(user.referralCode || "").toUpperCase() === code;
    })
  );

  return code;
}

function findReferrer(users, inviteCode) {
  const normalizedCode = String(inviteCode || "").trim().toUpperCase();

  if (!normalizedCode) return null;

  return (
    users.find(function (user) {
      return (
        String(user.referralCode || "").trim().toUpperCase() === normalizedCode
      );
    }) || null
  );
}

function migrateUser(user, users) {
  let changed = false;

  if (!user.referralCode) {
    user.referralCode = createReferralCode(user.email, users);
    changed = true;
  }

  if (typeof user.referredBy !== "string") {
    user.referredBy = "";
    changed = true;
  }

  if (typeof user.investmentBalance !== "number") {
    user.investmentBalance =
      Number(user.investment) || Number(user.investedBalance) || 0;
    changed = true;
  }

  if (typeof user.withdrawBalance !== "number") {
    user.withdrawBalance =
      Number(user.withdrawableBalance) ||
      Number(user.profit) ||
      Number(user.balance) ||
      0;
    changed = true;
  }

  if (typeof user.referralProfit !== "number") {
    user.referralProfit = 0;
    changed = true;
  }

  if (typeof user.dailyProfit !== "number") {
    user.dailyProfit = 0;
    changed = true;
  }

  if (!Array.isArray(user.transactions)) {
    user.transactions = [];
    changed = true;
  }

  return changed;
}

function showLogin() {
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("registerForm").classList.remove("active");

  const tabs = document.querySelectorAll(".tab");
  tabs[0].classList.add("active");
  tabs[1].classList.remove("active");

  showMessage("", "");
}

function showRegister() {
  document.getElementById("registerForm").classList.add("active");
  document.getElementById("loginForm").classList.remove("active");

  const tabs = document.querySelectorAll(".tab");
  tabs[1].classList.add("active");
  tabs[0].classList.remove("active");

  showMessage("", "");
}

function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;

  input.type = input.type === "password" ? "text" : "password";
}

function loginUser(event) {
  event.preventDefault();

  const email = normalizeEmail(document.getElementById("loginEmail").value);
  const password = document.getElementById("loginPassword").value;
  const users = loadUsers();

  showMessage("", "");

  if (!email || !password) {
    showMessage("لطفاً ایمیل و رمز عبور را وارد کنید.", "error");
    return;
  }

  const userIndex = users.findIndex(function (user) {
    return normalizeEmail(user.email) === email && user.password === password;
  });

  if (userIndex === -1) {
    showMessage("ایمیل یا رمز عبور اشتباه است.", "error");
    return;
  }

  const changed = migrateUser(users[userIndex], users);
  if (changed) saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, email);
  showMessage("ورود موفق بود؛ در حال انتقال به حساب...", "success");

  setTimeout(function () {
    window.location.href = "dashboard.html";
  }, 500);
}

function registerUser(event) {
  event.preventDefault();

  const email = normalizeEmail(document.getElementById("registerEmail").value);
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const inviteCode = document.getElementById("inviteCode").value.trim();
  const users = loadUsers();

  showMessage("", "");

  if (!email || !password || !confirmPassword) {
    showMessage("لطفاً همه فیلدهای ضروری را کامل کنید.", "error");
    return;
  }

  if (!email.includes("@")) {
    showMessage("ایمیل واردشده معتبر نیست.", "error");
    return;
  }

  if (password.length < 4) {
    showMessage("رمز عبور باید حداقل ۴ کاراکتر باشد.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("رمز عبور و تکرار آن یکسان نیست.", "error");
    return;
  }

  if (
    users.some(function (user) {
      return normalizeEmail(user.email) === email;
    })
  ) {
    showMessage("این ایمیل قبلاً ثبت شده است.", "error");
    return;
  }

  const referrer = findReferrer(users, inviteCode);

  if (inviteCode && !referrer) {
    showMessage("کد دعوت واردشده معتبر نیست.", "error");
    return;
  }

  const now = new Date().toISOString();

  const newUser = {
    email: email,
    password: password,

    wallet: {
      address: "",
      network: "BEP20",
      status: "pending"
    },

    investmentBalance: 0,
    withdrawBalance: 0,
    activeVip: 0,
    referralProfit: 0,
    dailyProfit: 0,
    transactions: [],

    wheelSpins: 1,
    wheelSpinsUsed: 0,
    wheelHistory: [],
    wheelReferralRewards: [],

    referralCode: createReferralCode(email, users),
    referredBy: referrer ? normalizeEmail(referrer.email) : "",
    usedInviteCode: referrer ? String(referrer.referralCode || "") : "",

    vipActivatedAt: "",
    vipExpiresAt: "",
    lastTaskClaimId: "",
    lastTaskClaimedAt: "",
    profitDaysClaimed: 0,

    createdAt: now
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, email);

  showMessage("ثبت‌نام موفق بود؛ در حال ورود به حساب...", "success");

  setTimeout(function () {
    window.location.href = "dashboard.html";
  }, 500);
}

function prefillInviteCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("ref") || params.get("invite") || params.get("code");

  if (!code) return;

  const inviteInput = document.getElementById("inviteCode");
  if (inviteInput) {
    inviteInput.value = String(code).trim().toUpperCase();
    showRegister();
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
