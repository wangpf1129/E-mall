<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"> </i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
    </div>

    <div class="info-imgs">
      <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
    </div>

  </div>
</template>

<script>
  import {formatDate} from "@/common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        },
      }
    },
    filters: {
      showDate(value) {
        let date = new Date(value * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 25px 10px;
    border-bottom: 5px solid #f2f5f8;

  }

  .info-header {
    height: 40px;
    color: #333;
    border-bottom: 1px solid #f2f5f8;

  }

  .header-title {
    float: left;
  }

  .header-more {
    margin-right: 15px;
    float: right;
  }

  .info-user {
    padding: 10px;
  }

  .info-user img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    top: -15px;
    left: 10px;
    font-size: 15px;
  }

  .info-detail {
    font-size: 14px;
    color: #777;
    margin-top: 10px;
    line-height: 1.5;
  }

  .info-detail .info-other {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }

  .info-other span {
    padding-right: 10px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
