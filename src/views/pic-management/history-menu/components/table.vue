<!--  -->
<template>
  <div class="card">
    <Table disabled-hover border :columns="columns" :data="menuTableData" size="small"></Table>

  </div>
</template>
<script>
import * as dataConfig from '../dataConfig';
import _ from "underscore";
export default {
  name: 'SearchTable',
  data() {
    return {
      columns: [
        {
          title: '日期',
          key: 'date',
          align: 'center',
          width: '140'
        },
        {
          title: '星期',
          key: 'week',
          align: 'center',
          width: '140'
        }
        
      ],
      tableData: []

    };
  },

  components: {},

  computed: {
    menuTableData() {
      return this.$store.state.menu.menuTableData;
    },

    //餐种数据
    goodsList() {
      return this.$store.state.goods.goodsList;
    },
    
  },

  methods: {
    //获取餐种列表
    getGoodsData: async function () {
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        is_enable: 1,
        page: 1,
        page_size: 10000
      };
      await this.$store.dispatch('goodsList', params).then(res=>{
        if(res.return_code==0){
          for(let item of res.data.result){
            let tmp = {};
            tmp.title = item.goods_name;
            tmp.key = item.goods_id;
            this.columns.push(tmp);
          }
        }
      });
    },
  },

  mounted() {
    this.getGoodsData();
  },

  
}
</script>
<style lang='less' scoped>
  /deep/.ivu-table{
    th{
      text-align: center !important;
    }
  }
</style>