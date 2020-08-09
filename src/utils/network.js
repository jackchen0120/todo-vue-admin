import Vue from 'vue'
import axios from 'axios'
import { apiUrl } from './url'
import store from '../store'

// 创建实例
const service = axios.create({
  baseURL: apiUrl,
  timeout: 55000
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.state.userInfo.data.token) {
    config.headers['authorization'] = store.state.userInfo.data.token;
  }
  
  return config;
}, error => {
  Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log(response.data)
    // 抛出401错误，因为token失效，重新刷新页面，清空缓存，跳转到登录界面
    if (response.data.code == 401 || response.data.code === 403) {
      store.dispatch('userInfo/logout')
      .then(() => {
        location.reload();
      });
    }

    return response.data;
  },
  error => {
    const { status } = error.response;

    if (status === 401 || status === 403) {
        store.dispatch('userInfo/logout')
        .then(() => {
          location.reload();
        });
        Vue.prototype.$Message.error({
          content: 'token失效，或长时间未操作，请重新登录',
          duration: 5
        })
    } else {
        Vue.prototype.$Message.error({
          content: '网络异常，请稍后再试',
          duration: 5
        })
    }

    return Promise.reject(error)
  }
)

export default service;
