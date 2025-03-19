/**
 * check if the user is logged in and the login time is valid
 * @returns {boolean}
 */
export const isLoggedInValid = () => {
  const lastLogin = localStorage.getItem('formas.lastLogin');
  if (!lastLogin) {
    return false;
  }
  // compare last login time with current time
  const lastLoginTime = new Date(lastLogin);
  const currentTime = new Date();
  const timeDiff = currentTime - lastLoginTime;
  // 24 hours
  const oneDay = 1000 * 60 * 60 * 24;
  if (timeDiff > oneDay) {
    return false;
  }
  return true;
};
