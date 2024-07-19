<template>
  <view class="home-box">
    <Nav type="2" bgType="1" :title="moduleInfo.des" class="nav"></Nav>
    <view class="history">
      <view class="d-items-center">
        <view class="blue"></view>
        <view class="f-14">上传参考图</view>
      </view>
      <view class="d-items-center">
        <view class="record">历史记录</view>
        <image src="@assets/images/r-arrow.png" />
      </view>
    </view>
    <view class="bg-0" @tap="borderNone" :class="column ? 'flex-column' : ''">
      <image
        class="del"
        src="~@assets/images/sc.png"
        mode="widthFix"
        v-show="!ktshow"
        @tap="del"
      />
      <view class="upload" v-show="!isDel" @tap="TopchooseImage">
        <view class="top tl">
          <view class="transverse bg-fff"></view>
          <view class="vertical bg-fff"></view>
        </view>
        <view class="f-14 col-fff">上传新图</view>
      </view>
      <image
        :src="imgUrl"
        class="yuan-img"
        mode="heightFix"
        :style="{ height: `${yuanHeight}px` }"
        v-if="ktshow"
      />
      <view
        class="movable-box"
        :style="{
          top: `${top}px`,
          left: `${left}px`,
          bottom: `${bottom}px`,
          right: `${right}px`,
          width: `${ktWidth}px`,
          height: `${ktHeight}px`,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          backgroundImage: `url(${ktImg})`,
          zIndex: `18`,
        }"
        v-show="isDel"
        v-if="!ktshow"
      ></view>
      <view
        class="movable-box"
        :style="{
          top: `${top}px`,
          left: `${left}px`,
          width: `${ktWidth}px`,
          height: `${ktHeight}px`,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          zIndex: `20`,
        }"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        v-show="isDel"
        v-if="!ktshow"
      >
        <view
          class="kt-img"
          :style="{
            border: `${oScale * 2}px solid ${color}`,
          }"
          @tap="borderShow"
        >
          <image
            src="~@assets/images/twcz-xz.png"
            class="xz-img"
            :style="{
              transform: `scale(${oScale})`,
              left: `${ktWidth / 2 - 10}px`,
              bottom: `${xzBottom}px`,
              display: `${borderShows}`,
            }"
            @touchstart="Start"
            @touchmove="Move"
            @touchend="End"
          />
          <image
            src="~@assets/images/twcz-sf.png"
            class="sf-img"
            :style="{
              transform: `scale(${oScale})`,
              display: `${borderShows}`,
            }"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
          />
          <image
            src="~@assets/images/twcz-tandb.png"
            class="top-img tbwh"
            :style="{
              left: `${ktWidth / 2 - 25}px`,
              top: oScale != 1 ? `-3px` : `-4px`,
              transform: `scale(${oScale})`,
              display: `${borderShows}`,
            }"
          />
          <image
            src="~@assets/images/twcz-tandb.png"
            class="bottom-img tbwh"
            :style="{
              left: `${ktWidth / 2 - 25}px`,
              bottom: oScale != 1 ? `-3px` : `-4px`,
              transform: `scale(${oScale})`,
              display: `${borderShows}`,
            }"
          />
          <image
            src="~@assets/images/twcz-landr.png"
            class="left-img lrwh"
            :style="{
              bottom: `${ktHeight / 2 - 25}px`,
              left: oScale != 1 ? `-3px` : `-4px`,
              transform: `scale(${oScale})`,
              display: `${borderShows}`,
            }"
            
          />
          <image
            src="~@assets/images/twcz-landr.png"
            class="right-img lrwh"
            :style="{
              bottom: `${ktHeight / 2 - 25}px`,
              right: oScale != 1 ? `-3px` : `-4px`,
              transform: `scale(${oScale})`,
              display: `${borderShows}`,
            }"
          />
        </view>
      </view>
      <view
        class="bg-fff p-r z-19"
        :style="{ width: `${fWidth}`, height: `${fHeight}` }"
      ></view>
      <view
        class="msk"
        :style="{ width: `${mskWidth}`, height: `${mskHeight}` }"
      >
      </view>
      <view
        class="bg-fff p-r z-19"
        :style="{ width: `${fWidth}`, height: `${fHeight}` }"
      ></view>
    </view>
    <canvas
      canvas-id="cropCanvas"
      :style="{
        height: `${Math.floor(cropCanvasHeight)}px`,
        width: `${Math.floor(cropCanvasWidth)}px`,
      }"
      class="canvas"
    ></canvas>
    <view class="d-items-center w-100 mt-20 mb-10 bl">
      <view class="blue"></view>
      <view class="f-14">比例</view>
    </view>
    <view class="w-100 d-items-center mb-25 flex-1">
      <view
        class="f-14 mr-10 t-c ratio-list"
        v-for="(list, i) in proportionlist"
        :key="i"
        :class="tab == i ? ' borders' : ''"
        :style="{ backgroundImage: `url(${list.icon})` }"
        @tap="selecte(list, i)"
      >
      </view>
    </view>
    <view class="uhd-bottom iphonex-pb">
      <nut-tabs v-model="bottomValue" auto-height>
        <template #titles>
          <div
            v-for="item in list"
            :key="item.active"
            :class="{ active: bottomValue === item.active }"
            class="custom-tab-item"
            @click="bottomTab(item)"
          >
            <div>
              {{ item.title }}
            </div>
          </div>
        </template>
        <nut-tab-pane pane-key="c1">
          <view class="d-items-center w-100 p-r mt-10">

            <scroll-view
              :scroll-x="true"
              style="width: calc(100% - 0px)"
              class="scroll-box"
            >
              <view class="w-100 d-items-center ml-3 flex-1">
                <view class="t-c nth" v-for="(list, i) in sceneLsit" :key="i">
                  <view
                    class="scenelist-box t-c"
                    @tap="sceneSelecte(list, i)"
                    :class="sceneTab == i ? 'border' : ''"
                    :style="{ backgroundImage: `url(${list.icon})` }"
                  >
                    <image
                      src="@assets/images/twcz-dui.png"
                      v-show="sceneTab == i"
                    />
                  </view>
                  <view class="f-10 col-75696F mt-4">{{ list.name }}</view>
                </view>
              </view>
            </scroll-view>
          </view>
        </nut-tab-pane>
        <nut-tab-pane pane-key="c2">
          <view class="tab-2">
            <image
              class="del"
              src="~@assets/images/sc.png"
              mode="widthFix"
              v-show="!bottomIsDel"
              @tap="BottomDel"
            />
            <view
              class="tabUpload"
              v-show="bottomIsDel"
              @tap="BottomchooseImage"
            >
              <view class="top tl">
                <view class="transverse bg-A9A9A9"></view>
                <view class="vertical bg-A9A9A9"></view>
              </view>
              <view class="f-12 col-707070">上传参考图，生成相似场景</view>
            </view>
            <image :src="ref" mode="heightFix" v-show="!bottomIsDel" />
          </view>
        </nut-tab-pane>
        <nut-tab-pane pane-key="c3">
          <view class="tab-1 p-r">
            <nut-textarea
              v-model="val"
              limit-show
              :max-length="500"
              placeholder=""
            />
            <view class="sj">
              <image src="~@assets/images/suiji.png" mode="widthFix" />
              随机生成提示词
            </view>
            <image
              class="closed"
              src="~@assets/images/sc.png"
              mode="widthFix"
              @tap="closed"
            />
          </view>
        </nut-tab-pane>
      </nut-tabs>
      <view class="mt-16 d-items-center flex-1">
        <view class="generate mr-20" @tap="generate(1)"
          >生成1张<i
            v-if="moduleInfo.compute > 0 && moduleInfo.userComputeType == 0"
            >({{ moduleInfo.compute }}算力)</i
          ></view
        >
        <view class="generate" @tap="generate(4)"
          >生成4张<i
            v-if="moduleInfo.compute > 0 && moduleInfo.userComputeType == 0"
            >({{ moduleInfo.compute * 4 }}算力)</i
          ></view
        >
      </view>
    </view>
    <canvas
      :style="{ height: `${canvasHeight}px`, width: `${canvasWidth}px` }"
      canvas-id="myCanvas"
      class="canvas"
    ></canvas>

    <Loading
      v-if="isLoading"
      @toChange="isJump = false"
      :show="show"
      :ktLoading="ktLoading"
    ></Loading>
    <Toast :msg="toastMsg" @change="toastMsg = null"></Toast>
  </view>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import Nav from "@components/nav.vue";
import Toast from "@components/toast.vue";
import $T from "@utils";
import storage from "@utils/storage";
export default {
  name: "purchaseRecord",
  components: {
    Nav,
    Toast,
  },
  setup() {
    const D = reactive({
      toastMsg: null,
      moduleInfo: {
        compute: "4",
        des: "AI商品图",
        functionType: "bgi",
        img: "",
        isExclusiveMember: 0,
        linkType: "module",
        path: "",
        shareImg: "",
        shareTitle: "AI商品图",
        showHome: 0,
        userComputeType: 0,
      },
      title: "",
      isJump: true,
      ktLoading: 3,
      isLoading: false,
      val: "",
      mskWidth: "100%",
      mskHeight: "100%",
      yuanHeight: "",
      imgUrl:
        "https://applet-image.suixinsuixiang.com/ruyi-temp/593415133603418b8b447f497faa9b76.jpg",
      ktImg: "",
      ktshow: true,
      bottomValue: "c1",
      list: [
        {
          title: "场景",
          active: "c1",
        },
        {
          title: "上传参考图",
          active: "c2",
        },
        {
          title: "自定义",
          active: "c3",
        },
      ],
      proportionlist: [
        {
          height: "1024",
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/size1_1.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=1kyEClrqq0wB3NK0VUS1S5L9kis%3D&Expires=1721274598",
          md5: "d0bd571dc19c083d82f023c9666c5574",
          name: "1:1",
          width: "1024",
        },
        {
          height: "1280",
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/size3_4.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=Jhw%2F8tNfSNAZdiTKFyz18WbULJA%3D&Expires=1721274598",
          md5: "196f2739157a9ea63183a49d928b9a35",
          name: "3:4",
          width: "960",
        },
        {
          height: "1536",
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/size9_16.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=MZv6eSOhLtNE6xgp9mWVIY5FSo0%3D&Expires=1721274598",
          md5: "20b5b510428f8e04a0a7376b269a3337",
          name: "9:16",
          width: "864",
        },
        {
          height: "864",
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/size16_9.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=Qyf1trSpHnIQfuRR%2F6EfDeaTXAU%3D&Expires=1721274598",
          md5: "d03b9b8a4ac9d360d5057502539c5061",
          name: "16:9",
          width: "1536",
        },
      ],
      tab: 0,
      show: false,
      windowWidth: null,
      areaHeight: null,
      areaWidth: null,
      top: null,
      left: null,
      yxX: null,
      yxY: null,
      ktWidth: 0,
      ktHeight: 0,
      startScale: {},
      endScale: {},
      startRotate: {},
      endRotate: {},
      startTranslation: {},
      endTranslation: {},
      endRotate: {},
      r: null,
      anglePre: 0,
      angleNext: 0,
      rotate: 0,
      disPtoO: null,
      scale: 1,
      translationX: 0,
      translationY: 0,
      canvasScale: 1,
      biliW: 1024,
      biliH: 1024,
      file: "",
      oScale: 1,
      startTouches: [],
      canvasWidth: 0,
      canvasHeight: 0,
      offsetWidth: 0,
      offsetHeight: 0,
      bgHeight: 0,
      borderShows: "block",
      color: "#0279ff",
      // isscale:true,
      startDistance: null,
      startScales: null,
      xzBottom: -32,
      cropCanvasWidth: 0,
      cropCanvasHeight: 0,
      isDel: true,
      bottomIsDel: true,
      sceneLsit: [
        {
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/desktop.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=jEITr6J3MC4cwfqFFiq23NfopCQ%3D&Expires=1721274866",
          md5: "2828b79cbd8e438eae2b2342c360ef8f",
          name: "桌面",
        },
        {
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/floor.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=I99bo2QQviHR7OWblBXwbb%2BWlpE%3D&Expires=1721274866",
          md5: "39fc694b27fb07381e9c501be2df5a0f",
          name: "地板",
        },
        {
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/background_wall.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=knR4MCPbk9gtcKBIYjX4yXA2MBM%3D&Expires=1721274866",
          md5: "c0cc858b5afdd00da4f67fb397c29413",
          name: "背景墙",
        },
        {
          icon: "https://file.suixinsuixiang.com/suixinsuixiang-workflow-prod/icon/inpaint/sitting_room.png?AWSAccessKeyId=G7X2A629D7U2BB2S711K&Signature=BNgLhoyA3MyVMBJE6mDj9IivH1w%3D&Expires=1721274866",
          md5: "c3f6b1963edafba1feafc28106c8e227",
          name: "客厅",
        },
      ],
      sceneTab: 0,
      type: 1,
      ref: "",
      scene: "",
      fWidth: 0,
      fHeight: 0,
      column: false,
      OffsetLeft: 0,
      OffsetTop: 0,
    });
    //获取图片信息 根据图片原始宽高计算缩小图片 拿到值 以及获取页面元素的宽高参数
    const getImageInfo = () => {
       const oldImg = storage.get("oldImg");
      D.imgUrl =
        oldImg
      setTimeout(() => {
        wx.getImageInfo({
          src: oldImg,
          success(res) {
            let oldImgW = res.width;
            let oldImgH = res.height;
            //下面判断比之前多除了1 3000以上的多除了2 加快获取像素点 图片越大获取越慢
            if (res.width < 1000 || res.height < 1000) {
              if (res.width > 1900 || res.height > 1900) {
                D.cropCanvasWidth = res.width / 7;
                D.cropCanvasHeight = res.height / 7;
              } else {
                if (res.width < 700 || res.height < 700) {
                  D.cropCanvasWidth = res.width;
                  D.cropCanvasHeight = res.height;
                } else {
                  D.cropCanvasWidth = res.width / 3;
                  D.cropCanvasHeight = res.height / 3;
                }
              }
            } else if (res.width > 3000 && res.height > 3000) {
              D.cropCanvasWidth = res.width / 12;
              D.cropCanvasHeight = res.height / 12;
            } else {
              if (res.width < 1500 || res.height < 1500) {
                if (res.width > 1900 || res.height > 1900) {
                  D.cropCanvasWidth = res.width / 7;
                  D.cropCanvasHeight = res.height / 7;
                } else if (res.width > 1700 || res.height > 1700) {
                  D.cropCanvasWidth = res.width / 6;
                  D.cropCanvasHeight = res.height / 6;
                } else {
                  D.cropCanvasWidth = res.width / 5;
                  D.cropCanvasHeight = res.height / 5;
                }
              } else {
                D.cropCanvasWidth = res.width / 7;
                D.cropCanvasHeight = res.height / 7;
              }
            }

            let query1 = Taro.createSelectorQuery();
            query1
              .select(".msk")
              .boundingClientRect((res) => {
                if (oldImgW > oldImgH) {
                  if (D.tab == 3) {
                    D.yuanHeight = res.height / 1.5;
                  } else {
                    D.yuanHeight = (res.height - 70) / 2;
                  }
                } else {
                  if (D.tab == 3) {
                    D.yuanHeight = res.height;
                  } else {
                    D.yuanHeight = res.height - 70;
                  }
                }

                let mskHeight = res.height;
                //根据元素位置 计算 图片刚开始的位置以及宽高
                setTimeout(() => {
                  let yuan = Taro.createSelectorQuery();
                  yuan
                    .select(".yuan-img")
                    .boundingClientRect((res) => {
                      D.ktWidth = res.width;
                      D.ktHeight = res.height;
                      let query = Taro.createSelectorQuery();
                      query
                        .select(".bg-0")
                        .boundingClientRect((res) => {
                          D.areaHeight = res.height;
                          D.areaWidth = res.width;
                          D.OffsetLeft = res.left;
                          D.OffsetTop = res.top;
                          if (D.tab == 0) {
                            D.canvasWidth = res.width;
                            D.canvasHeight = res.height;
                          }
                          D.left = D.areaWidth / 2 - D.ktWidth / 2;
                          D.top = D.areaHeight / 2 - D.ktHeight / 2;
                          D.yxX = D.left + D.ktWidth / 2;
                          D.yxY = D.top + D.ktHeight / 2;
                        })
                        .exec();
                    })
                    .exec();
                }, 1000);
              })
              .exec();
          },
        });
        setTimeout(() => {
          getimg();
        }, 500);
      }, 200);
    };
    const getData = () => {
     
    };
    //图片抠完图的边框贴合 接口自己添加 注释掉了
    const getimg = () => {
      D.isLoading = true;
      const oldImg = storage.get("oldImg");
      D.isDel = true;
      D.ktshow = true;
      // let obj = {
      //   file: D.imgUrl,
      //   coordinates: "",
      // };
      // Api.manualcutoutForDelete(obj).then((res) => {
      // D.ktImg = res.images[0].image;
      // Taro.downloadFile({
      //   url: 'https://applet-image.suixinsuixiang.com/ruyi-temp/593415133603418b8b447f497faa9b76.jpg',
      //   success: function (res) {
      let ctx = wx.createCanvasContext("cropCanvas");
      // let img = res.tempFilePath;
      ctx.drawImage(
        oldImg,
        0,
        0,
        Math.floor(D.cropCanvasWidth),
        Math.floor(D.cropCanvasHeight)
      );
      var lOffset = Math.floor(D.cropCanvasWidth),
        rOffset = 0,
        tOffset = Math.floor(D.cropCanvasHeight),
        bOffset = 0;
      ctx.draw(false, () => {
        setTimeout(() => {
          //canvas的宽高一定不能给小数点 会使得真机返回结果不同 Math.floor
          wx.canvasGetImageData({
            canvasId: "cropCanvas",
            x: 0,
            y: 0,
            width: Math.floor(D.cropCanvasWidth),
            height: Math.floor(D.cropCanvasHeight),
            success(res) {
              //获取图片的像素点值 根据rgba四个为一组 透明的进行裁剪
              const data = res.data;
              for (var i = 0; i < Math.floor(D.cropCanvasWidth); i++) {
                for (var j = 0; j < Math.floor(D.cropCanvasHeight); j++) {
                  var pos = (i + Math.floor(D.cropCanvasWidth) * j) * 4;
                  if (
                    data[pos] == 255 ||
                    data[pos + 1] == 255 ||
                    data[pos + 2] == 255 ||
                    data[pos + 3] == 255
                  ) {
                    bOffset = Math.max(j, bOffset); // 找到有色彩的最下端
                    rOffset = Math.max(i, rOffset); // 找到有色彩的最右端
                    tOffset = Math.min(j, tOffset); // 找到有色彩的最上端
                    lOffset = Math.min(i, lOffset); // 找到有色彩的最左端
                  }
                }
              }
              lOffset++;
              rOffset++;
              tOffset++;
              bOffset++;
              let x = {};

              x.width = rOffset - lOffset;
              x.height = bOffset - tOffset;
              //更改最后扣好图的宽高
              if (x.width > D.areaWidth) {
                let numW = D.areaWidth / x.width;
                D.ktWidth = x.width * numW;
                D.ktHeight = x.height * numW;
              } else if (x.height > D.yuanHeight) {
                let numH = D.yuanHeight / x.height;
                D.ktWidth = x.width * numH;
                D.ktHeight = x.height * numH;
              } else {
                D.ktWidth = x.width;
                D.ktHeight = x.height;
              }
              //从新获取图片初始的坐标以及宽高
              D.left = D.areaWidth / 2 - D.ktWidth / 2;
              D.top = D.areaHeight / 2 - D.ktHeight / 2;
              D.yxX = D.left + D.ktWidth / 2;
              D.yxY = D.top + D.ktHeight / 2;
              //下面的根据自己的页面进行调试
              wx.canvasToTempFilePath({
                canvasId: "cropCanvas",
                x: lOffset - 5,
                y: tOffset - 5,
                width: x.width + 7,
                height: x.height + 7,
                destWidth: x.width * 3,
                destHeight: x.height * 3,
                success: (res) => {
                  setTimeout(() => {
                    D.ktImg = res.tempFilePath; // 更新图片为裁剪后的图片
                    D.ktshow = false;
                    D.isLoading = false;
                  }, 1000);
                },
                fail: (err) => {
                  console.error("canvasToTempFilePath error:", err);
                },
              });
            },
          });
        }, 200);
      });
      //   },
      // });
      // });
    };
    const del = () => {
      D.isDel = false;
      D.ktImg = "";
      D.scale = 1;
      D.oScale = 1;
      D.rotate = 0;
      storage.remove("oldImg");
      D.imgUrl = "";
    };
    const BottomDel = () => {
      D.bottomIsDel = true;
      D.ref = "";
    };
    const TopchooseImage = () => {
      Taro.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        sizeType: ["original"],
        camera: "back",
        success(res) {
          if (res.tempFiles[0].size >= 89470000) {
            // D.toastMsg = "此图片过大，不做处理。";
            return false;
          } else {
            const tempFilePaths = res.tempFiles[0].tempFilePath;
                  const _img = tempFilePaths;
                  storage.set("oldImg",_img);
                  D.imgUrl =
                    _img
                  setTimeout(() => {
                    getImageInfo();
                  }, 500);
          }
        },
        fail() {},
      });
    };
    //底部上传参考图
    const BottomchooseImage = () => {
      Taro.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        sizeType: ["original"],
        camera: "back",
        success(res) {
          if (res.tempFiles[0].size >= 89470000) {
            // D.toastMsg = "此图片过大，不做处理。";
            return false;
          } else {
            const tempFilePaths = res.tempFiles[0].tempFilePath;
                  D.ref = tempFilePaths;
                  D.bottomIsDel = false;
          }
        },
        fail() {},
      });
    };
    //边框显示
    const borderShow = (e) => {
      D.borderShows = "block";
      D.color = "#0279ff";
      e.stopPropagation();
    };
    //边框隐藏
    const borderNone = (e) => {
      D.borderShows = "none";
      D.color = "rgba(255, 255, 255, 0)";
    };
    //清空随机值
    const closed = () => {
      D.val = "";
    };
    //获取元素 设置点击的图片生成比例
    const mskWH = () => {
      setTimeout(() => {
        let query1 = Taro.createSelectorQuery();
        query1
          .select(".msk")
          .boundingClientRect((res) => {
            D.canvasWidth = res.width;
            D.canvasHeight = res.height;
          })
          .exec();
      }, 500);
    };
    //获取元素 设置点击的图片生成比例
    const offset = (item) => {
      let query = Taro.createSelectorQuery();
      query
        .select(".bg-0")
        .boundingClientRect((res) => {
          let width = res.width;
          let height = res.height;
          let query1 = Taro.createSelectorQuery();
          query1
            .select(".msk")
            .boundingClientRect((ress) => {
              D.offsetWidth = (width - ress.width) / 2;
              D.offsetHeight = (height - ress.height) / 2;
            })
            .exec();
        })
        .exec();
    };
    //切换底部tab
    const bottomTab = (item) => {
      D.bottomValue = item.active;
      if (item.active == "c1") {
        D.type = 1;
      } else if (item.active == "c2") {
        D.type = 2;
      } else {
        D.type = 3;
      }
    };
    //选中场景
    const sceneSelecte = (item, i) => {
      D.sceneTab = i;
      D.scene = item.md5;
    };
    const selecte = (item, i) => {
      D.tab = i;
      if (item.name == "1:1") {
        D.mskWidth = "100%";
        D.mskHeight = "100%";
        D.biliW = item.width;
        D.biliH = item.height;
        D.fWidth = 0;
        D.fHeight = 0;
        D.column = false;
        mskWH();
        offset();
      } else if (item.name == "9:16") {
        D.mskWidth = "183px";
        D.mskHeight = "100%";
        D.biliW = item.width;
        D.biliH = item.height;
        D.fWidth = "calc((100% - 183px)/2)";
        D.fHeight = "100%";
        D.column = false;
        mskWH();
        offset();
      } else if (item.name == "3:4") {
        D.mskWidth = "244px";
        D.mskHeight = "100%";
        D.biliW = item.width;
        D.biliH = item.height;
        D.fWidth = "calc((100% - 244px)/2)";
        D.fHeight = "100%";
        D.column = false;
        mskWH();
        offset();
      } else if (item.name == "16:9") {
        D.mskWidth = "100%";
        D.mskHeight = "185px";
        D.fWidth = "100%";
        D.fHeight = "calc((100% - 185px)/2)";
        D.biliW = item.width;
        D.biliH = item.height;
        D.column = true;
        mskWH();
        offset();
      }
    };
    //点击生成画布 把参数带入 导出指定比例的图片 代码注释了 有需要自己放开调试
    const generate = (num) => {
      // if (D.isDel == false || D.ktImg == "") {
      //   D.toastMsg = "请先上传图片";
      //   return false;
      // }
      // if (D.type == 1 && D.scene == "") {
      //   D.toastMsg = "请先选择场景";
      //   return false;
      // }
      // if (D.type == 2 && D.ref == "") {
      //   D.toastMsg = "请先上传参考图";
      //   return false;
      // }
      // if (D.type == 3 && D.val == "") {
      //   D.toastMsg = "请先填写自定义内容";
      //   return false;
      // }
      // D.scale = D.canvasScale;
      // D.isLoading = true;
      // D.ktLoading = null;
      // D.show = true;
      // setTimeout(() => {
      //   Taro.downloadFile({
      //     url: D.ktImg,
      //     success: function (res) {
      //       if (res.statusCode === 200) {
      //         let czW = Math.floor(D.canvasWidth) / Number(D.biliW);
      //         let czH = Math.floor(D.canvasHeight) / Number(D.biliH);
      //         let ctx = wx.createCanvasContext("myCanvas");
      //         let x = 0 + D.translationX;
      //         let y = 0 + D.translationY;
      //         // ctx.save();
      //         // ctx.setFillStyle("#FFF");
      //         //清除画布 解决设置canvas透明底色安卓手机显示问题
      //         // ctx.setFillStyle('transparent');
      //         // ctx.fillRect(0, 0, D.canvasWidth, D.canvasHeight);
      //         ctx.clearRect(
      //           0,
      //           0,
      //           Math.floor(D.canvasWidth),
      //           Math.floor(D.canvasHeight)
      //         );
      //         ctx.translate(-D.offsetWidth, -D.offsetHeight);
      //         ctx.beginPath();
      //         ctx.translate(D.yxX, D.yxY); // 圆心坐标
      //         ctx.rotate((D.rotate * Math.PI) / 180);
      //         ctx.translate(
      //           -((Math.floor(D.ktWidth) * D.canvasScale) / 2) + D.translationX,
      //           -((Math.floor(D.ktHeight) * D.canvasScale) / 2) + D.translationY
      //         );
      //         ctx.drawImage(
      //           res.tempFilePath,
      //           0,
      //           0,
      //           Math.floor(D.ktWidth) * D.canvasScale,
      //           Math.floor(D.ktHeight) * D.canvasScale
      //         );
      //         ctx.draw(false, () => {
      //           setTimeout(() => {
      //             wx.canvasToTempFilePath({
      //               width: Math.floor(D.canvasWidth),
      //               height: Math.floor(D.canvasHeight),
      //               destWidth: Number(D.biliW), //导出多少*多少的图片
      //               destHeight: Number(D.biliH),
      //               canvasId: "myCanvas",
      //               success: function (ress) {
      //                 D.file = ress.tempFilePath;
      //                 const _token = storage.get("token");
      //                 Taro.uploadFile({
      //                   url: `${HOST}/file/uploadTemplate`,
      //                   filePath: ress.tempFilePath,
      //                   name: "file",
      //                   header: {
      //                     ...{ Authorization: _token },
      //                   },
      //                   success(res) {
      //                     const _res = JSON.parse(res.data);
      //                     if (_res.code == 200) {
      //                       D.file = _res.result;
      //                       Apiimage.bgi({
      //                         content: D.val,
      //                         file: D.file,
      //                         num: num,
      //                         ref: D.ref,
      //                         scene: D.scene,
      //                         type: D.type.toString(),
      //                       })
      //                         .then((res) => {
      //                           if (res) {
      //                             const urlListImg = res.images;
      //                             storage.set("repairImg", urlListImg);
      //                             setTimeout(() => {
      //                               D.isLoading = false;
      //                               if (getCurrentPages().length > 1) {
      //                                 if (D.isJump) {
      //                                   $T.toLink(
      //                                     `/pages/bgi/image?urlListImg=${encodeURIComponent(
      //                                       JSON.stringify(urlListImg)
      //                                     )}`
      //                                   );
      //                                 } else {
      //                                   D.isJump = true;
      //                                 }
      //                               }
      //                             }, 200);
      //                           } else {
      //                             D.isLoading = false;
      //                             D.toastMsg = "图片生成失败，请重新操作";
      //                           }
      //                         })
      //                         .catch((err) => {
      //                           D.isLoading = false;
      //                         });
      //                     } else {
      //                       D.toastMsg =
      //                         _res.message || "图片生成失败，请重新操作";
      //                     }
      //                   },
      //                 });
      //               },
      //               fail: function (ress) {
      //                 reject(ress);
      //               },
      //             });
      //           }, 1000);
      //         });
      //       }
      //     },
      //   });
      // }, 200);
    };
    //单指移动双指缩放
    const touchstart = (e) => {
      D.startTouches = e.touches;
      D.startTranslation.x = e.touches[0].pageX;
      D.startTranslation.y = e.touches[0].pageY;
      D.startDistance = calcDistance(e.touches);
      D.startScales = D.scale;
    };
    const touchmove = (e) => {
      if (D.borderShows == "none") {
        return false;
      }
      if (e.touches.length === 2 && D.startTouches.length === 2) {
        const currentDistance = calcDistance(e.touches);
        if (currentDistance > 0 && D.startDistance > 0) {
          // 计算缩放比例
          const scale = (currentDistance / D.startDistance) * D.startScales;
          D.scale = scale;
          if (D.scale < 0.5) {
            D.scale = 0.5;
          } else if (D.scale > 5) {
            D.scale = 5;
          }
          D.oScale = 1 / D.scale;
          D.canvasScale = D.scale;
          D.xzBottom = D.xzBottom * D.oScale;
          if (D.xzBottom < -32) {
            D.xzBottom = -32;
          } else {
            D.xzBottom = -32;
          }
        }
      } else if (D.startTouches.length !== 2) {
        D.endTranslation.x = e.touches[0].pageX;
        D.endTranslation.y = e.touches[0].pageY;
        D.left += D.endTranslation.x - D.startTranslation.x;
        D.top += D.endTranslation.y - D.startTranslation.y;
        D.yxX += D.endTranslation.x - D.startTranslation.x;
        D.yxY += D.endTranslation.y - D.startTranslation.y;
        D.translationX = D.endTranslation.x - D.startTranslation.x;
        D.translationY = D.endTranslation.y - D.startTranslation.y;
        D.startTranslation.x = e.touches[0].pageX;
        D.startTranslation.y = e.touches[0].pageY;
      }
    };
    const touchend = (e) => {
    };
    const calcDistance = (touches) => {
      // 计算两点之间的距离
      if (touches.length === 2) {
        const x1 = touches[0].pageX;
        const y1 = touches[0].pageY;
        const x2 = touches[1].pageX;
        const y2 = touches[1].pageY;
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      }
      return 0;
    };
    //旋转
    const Start = (e) => {
      //获取作为移动前角度的坐标
      D.startRotate.x = e.touches[0].pageX;
      D.startRotate.y = e.touches[0].pageY;
      //移动前的角度
      D.anglePre = countDeg(D.yxX, D.yxY, D.startRotate.x, D.startRotate.y);
      e.stopPropagation();
    };
    const Move = (e) => {

      //记录移动后的位置
      D.endRotate.x = e.touches[0].pageX;
      D.endRotate.y = e.touches[0].pageY;
      //移动后位置的角度
      D.angleNext = countDeg(D.yxX, D.yxY, D.endRotate.x, D.endRotate.y);
      //角度差
      const new_rotate = D.angleNext - D.anglePre;
      //叠加的角度差
      D.rotate += new_rotate;
      //用过移动后的坐标赋值为移动前坐标
      D.startRotate.x = e.touches[0].pageX;
      D.startRotate.y = e.touches[0].pageY;
      D.anglePre = countDeg(D.yxX, D.yxY, D.startRotate.x, D.startRotate.y);
      e.stopPropagation();
    };
    const End = (e) => {
      e.stopPropagation();
    };
    //缩放
    const onTouchStart = (e) => {
      //获取作为移动前角度的坐标
      D.startScale.x = e.touches[0].pageX;
      D.startScale.y = e.touches[0].pageY;
      //获取图片半径
      D.r = getDistancs(D.yxX, D.yxY, D.left, D.top);
      e.stopPropagation();
    };
    const onTouchMove = (e) => {
      //记录移动后的位置
      D.endScale.x = e.touches[0].pageX;
      D.endScale.y = e.touches[0].pageY;
      //移动的点到圆心的距离  * 因为圆心的坐标是相对与父元素定位的 ，所有要减去父元素的OffsetLeft和OffsetTop来计算移动的点到圆心的距离
      D.disPtoO = getDistancs(
        D.yxX,
        D.yxY,
        D.endScale.x - D.OffsetLeft,
        D.endScale.y - D.OffsetTop
      );
      D.scale = D.disPtoO / D.r; //手指滑动的点到圆心的距离与半径的比值作为图片的放大比例
      if (D.scale < 0.5) {
        D.scale = 0.5;
      } else if (D.scale > 5) {
        D.scale = 5;
      }
      D.oScale = 1 / D.scale;
      D.canvasScale = D.scale;
      D.xzBottom = D.xzBottom * D.oScale;
      if (D.xzBottom < -32) {
        D.xzBottom = -32;
      } else {
        D.xzBottom = -32;
      }
      e.stopPropagation();
    };
    const onTouchEnd = (e) => {
      e.stopPropagation();
    };
    /*
     *参数1和2为图片圆心坐标
     *参数3和4为手点击的坐标
     *返回值为手点击的坐标到圆心的角度
     */
    const countDeg = (cx, cy, pointer_x, pointer_y) => {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      var to = Math.abs(ox / oy);
      var angle = (Math.atan(to) / (2 * Math.PI)) * 360; //鼠标相对于旋转中心的角度
      if (ox < 0 && oy < 0) {
        //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
        angle = -angle;
      } else if (ox <= 0 && oy >= 0) {
        //左下角,3象限
        angle = -(180 - angle);
      } else if (ox > 0 && oy < 0) {
        //右上角，1象限
        angle = angle;
      } else if (ox > 0 && oy > 0) {
        //右下角，2象限
        angle = 180 - angle;
      }

      return angle;
    };
    //计算触摸点到圆心的距离：
    const getDistancs = (cx, cy, pointer_x, pointer_y) => {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      return Math.sqrt(ox * ox + oy * oy);
    };
    // const toLink = (url) => {
    //   $T.toLink(url);
    // };

    return {
      ...toRefs(D),
      getData,
      closed,
      selecte,
      getimg,
      getImageInfo,
      generate,
      touchstart,
      touchmove,
      touchend,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      Start,
      Move,
      End,
      getDistancs,
      countDeg,
      mskWH,
      offset,
      borderShow,
      borderNone,
      calcDistance,
      del,
      BottomDel,
      TopchooseImage,
      BottomchooseImage,
      sceneSelecte,
      bottomTab,
    };
  },
  onLoad() {
    this.getImageInfo();
    this.getData();
  },
  onShow() {},
};
</script>
<style lang="scss">
.canvas {
  position: fixed;
  top: 1000%;
}
.z-19 {
  z-index: 19;
}
.del {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
}
.bg-A9A9A9 {
  background: #a9a9a9;
}
.upload {
  width: 99px;
  height: 44px;
  text-align: center;
  position: absolute;
  border-radius: 10px;
  top: 142px;
  left: 114px;
  background: rgba(0, 0, 0, 0.4);
  .tl {
    top: 3px;
    left: 43px;
  }
}
.top {
  width: 13px;
  height: 13px;
  margin-bottom: 5px;
  position: relative;
  .transverse {
    width: 100%;
    height: 3px;
    position: absolute;
    top: 6.5px;
    left: 1px;
  }
  .vertical {
    width: 3px;
    height: 100%;
    position: absolute;
    top: 1px;
    left: 6.5px;
  }
}
.history {
  width: 100%;
  height: 25px;
  margin-top: 30px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .record {
    width: 49px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    background: #fff;
    border: 1px solid #c2cddc;
    color: #8c8c8c;
    font-size: 10px;
    border-radius: 10px;
    margin-right: 2px;
  }
  image {
    width: 10px;
    height: 10px;
  }
}
.blue {
  width: 3px;
  height: 13px;
  background: #0066ff;
  margin-right: 3px;
}
// .movable-area {
//   overflow: hidden;
// }
.movable-box {
  // width: 216px;
  // height: 216px;
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.home-box {
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 0;
}
.flex-column {
  flex-direction: column;
}
.bg-0 {
  width: 100%;
  height: 329px;
  // margin-top: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #8faefc;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  // background: #fff;

  // .imgs-box {
  //   // width: 100%;
  //   // height: 100%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: relative;
  //   overflow: hidden;
  .yuan-img {
    // width: 323px;
    // height: 376px;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    // background-position: center;
  }
  .kt-img {
    width: calc(100% - 0px) !important;
    height: calc(100% - 0px) !important;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    // border: 2px solid #0279ff;
    position: relative;
    .sf-img {
      width: 25px;
      height: 25px;
      position: absolute;
      bottom: -13px;
      right: -13px;
    }
    .xz-img {
      width: 25px;
      height: 25px;
      position: absolute;
      bottom: -32px;
      left: 30px;
    }
    .tbwh {
      width: 51px;
      height: 6px;
      position: absolute;
    }
    .lrwh {
      width: 6px;
      height: 51px;
      position: absolute;
    }
    .top-img {
      top: -4px;
      left: 16px;
    }
    .left-img {
      bottom: 78px;
      left: -4px;
    }
    .right-img {
      bottom: 78px;
      right: -4px;
    }
    .bottom-img {
      bottom: -4px;
      left: 16px;
    }
  }
  .msk {
    @include Background("~@assets/images/twcz-msk.png", cover);
  }
  // }
}
.uhd-bottom {
  // @include Position(fixed, 5, "", "", 0, 0);
  // height: 232px;
  box-sizing: border-box;
  border-radius: 16px 16px 0px 0px;
  // width: calc(100% - 46px);
  // margin-left: 23px;
  // background: #fff;
}
.nut-tabs {
  height: 100%;

  .nut-tabs__titles {
    height: 25px !important;
    background: none;
  }
  .nut-tabs__list {
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
}
.custom-tab-item {
  width: 101px;
  height: 25px;
  box-sizing: border-box;
  border-radius: 20px 20px 20px 20px;
  background: #fbf0f2;
  font-size: 14px;
  color: #9c9697;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.active {
  color: #fff;
  // background: linear-gradient(90deg, #ccd9f6 100%, #ffffff 100%);
  background: #4c7eff;
}
.nut-tab-pane {
  padding: 0;
  // background: linear-gradient(180deg, #ccd9f6 0%, #ffffff 40%);
  background: none;
  // height: 157px !important;
  .tab-1 {
    // padding: 10px 18px 0;
    padding-top: 10px;
  }
  .tab-2 {
    width: calc(100% - 2px);
    height: 95px;
    margin-top: 10px;
    border-radius: 10px;
    text-align: center;
    background: #fff;
    border: 1px dashed #9f9f9f;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .tabUpload {
      width: 150px;
      height: 40px;
    }
    image {
      height: calc(95px - 2px);
    }
    .tl {
      top: 0;
      left: 65px;
    }
  }
}
.nut-tabs__content {
  height: 100%;
}
.nut-textarea {
  width: 100%;
  padding: 12px 12px 20px 12px;
  border-radius: 10px;
  border: 1px solid #666666;
  height: 95px !important;
  background: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  .nut-textarea__textarea {
    height: 48px;
  }
  .nut-textarea__limit {
    right: 30px;
    bottom: 5px;
    font-size: 12px;
  }
}
.sj {
  width: 119px;
  height: 18px;
  font-size: 12px;
  color: #8a8a8a;
  border-radius: 14px 14px 14px 14px;
  border: 1px solid #7b7b7b;
  text-align: center;
  line-height: 18px;
  position: absolute;
  left: 5px;
  bottom: 5px;
  image {
    width: 16px;
    height: 13px;
    margin-top: -2px;
  }
}
.closed {
  width: 12px;
  height: 11px;
  position: absolute;
  bottom: 8px;
  right: 10px;
}
.generate {
  width: 50%;
  height: 34px;
  line-height: 34px;
  text-align: center;
  // background: var(
  //   --Linear,
  //   linear-gradient(90deg, #2f89fe 48.91%, #3ea1ff 80.68%)
  // );
  background: #4d7eff;
  border: 0.5px solid #5886ff;
  font-size: 14px;
  border-radius: 20px;
  color: #fff;
}
.ratio-list {
  width: 25%;
  height: 40px;
  background: rgb(255, 255, 255);
  position: relative;
  box-sizing: border-box;
  background-size: 100% 100%;
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  &:nth-child(4) {
    margin-right: 0;
  }
}
.borders {
  &::before {
    content: "";
    width: calc(100% - 4px);
    height: 38px;
    border: 2px solid #4c7eff;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.scroll-box {
  // margin-top: 10px;
  // margin-left: 3px;
  height: 95px;
}
.col-75696F {
  color: #75696f;
}
.nth {
  width: 25%;
  &:nth-child(2n) {
    margin-right: 10px;
    margin-left: 10px;
  }
  &:last-child {
    margin-right: 0px;
  }
}
.scenelist-box {
  width: calc(100% - 3px);
  height: 74px;
  border-radius: 10px;
  position: relative;
  background-size: 100% 100%;
  box-sizing: border-box;
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.15);
  //以下两个属性解决盒子被等比例压缩了而没有进行横向滚动
  flex-shrink: 0;
  flex-grow: 0;
  image {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 4px;
    right: 4px;
  }
}
.border {
  &::before {
    content: "";
    width: 69.5px;
    height: 71px;
    border: 2px solid #4c7eff;
    border-radius: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
