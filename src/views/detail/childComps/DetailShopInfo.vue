<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总销售</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better' : item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}">{{item.isBetter ? '高':'低'}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进入店铺</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      sellCountFilter(value) {
        if (value < 10000) {
          return value
        }
        return (value / 10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    padding: 25px 5px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    display: flex;
    line-height: 45px;
    padding: 10px 0 20px;

  }

  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
  }

  .title {
    padding-left: 10px;
    vertical-align: center;
    font-weight: 700;
  }


  .shop-middle {
    display: flex;
    margin: 10px;
    text-align: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    color: #333;
    justify-content: space-evenly;
    padding-top: 20px;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .sells-count, .goods-count {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .sells-text, .goods-text {
    font-size: 13px;

  }


  .shop-middle-right {
    color: #333;
    font-size: 13px;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 15px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better {
    color: #fff;
    background-color: #5ea732;
  }

  .shop-middle-right .better-more {
    background-color: #f13e3a;
  }

  .shop-bottom {
    margin-top: 20px;
    text-align: center;
  }

  .enter-shop {
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    background-color: #f2f5f8;
    text-align: center;
    border-radius: 10px;
  }
</style>
