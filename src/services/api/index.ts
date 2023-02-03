import {request} from './requests';
import Settings from '@src/configs/defaultSettings';

/**
 *
 * @param params 获取游戏列表
 */
export async function getGameList(
  page: number,
  options?: {[key: string]: any},
) {
  return await request<API.PageWrapper<API.GameListItem[]>>('/gameLists', {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
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
  return await request<API.Sign>('/sign', {
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

export function getImageUrl(path: string): string {
  let imageUrl: string = Settings.network.main.imageUrl;
  return imageUrl + path;
}
