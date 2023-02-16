import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../log';

const TOKEN_EXPIRED_KEY = 'expiredTime';
const JWT_TOKEN = 'jwt';
const LOGIN_USER = 'login_user';

function isExpired(expire: string | null): boolean {
  if (!expire) {
    return true;
  }
  const now = new Date();
  const expiredTime = new Date(expire);
  if (now.getTime() > expiredTime.getTime()) {
    return true;
  }
  return false;
}

export const setToken = async (token: string) => {
  await AsyncStorage.setItem(JWT_TOKEN, token);
};

export const getToken = async (): Promise<string | null> => {
  const expire = await getCookieExpireTime();
  if (isExpired(expire)) {
    return null;
  }
  return await AsyncStorage.getItem(JWT_TOKEN);
};

function parseCookieString(cookieString: string): Record<string, string> {
  if (!cookieString) {
    return {};
  }
  // Get each individual key-value pairs
  // from the cookie string
  // This returns a new array
  let pairs = cookieString.split(';');

  // Separate keys from values in each pair string
  // Returns a new array which looks like
  // [[key1,value1], [key2,value2], ...]
  let splittedPairs = pairs.map(cookie => cookie.split('='));

  // Create an object with all key-value pairs
  const cookieObj = splittedPairs.reduce(function (
    obj: Record<string, string>,
    cookie,
  ) {
    // cookie[0] is the key of cookie
    // cookie[1] is the value of the cookie
    // decodeURIComponent() decodes the cookie
    // string, to handle cookies with special
    // characters, e.g. '$'.
    // string.trim() trims the blank spaces
    // auround the key and value.
    if (cookie[1]) {
      // some only has httponly
      obj[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(
        cookie[1].trim(),
      );
    }

    return obj;
  },
  {});

  return cookieObj;
}

export const setCookieExpireTime = async (cookies: string[]) => {
  let cookieObj = null;
  for (let cookie of cookies) {
    cookieObj = parseCookieString(cookie);
    if (cookieObj['connect.sid']) {
      break;
    }
  }
  if (cookieObj) {
    await AsyncStorage.setItem(TOKEN_EXPIRED_KEY, cookieObj['Expires']);
  }
};

export const getCookieExpireTime = async (): Promise<string | null> => {
  return AsyncStorage.getItem(TOKEN_EXPIRED_KEY);
};

export const setLoginUser = async (user: LoginUserState) => {
  await AsyncStorage.setItem(LOGIN_USER, JSON.stringify(user));
};

export const getLoginUser = async (): Promise<LoginUserState | null> => {
  const expire = await getCookieExpireTime();
  if (isExpired(expire)) {
    return null;
  }
  let json = await AsyncStorage.getItem(LOGIN_USER);
  if (json == null) {
    return null;
  }
  return JSON.parse(json);
};

export const clearLoginUser = async () => {
  await AsyncStorage.multiRemove([JWT_TOKEN, LOGIN_USER]);
};
