<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end">
      </div>
    </div>
    <div class="info-key"> {{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        this.counter += 1
        if (this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start, .info-desc .end {
    width: 99px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    background-color: #333;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-key {
    color: #333;
    margin: 15px 0 15px 15px;
    font-weight: 700;
  }


  .info-list img {
    width: 100%;
  }

</style>
