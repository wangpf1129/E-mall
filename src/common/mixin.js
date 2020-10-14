import {debounce} from "./utils";
import {POP, NEW, SELL} from "./const";

import BackTop from "@/components/content/backtop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1.监听图片item 加载完成  并使用 防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    // 对监听事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imageItemLoad', this.itemImgListener)

  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

