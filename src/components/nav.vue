<template>
  <view class="nav" :style="{height:`${topBarH}px`}">
    <view class="nav-box" :style="{background: bgType > 0 ? navBg : '#fff',height:`${topBarH}px`}">
      <view class='nav-status' :style="{height:`${statusBarH}px`}"></view>
      <view class="nav-info f-18">
        <view class="nav-back t-c fw-b" :class="{'f-16':backText && backText.length > 4}">
          <view v-if="navType == 2">
            <view v-if="routeFirst">              
              <image src="~@assets/images/nav_home.png" mode="widthFix" style="width: 24px; margin-left: 8px;"/>
            </view>
            <view class="back-arrow" v-else>
              <image src="~@assets/images/arrow_white.png" mode="heightFix" v-if="backType == 1"/>
              <image src="~@assets/images/arrow_black.png" mode="heightFix" v-else/>     
            </view>                   
          </view>          
          {{backText}}
        </view>
        <view class='nav-title f-16 fw-b' :style="{width: `${navW}px`,paddingLeft: `${pLeft}px`}">  
          {{title}}      
        </view>
      </view>    
    </view>
  </view> 
</template>

<script>
import { reactive, toRefs } from "vue";
import Taro,{getCurrentInstance,usePageScroll } from '@tarojs/taro'
import $T from "@utils";


export default {
  name: "Index",
  components: {},
  props: ['type','title','backText','bgType','backType'],//type home首页 1 一级页面， 2二级页面
  setup(props,{emit}) {
    const _route = getCurrentInstance().router;
    const _len = Taro.getCurrentPages().length
    const D = reactive({
      menuButton: Taro.getMenuButtonBoundingClientRect(), //右侧胶囊按钮信息
      statusBarH: $T.system.statusBarHeight,
      navW: 0,
      topBarH: $T.system.statusBarHeight + 44 ,   //(props.type == 'home' ? 12 : 0)
      pLeft: 0,   
      navType: props.type,
      navBg: '',
      scrollTop: 0,
      routeFirst: false
    });
   
    const _jian = 44 + 12 + 8 
    D.navW = $T.system.windowWidth - D.menuButton.width - _jian
    D.pLeft = D.menuButton.width - 44    
 
    emit('topBarH',D.topBarH)

    usePageScroll(e => {
      const _sTop = e.scrollTop      
    })
   
    if(props.type != 1 && _len == 1) {
      D.routeFirst = true
    }
    
    return {
      ...toRefs(D),
    };
  },
};
</script>

<style lang="scss">
@import '../../src/app.scss';

.nav-box {
  @include Position(fixed,999,0,'','',0);
  text {
    display: inline-block;
    vertical-align: top;
  }  
  .nav-info {
    display: flex;
    align-items: center;
    height: 44PX;
    line-height: 44PX;
    padding-left: 12px;
  }
  .nav-back {
    display: flex;
    align-items: center;
    min-width: 44px; 
    .back-arrow {
      image {
        height: 20px;
        vertical-align: middle;
        margin:-4px 0px 0 0;
      }
    }    
  }
  .nav-title {
    display: flex;
    align-items: center;
    justify-content: center;
    @include text-ellipsis();
    box-sizing: border-box;   
  }

}
.logo {
  width: 118px;
  // height: 28px;
  // margin-top: 12px;
}
</style>
