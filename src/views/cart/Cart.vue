<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </navbar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import navbar from "@/components/common/navbar/navbar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      navbar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  };
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    color: #fff;
    background-color: var(--color-high-text);
  }


</style>
