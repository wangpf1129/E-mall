<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommend: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  };
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    padding: 10px 0 20px;
    font-size: 12px;
    text-align: center;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 25%;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
