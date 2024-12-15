let timerBtn = document.querySelector(".timer-btn");
let endBtn = document.querySelector(".end-btn");
let pomoTimerScreen = document.querySelector(".pomo-timer");
let pomoTimerscreenBtn = document.querySelector(".screen-btn");
let timerHandler = document.querySelector(".timer-handler");



//screen button
pomoTimerscreenBtn.addEventListener("click", () => {
  timerHandler.classList.toggle("d-none");
});
