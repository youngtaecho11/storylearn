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
