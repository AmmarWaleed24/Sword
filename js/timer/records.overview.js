
function getTodayPomos() {
  let recordDay = getFullDayNameWithCustomDate(Date.now());
  let records = getRecords();
  let sessionsCount = 0;
  for (const key in records) {
    if (records[key].recordDay === recordDay) {
      sessionsCount = records[key].pomos.length;
      break;
    }
  }
  return sessionsCount;
}
//get daily pomos duration count
function getTodayPomosCount() {
  let recordDay = getFullDayNameWithCustomDate(Date.now());
  let records = getRecords();
  let dailyDurationCount = 0;
  for (const key in records) {
    if (records[key].recordDay === recordDay) {
      for (let i = 0; i < records[key].pomos.length; i++) {
        dailyDurationCount += parseInt(records[key].pomos[i].duration);
      }
    }
  }
  return dailyDurationCount;
}

//handle overView Section
//daily pomos
let dailyPomos = document.querySelector(".daily-pomos");
function updateDailyPomos() {
  dailyPomos.innerHTML = "";
  //head
  let span = document.createElement("span");
  span.classList.add("head");
  span.innerHTML = "today's pomos";
  dailyPomos.appendChild(span);
  //value
  let dailyPomosValue = document.createElement("p");
  dailyPomosValue.classList.add("value");
  dailyPomosValue.innerHTML = getTodayPomos();
  dailyPomos.appendChild(dailyPomosValue);
}
updateDailyPomos();
//daily total focus duraions
let dailyPomosDurations = document.querySelector(".daily-focaus-duration");
function updateDailyPomosDurations() {
  dailyPomosDurations.innerHTML = "";
  //head
  let span = document.createElement("span");
  span.classList.add("head");
  span.innerHTML = "today's focus durations";
  dailyPomosDurations.appendChild(span);
  //value
  let dailyPomosDurationsValue = document.createElement("p");
  dailyPomosDurationsValue.classList.add("value");
  dailyPomosDurationsValue.innerHTML = getTodayPomosCount() + " Miutes";
  dailyPomosDurations.appendChild(dailyPomosDurationsValue);
}
updateDailyPomosDurations();
//total pomos
let totalPomos = document.querySelector(".total-pomos");
function updateTotalPomos() {
  totalPomos.innerHTML = "";
  //head
  let span = document.createElement("span");
  span.classList.add("head");
  span.innerHTML = "total pomos";
  totalPomos.appendChild(span);
  //value
  let totalPomosValue = document.createElement("p");
  totalPomosValue.classList.add("value");
  totalPomosValue.innerHTML = localStorage.getItem("totalPomos") || 0;
  totalPomos.appendChild(totalPomosValue);
}
updateTotalPomos();
getTodayPomosCount();
