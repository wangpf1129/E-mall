<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">

    <table class="info-size">
      <tr v-for="(tr,indey) in paramInfo.sizes[0]" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos">
        <td class="param-key">{{ info.key }}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>

    <div class="info-img" v-if="paramInfo.image">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    padding: 25px 10px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 40px;
  }

  .param-info table td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }


  .info-param {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }

  .info-param .param-key {
    width: 67px;
  }

  .info-param .param-value {
    color: #eb4868
  }


  .info-img img {
    width: 100%;
  }
</style>
