import React from "react";
import axios from "axios";
import { message } from "antd";

export default function Test() {
  //创建axios实例
  const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 20000,
    headers: {
      //
    }
  });

  // 请求拦截器(在发送请求之前调用)
  axiosInstance.interceptors.request.use(config => {
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    if (config.method === "post") {
      // {
      //   username:'admin',
      //   password:'admin'
      // }

      const keys = Object.keys(config.data);
      const data = keys
        .reduce((prev, curr) => {
          prev += `&${curr} = ${config.data[curr]}`;
          return prev;
        }, "")
        .slice(1);

      config.data = data;
      config.headers["content-type"] = "application/x-www-form-urlencodeed";
    }
    return config;
  });

  let id = "";
  let token = "";

  const handleClick1 = () => {
    axiosInstance({
      method: "POST",
      url: "/login",
      data: {
        username: "admin",
        password: "admin"
      }
      // data: 'username=admin&password=admin',
      /* headers: {
        'content-type': 'application/x-www-form-urlencoded'
      } */
    })
      .then(response => {
        console.log(response);

        if (response.data.status === 0) {
          token = response.data.data.token;
          message.success("登录成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  const handleClick2 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/add",
      data: {
        categoryName: "手机"
      }
      //headers: {
      //   authorization: `Bearer ${token}`
      // }
    })
      .then(response => {
        if (response.data.status === 0) {
          id = response.data.data._id;
          message.success("添加成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  const handleClick3 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/delete",
      data: {
        categoryId: id
      }
      /* headers: {
        authorization: `Bearer ${token}`
      } */
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success("删除分类成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  );
}
