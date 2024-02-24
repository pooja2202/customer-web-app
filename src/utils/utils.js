export function isTimeApproaching(startDate) {
  const currentDate = new Date();
  const startDateObj = new Date(startDate);
  const difference = startDateObj.getTime() - currentDate.getTime();
  const minutesDifference = Math.floor(difference / (1000 * 60));
  return minutesDifference <= 5 && minutesDifference >= 0;
}

export function splitDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toISOString().split("T")[0];
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const time = dateTime.toLocaleString("en-US", timeOptions);
  return { date, time };
}
