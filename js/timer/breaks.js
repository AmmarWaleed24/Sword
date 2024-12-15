let pomoRelax = document.querySelector(".relax-pomo");
let relaxTimerScreen = document.querySelector(".relax-pomo .relax-timer p");
let relaxTimerImg = document.querySelector(".relax-pomo .relax-timer img");
let relaxPeriod = document.querySelector(".relax-period");
let shortBreakBtn = document.querySelector("button[break-data='short']");
let longBreakBtn = document.querySelector("button[break-data='long']");
let cancelBreakBtn = document.querySelector("button[break-data='cancel']");

let relaxTimerInterval;

function startRelaxTimer(breakDuration) {
  pomoRelax.classList.remove("d-none");
  const startTime = Date.now();
  const endTime = startTime + breakDuration * 1000;

  localStorage.setItem("breakEndTime", endTime);
  updateRelaxTimer(endTime);
  relaxTimerInterval = setInterval(() => {
    updateRelaxTimer(endTime);
  }, 1000);
}

function updateRelaxTimer(endTime) {
  const now = Date.now();
  const relaxRemainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
  const minutes = String(Math.floor(relaxRemainingTime / 60)).padStart(2, "0");
  const seconds = String(relaxRemainingTime % 60).padStart(2, "0");
  relaxTimerScreen.innerHTML = `${minutes}:${seconds}`;
  if (relaxRemainingTime <= 0) {
    clearInterval(relaxTimerInterval);
  }
}

function restoreRelaxTimer() {
  const savedEndTime = localStorage.getItem("breakEndTime");
  if (savedEndTime) {
    const remainingTime = Math.max(
      0,
      Math.floor((savedEndTime - Date.now()) / 1000)
    );
    if (remainingTime > 0) {
      startRelaxTimer(remainingTime); // Resume the timer
    } else {
      localStorage.removeItem("breakEndTime");
    }
  }
}

shortBreakBtn.addEventListener("click", () => {
  clearInterval(relaxTimerInterval);
  startRelaxTimer(parseInt(getTimerSettings().shortBreak.shortBreak) * 60);
  relaxTimerImg.classList.add("d-none");
  localStorage.setItem("hideRelaxWindow", "false");

  // startRelaxTimer(5 * 60);
});

longBreakBtn.addEventListener("click", () => {
  clearInterval(relaxTimerInterval);
  startRelaxTimer(parseInt(getTimerSettings().longBreak.longBreak) * 60);
  relaxTimerImg.classList.add("d-none");
  localStorage.setItem("hideRelaxWindow", "false");
});

cancelBreakBtn.addEventListener("click", () => {
  clearInterval(relaxTimerInterval);
  localStorage.removeItem("breakEndTime");
  pomoRelax.classList.add("d-none");
  localStorage.setItem("hideRelaxWindow", "true");
});

restoreRelaxTimer();

function showRelaxTimer() {
  if (
    localStorage.getItem("remainingTime") === "0" &&
    localStorage.getItem("hideRelaxWindow") !== "true"
  ) {
    pomoRelax.classList.remove("d-none");
    if (
      parseInt(localStorage.getItem("totalPomos")) %
        parseInt(getTimerSettings().pomosPerLongBreak.pomosPerLongBreak) ===
      0
    ) {
      longBreakBtn.classList.remove("d-none");
      relaxPeriod.innerHTML = `relax for ${
        getTimerSettings().longBreak.longBreak
      } Minutes`;
    } else {
      longBreakBtn.classList.add("d-none");
      relaxPeriod.innerHTML = `relax for ${
        getTimerSettings().shortBreak.shortBreak
      } Minutes`;
    }
  } else {
    pomoRelax.classList.add("d-none");
  }
}

if (localStorage.getItem("breakEndTime")) {
  relaxTimerImg.classList.add("d-none");
} else {
  relaxTimerImg.classList.remove("d-none");
}

showRelaxTimer();
//
