/* eslint-disable no-undef */

// Dependents
let userID = 20;
let currentDate = "2019/09/22"

const userRepo = new UserRepository(userData);
const activityRepo = new ActivityRepository(activityData);
const hydrationRepo = new HydrationRepository(hydrationData);
const sleepRepo = new SleepRepository(sleepData);

const user = new User(userRepo.getUserData(userID));
const userActivity = new UserActivity(activityRepo.getUserData(userID));
const userHydration = new UserHydration(hydrationRepo.getUserData(userID));
const userSleep = new UserSleep(sleepRepo.getUserData(userID));

// Query Selectors
const datePicker = document.getElementById("datePicker");
const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

const greeting = document.getElementById("greeting");
const strideLength = document.getElementById("strideLength");
const stepComparison = document.getElementById("stepComparison");
const friends = document.getElementById("friends");

const averageSteps = document.getElementById("averageSteps");
const averageMinutes = document.getElementById("averageMinutes");
const averageStairs = document.getElementById("averageStairs");
const averageOunces = document.getElementById("averageOunces");
const averageQuality = document.getElementById("averageQuality");
const averageHours = document.getElementById("averageHours");

const stepCount = document.getElementById("stepCount");
const minutesActive = document.getElementById("minutesActive");
const milesWalked = document.getElementById("milesWalked");
const stairsClimbed = document.getElementById("stairsClimbed");
const ouncesWater = document.getElementById("ouncesWater");
const hoursSlept = document.getElementById("hoursSlept");
const sleepQuality = document.getElementById("sleepQuality");

const weeklySteps = document.getElementById("weeklySteps");
const weeklyMinutes = document.getElementById("weeklyMinutes");
const weeklyFlights = document.getElementById("weeklyFlights");
const weeklyHours = document.getElementById("weeklyHours");
const weeklyQuality = document.getElementById("weeklyQuality");

const userInfoBtn = document.getElementById("userInfoBtn");
const userInfoDropdown = document.getElementById("userInfoDropdown");
const activityDropdown = document.getElementById("activityDropdown");
const activityDropdownBtn = document.getElementById("activityDropdownBtn");
const hydrationDropdown = document.getElementById("hydrationDropdown");
const hydrationDropdownBtn = document.getElementById("hydrationDropdownBtn");
const sleepDropdown = document.getElementById("sleepDropdown");
const sleepDropdownBtn = document.getElementById("sleepDropdownBtn");


// Event Listeners
window.addEventListener("load", setInitialPage)

datePicker.addEventListener("click", setDailyStats);
backButton.addEventListener("click", moveBackwards);
forwardButton.addEventListener("click", moveForwards);
userInfoBtn.addEventListener("click", showUserInfo);

activityDropdownBtn.addEventListener("click", showDropdownInfo);



// Handlers/Helpers
function setInitialPage() {
  setDatePicker();
  renderPage();
}

function setDailyStats(event) {
  const isButton = event.target.className === "day-btn";
  const isCurrent = dayjs(event.target.value).diff(dayjs("2019/09/22")) <= 0;

  if (isButton && isCurrent) {
    const selectedDay = event.target.value;
    currentDate = selectedDay;

    renderPage();
  }
}

function moveBackwards() {
  let startOfWeek = dayjs(currentDate).startOf("week").format("YYYY/MM/DD");

  if (startOfWeek === "2019/06/16") {
    currentDate = "2019/06/15";
  } else {
    currentDate = dayjs(currentDate).subtract(7, "days").format("YYYY/MM/DD");
  }

  setDatePicker();
  renderPage();
}

function moveForwards() {
  let startOfWeek = dayjs(currentDate).startOf("week").format("YYYY/MM/DD");

  if (startOfWeek === "2019/09/15") {
    currentDate = "2019/09/22";
  } else {
    currentDate = dayjs(currentDate).add(7, "days").format("YYYY/MM/DD");
  }

  setDatePicker();
  renderPage();
}

function setDatePicker() {
  const dates = datePicker.querySelectorAll(".day-btn");
  let startOfWeek = dayjs(currentDate).startOf("week");

  dates.forEach(day => {
    day.value = startOfWeek.format("YYYY/MM/DD");
    day.innerText = startOfWeek.format("MM/DD");
    startOfWeek = startOfWeek.add(1, "day");
  });

  setNavButtons();
}

function setNavButtons() {
  const endOfWeek = dayjs(currentDate).endOf("week");
  const startOfWeek = dayjs(currentDate).startOf("week");

  if (endOfWeek.diff(dayjs("2019/06/16")) <= 0) {
    backButton.className = "nav-btn visible";
  } else {
    backButton.className = "nav-btn";
  }

  if (startOfWeek.diff(dayjs("2019/09/22")) >= 0) {
    forwardButton.className = "nav-btn visible";
  } else {
    forwardButton.className = "nav-btn";
  }
}

function renderPage() {
  renderUserInfo();
  renderFriends();
  renderTotalStats();
  renderDailyStats(currentDate);
  renderWeeklyProgress(currentDate);
}

function renderUserInfo() {
  const firstName = user.getFirstName();
  const avgStepGoal = Math.round(userRepo.calcAvgStepGoal());

  greeting.innerText = `Hey, ${firstName}!`;
  // strideLength.innerText = user.strideLength;
  // stepComparison.innerText  = `${user.dailyStepGoal} / ${avgStepGoal}`;
}

function renderFriends() {
  friends.innerText = "";

  user.friends.forEach(friendID => {
    const friend = new User(userRepo.getUserData(friendID));
    const friendName = friend.getFirstName();
    const friendEl = document.createElement("li");

    friendEl.innerText = friendName;
    friends.appendChild(friendEl);
  });
}

function renderTotalStats() {
  renderTotalActivity();
  renderTotalHydration();
  renderTotalSleep();
}

function renderTotalActivity() {
  averageSteps.innerText = userActivity.calcTotalStat("numSteps");
  averageMinutes.innerText = userActivity.calcTotalStat("minutesActive");
  averageStairs.innerText = userActivity.calcTotalStat("flightsOfStairs");
}

function renderTotalHydration() {
  averageOunces.innerText = userHydration.calcAvgTotalOunces();
}

function renderTotalSleep() {
  averageQuality.innerText = userSleep.calcAvgTotalQuality();
  averageHours.innerText = userSleep.calcAvgTotalHrs();
}

function renderDailyStats(forDate) {
  renderDailyActivity(forDate);
  renderDailyHydration(forDate);
  renderDailySleep(forDate);
}

function renderDailyActivity(forDate) {
  const steps = userActivity.getDailyStat(forDate, "numSteps");
  const minutes = userActivity.getDailyStat(forDate, "minutesActive");
  const miles = userActivity.calcMilesWalked(forDate, user.strideLength).toFixed(2);
  const flights = userActivity.getDailyStat(forDate, "flightsOfStairs");

  const avgUserSteps = userRepo.calcAvgStepGoal();
  const avgUserMinutes = activityRepo.calcAvgStat(forDate, "minutesActive");
  const avgUserMiles = activityRepo.calcAvgMiles(forDate, userData).toFixed(2);
  const avgUserFlights = activityRepo.calcAvgStat(forDate, "flightsOfStairs");

  stepCount.innerText = `${steps} / ${avgUserSteps}`;
  minutesActive.innerText = `${minutes} / ${avgUserMinutes}`;
  milesWalked.innerText = `${miles} / ${avgUserMiles}`;
  stairsClimbed.innerText = `${flights} / ${avgUserFlights}`;
}

function renderDailyHydration(forDate) {
  ouncesWater.innerText = userHydration.findDailyOunces(forDate);
}

function renderDailySleep(forDate) {
  hoursSlept.innerText = userSleep.findDailyHrs(forDate);
  sleepQuality.innerText = userSleep.findDailyQuality(forDate);
}

function renderWeeklyProgress(forDate) {
  renderWeeklyActivity(forDate);
  renderWeeklyHydration(forDate);
  renderWeeklySleep(forDate);
}

function renderWeeklyActivity(forDate) {
  renderTable(weeklySteps, forDate, "numSteps")
  renderTable(weeklyMinutes, forDate, "minutesActive");
  renderTable(weeklyFlights, forDate, "flightsOfStairs");
}

function renderTable(statTable, forDate, stat) {
  const statDisplays = statTable.querySelectorAll("td");
  const weeklyStats = userActivity.getWeeklyStat(forDate, stat);

  statDisplays.forEach((display, index) => {
    if (weeklyStats[index]) {
      display.innerText = weeklyStats[index];
    }
  });
}

function renderWeeklyHydration(forDate) {
  const statDisplays = hydrationProgress.querySelectorAll("td");
  const weeklyHydration = userHydration.calcOuncesForWeek(forDate);

  statDisplays.forEach((display, index) => {
    if (weeklyHydration[index]) {
      display.innerText = weeklyHydration[index];
    }
  });
}

function renderWeeklySleep(forDate) {
  const hourDisplays = weeklyHours.querySelectorAll("td");
  const qualityDisplays = weeklyQuality.querySelectorAll("td");

  const foundHours = userSleep.findWeeklyHrs(forDate);
  const foundQuality = userSleep.findWeeklyQuality(forDate);

  hourDisplays.forEach((display, index) => {
    if (foundHours[index]) {
      display.innerText = foundHours[index];
    }
  });

  qualityDisplays.forEach((display, index) => {
    if (foundQuality[index]) {
      display.innerText = foundQuality[index];
    }
  });
}

function showUserInfo() {
  if (!userInfoDropdown.classList.contains("hidden")) {
    userInfoDropdown.classList.toggle("hidden");
  } else {
    userInfoDropdown.classList.toggle("hidden");
    userInfoDropdown.innerHTML =
    `<h4 class="user-info-title">Your Info</h4>
      <table>
        <tr class="user-info-data">
          <td class="user-info-top">Stride Length</td>
          <td class="user-info-top">Step Goal CHANGE</td>
        </tr>
          <tr class="user-info-data">
          <td class="user-info-bottom">-</td>
          <td class="user-info-bottom">-</td>
        </tr>
    </table>
    <h4 class="user-info-title">Friends</h4>
    <ul class="friends-list" id="friends">
      <li class="friend">Friend 1</li>
      <li class="friend">Friend 2</li>
      <li class="friend">Friend 3</li>
    </ul>`
  }
}

function showActivityDropdown() {
  activityDropdown.classList.toggle("hidden");
}

function showHydrationDropdown() {
  activityDropdown.classList.toggle("hidden");
}

function showSleepDropdown() {
  activityDropdown.classList.toggle("hidden");
}
