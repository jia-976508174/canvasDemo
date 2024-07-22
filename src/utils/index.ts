import Taro from "@tarojs/taro";
import storage from "./storage";

export default {
  system: Taro.getSystemInfoSync(),
  // upLoadUrl: `${HOST}/imageProcess/extraSingleImage`,
  isRequest: false,
  /**
   * 链接跳转
   * url 跳转地址
   * method 跳转方式
   * */
  toLink: (url, method?: string) => {
    if(method == 'isLogin') {
      const token = storage.get("token") || '';
      if(!token) {
        Taro.navigateTo({url: '/pages/login/index'});
        return false
      }
    }
    
    if (method && (typeof method == 'string') && method != 'isLogin') {
      Taro[method]({
        url: url,
      });
    } else {
      Taro.navigateTo({
        url: url,
      });
    }
  },
  /**
   * 是否登录
   * 返回值 true false
   * type ==空返回false不跳转   type==1 跳登录
   * */
  isLogin(type) {
    const token = storage.get("token") || '';
    if (type == 1 && !token) {
      this.toLink("/pages/login/index");
    }
    
    return token;
  },
  
  previewImage(v:string [],idx?: number) {
    if(!v || v.length == 0) return false
    Taro.previewImage({
      current: v[idx || 0], // 当前显示图片的http链接
      urls: v, // 需要预览的图片http链接列表
      enablesavephoto:false,
      showmenu:false
    })
  },  
  toast(msg, type) {
    Taro.showToast({
      title: msg,
      icon: type || "none",
      duration: 2000,
    });
  },
  showLoading(msg) {
    Taro.showLoading({ title: msg || '加载中' })
  },
  hideLoading() {
    Taro.hideLoading()
  }
  
  
};
