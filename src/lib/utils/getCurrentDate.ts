// 한국 기준 CurrentDate 문자열 반환
export const getCurrentDate = () => {
  const date = new Date();
  const timeInUtc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const timeInKorea = new Date(timeInUtc + 9 * 60 * 60 * 1000);
  const currentDate = timeInKorea.toISOString().split('T')[0];
  return currentDate;
};
