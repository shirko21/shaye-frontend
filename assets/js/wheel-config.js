"use strict";

(function () {
  var KEY = "shaye_wheel_config";

  var defaults = {
    enabled: true,
    spinDuration: 6000,
    registrationSpins: 1,
    referralSpins: 1,
    notice: "کاربر عزیز، فرصت گردونه از ثبت‌نام و فعال‌سازی VIP دعوت مستقیم دریافت می‌شود.",
    prizes: [
      { id: "p1", text: "0.5 USDT", sub: "جایزه نقدی", amount: 0.5, weight: 100, active: true },
      { id: "p2", text: "100 USDT", sub: "جایزه نقدی", amount: 100, weight: 0, active: false },
      { id: "p3", text: "30 USDT", sub: "جایزه نقدی", amount: 30, weight: 0, active: false },
      { id: "p4", text: "یخچال", sub: "معادل 500 USDT", amount: 0, weight: 0, active: false },
      { id: "p5", text: "آیفون", sub: "معادل 300 USDT", amount: 0, weight: 0, active: false },
      { id: "p6", text: "150 USDT", sub: "جایزه نقدی", amount: 150, weight: 0, active: false }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizePrize(item, index) {
    item = item || {};
    var isActive = item.active !== false;
    var sub = String(item.sub || "");

    // تنظیمات قدیمی ممکن است زیرنویس «غیرفعال» داشته باشند.
    // وقتی جایزه فعال می‌شود، این متن خودکار به عنوان جایزه نقدی اصلاح می‌شود.
    if (isActive && /^(غیر\s*فعال|غیرفعال)$/.test(sub.trim())) sub = "جایزه نقدی";

    return {
      id: String(item.id || ("p" + (index + 1))),
      text: String(item.text || ("جایزه " + (index + 1))),
      sub: sub,
      amount: Math.max(0, Number(item.amount) || 0),
      weight: Math.max(0, Number(item.weight) || 0),
      active: isActive
    };
  }

  function normalize(config) {
    config = config || {};
    var prizes = Array.isArray(config.prizes) ? config.prizes : defaults.prizes;
    prizes = prizes.slice(0, 12).map(normalizePrize);
    if (prizes.length < 2) prizes = clone(defaults.prizes);

    return {
      enabled: config.enabled !== false,
      spinDuration: Math.max(1000, Number(config.spinDuration) || defaults.spinDuration),
      registrationSpins: Math.max(0, Math.floor(Number(config.registrationSpins) || 0)),
      referralSpins: Math.max(0, Math.floor(Number(config.referralSpins) || 0)),
      notice: String(config.notice || defaults.notice),
      prizes: prizes
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return normalize(raw ? JSON.parse(raw) : clone(defaults));
    } catch (error) {
      return clone(defaults);
    }
  }

  function save(config) {
    var normalized = normalize(config);
    localStorage.setItem(KEY, JSON.stringify(normalized));
    return normalized;
  }

  window.ShayeWheelConfig = {
    key: KEY,
    defaults: clone(defaults),
    load: load,
    save: save,
    reset: function () { return save(clone(defaults)); }
  };
})();
