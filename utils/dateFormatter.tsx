export const formatDate = (date: Date): string => {
  let day: string | number = date.getDate(),
    month: string | number = date.getMonth() + 1;
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = `0${month}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
};
