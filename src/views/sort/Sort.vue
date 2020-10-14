<template>
  <div class="category">
    <navbar class="navbar">
      <div slot="center">商城分类</div>
    </navbar>
    <div class="content">
      <!-- 侧边栏导航-->
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

      <scroll class="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-contorl :titles="['综合','新品','销量']"></tab-contorl>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabContentDetail from "./childComps/TabContentDetail";
  import TabContorl from "@/components/content/TabControl/TabControl";

  import navbar from "@/components/common/navbar/navbar";
  import Scroll from "@/components/common/scroll/Scroll";


  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";

  import {getCategory, getSubCategory, getCategoryDetail} from "@/network/category";


  export default {
    name: "Sort",
    components: {
      navbar,
      TabMenu,
      Scroll,
      TabContentCategory,
      TabContentDetail,
      TabContorl
    },
    mixins: [tabControlMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // 1. 获取分类数据
          this.categories = res.data.category.list

          // 2. 初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3. 请求第一个分类数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubCategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}

          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },

      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },

      selectItem(index) {
        this._getSubcategories(index)
      }
    },

  };
</script>

<style scoped>
  .category {
    height: 100vh;
  }

  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }

  .content .tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
