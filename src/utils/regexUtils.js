export const checkContainSpecialCharacters = str => {
  // const regex = /[^a-zA-Z0-9\s.,?@!'"]/;
  const regex = /[^a-zA-Z0-9\u3131-\uD79D\s.,?@!'"]/;
  return regex.test(str);
};

export const validateEmail = str => {
  if (!str) {
    return false;
  }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailPattern.test(str);
};
