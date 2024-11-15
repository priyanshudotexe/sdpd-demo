// Your initialize function
function initialize(yearStr, monthStr, dateStr) {
  let year, month, day;
  let message;
  let validDate = false;

  // Attempt to parse year, month, and day
  try {
    year = parseInt(yearStr, 10);
    month = parseInt(monthStr, 10);
    day = parseInt(dateStr, 10);

    // Check if parsing succeeded
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      throw new Error();
    }
  } catch (e) {
    message = "Enter values in a proper numeric format";
    return { message, validDate };
  }

  // Days in each month
  const monthDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  // Leap year check for February
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    monthDays[2] = 29;
  }

  // Month validation
  if (month < 1 || month > 12) {
    message = "Invalid month";
    return { message, validDate };
  }
  // Day validation based on month
  if (day < 1 || day > monthDays[month]) {
    if (day === 29 && month === 2 && monthDays[2] === 28) {
      message = `February of ${year} does not have 29 days`;
    } else if (day > monthDays[month]) {
      message = `This month does not have ${day} days`;
    } else {
      message = "Invalid date";
    }
    return { message, validDate };
  }

  // Calculate the day of the week using Zeller's Congruence
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const inputDate = new Date(year, month-1, day);
  const dayOfWeekIndex = inputDate.getDay(); // Returns 0 (Sunday) to 6 (Saturday)
  message = daysOfWeek[dayOfWeekIndex];
  return { message, validDate };
}

// New findDay function that reads input values and updates the result
function findDay() {
  const dayInput = document.getElementById("dayInput").value;
  const monthInput = document.getElementById("monthInput").value;
  const yearInput = document.getElementById("yearInput").value;

  const result = initialize(yearInput, monthInput, dayInput);

  // Update the result paragraph
  document.getElementById("result").textContent = result.message;
}
