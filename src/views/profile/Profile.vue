<template>
  <div id="profile">
    <navbar class="navbar">
      <div slot="center">Wangpf商城</div>
    </navbar>
    <user-info></user-info>
    <account></account>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
  import navbar from "@/components/common/navbar/navbar";
  import UserInfo from "./childComps/UserInfo";
  import Account from "./childComps/Account";
  import ListView from "./childComps/ListView";

  export default {
    name: "Profile",
    components: {
      navbar,
      UserInfo,
      Account,
      ListView
    },
    data: function () {
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    },
  };
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .navbar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-size: 18px;
  }


  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
