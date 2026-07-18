"use strict";

(function () {
  var USERS_KEY = "shaye_users";
  var CURRENT_USER_KEY = "shaye_current_user";
  var colors = ["#2ad382", "#ffc857", "#7298ff", "#e87ad8", "#52d9e6", "#ff7b7b", "#9d7cff", "#ff9f5a", "#67d59b", "#f16f9d", "#79b8ff", "#d7d75f"];
  var config = window.ShayeWheelConfig ? ShayeWheelConfig.load() : null;
  var prizes = [];
  var users = [];
  var user = null;
  var userIndex = -1;
  var spinning = false;
  var currentRotation = 0;

  function normalizeEmail(value) { return String(value || "").trim().toLowerCase(); }
  function roundMoney(value) { return Math.round((Number(value) || 0) * 100) / 100; }
  function formatAmount(value) { return roundMoney(value).toLocaleString("en-US", { maximumFractionDigits: 2 }) + " USDT"; }
  function getPrizeSub(prize) {
    var sub = String(prize && prize.sub || "").trim();
    if (prize && prize.active && /^(غیر\s*فعال|غیرفعال)$/.test(sub)) return "جایزه نقدی";
    return sub;
  }
  function escapeHtml(value) { return String(value || "").replace(/[&<>"']/g, function (c) { return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]; }); }

  function loadUsers() {
    try { var value = JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); return Array.isArray(value) ? value : []; }
    catch (error) { return []; }
  }

  function saveUsers() {
    if (!user || userIndex < 0) return;
    users[userIndex] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function loadCurrentUser() {
    var email = normalizeEmail(localStorage.getItem(CURRENT_USER_KEY));
    if (!email) return false;
    users = loadUsers();
    userIndex = users.findIndex(function (item) { return normalizeEmail(item.email) === email; });
    if (userIndex < 0) return false;
    user = users[userIndex];

    if (typeof user.wheelSpins !== "number") user.wheelSpins = Number(config.registrationSpins) || 0;
    if (typeof user.wheelSpinsUsed !== "number") user.wheelSpinsUsed = 0;
    if (!Array.isArray(user.wheelHistory)) user.wheelHistory = [];
    if (!Array.isArray(user.wheelReferralRewards)) user.wheelReferralRewards = [];
    if (!Array.isArray(user.transactions)) user.transactions = [];
    user.withdrawBalance = Number(user.withdrawBalance) || 0;
    saveUsers();
    return true;
  }

  function getActivePrizes() {
    var active = config.prizes.filter(function (p) { return p.active; });
    return active.length ? active : [{ id: "fallback", text: "0 USDT", sub: "جایزه فعال نیست", amount: 0, weight: 0, active: true }];
  }

  function makeGradient(count) {
    var parts = [];
    var step = 360 / count;
    for (var i = 0; i < count; i++) parts.push(colors[i % colors.length] + " " + (i * step) + "deg " + ((i + 1) * step) + "deg");
    return "conic-gradient(" + parts.join(",") + ")";
  }

  function createInterface() {
    prizes = getActivePrizes();
    var count = prizes.length;
    var segment = 360 / count;
    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "shaye-wheel-fab";
    fab.setAttribute("aria-label", "باز کردن گردونه جایزه");
    fab.style.background = makeGradient(Math.max(2, count));
    fab.innerHTML = '<span class="shaye-wheel-credit" id="shayeWheelCredit">0</span>';

    var overlay = document.createElement("div");
    overlay.className = "shaye-wheel-overlay";
    overlay.id = "shayeWheelOverlay";
    var labelsHtml = "";
    for (var i = 0; i < count; i++) {
      var center = (i * segment) + (segment / 2);
      var angle = center - 90;
      var prizeSub = getPrizeSub(prizes[i]);
      labelsHtml += '<div class="shaye-wheel-label" style="transform:rotate(' + angle + 'deg) translate(28px,-50%);"><span style="display:block;transform:rotate(90deg);">' + escapeHtml(prizes[i].text) + (prizeSub ? '<small>' + escapeHtml(prizeSub) + '</small>' : '') + '</span></div>';
    }

    overlay.innerHTML = '<section class="shaye-wheel-modal" role="dialog" aria-modal="true">' +
      '<div class="shaye-wheel-head"><h3>گردونه جایزه SHAYE</h3><button type="button" class="shaye-wheel-close" id="shayeWheelClose">×</button></div>' +
      '<p class="shaye-wheel-launch-note">' + escapeHtml(config.notice) + '</p>' +
      '<div class="shaye-wheel-stage"><div class="shaye-wheel-pointer"></div><div class="shaye-wheel-disk" id="shayeWheelDisk" style="background:' + makeGradient(count) + ';transition-duration:' + config.spinDuration + 'ms">' + labelsHtml + '</div><button type="button" class="shaye-wheel-center" id="shayeWheelSpin">بچرخون</button></div>' +
      '<div class="shaye-wheel-status" id="shayeWheelStatus">هر فرصت فقط یک بار قابل استفاده است.</div>' +
      '<div class="shaye-wheel-info"><div><span>فرصت باقی‌مانده</span><strong id="shayeWheelRemaining">0</strong></div><div><span>موجودی برداشت</span><strong id="shayeWheelBalance">0 USDT</strong></div></div>' +
      '</section>';

    document.body.appendChild(fab); document.body.appendChild(overlay);
    fab.addEventListener("click", function () { overlay.classList.add("open"); updateView(); });
    document.getElementById("shayeWheelClose").addEventListener("click", function () { if (!spinning) overlay.classList.remove("open"); });
    overlay.addEventListener("click", function (event) { if (event.target === overlay && !spinning) overlay.classList.remove("open"); });
    document.getElementById("shayeWheelSpin").addEventListener("click", spin);
  }

  function updateView() {
    var remaining = Math.max(0, Number(user.wheelSpins) || 0);
    var credit = document.getElementById("shayeWheelCredit");
    var remainingText = document.getElementById("shayeWheelRemaining");
    var balance = document.getElementById("shayeWheelBalance");
    var button = document.getElementById("shayeWheelSpin");
    if (credit) credit.textContent = String(remaining);
    if (remainingText) remainingText.textContent = String(remaining);
    if (balance) balance.textContent = formatAmount(user.withdrawBalance);
    if (button) button.disabled = spinning || remaining < 1;
  }

  function choosePrize() {
    var total = prizes.reduce(function (sum, p) {
      return sum + Math.max(0, Number(p.weight || 0));
    }, 0);

    // جایزه‌های فعال با وزن صفر روی گردونه نمایش داده می‌شوند،
    // اما در انتخاب برنده شرکت نمی‌کنند.
    if (total <= 0) return null;

    var random = Math.random() * total;
    var lastPositiveIndex = -1;
    for (var i = 0; i < prizes.length; i++) {
      var weight = Math.max(0, Number(prizes[i].weight || 0));
      if (weight <= 0) continue;
      lastPositiveIndex = i;
      random -= weight;
      if (random < 0) return { prize: prizes[i], index: i };
    }

    return lastPositiveIndex >= 0 ? { prize: prizes[lastPositiveIndex], index: lastPositiveIndex } : null;
  }

  function spin() {
    if (spinning) return;
    if ((Number(user.wheelSpins) || 0) < 1) { document.getElementById("shayeWheelStatus").textContent = "در حال حاضر فرصت گردونه ندارید."; updateView(); return; }
    spinning = true; updateView();
    var status = document.getElementById("shayeWheelStatus");
    var disk = document.getElementById("shayeWheelDisk");
    status.className = "shaye-wheel-status"; status.textContent = "گردونه در حال چرخش است...";
    var result = choosePrize();
    if (!result) {
      spinning = false;
      updateView();
      status.textContent = "برای چرخاندن گردونه، حداقل یک جایزه فعال باید درصدی بیشتر از صفر داشته باشد.";
      return;
    }
    var segment = 360 / prizes.length;
    var center = (result.index * segment) + (segment / 2);
    var targetModulo = (360 - center) % 360;
    var currentModulo = ((currentRotation % 360) + 360) % 360;
    var delta = (targetModulo - currentModulo + 360) % 360;
    currentRotation += (360 * 6) + delta;
    disk.style.transform = "rotate(" + currentRotation + "deg)";

    setTimeout(function () {
      awardPrize(result.prize);
      spinning = false; updateView();
      status.className = "shaye-wheel-status success";
      status.textContent = result.prize.amount > 0 ? ("تبریک! " + formatAmount(result.prize.amount) + " به موجودی قابل برداشت شما اضافه شد.") : ("تبریک! جایزه «" + result.prize.text + "» برای بررسی و تحویل ثبت شد.");
    }, config.spinDuration);
  }

  function awardPrize(prize) {
    var now = new Date().toISOString();
    var id = "WHEEL-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
    user.wheelSpins = Math.max(0, (Number(user.wheelSpins) || 0) - 1);
    user.wheelSpinsUsed = (Number(user.wheelSpinsUsed) || 0) + 1;
    if (Number(prize.amount) > 0) user.withdrawBalance = roundMoney(Number(user.withdrawBalance || 0) + Number(prize.amount));
    user.wheelHistory.unshift({ id: id, prizeId: prize.id, rewardText: prize.text, reward: Number(prize.amount) || 0, status: Number(prize.amount) > 0 ? "completed" : "pending_delivery", date: now });
    user.transactions.unshift({ id: id, type: "wheel_reward", title: "جایزه گردونه: " + prize.text, amount: Number(prize.amount) || 0, status: Number(prize.amount) > 0 ? "completed" : "pending", date: now });
    saveUsers();
  }

  window.ShayeWheel = {
    grantDirectReferralSpin: function (inviterEmail, inviteeEmail) {
      var inviter = normalizeEmail(inviterEmail), invitee = normalizeEmail(inviteeEmail);
      if (!inviter || !invitee || inviter === invitee) return false;
      var allUsers = loadUsers();
      var inviterIndex = allUsers.findIndex(function (item) { return normalizeEmail(item.email) === inviter; });
      if (inviterIndex < 0) return false;
      var inviterUser = allUsers[inviterIndex];
      if (!Array.isArray(inviterUser.wheelReferralRewards)) inviterUser.wheelReferralRewards = [];
      if (inviterUser.wheelReferralRewards.indexOf(invitee) !== -1) return false;
      inviterUser.wheelReferralRewards.push(invitee);
      inviterUser.wheelSpins = (typeof inviterUser.wheelSpins === "number" ? inviterUser.wheelSpins : Number(config.registrationSpins) || 0) + Number(config.referralSpins || 0);
      if (!Array.isArray(inviterUser.transactions)) inviterUser.transactions = [];
      inviterUser.transactions.unshift({ id: "WHEEL-REF-" + Date.now(), type: "wheel_spin_credit", title: "فرصت گردونه از فعال‌سازی VIP دعوت مستقیم", amount: 0, inviteeEmail: invitee, status: "completed", date: new Date().toISOString() });
      allUsers[inviterIndex] = inviterUser; localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
      if (user && normalizeEmail(user.email) === inviter) { users = allUsers; userIndex = inviterIndex; user = inviterUser; updateView(); }
      return true;
    }
  };

  function init() {
    if (!config || config.enabled === false) return;
    if (!loadCurrentUser()) return;
    createInterface(); updateView();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
