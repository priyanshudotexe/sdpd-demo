function initialize(yearStr, monthStr, dateStr) {
  let year, month, day;
  let message;
  let validDate = false;

  // Attempt to parse year, month, and day
  try {
    year = parseInt(yearStr, 10);
    month = parseInt(monthStr, 10);
    day = parseInt(dateStr, 10);
  } catch (e) {
    message = "Enter values in a proper numeric format";
    return { message, validDate };
  }

  // Days in each month
  const monthDays = {
    1: 31, // January
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31, // December
  };

  // Leap year check for February
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    monthDays[2] = 29; // February in a leap year
  } else {
    monthDays[2] = 28; // February in a common year
  }

  // Month validation
  if (month < 1 || month > 12) {
    message = "Invalid month";
    return { message, validDate };
  }

  // February 29th check
  if (month === 2 && day === 29 && monthDays[2] === 28) {
    message = `February of ${year} does not have 29 days`;
    return { message, validDate };
  }

  // Day validation based on month
  if (day < 1 || day > monthDays[month]) {
    if (day < 1) {
      message = "Invalid date";
    } else if (day === 31 && monthDays[month] === 30) {
      message = "This month does not have 31 days";
    } else if (day > 31) {
      message = "Invalid date";
    } else {
      message = "Invalid date";
    }
    console.log(message + "sdguihfdlah");
    return { message, validDate };
  }

  // Calculate the day of the week manually
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const centuryAnchor = [2, 0, 5, 3]; // Day of week for 1600, 1700, 1800, 1900 centuries
  const century = Math.floor(year / 100) % 4;
  const yearInCentury = year % 100;
  const dayOfWeekIndex =
    (Math.floor(yearInCentury / 4) +
      day +
      centuryAnchor[century] +
      yearInCentury +
      [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5][month - 1]) %
    7;

  validDate = true;
  message = daysOfWeek[dayOfWeekIndex];

  return { message, validDate };
}
