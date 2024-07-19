<template>
  <view class="loading-tag d-flex-center">
    <view class="t-c col-fff">
      <image
        src="https://ruyi-image.revealdata.cn/ruyi-config/loading.gif"
        mode="widthFix"
      />
      <view v-show="show">
        <view class="f-16 mt-12">云端处理中...</view>
        <view class="f-14 mt-12">你可返回进行其他操作</view>
        <view class="f-14 mt-12">稍后可在</view>
        <view class="f-14 mt-12">【我的】-【历史记录】中查看生成记录~</view>
        <!-- <text
          class="mt-24 col-fff history-btn"
          @tap="toLink(`/pages/background/history`)"
          >查看记录</text
        >
        <text
          class="mt-24 col-fff history-btn ml-8"
          @tap="toLink(`/pages/index/index`, 'reLaunch')"
          >回到首页</text
        > -->
      </view>
        <view class="f-16 mt-12" v-show="ktLoading == 1">自动识别抠图中</view>
        <view class="f-16 mt-12" v-show="ktLoading == 2">正在对您选中的位置进行抠图</view>
        <view class="f-16 mt-12" v-show="ktLoading == 3">正在抠图</view>
    </view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { ref, reactive, toRefs,watch} from "vue";
import $T from "@utils";

export default {
  name: "pageLoad",
  props: {show: Boolean,ktLoading:Number},
  setup(props,{emit}) {
    const D = reactive({
      show:props.show,
      ktLoading:props.ktLoading
    });
    const toLink = (url, type) => {
      emit('toChange', true)
      $T.toLink(url, type);
    };

    return {
      ...toRefs(D),
      toLink
    };
  },
};
</script>
<style lang="scss">
.loading-tag {
  .history-btn {
    width: 128px;
    @include Height(40);
    border-radius: 22px;
    border: 1px solid #fff;
  }
}
</style>
