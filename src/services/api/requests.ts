import Settings from '@configs/defaultSettings';
import axios, {AxiosInstance} from 'axios';

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
  baseMainInstance.interceptors.response.use(response => {
    let data: API.Response<any> = response.data;
    if (data.code === 0) {
      return data.obj;
    }
    return null;
  });
  return baseMainInstance;
};

const request = (url: string, options?: {[key: string]: any}) => {
  let requestMethod = getRequestMethod();
  options = {
    url: url,
    ...(options || {}),
  };
  return requestMethod(options);
};

export {request};
