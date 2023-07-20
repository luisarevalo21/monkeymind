export function calculateTimeLabels() {
  const morningTimes = [];
  const noonTimes = [];
  let nightTimes = [];
  const earlyNightTimes = [];
  const lateNightTimes = [];
  const allDayTimes = [...morningTimes, ...noonTimes, ...nightTimes];

  for (let i = 0; i < 24; i++) {
    if (i >= 0 && i < 4) {
      lateNightTimes.push(i + ":00", i + ":30");
    } else if (i >= 4 && i < 12) {
      i < 10
        ? morningTimes.push("0" + i + ":00", "0" + i + ":30")
        : morningTimes.push(i + ":00", i + ":30");
      // i == 12 ? morningTimeSlots.push("·") : morningTimeSlots.push("·", "·");
    } else if (i >= 12 && i < 20) {
      noonTimes.push(i + ":00", i + ":30");
      // afternoonTimeSlots.push("·", "·");
    } else if (i >= 20 && i < 24) {
      earlyNightTimes.push(i + ":00", i + ":30");
    }
    nightTimes = earlyNightTimes.concat(lateNightTimes);
  }

  return { morningTimes, noonTimes, nightTimes };
}
