let gears = document.querySelector(".gears");
let pomoSettings = document.querySelector(".pomo-settings");
let settingsDurtaionInput = document.querySelector(".durtaion-input");
let settingsShortBreakInput = document.querySelector(".sh-break-input");
let settingsLongtBreakInput = document.querySelector(".lg-break-input");
let settingsDurationsPerLongtBreakInput = document.querySelector(
  ".lg-break-dutations-input"
);
//gears
gears.addEventListener("click", () => {
  pomoSettings.classList.toggle("d-none");
});

settingsDurtaionInput.addEventListener("input", () => {
  if (settingsDurtaionInput.value >= 5 && settingsDurtaionInput.value <= 180) {
    let pomoCoreSettings = getTimerSettings();
    pomoCoreSettings.timeDuration = settingsDurtaionInput.value;
    saveTimerSettings(pomoCoreSettings);
    timerScreenMinutes.innerHTML = settingsDurtaionInput.value.padStart(2, "0");
  }
});
