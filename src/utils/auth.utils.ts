const TOKEN_NAME = 'accessToken'
const setToken = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem(TOKEN_NAME, token);
  } else {
    sessionStorage.setItem(TOKEN_NAME, token);
  }
}

const getToken = () => {
  return (
    localStorage.getItem(TOKEN_NAME) ||
    sessionStorage.getItem(TOKEN_NAME)
  );
}

const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME);
  sessionStorage.removeItem(TOKEN_NAME);
}

export {
  setToken,
  getToken,
  removeToken
}