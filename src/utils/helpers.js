export const truncateAddr = (addr) => {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
};

export const timeConverter = (seconds) => {
  let hoursInDay = 24;
  let minutesInHour = 60;
  let secondsInMinute = 60;
  let minutes = seconds / secondsInMinute;
  let hours = minutes / minutesInHour;
  let days = hours / hoursInDay;

  if (days >= 1) {
    return days > 1 ? `${days} days` : `${days} day`;
  } else if (days < 1 && hours >= 1) {
    return hours > 1 ? `${hours} hours` : `${hours} hour`;
  } else if (hours < 1 && minutes >= 1) {
    return minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
  }
};

export const nameHelper = (timestamp) => {
  let january12022 = 1640995200;
  let april12022 = 1648771200;
  let july12022 = 1656633600;
  let october12022 = 1664582400;
  let january12023 = 1672531200;
  let april12023 = 1680307200;
  let july12023 = 1688169600;
  let october12023 = 1696118400;
  let january12024 = 1704067200;

  switch (true) {
    case january12022 < timestamp < april12022:
      return "Q1 2022 Treasury";
    case april12022 < timestamp < july12022:
      return "Q2 2022 Treasury";
    case july12022 < timestamp < october12022:
      return "Q3 2022 Treasury";
    case october12022 < timestamp < january12023:
      return "Q4 2022 Treasury";
    case january12023 < timestamp < april12023:
      return "Q1 2023 Treasury";
    case april12023 < timestamp < july12023:
      return "Q2 2023 Treasury";
    case july12023 < timestamp < october12023:
      return "Q3 2023 Treasury";
    case october12023 < timestamp < january12024:
      return "Q4 2023 Treasury";
    default:
      return "Upgrade nameHelper Constraints";
  }
};

export const timerHelper = (startDate, duration) => {
  const totalTime = parseInt(startDate) + parseInt(duration);
  const date = new Date(totalTime * 1000);
  const dateArr = date.toString().split(" ");
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]} @ ${dateArr[4]}`;
};

export const payoutTimerHelper = (eventDate) => {
  const date = new Date(eventDate * 1000);
  const dateArr = date.toString().split(" ");
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]} @ ${dateArr[4]}`;
};

export const activeHelper = (startDate, duration) => {
  const payoutUnixTime = parseInt(startDate) + parseInt(duration);
  const nowUnixTime = Math.floor(Date.now() / 1000);
  return payoutUnixTime > nowUnixTime ? true : false;
};
