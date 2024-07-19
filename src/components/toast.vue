<template>
  <view class="toast-info col-fff t-c" v-show="isShow">
    {{ msg }}
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import { ref, reactive, toRefs,watch} from "vue";

export default {
  name: "tabBar",
  props: ['msg','second'],
  setup(props,{emit}) {
    const D = reactive({
      isShow: props.msg,
      second: props.second || 1500
    });

    watch(
      ()=> props.msg,
      res=>{
        D.isShow = res
        if(res) {
          setTimeout(()=>{
            D.isShow = false
            emit('change',null)
          },D.second)
        }
      }
    )

    return {
      ...toRefs(D)
    };
  },
};
</script>
<style lang="scss">

.toast-info {
  @include Position(fixed,99,50%,'','',50%);
  width: auto;
  min-width: 96px;
  padding: 8px;
  border-radius: 8px;
  background: linear-gradient(90deg, #FEB47B 12%, #FF7E5F 51.68%, #FEB47B 88.5%);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
  transform: translate(-50%,-50%);
}

</style>
