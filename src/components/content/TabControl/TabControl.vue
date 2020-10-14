<template>
  <div class="tab-contorl">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-contorl-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContorl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tab-contorl {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  z-index: 99;
}
.tab-contorl-item {
  flex: 1;
}
.tab-contorl-item span {
  padding: 5px;
}

.active span {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-high-text);
}
</style>