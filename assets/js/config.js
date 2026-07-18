"use strict";

(function (global) {
  var SETTINGS_KEY = "shaye_admin_settings";

  var defaults = {
    vipAmounts: {
      0: 0,
      1: 100,
      2: 500,
      3: 1000,
      4: 5000,
      5: 10000
    },
    vipDailyRates: {
      0: 0,
      1: 1,
      2: 1.2,
      3: 1.5,
      4: 1.8,
      5: 2
    },
    cycleDays: 90,
    updatedAt: ""
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function numberOr(value, fallback) {
    var result = Number(value);
    return isFinite(result) ? result : fallback;
  }

  function normalizeSettings(value) {
    var result = clone(defaults);
    var source = value && typeof value === "object" ? value : {};

    for (var vip = 1; vip <= 5; vip++) {
      if (
        source.vipAmounts &&
        source.vipAmounts[vip] !== undefined
      ) {
        result.vipAmounts[vip] = Math.max(
          0,
          numberOr(source.vipAmounts[vip], result.vipAmounts[vip])
        );
      }

      if (
        source.vipDailyRates &&
        source.vipDailyRates[vip] !== undefined
      ) {
        result.vipDailyRates[vip] = Math.max(
          0,
          numberOr(
            source.vipDailyRates[vip],
            result.vipDailyRates[vip]
          )
        );
      }
    }

    result.cycleDays = Math.max(
      1,
      Math.floor(numberOr(source.cycleDays, defaults.cycleDays))
    );

    result.updatedAt = String(source.updatedAt || "");
    return result;
  }

  function load() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      return normalizeSettings(raw ? JSON.parse(raw) : null);
    } catch (error) {
      console.error(error);
      return clone(defaults);
    }
  }

  function save(settings) {
    var normalized = normalizeSettings(settings);
    normalized.updatedAt = new Date().toISOString();
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(normalized)
    );
    return normalized;
  }

  function detectVip(investment, settings) {
    var amount = Number(investment) || 0;
    var config = settings || load();

    for (var vip = 5; vip >= 1; vip--) {
      if (amount >= Number(config.vipAmounts[vip] || 0)) {
        return vip;
      }
    }

    return 0;
  }

  function rewardForVip(vip, settings) {
    var config = settings || load();
    var base = Number(config.vipAmounts[vip] || 0);
    var rate = Number(config.vipDailyRates[vip] || 0);

    return {
      base: base,
      rate: rate,
      reward: Math.round(base * rate) / 100
    };
  }

  global.ShayeConfig = {
    SETTINGS_KEY: SETTINGS_KEY,
    defaults: clone(defaults),
    load: load,
    save: save,
    detectVip: detectVip,
    rewardForVip: rewardForVip
  };
})(window);