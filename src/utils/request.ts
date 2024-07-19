import Taro from '@tarojs/taro'
import storage from './storage'
import $T from './'

/* eslint-disable */
export const baseUrl = HOST
/* eslint-enable */
let loginType = false

export default function request(url = '', params = {}, option: any = {}) {

  let conf: any = {
    url: baseUrl + url,
    method: option.method || 'POST',
    timeout: 1000000,
    data: params
  }

  conf.header = option.header || { 'content-Type': 'application/json;charset=UTF-8' }
  if (option.formData) {
    conf.header = { 'content-Type': 'application/x-www-form-urlencoded' }
  }

  const token = storage.get('token') || ''
  if (token) {
    conf.header['Authorization'] = token || ''
  }  


  if (!option.isNoLoading) {
    showLoading()
  }

  return Taro.request(conf)
    .then(res => {
      const { code, result,message, } = res.data      
      if (!option.isNoLoading) {
        hideLoading()
      }
      $T.isRequest = false
      
      if (code == 200) {
        return result
      } else {
        if (code == 10000) {
          // Taro.showToast({
          //   title: showMessage || '服务器开小差，请稍后再试',
          //   icon: 'none'
          // })
          // 用户未登录 跳转登录  
          storage.remove('token')
          $T.toLink('/pages/login/index')
          return false
        } else if (code == 500) {
          Taro.showToast({
            title: message,
            icon: 'none'
          })
          return Promise.reject(result)
        } else if (code == 5000){
          Taro.showToast({
            title: message,
            icon: 'none'
          })
          return Promise.reject(result)
        }    

        return Promise.reject(result)
      }

      // if (res.statusCode === 200) {
      //   if (res.data.code === 200) {
      //     return Promise.resolve(res.data.result)
      //   } else {
      //     Taro.showToast({ title: res.data.desc, icon: 'none' })
      //   }
      // } else {
      //   return Promise.reject(res)
      // }
    })
  // .finally(() => {
  //   // 真机上小程序不支持？？
  //   isShowLoading ? hideLoading() : ''
  // })
}

const showLoading = () => {
  Taro.showLoading({ title: '加载中' })
  Taro.showNavigationBarLoading()
}

const hideLoading = () => {
  Taro.hideNavigationBarLoading()
  Taro.hideLoading()
}
