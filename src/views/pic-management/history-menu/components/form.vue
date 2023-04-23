<!--  -->
<template>
  <div class="card">
    <Form inline ref="form" label-colon>
      <FormItem label="日期">
        <DatePicker
          v-model="date"
          type="daterange"
          format="yyyy/MM/dd"
          placeholder="日期起止"
          style="width: 220px">
        </DatePicker>
      </FormItem>
      <FormItem>
        <Button type='primary' icon="md-search" @click="getMenuFoodData()">查询</Button>
      </FormItem>

    </Form>
  </div>
</template>
<script>
import _ from 'underscore';
import moment from "moment-timezone";
import * as dataConfig from "@views/menu-management/week-menu/dataConfig";
export default {
  name: 'searchForm',
  data() {
    return {
      loading: false,
      date: [moment().subtract(7, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],

    };
  },

  components: {},

  computed: {
    //餐种数据
    goodsList() {
      return this.$store.state.goods.goodsList.result;
    },

  },

  methods: {
    //获取菜单信息列表
    getMenuFoodData: async function (page, page_size) {
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        start_date: moment(this.date[0]).format('YYYY-MM-DD'),
        end_date: moment(this.date[1]).format('YYYY-MM-DD'),
        page: page || 1,
        page_size: page_size || this.$parent.page_size,

      };
      let tableDataNew = [];
      await this.$store.dispatch('menuList', params).then(res => {
        let menuResult = res.data.result;
        // console.log("getMenuFoodData===menuResult>>>" + JSON.stringify(menuResult));
        if (!_.isEmpty(menuResult)) {
            menuResult.forEach(function (menuItem, menuIndex) {
              let dateInfo = {
                date: menuItem.date,
                week: menuItem.week,
              };
              let menuGoods = menuItem.goods;
              menuGoods.forEach(function (menuGoodsItem, menuGoodsIndex) {
                  let menuGoodsFoods = menuGoodsItem.foods;
                  let foodNames = [];
                  menuGoodsFoods.forEach(function (menuGoodsFoodsItem, menuGoodsFoodsIndex) {
                    foodNames.push(menuGoodsFoodsItem.food_name);
                  });
                dateInfo[menuGoodsItem.goods_id] = foodNames.toString();
              });
              tableDataNew.push(dateInfo);
            });
        }
      });

      this.$store.commit('setMenuTableData', tableDataNew);
      console.log("getMenuFoodData===>>>" + JSON.stringify(tableDataNew));
    },

    init() {
      this.getMenuFoodData();

    },
  },
  mounted() {
    
    this.init();
  }
}
</script>
<style lang='less' scoped>
.card{
  padding-bottom: 0 !important;
}

</style>
