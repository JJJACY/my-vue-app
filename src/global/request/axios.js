import axios from "axios";
import { Message } from "@arco-design/web-vue";
const axiosInstance = axios.create();

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    return newConfig;
  },
  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { response } = error;
  const status = response ? response.status : 408;
  if (response) {
    const { data } = response;
    const { errors } = data;
    const message = data.message || "请求发送失败~";
    if (status === 401) {
      Message.error(message);
    } else if (status === 403) {
      Message.error("禁止访问");
    } else if (status === 419) {
      Message.error('sb')
    } else if (status === 422 || status === 423 || status === 429) {
      Message.error(errors);
    } else {
      Message.error(message);
    }
  } else {
    Message.error("网络错误");
  }
};

axiosInstance.interceptors.response.use(
  res => {
    switch (true) {
      case res.status === 200:
        if (res.data.success === false) {
          Message.error(res.data.message);
          return Promise.reject(res.data);
        }
        return res.data.data;
      case !!res.status:
        Message.error(res.data.message);
        return Promise.reject(res.data);
      default:
        return res.data;
    }
  },
  error => {
    handleErrorRequest(error);
    return Promise.reject(error);
  }
);

export default {
  post(url = "", data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },
  put(url = "", data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  patch(url = "", data = {}, config = {}) {
    return axiosInstance.patch(url, data, config);
  },
  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.get(url, OPTIONS);
  },
  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.delete(url, OPTIONS);
  }
};
