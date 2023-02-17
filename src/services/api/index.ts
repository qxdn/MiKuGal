import {request} from './requests';
import Settings from '@src/configs/defaultSettings';
import GameType from '@src/enums/gametype';
import {Md5} from 'ts-md5';
import qs from 'qs';
import logger from '../log';
import {setLoginUser, setToken} from '../token';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const addCoin = async (options?: {
  [key: string]: any;
}): Promise<void> => {
  let data = await request<object>('/addJf', {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
  if (data.code === 0) {
    Toast.show({type: 'success', text1: '每日登陆，增加金币'});
  }
  return;
};

/**
 *
 * @param params 获取galgame游戏列表
 */
export async function getGameList(
  page: number,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<Partial<API.PageWrapper<API.GameListItem[]>>> {
  addCoin();
  let data = await request<API.GameListItem[]>(type.list, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
      //'X-Auth-Token': await getToken(),
    },
    params: {
      yema: page,
    },
    ...(options || {}),
  });
  return data;
}

/**
 *
 * @param params 登陆
 */
export async function sign(
  email: string,
  password: string,
  options?: {[key: string]: any},
): Promise<API.Sign> {
  let _data = await request<API.Sign>('/sign', {
    method: 'POST',
    headers: {
      Accept: 'application/json,text/plain,*/*',
      ContentType: 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      email: email,
      password: Md5.hashStr(password), // password md5加密
    }),
    ...(options || {}),
  });
  let data = _data.obj;
  if (data) {
    await setToken(data.token);
    await setLoginUser({
      nickname: data.nickname,
      avatar: data.ts,
      token: data.token,
      coins: data.jf,
      vip: !!data.vstatus,
    });
  }
  return data;
}

/**
 * 网站全局评论
 */
export async function getGlobalGameComment(options?: {
  [key: string]: any;
}): Promise<API.GlobalGameComment[]> {
  let data = await request<API.GlobalGameComment[]>('/ggs', {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取最近更新的游戏补丁记录
 * @param label
 */
export async function getLastUpdateGamePatch(
  label: string,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.LastUpdateGamePatch[]> {
  let data = await request<API.LastUpdateGamePatch[]>(type.label, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
      label: label,
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取网页右侧的留言
 * @param params
 */
export async function getWebGameComment(
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.WebGameComment[]> {
  let data = await request<API.WebGameComment[]>(type.webComment, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取随机游戏
 * @param options
 * @returns
 */
export async function getRandomGame(
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.RandomGame[]> {
  let data = await request<API.RandomGame[]>(type.random, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取游戏排行榜
 * @param options
 * @returns
 */
export async function getTopGame(
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.RandomGame[]> {
  let data = await request<API.RandomGame[]>(type.topGame, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取vip信息
 * @param options
 * @returns
 */
export async function getVIP(options?: {[key: string]: any}): Promise<API.VIP> {
  let data = await request<API.VIP>('/getVip', {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取下载链接
 * @param id
 * @param type
 * @param options
 * @returns
 */
export async function getDownloadLink(
  id: number,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.OneDriveUrl> {
  let data = await request<API.OneDriveUrl>('/down', {
    method: 'POST',
    headers: {
      Accept: 'application/json,text/plain,*/*',
      ContentType: 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      id: id,
      type: type.downloadType,
    }),
    ...(options || {}),
  });
  return data.obj;
}

export async function getGameDetail(
  id: number,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.GameDetail> {
  let data = await request<API.GameDetail>(type.details, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
      id: id,
    },
    ...(options || {}),
  });
  return data.obj;
}

/**
 * 获取游戏评论
 * @param id
 * @param type
 * @param yema
 * @param options
 * @returns
 */
export async function getGameDetailComment(
  id: number,
  type: GameTypeEnum = GameType.Galgame,
  yema: number = 0,
  options?: {[key: string]: any},
): Promise<Partial<API.PageWrapper<API.GameDetailComment[]>>> {
  return await request<API.GameDetailComment[]>(type.detailComment, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
      id: id,
      yema: yema,
    },
    ...(options || {}),
  });
}

export async function searchGameData(
  query: string,
  page: number = 0,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
): Promise<API.Response<API.GameDetailCount[]>> {
  let s: string[] = query.split(' ');
  query = s.join('+');
  return await request<API.GameDetailCount[]>(type.search, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
      yema: page,
      query: query,
    },
    ...(options || {}),
  });
}

/**
 * 图片url转换
 * @param path
 * @returns
 */
export function getImageUrl(path: string): string {
  let imageUrl: string = Settings.network.main.imageUrl;
  return imageUrl + path;
}

/**
 * 转换头像
 * @param path
 * @returns
 */
export function getAvatarUrl(path: string): string {
  let avatarUrl: string = Settings.network.main.url + '/users/' + path;
  return avatarUrl;
}

/**
 * 单个游戏标签转换
 * @param raw
 * @returns
 */
export function singleGameLabelConvert(raw: string): string {
  // TODO: 补全
  let label = raw;
  switch (parseInt(raw, 10)) {
    case 28:
      label = '重口';
      break;
    default:
      break;
  }
  return label;
}

/**
 * 转换游戏label
 * @param rawLabels
 * @returns
 */
export function gameLabelConvert(rawLabels: string): string[] {
  let labels = rawLabels.split(',');
  for (let index in labels) {
    labels[index] = singleGameLabelConvert(labels[index]);
  }
  return labels;
}
