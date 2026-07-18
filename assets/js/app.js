"use strict";

const USERS_KEY = "shaye_users";
const CURRENT_USER_KEY = "shaye_current_user";
const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]{3,32}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\s()-]{7,20}$/;

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function createAvailableUsername(email, users, currentUser) {
  let base = normalizeEmail(email)
    .split("@")[0]
    .replace(/[^a-zA-Z0-9_.-]/g, "")
    .slice(0, 24)
    .toLowerCase();

  if (base.length < 3) base = "user";

  let candidate = base;
  let suffix = 1;

  while (
    users.some(function (user) {
      return user !== currentUser && normalizeUsername(user.username) === candidate;
    })
  ) {
    candidate = (base + suffix).slice(0, 32);
    suffix += 1;
  }

  return candidate;
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

  if (!user.fullname) {
    user.fullname =
      String(user.name || "").trim() ||
      normalizeEmail(user.email).split("@")[0] ||
      "User";
    changed = true;
  }

  if (!user.username) {
    user.username = createAvailableUsername(user.email, users, user);
    changed = true;
  }

  if (typeof user.phone !== "string") {
    user.phone = "";
    changed = true;
  }

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

  if (users[userIndex].blocked) {
    showMessage("حساب شما توسط مدیریت مسدود شده است.", "error");
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

  const fullname = String(
    document.getElementById("registerFullname").value || ""
  ).trim();
  const username = normalizeUsername(
    document.getElementById("registerUsername").value
  );
  const email = normalizeEmail(document.getElementById("registerEmail").value);
  const phone = String(
    document.getElementById("registerPhone").value || ""
  ).trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const inviteCode = document.getElementById("inviteCode").value.trim();
  const users = loadUsers();

  showMessage("", "");

  if (!fullname || !username || !email || !password || !confirmPassword) {
    showMessage("لطفاً همه فیلدهای ضروری را کامل کنید.", "error");
    return;
  }

  if (fullname.length < 2 || fullname.length > 100) {
    showMessage("نام و نام خانوادگی باید بین ۲ تا ۱۰۰ کاراکتر باشد.", "error");
    return;
  }

  if (!USERNAME_PATTERN.test(username)) {
    showMessage(
      "نام کاربری باید ۳ تا ۳۲ کاراکتر و فقط شامل حروف انگلیسی، عدد، نقطه، خط تیره یا زیرخط باشد.",
      "error"
    );
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    showMessage("ایمیل واردشده معتبر نیست.", "error");
    return;
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    showMessage("شماره تلفن واردشده معتبر نیست.", "error");
    return;
  }

  if (password.length < 8) {
    showMessage("رمز عبور باید حداقل ۸ کاراکتر باشد.", "error");
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

  if (
    users.some(function (user) {
      return normalizeUsername(user.username) === username;
    })
  ) {
    showMessage("این نام کاربری قبلاً ثبت شده است.", "error");
    return;
  }

  const referrer = findReferrer(users, inviteCode);

  if (inviteCode && !referrer) {
    showMessage("کد دعوت واردشده معتبر نیست.", "error");
    return;
  }

  const now = new Date().toISOString();

  const newUser = {
    fullname: fullname,
    username: username,
    email: email,
    phone: phone,
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
