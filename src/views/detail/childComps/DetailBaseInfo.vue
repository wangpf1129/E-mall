<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>

    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 0 5px;
    margin-top: 15px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    font-size: 16px;
    color: #222;
    font-weight: 700;
  }

  .info-price {
    margin-top: 10px;

  }

  .info-price .n-price {
    color: var(--color-high-text);
    font-size: 24px;
  }

  .info-price .o-price {
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 8px;
    margin-top: 10px;
  }

  .info-price .discount {
    position: relative;
    top: -10px;
    font-size: 12px;
    background-color: var(--color-high-text);
    color: #fff;
    border-radius: 8px;
    padding: 3px 4px;
    margin-left: 4px;
  }

  .info-other {
    display: flex;
    font-size: 13px;
    margin-top: 5px;
    line-height: 30px;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;

  }

  .info-service {
    display: flex;
    line-height: 40px;
    font-size: 11px;
    color: #333;
    margin-bottom: 10px;
    justify-content: space-between;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    margin: -2px 3px;
  }
</style>
