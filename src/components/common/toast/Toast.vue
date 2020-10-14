<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '默认文字', duration = 1700) {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 15px;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 20px;
    z-index: 999;
  }
</style>
