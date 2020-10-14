<template>
  <div class="bottom-bar">
    <check-button class="all-check" :is-check="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:<em>{{ totalPrice }}</em></span>
    <span class="buy-product" @click="calcClick">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        const cartList = this.$store.state.cartList
        return '￥' + cartList.filter(item => {
          return item.checked
        }).reduce((newValue, item) => {
          return newValue + item.price * item.count
        }, 0).toFixed(2)
      },
      cartLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        return this.$store.state.cartList.every(item => {
          return item.checked
        })
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          // for (let item of this.$store.state.cartList) {
          //   item.checked = false
          // }
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          // for (let item of this.$store.state.cartList) {
          //   item.checked = true
          // }
          this.$store.state.cartList.forEach(item => item.checked = true)

        }
      },
      calcClick() {
        let checkedLength = this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
        if (!checkedLength) {
          this.$toast.show('请添加商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    position: fixed;
    bottom: 50px;
    background-color: #f6f6f6;
    height: 40px;
    line-height: 40px;
    padding-left: 35px;
    box-sizing: border-box;
    box-shadow: 0 -2px 1px rgba(0, 0, 0, .1);
  }

  .all-check {
    position: absolute;
    left: 8px;
    top: 10px;
    line-height: 0px;
  }

  .total-price {
    margin-left: 15px;
  }

  .total-price em {
    color: #e06e5e;
  }

  .buy-product {
    float: right;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #eb2303;
    color: #fff;
  }
</style>
