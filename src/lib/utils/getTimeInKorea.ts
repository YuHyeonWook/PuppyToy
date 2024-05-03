// 한국 기준 Date 객체 반환
export const getTimeInKorea = () => {
  const date = new Date();
  const timeInUtc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const timeInKorea = new Date(timeInUtc + 9 * 60 * 60 * 1000);

  return timeInKorea;
};
