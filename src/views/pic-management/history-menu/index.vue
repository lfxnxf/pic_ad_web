<!-- 历史菜单 -->
<template>
  <div>
    <h3 class="margin-bottom-10">历史菜单</h3>
    <div class="margin-bottom-10">
      <searchForm ref="FormQuery"></searchForm>
    </div>
    <div>
      <searchTable></searchTable>
    </div>
    <Page class="page" ref="pages" :total="menuList.total" :page-size="page_size" size="small" show-total @on-change="handlePageDown"></Page>
  </div>
</template>

<script>
import searchForm from './components/form';
import searchTable from './components/table';
export default {
  name: 'HistoryMenu',
  data () {
    return {
      page_size: 50,
    };
  },

  components: {
    searchForm, searchTable,
  },

  computed: {
    goodsDateData() {
      return this.$store.state.goods_date.goodsDateData;
    },
    //菜谱数据
    menuList() {
      return this.$store.state.menu.menuList;
    },
  },

  methods: {
    

    //翻页
    handlePageDown: function(currentPage) {
      this.$refs.FormQuery.getMenuFoodData(currentPage, this.page_size);
    }
  },
  
  activated(){
    this.$refs.FormQuery.getMenuFoodData(1, this.page_size);
  }

}

</script>
<style lang='less' scoped>

</style>