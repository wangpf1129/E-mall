<template>
  <div>
    <navbar>
      <div slot="left" class="back">
        <img src="~@/assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="titles">
        <div
          class="titles-item"
          v-for="(item,index) in  titles"
          :class="{active: currentIndex === index}"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </navbar>
  </div>

</template>

<script>
  import navbar from "@/components/common/navbar/navbar";

  export default {
    name: "DetailNavBar",
    components: {
      navbar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 13px;
  }

  .titles-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>
