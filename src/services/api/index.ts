import {request} from './requests';
import Settings from '@src/configs/defaultSettings';
import GameType from '@src/enums/gametype';
import {Md5} from 'ts-md5';

/**
 *
 * @param params 获取galgame游戏列表
 */
export async function getGameList(
  page: number,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
) {
  return await request<API.PageWrapper<API.GameListItem[]>>(type.list, {
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
      Accept: 'application/json,text/plain,*/*',
      ContentType: 'application/x-www-form-urlencoded',
    },
    data: {
      email: email,
      password: Md5.hashStr(password),
    },
    ...(options || {}),
  });
}

/**
 * 网站全局评论
 */
export async function getGlobalGameComment(options?: {[key: string]: any}) {
  return await request<API.GlobalGameComment[]>('/ggs', {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
}

/**
 * 获取最近更新的游戏补丁记录
 * @param label
 */
export async function getLastUpdateGamePatch(
  label: string,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
) {
  return await request<API.LastUpdateGamePatch[]>(type.label, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
      label: label,
    },
    ...(options || {}),
  });
}

/**
 * 获取网页右侧的留言
 * @param params
 */
export async function getWebGameComment(
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
) {
  return await request<API.WebGameComment[]>(type.webComment, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
}

/**
 * 获取随机游戏
 * @param options
 * @returns
 */
export async function getRandomGame(
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
) {
  return await request<API.RandomGame[]>(type.random, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
}

/**
 * 获取游戏排行榜
 * @param options
 * @returns
 */
export async function getTopGame(
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
) {
  return await request<API.RandomGame[]>(type.topGame, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
}

/**
 * 获取vip信息
 * @param options
 * @returns
 */
export async function getVIP(options?: {[key: string]: any}) {
  return await request<API.VIP>('/getVip', {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    ...(options || {}),
  });
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
) {
  return await request<API.OneDriveUrl>('/down', {
    method: 'POST',
    headers: {
      Accept: 'application/json,text/plain,*/*',
      ContentType: 'application/x-www-form-urlencoded',
    },
    data: {
      id: id,
      type: type.downloadType,
    },
    ...(options || {}),
  });
}

export async function getGameDetail(
  id: number,
  type: GameTypeEnum = GameType.Galgame,
  options?: {[key: string]: any},
) {
  return await request<API.GameDetail>(type.details, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
    params: {
      id: id,
    },
    ...(options || {}),
  });
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
) {
  return await request<API.PageWrapper<API.GameDetailComment[]>>(
    type.detailComment,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json,text/plain,*/*',
      },
      params: {
        id: id,
        yema: yema,
      },
      ...(options || {}),
    },
  );
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
