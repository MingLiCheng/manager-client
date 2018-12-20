import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'

import router from './router'

let loadingInstance // 定义变量

function startLoading() { // 使用element loading-start方法
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)'
  })
}

function endLoading() {
  loadingInstance.close()
}

// 请求拦截
axios.interceptors.request.use(request => {
  // 加载 动画
  startLoading()
  // 判断本地存储中是否有 token
  if (localStorage.eleToken) {
    request.headers.Authorization = localStorage.eleToken
  }
  return request
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  // 结束
  endLoading()
  return response
}, error => {
  // 错误
  endLoading()
  Message.error(error.response.data)

  // 获取错误代码
  const {
    status
  } = error.response // 解构
  if (status === 401) {
    // token 过期
    Message.error('token无效，请重新登陆')
    // 清除 token
    localStorage.removeItem('eleToken')
    // 跳转到 登录页面
    router.push('/')
  }
  return Promise.reject(error)
})

export default axios
