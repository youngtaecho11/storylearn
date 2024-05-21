export const toLocaleDate = utcString => {
  const offsetInMinutes = new Date().getTimezoneOffset();

  const utcDate = new Date(utcString);

  const localDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() - offsetInMinutes) * 60000);

  const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };

  return localDate.toLocaleDateString('en-US', options);
};

export const getGreetingMessage = () => {
  const currentHour = new Date().getHours();

  if (7 <= currentHour < 12) {
    return 'morning';
  } else if (12 <= currentHour < 18) {
    return 'afternoon';
  } else if (18 <= currentHour < 22) {
    return 'evening';
  } else {
    return 'night';
  }
};

export const parseStringToObject = (str) => {

  // 문자열을 언더스코어와 공백을 기준으로 쪼갬
  const [subject, datetime] = str.split('_');
  // 날짜와 시간을 분리
  const [date, time] = datetime.split(' ');
  // 년, 월, 일로 분리
  const [year, month, day] = date.split('-').map(Number);
  // 시, 분, 초로 분리
  const [hour, minute, second] = time.split(':').map(Number);

  return {
    subject,
    createdDate: year + '년 ' + month + '월 ' + day + '일',
    createdTime: hour + '시 ' + minute + '분 ',
  };
}