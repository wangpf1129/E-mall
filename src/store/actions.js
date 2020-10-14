export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1. 当新添加的商品和购物车的商品iid一样时   就往 oldProduct 添加 商品
      // 查找 之前数组中是否有该商品

      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      let oldProduct = context.state.cartList.find(item =>
        item.iid === payload.iid
      )
      // 2. 判断 oldProduct 是否有值
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('该商品的数量 +1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了该商品')
      }
    })
  }

}
