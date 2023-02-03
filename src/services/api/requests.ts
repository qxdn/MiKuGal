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
      logger.log(response);
      let data: API.Response<any> = response.data;
      if (data.code === 0) {
        if (data.wrap) {
          return {obj: data.obj, wrap: data.wrap};
        }
        return {obj: data.obj};
      }
      return null;
    },
    err => {
      // TODO: error fix
      logger.log(err.response.data);
      Toast.show({type: 'error', text1: '网络请求失败'});
    },
  );
  return baseMainInstance;
};

const request = <T = any>(url: string, options?: {[key: string]: any}) => {
  let requestInstance = getRequestMethod();
  options = {
    url: url,
    ...(options || {}),
  };
  return requestInstance.request<any, T>(options);
};

export {request};
