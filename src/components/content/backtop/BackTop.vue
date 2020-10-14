<template>
  <div class="back-top" @click="btnClick">
    <img src="~@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
      btnClick() {
        this.$emit('backtop')
      }
    }
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 58px;
    right: 10px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
