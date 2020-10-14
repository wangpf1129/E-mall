<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button :is-check="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">×{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  export default {
    name: "CartListItem",
    components: {CheckButton},
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
  .cart-list-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }


  .item-info {
    position: relative;
    font-size: 16px;
    color: #333;
    overflow: hidden;
    padding: 5px;
  }

  .item-info .item-title, .item-info .item-desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 13px;
    color: #666;
    margin-top: 10px;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;

    border-radius: 5px;
  }

  .info-bottom {
    position: absolute;
    bottom: 7px;
    left: 8px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
