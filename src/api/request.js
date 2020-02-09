/*axios模块    封装*/
import axios from "axios";

import errCode from "../config/error-code";
import store from "$redux/store";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 20000,
  headers: {
    //公共请求 ，是写死的部分使用
  }
});

//请求拦截器
axiosInstance.interceptors.request.use(config => {
  const token = store.getState().user.token;

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  // console.log(config.method);

  if (config.method === "post") {
    config.data = Object.keys(config.data)
      .reduce((prev, curr) => {
        prev += `&${curr}=${config.data[curr]}`;
        return prev;
      }, "")
      .slice(1);

    config.headers["content-type"] = "application/x-www-form-urlencoded";
  }
  return config;
});

//响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    console.log(response);
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },

  err => {
    let errMsg = "";
    if (err.response) {
      errMsg = errCode[err.response.status];
    } else {
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络异常，请检查网络";
      } else if (err.message.indexOf("timeout") !== -1) {
        errMsg = "网络连接超时，请更换网络试试";
      }
    }

    return Promise.reject(errMsg || "发生未知错误请联系管理员...");
  }
);

export default axiosInstance;
