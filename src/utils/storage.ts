import Taro from '@tarojs/taro'

export default {
  name: 'storage',
  /**
   * 设置
   * @param {string} key 键
   * @param {Object} value 值
   */
  set (k, val) {
    Taro.setStorage({
      key: k,
      data: val
    })
  },

  /**
   * 获取
   * @param {string} key 键
   * @return {Object}
   */
  get (k) {
    return Taro.getStorageSync(k)
  },

  /**
   * 移除
   * @param {string} key 键
   */
  remove (key) {
    Taro.removeStorageSync(key)
  }
}
