<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精品']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banner="banner" @swiperLoad="swiperLoad"></home-swiper>

      <home-recommend :recommend="recommend"></home-recommend>

      <home-feature-view></home-feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精品']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>

      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!--   修饰符 .native  ： 如果想要在组件内监听事件，需要加 .native 修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  // 公共组件
  import navbar from "@/components/common/navbar/navbar";
  import TabControl from "@/components/content/TabControl/TabControl";
  import GoodsList from "@/components/content/Goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backtop/BackTop";


  // 方法 请求的数据
  import {getHomeMultiData, getHomeGoods} from "@/network/home";
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommend,
      HomeFeatureView,
      navbar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []},
        },
        currentType: "pop",
        isShowBackTop: false,
        offsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      };
    },
    methods: {
      /**
       * 事件监听的相关方法
       **/
      // 切换类型
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
          default:
            break;
        }

        //  让 tabControl  俩个标签切换类型时，同步
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      },

      // 返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      // 返回顶部图标显示与隐藏
      contentScroll(position) {
        // console.log(position)

        // 1. 判断BackTop 是否显示
        this.isShowBackTop = position.y < -1314

        // 2. 决定 tabControl 是否吸顶
        this.isTabFixed = position.y < -this.offsetTop
      },

      // 上拉加载更多
      loadMore() {
        // 因为 上拉只能触发一次， 所以我们需要 使用 finishPullUp (完成上拉方法)
        this.getHomeGoods(this.currentType)
      },

      swiperLoad() {
        //  获取tabControl 中的 offsetTop
        //   所有组件都有一个属性 $el，用于获取 组件中的元素
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.offsetTop);
      },


      /**
       * 网络请求的相关方法
       **/
      getHomeMultiData() {
        getHomeMultiData().then((res) => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        });
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then((res) => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //  使用 finishPullUp
          this.$refs.scroll.finishPullUp()
        });
      },
    },
    created() {
      //  1.请求多个数据
      this.getHomeMultiData();

      // 2. 请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");

    },
    destroyed() {
      // console.log('home 销毁')
    },
    // 处于活跃时
    activated() {
      // console.log('activated');
      // 设置Y值   返回离开时的位置
      this.$refs.scroll.scrollTo(0, this.saveY, 300)
      this.$refs.scroll.refresh()
    },
    // 离开活跃时
    deactivated() {
      // console.log('deactivated');
      // 1. 获取 Y值   记录离开时的位置
      this.saveY = this.$refs.scroll.getScrollY()

      // 2. 离开home时， 取消全局监听事件
      this.$bus.$off('imageItemLoad', this.itemImgListener)
    },

    mounted() {
    }
  };
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 99;*/
    background-color: var(--color-tint);
    color: var(--color-background);
  }

  .tab-control {
    position: relative;
    z-index: 99;
    background-color: var(--color-background);

  }

  .content {
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }


</style>
