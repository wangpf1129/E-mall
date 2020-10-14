<template>
  <div class="goods-item" @click="goodsItemClick">
    <img v-lazy="showImage" :key="showImage" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default: {}
      },
    },
    computed: {
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // console.log('图片加载')
        this.$bus.$emit('imageItemLoad')
      },
      goodsItemClick() {
        if (this.goodsItem.iid) {
          this.$router.push('/detail/' + this.goodsItem.iid)
        }
      }
    }
  };
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    width: 100%;
    font-size: 12px;
    bottom: 5px;
    left: 0;
    overflow: hidden;
  }

  .goods-info p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
    float: right;
  }

  .goods-info .collect::before {
    position: absolute;
    content: "";
    left: -14px;
    top: -1px;
    width: 14px;
    height: 14px;
    background-color: red;
    background: url("~@/assets/img/common/collect.svg") no-repeat 0px 0px/14px;
  }
</style>
