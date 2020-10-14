<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      //动态来绑定 样式颜色
      type: String,
      default: "#d81e06",
    },
  },
  // data() {
  //   return {
  //     isActive: true,
  //   };
  // },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  background-color: #f6f6f6;
  text-align: center;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.06);
  font-size: 12px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>
