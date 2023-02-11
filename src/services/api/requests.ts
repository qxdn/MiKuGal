import Settings from '@configs/defaultSettings';
import axios, {AxiosInstance} from 'axios';
import logger from '@services/log';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

// 主站设置 TODO: 后面可以改成存储
let baseMainConfig = Settings.network.main; // 主站

let baseMainInstance: AxiosInstance;
const getRequestMethod = () => {
  if (baseMainInstance) {
    return baseMainInstance;
  }
  // TODO: 添加inceptor
  baseMainInstance = axios.create({
    baseURL: baseMainConfig.url,
    timeout: baseMainConfig.timeout,
  });
  baseMainInstance.interceptors.response.use(
    response => {
      let data = response.data;
      return data;
    },
    err => {
      // TODO: error fix
      logger.error(err.response.data);
      Toast.show({type: 'error', text1: '网络请求失败'});
    },
  );
  return baseMainInstance;
};

const request = async <T = any>(
  url: string,
  options?: {[key: string]: any},
  keepResponse: boolean = false,
): Promise<T | API.Response<T> | null | Record<string, any>> => {
  let requestInstance = getRequestMethod();
  options = {
    url: url,
    ...(options || {}),
  };
  let data: API.Response<T> = await requestInstance.request<
    any,
    API.Response<T>
  >(options);
  if (keepResponse) {
    // 保持原样返回
    return data;
  }
  if (data.code === 0) {
    if (data.wrap) {
      return {obj: data.obj, wrap: data.wrap};
    }
    return data.obj;
  }
  if (data.code === 5) {
    // code=5 大概率是这个，主要为福利区、本子区、轻小说区等位置
    logger.debug('未登录');
  } else {
    Toast.show({type: 'error', text1: '请求数据失败'});
  }
  return null;
};

export {request};
