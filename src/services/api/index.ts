import {request} from './requests';

/**
 *
 * @param params 获取游戏列表
 */
export async function getGameList(
  page: number,
  options?: {[key: string]: any},
) {
  return await request('/gameLists', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      yema: page,
    },
    ...(options || {}),
  });
}

/**
 *
 * @param params 登陆
 */
export async function sign(
  email: string,
  password: string,
  options?: {[key: string]: any},
) {
  // TODO: password md5加密
  return await request('/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      email: email,
      password: password,
    },
    ...(options || {}),
  });
}
