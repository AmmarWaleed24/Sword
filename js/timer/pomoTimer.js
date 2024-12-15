const pomoCoreSettings = {
  timeDuration: getTimerSettings().timeDuration || 50,
  shortBreak: getTimerSettings().shortBreak || 5,
  longBreak: getTimerSettings().longBreak || 15,
  pomosPerLongBreak: getTimerSettings().pomosPerLongBreak || 4,
};

const pomosRecords = [];
let StoredtotalPomos;
if (localStorage.getItem("totalPomos"))
  StoredtotalPomos = parseInt(localStorage.getItem("totalPomos"));
else StoredtotalPomos = 0;
//-----------handle timer---------------//
//***************timer handler***************//
let timerHandlerOkBtn = document.querySelector(".timer-handler .ok-btn");
let timerHandlerCancelBtn = document.querySelector(
  ".timer-handler .cancel-btn"
);
let timerScreenMinutes = document.querySelector(
  ".pomo-timer-screen .screen-btn .min"
);
let timerScreenSeconds = document.querySelector(
  ".pomo-timer-screen .screen-btn .sec"
);
let timerHandlerInput = document.querySelector(".timer-handler form input");
//Populate timer minutes screen
if (timerBtn.getAttribute("data-state") === "start") {
  timerScreenMinutes.innerHTML = getTimerSettings().timeDuration;
}
timerHandlerOkBtn.addEventListener("click", () => {
  timerHandler.classList.add("d-none");
  if (timerHandlerInput.value !== "") {
    pomoCoreSettings.timeDuration = checkTimeDuration(
      timerHandlerInput.value
    ).padStart(2, "0");
    saveTimerSettings(pomoCoreSettings);
    timerScreenMinutes.innerHTML = getTimerSettings().timeDuration;
    timerScreenSeconds.innerHTML = "00";
    timerHandlerInput.value = "";
  }
});
timerHandlerCancelBtn.addEventListener("click", () => {
  timerHandler.classList.add("d-none");
});


//-----------handle timer---------------//
function saveTimerSettings(settings) {
  localStorage.setItem("pomoCoreSettings", JSON.stringify(settings));
}
function getTimerSettings() {
  let settings = JSON.parse(localStorage.getItem("pomoCoreSettings"));
  return settings;
}

saveTimerSettings(pomoCoreSettings);
//check timer handler value
function checkTimeDuration(inputValue) {
  // if (inputValue > 180) inputValue = 180;
  // else if (inputValue < 5) inputValue = 5;
  return inputValue;
}

///////----------------
//Pomo Counter
let timerInterval;
function startTimer(duration) {
  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  // Save the end time to localStorage
  localStorage.setItem("timerEndTime", endTime);
  updateTimer(endTime);

  // Set an interval to update the timer every second
  timerInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);
  //----
}
function updateTimer(endTime) {
  const now = Date.now();
  const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));

  // Format and display the time
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  timerScreenMinutes.innerHTML = minutes;
  timerScreenSeconds.innerHTML = seconds;
  // Stop the timer when it reaches 0
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
  }
  window.localStorage.setItem("remainingTime", remainingTime);
  timerFinished();
}
//update Timer screen with time when pause
function updatePausedTimerScreen() {
  const remainingTime = localStorage.getItem("remainingTime");
  // Format and display the time
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  timerScreenMinutes.innerHTML = minutes;
  timerScreenSeconds.innerHTML = seconds;
}
// Restore the timer on page reload
function restoreTimer() {
  const savedEndTime = localStorage.getItem("timerEndTime");
  if (savedEndTime) {
    const remainingTime = Math.max(
      0,
      Math.floor((savedEndTime - Date.now()) / 1000)
    );
    if (parseInt(localStorage.getItem("remainingTime")) > 0) {
      // startTimer(remainingTime); // Resume the timer
      startTimer(parseInt(localStorage.getItem("remainingTime"))); // Resume the timer
    }
  }
}

//pomo control buttons
timerBtn.addEventListener("click", () => {
  if (timerBtn.getAttribute("data-state") === "start") {
    localStorage.setItem("timerStartTime", Date.now());
    clearInterval(timerInterval); // Clear any existing timer
    startTimer(getTimerSettings().timeDuration * 60);
    timerBtn.setAttribute("data-state", "pause");
    timerBtn.textContent = "pause";
    pomoTimerscreenBtn.setAttribute("disabled", "true");
    timerHandler.classList.add("d-none");
    localStorage.setItem("timerBtnState", timerBtn.getAttribute("data-state"));
  } else if (timerBtn.getAttribute("data-state") === "pause") {
    clearInterval(timerInterval);
    timerBtn.setAttribute("data-state", "continue");
    timerBtn.textContent = "continue";
    endBtn.classList.remove("d-none");
    localStorage.setItem("timerBtnState", timerBtn.getAttribute("data-state"));
  } else if (timerBtn.getAttribute("data-state") === "continue") {
    restoreTimer();
    timerBtn.setAttribute("data-state", "pause");
    timerBtn.textContent = "pause";
    endBtn.classList.add("d-none");
    localStorage.setItem("timerBtnState", timerBtn.getAttribute("data-state"));
  }
});
endBtn.addEventListener("click", () => {
  timerBtn.setAttribute("data-state", "start");
  timerBtn.textContent = "start";
  endBtn.classList.add("d-none");
  pomoTimerscreenBtn.removeAttribute("disabled");
  localStorage.setItem("timerBtnState", timerBtn.getAttribute("data-state"));
  timerScreenMinutes.innerHTML = getTimerSettings().timeDuration.padStart(
    2,
    "0"
  );
  timerScreenSeconds.innerHTML = "00";
});
//utility fn=>save timer state at page load
function updateTimerBtnState() {
  timerBtn.setAttribute("data-state", localStorage.getItem("timerBtnState"));
  if (timerBtn.getAttribute("data-state") === "start") {
    timerBtn.textContent = "start";
    pomoTimerscreenBtn.removeAttribute("disabled");
  } else if (timerBtn.getAttribute("data-state") === "pause") {
    pomoTimerscreenBtn.setAttribute("disabled", "true");
    timerBtn.textContent = "pause";
    restoreTimer();
  } else if (timerBtn.getAttribute("data-state") === "continue") {
    clearInterval(timerInterval);
    updatePausedTimerScreen();
    timerBtn.textContent = "continue";
    endBtn.classList.remove("d-none");
    pomoTimerscreenBtn.setAttribute("disabled", "true");
  }
}
updateTimerBtnState();
//Timer Finished
function timerFinished() {
  let FinishedTimerSound = document.querySelector(".finish-timer-sound");
  if (localStorage.getItem("remainingTime") === "0") {
    localStorage.setItem("totalPomos", (StoredtotalPomos += 1));
    timerBtn.setAttribute("data-state", "start");
    timerBtn.textContent = "start";
    pomoTimerscreenBtn.removeAttribute("disabled");
    localStorage.setItem("timerBtnState", timerBtn.getAttribute("data-state"));
    timerScreenMinutes.innerHTML = getTimerSettings().timeDuration;
    timerScreenSeconds.innerHTML = "00";
    FinishedTimerSound.play();
    showNotification();
    let current = new Date();
    let recordDay = getFullDayNameWithCustomDate(current);
    let timerStartTime = formatTimestampTo12HourTime(
      parseInt(localStorage.getItem("timerStartTime"))
    );
    let timerEndTime = formatTimestampTo12HourTime(
      parseInt(localStorage.getItem("timerEndTime"))
    );
    createRecordInStorage(
      recordDay,
      timerStartTime,
      timerEndTime,
      getTimerSettings().timeDuration
    );
    createNewRecordInPage();
    updateDailyPomos();
    updateDailyPomosDurations();
    updateTotalPomos();
    localStorage.setItem("hideRelaxWindow", "false");
    showRelaxTimer();
  }
}

//Browser notification
if (Notification.permission === "default") {
  Notification.requestPermission().then((permission) => {
    console.log("Notification permission:", permission);
  });
}
function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("Timer Alert", {
      body: "Your timer has finished!",
      icon: "timer-icon.png", // Optional: Add an icon
    });
  } else {
    console.log("Notifications are not allowed.");
  }
}

// Hndle records
let recordsContainer = document.querySelector(".focus-record");
function createNewRecordInPage() {
  recordsContainer.innerHTML = "";
  let h3 = document.createElement("h3");
  h3.textContent = "Focus Records";
  h3.classList.add(
    "text-capitalize",
    "fs-5",
    "fw-medium",
    "mt-4",
    "position-sticky",
    "top-0",
    "py-2"
  );
  recordsContainer.appendChild(h3);
  let records = getRecords();
  for (const key in records) {
    let recordContent = `   
    <span class="record-date text-black-50 fw-bold">${records[key].recordDay}</span>
  `;
    let record = document.createElement("div");
    record.classList.add("record", "my-4");
    record.innerHTML = recordContent;
    let pomos = records[key].pomos;
    let ul = document.createElement("ul");
    ul.classList.add("p-0", "pt-1", "mb-5");
    for (const pomo in pomos) {
      let liContent = `
        <img src="imgs/pomodoro.png" alt="" /><span
          class="time text-black-50"
          >${pomos[pomo].startDate} - ${pomos[pomo].endDate}</span
        >
        <span class="duration text-black-50">${pomos[pomo].duration}m</span>
      `;
      let li = document.createElement("li");
      li.innerHTML = liContent;
      ul.appendChild(li);
    }
    record.appendChild(ul);
    recordsContainer.appendChild(record);
  }

  // record.innerHTML = recordContent;
  // let recordUl = document.querySelector("ul");
}
createNewRecordInPage();
function createRecordInStorage(recordDay, startDate, endDate, duration) {
  let records = getRecords();
  let recordFound = false;
  for (const key in records) {
    if (records[key].recordDay === recordDay) recordFound = true;
  }
  if (recordFound) {
    for (const key in records) {
      if (records[key].recordDay === recordDay) {
        records[key].pomos.push({ startDate, endDate, duration });
      }
    }
  } else {
    records.push({
      recordDay: recordDay,
      pomos: [{ startDate: startDate, endDate: endDate, duration: duration }],
    });
  }
  saveRecord(records);
}
function saveRecord(records) {
  localStorage.setItem("records", JSON.stringify(records));
}

function getRecords() {
  let records = JSON.parse(localStorage.getItem("records")) || [];
  return records;
}

function getFullDayNameWithCustomDate(dateString) {
  const date = new Date(dateString);

  // Get the full day name
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  // Format the date as "Month Day Year"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Combine the full day name with the formatted date
  return `${dayName}: ${formattedDate}`;
}
function formatTimestampTo12HourTime(timestamp) {
  const date = new Date(timestamp);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let seconds = date.getSeconds();
  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // If 0, set to 12

  // Pad single digits with a leading zero
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  // Combine hours, minutes, and period
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
}

// localStorage.removeItem("records");
// localStorage.removeItem("totalPomos");
