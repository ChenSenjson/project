/*创建action 对象工厂函数模式*/


import { reqLogin } from '../api';
import { setItem } from '../utlis/storage';
import { SAVE_USER } from './action-type';

const saveUser = user => ({ type: SAVE_USER, data: user });

export const saveUserAsync = (username, password) => {
  return dispatch => {
    // 当前函数返回值，作为将来组件调用时的返回值
    // 异步操作
    return reqLogin(username, password).then(response => {
      // 登录成功
      /*
          存储用户数据和token

          存在redux中（内存存储，一旦刷新就没了）
          还需要持久化存储：localStorage
            因为频繁操作 localStorage 性能不好，如果存储在redux，性能更好

          存储：localStorage 和 redux
          读取：先从 localStorage 中读取，存在 redux 中，后面通过 redux 读取使用
        */
      setItem('user', response);
      // 触发更新
      dispatch(saveUser(response));
    });
  };
};
