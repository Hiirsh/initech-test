export const timeConvert = (timeStamp: number): string => {
  const date = new Date(timeStamp);
  return `${date.getFullYear()}.${
    date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  }.${
    date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
  } ${date.getHours()}:${date.getMinutes()}`;
};
