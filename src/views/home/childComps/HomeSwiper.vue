<template>
  <div id="HomeSwpier">
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="swiperLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper/index";

  export default {
    name: "HomeSwpier",
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      banner: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      swiperLoad() {
        if (!this.isLoad) {
          this.$emit('swiperLoad')
          this.isLoad = true
        }

      }
    }
  };
</script>

<style scoped>
</style>
