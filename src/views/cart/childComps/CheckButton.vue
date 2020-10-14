<template>
  <div class="check-button" :class="{check:isCheck}">
    <img src="~@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .check-button {
    position: relative;
    width: 18px;
    height: 18px;
    left: 0px;
    top: 45px;
    margin: 0 7px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  .check {
    background-color: #d81e06;
    border: 1px solid #d81e06;
  }
</style>
