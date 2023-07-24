import Taro from '@tarojs/taro'
import { checkStatus } from '../helper/checkStatus'

/**
 * 拦截器
 */
export const interceptor = chain => {
  const { requestParams } = chain
  const { isShowLoading } = requestParams

  if (isShowLoading) {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
  }
  delete requestParams.isShowLoading

  return chain
    .proceed(requestParams)
    .then(res => {
      isShowLoading && Taro.hideLoading()
      // 200-299认为响应成功
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // 出路获取oss令牌信息时特殊情况
        if (res.data.code === undefined) {
          return res.data
        }
        if (res.data.code === 200) {
          return res.data
        } else {
          return Promise.reject({ errCode: res.data.code, message: res.data.message })
        }
      } else {
        // http错误状态码处理
        checkStatus(res.statusCode)
        // 401未授权，403授权过期
        if (res.statusCode === 401 || res.statusCode === 403) {
          // loginout()
          return Promise.reject()
        }
        // 其他错误统一错误弹窗
        return Promise.reject({ errNo: res.statusCode })
      }
    })
    .catch(err => {
      isShowLoading && Taro.hideLoading()
      // request没有发出去
      if (err) {
        // code码统一错误处理
        if (err.errCode) {
          Taro.showToast({
            title: err.message,
            icon: 'none'
          })
        }
        if (err.errNo) {
          // 跳转Error页面
        }
      }
      return Promise.reject(err)
    })
}
