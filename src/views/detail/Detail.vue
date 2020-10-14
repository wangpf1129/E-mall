<template>
  <div id="detail">
    <detail-nav-bar @itemClick="titleItemClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/Goods/GoodsList";


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        currentIndex: 0,
      }
    },
    methods: {
      // 热更新-- 加载图片刷新高度
      imageLoad() {
        this.$refs.scroll.refresh()

        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)
        console.log(this.themeTopY)
      },
      // 导航栏 点击滚动该位置
      titleItemClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
      },

      contentScroll(position) {
        const positionY = -position.y
        for (let i in this.themeTopY) {
          i = i * 1
          if ((this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]))
          ) {
            // console.log(i)
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        this.isShowBackTop = position.y < -1314

      },

      // 加入购物车事件
      addToCart() {
        // 1. 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车里
        this.$store.dispatch('addCart', product).then(res => {
          // console.log(res)
          // console.log(this.$toast)
          this.$toast.show(res, 2000)
        })

      }
    },
    created() {
      this.iid = this.$route.params.iid

      // 根据 iid 请求详情页数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result

        // 获取轮播图信息
        this.topImages = data.itemInfo.topImages


        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品详情数据
        this.detailInfo = data.detailInfo

        // 获取商品参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 获取推荐数据
      getRecommend().then(res => {
        console.log(res)
        this.recommends = res.data.list
      })
    },
    mounted() {

    },
    updated() {
    },
    destroyed() {
      // 因为 keep-alive 排除了 detail 所以我们离开时，使用 销毁 生命周期 来 取消全局监听事件
      this.$bus.$off('imageItemLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-scroll {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
    top: 44px;
    overflow: hidden;
  }
</style>
