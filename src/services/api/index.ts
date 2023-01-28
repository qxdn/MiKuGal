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
