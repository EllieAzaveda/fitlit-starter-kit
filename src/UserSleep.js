class UserSleep {
  constructor(data) {
    this.data = data;
    this.weeklyDataArray = this.organizeWeeklyData(data);
  }

  organizeWeeklyData(data) {
    let weeklyData = [];
    let weeklyDataCopy = [...data];

    weeklyData.push(weeklyDataCopy.splice(0, 1));

    while (weeklyDataCopy.length > 0) {
      weeklyData.push(weeklyDataCopy.splice(0, 7));
    }
    return weeklyData;
  }

  getUserWeeklyQuality(currentDate) {
    const weeklyQuality = [];
    this.weeklyDataArray.forEach(week => {
      week.forEach(day => {
        if (day.date === currentDate) {
          weeklyQuality.push(week);
        }
      })
    })
    return weeklyQuality[0];
  }

// "identify by id"?? Double check that we don't need a parameter
  calcAvgTotalHrs() {
    let sum = this.data.map(currentData => {
      return currentData.hoursSlept
    }).reduce((acc, hoursSlept) => acc + hoursSlept);

    return sum / this.data.length;
  }

  calcAvgTotalQuality() {
    let sum = this.data.map(currentData => {
      return currentData.sleepQuality
    }).reduce((acc, sleepQuality) => acc + sleepQuality);

    return sum / this.data.length;
  }

  findDailyHrs(date) {
    let foundUser = this.data.filter(user => user.date === date).map(userHours => userHours.hoursSlept);
    return foundUser[0];
  }

  findDailyQuality(date) {
    let foundUser = this.data.filter(user => user.date === date).map(userSleep => userSleep.sleepQuality);
    return foundUser[0];
  }

  findWeeklyHrs(date) {
    let currentWeekData = this.getUserWeeklyQuality(date);

    return currentWeekData.map(userHours => userHours.hoursSlept);
  }

  findWeeklyQuality(date) {
    let currentWeekData = this.getUserWeeklyQuality(date);

    return currentWeekData.map(userQuality => userQuality.sleepQuality);
  }
}

module.exports = UserSleep;


// For a user, how many hours slept each day over the
// course of a given week (7 days) - you should be able
// to calculate this for any week, not just the latest week
