<template>
  <view class="tab-bar t-c d-flex-between">
    <view
      class="tab-info f-12"
      :class="{'on': item.type == type,'d-none':item.type ==1003 && isShow==true}"
      :style="{display:item.type ==1003 && isDisplayCourse == 0?`none`:`block`}"
      v-for="item in menuList"
      :key="item.type"
      @tap="toLink(item)"
    >      
      <image :src="item.type == type ? item.imgLight : item.imgGray" :style="{height:item.type == 1003?`19px`:`28px`,marginTop:item.type == 1003?`3px`:``}" />   
      <view>{{ item.name }}</view>
    </view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { ref, reactive, toRefs, getCurrentInstance, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import $T from "@utils";
import storage from "@utils/storage";

export default {
  name: "tabBar",
  props: ["type",'isShow'], //[首页：1001，个人中心：1002]
  setup(props,{emit}) {
    const D = reactive({
      menuList: [
        {
          type: 1001,
          name: "图文工具",
          imgGray: require('@assets/images/home_tb.png'),
          imgLight: require('@assets/images/home_tb2.png'),
          path: '/pages/index/index'
        },
        {
          type: 1003,
          name: "课程中心",
          imgGray: require('@assets/images/kc_tab1.png'),
          imgLight: require('@assets/images/kc_tab2.png'),
          path: `/pages/webview/index?link=${encodeURIComponent('https://course-h5.suixinsuixiang.com/ydxlewojjsnjpprq')}`
        },        
        {
          type: 1002,
          name: "我的",
          imgGray: require('@assets/images/my_tb1.png'),
          imgLight: require('@assets/images/my_tb2.png'),
          path: '/pages/my/index',
          // isLogin: true
        },
      ],
      isMember:null,
      SystemInfo:'',
      isDisplayCourse:0,

    });
    D.SystemInfo = Taro.getSystemInfoSync().platform;
    const toLink = (o) => {
      if(o.type == 1003){
        if(D.isMember == 1){
          Taro.navigateTo({
            url: o.path
          })
        }else{
          setTimeout(()=>{
            // if(D.SystemInfo == 'ios'){
            //   emit('iosShow',true)
            //   emit('tabType',o.type)
            // }else if(D.SystemInfo == 'android'){
              emit('androidShow',true)
              emit('tabType',o.type)
            // }else{
            //   emit('iosShow',true)
            //   emit('tabType',o.type)
            // }
          },200)
        }
      }else{
        Taro.reLaunch({
          url: o.path
        })
      }
    }
    return {
      ...toRefs(D),
      toLink,
    };
  },
  onShow() {
  },
};
</script>
<style lang="scss">
.tab-bar {
  @include Position(fixed, 50, "", "", 0, 50%);
  max-width: 750px;
  height: 50px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  transform: translate(-50%, 0);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .tab-info {    
    flex: 1;
    padding-top: 5px;
    font-size: 10px;
    color: #666;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    >image {
      width: 28px;
      height: 28px;
      margin-bottom: 3px;
    }
    &.on {
      color: rgba(46, 139, 245, 1);
    }
  }  
}

</style>
