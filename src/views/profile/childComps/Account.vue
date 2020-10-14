<template>
  <div class="account">
    <div class="account-item">
      <div class="number">
        <span class="balance">0.00</span>元
      </div>
      <div class="info">我的余额</div>
    </div>

    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>个
      </div>
      <div class="info">我的优惠</div>
    </div>

    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>分
      </div>
      <div class="info">我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Account"
  }
</script>

<style scoped>
  .account {
    padding: 20px;
    display: flex;
    background-color: #fff;
  }

  .account-item {
    width: 100%;
    text-align: center;
    color: #666666;
    font-size: 17px;
    border-right: 1px solid #cccccc;
  }

  .account-item:last-of-type {
    border: 0;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-item .info {
    font-size: 12px;
    margin-top: 5px;
  }

</style>
