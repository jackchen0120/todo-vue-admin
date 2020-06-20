import Vue from 'vue'
import axios from 'axios'
import { apiUrl } from './url'
import store from '../store'


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
    if (response.data.code == 401) {
      store.dispatch('userInfo/logout')
      .then(() => {
        location.reload();
      });
    }

    return response.data;
  },
  error => {
    Vue.prototype.$Message.error({
      content: '网络异常，请稍后再试',
      duration: 5
    })

    return Promise.reject(error)
  }
)

export default service;
