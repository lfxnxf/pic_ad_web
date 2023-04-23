<!-- 一周菜单 -->
<template>
  <div>
    <selectFood :foodTypeIndex="foodTypeIndex" :foodDateIndex="foodDateIndex" :foodListDataOld="foodListDataOld" @setSelectedFoodList="getSelectedFoodList"></selectFood>
    <!-- <h3 class="margin-bottom-10">每周菜单</h3> -->
    <div class="card" >
      <Table
          class="weekTable"
          disabled-hover
          border
          :columns="week_columns"
          :data="week_data"
          size="small"
          :show-header="false"
      ></Table>
      <div class="tables" id="tables">
        <div class="table" v-for="(item,i) of table_list" :key="i">
          <Table disabled-hover border :columns="table_list[i]['date_columns']" :data="tableData" size="small">
            <template slot-scope="{ row, index }" :slot="table_slot_list[0+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[0+i*7]].desc'
                :disabled='(0+i*7) < myDateIndex'/>
                <Button class="width-full" type="primary" ghost :disabled='(0+i*7) < myDateIndex' @click="configFood(index, (0+i*7))">配置菜品</Button>
            </template>

            <template slot-scope="{ row, index }" :slot="table_slot_list[1+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[1+i*7]].desc'
                :disabled='(1+i*7) < myDateIndex'/>
                <Button class="width-full" type="primary" ghost :disabled='(1+i*7) < myDateIndex' @click="configFood(index, (1+i*7))">配置菜品</Button>
            </template>

            <template slot-scope="{ row, index }" :slot="table_slot_list[2+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[2+i*7]].desc'
                :disabled='(2+i*7) < myDateIndex'/>
              <Button class="width-full" type="primary" ghost :disabled='(2+i*7) < myDateIndex' @click="configFood(index, (2+i*7))">配置菜品</Button>
            </template>

            <template slot-scope="{ row, index }" :slot="table_slot_list[3+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[3+i*7]].desc'
                :disabled='(3+i*7) < myDateIndex'/>
              <Button class="width-full" type="primary" ghost :disabled='(3+i*7) < myDateIndex' @click="configFood(index, (3+i*7))">配置菜品</Button>
            </template>

            <template slot-scope="{ row, index }" :slot="table_slot_list[4+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[4+i*7]].desc'
                :disabled='(4+i*7) < myDateIndex'/>
              <Button class="width-full" type="primary" ghost :disabled='(4+i*7) < myDateIndex' @click="configFood(index, (4+i*7))">配置菜品</Button>
            </template>

            <template slot-scope="{ row, index }" :slot="table_slot_list[5+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[5+i*7]].desc'
                :disabled='(5+i*7) < myDateIndex'/>
              <Button class="width-full" type="primary" ghost :disabled='(5+i*7) < myDateIndex' @click="configFood(index, (5+i*7))">配置菜品</Button>
            </template>

            <template slot-scope="{ row, index }" :slot="table_slot_list[6+i*7]">
              <Input
                v-if="update"
                type="textarea"
                readonly
                :rows="3"
                placeholder="请点击配置菜品"
                v-model='tableData[index].date_info[table_slot_list[6+i*7]].desc'
                :disabled='(6+i*7) < myDateIndex'/>
              <Button class="width-full" type="primary" ghost :disabled='(6+i*7) < myDateIndex' @click="configFood(index, (6+i*7))">配置菜品</Button>
            </template>

            <template slot="del" slot-scope="{ row, index }">
              <Icon
                  class="red-color font-blod icon-del"
                  type="ios-close-circle-outline"
                  @click="delRow(index,i)"/>
            </template>

          </Table>

        </div>
        <div class="tmp-create-table-footer" @click="addRow(table_list.length)">
          <Icon class="blue-color font-size16" type="ios-add-circle"/>
          <span class="blue-color margin-left-10 font-size15">添加下一周菜单</span>
        </div>
        <div class="text-center">
          <Button class="margin-top-20" type="primary" style="width: 200px;" @click="handleCommitMenu">提 交</Button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import selectFood from './components/select-food-modal';
import moment from 'moment-timezone';
import _ from 'underscore';
import * as dataConfig from "./dataConfig";
import {forEach} from '../../../libs/tools';
import * as goods_date from "@/api/goods_date";
import {dateTypeList} from "@components/change-date-type/dataConfig";

export default {
  name: "WeekMenu",
  data() {
    return {
      dec: '土豆不要土豆丝',
      dec2: '洋芋粑粑',
      myDate: new Date(), //当天
      myDateIndex: 0,
      table_list: [
        {
          date_columns: [
            {
              title: '日期',
              align: 'center',
              key: 'goods_name',
              width: '80',
              className: 'first-column',
              renderHeader: (h, params) => {
                return h('div', {
                  style: {cursor: 'pointer'},
                  on: {
                    click: () => {
                      let tables = document.getElementById('tables');
                      let cur_table = tables.children[0];
                      let cur_table_body = cur_table.getElementsByClassName('ivu-table-body')[0];
                      let cur_icon = cur_table.getElementsByClassName('ivu-icon-md-arrow-dropdown')[0];
                      let cur_body_height = cur_table_body.offsetHeight;
                      let deg = '';
                      if (cur_body_height == 0) {
                        deg = '0deg';
                        cur_table_body.style.height = 'auto';
                        cur_icon.style.transform = "rotate(" + deg + ")";
                      } else {
                        deg = '-90deg';
                        cur_table_body.style.height = '0';
                        cur_icon.style.transform = "rotate(" + deg + ")";
                      }

                    }
                  }
                }, [
                  h('Icon', {
                    props: {type: 'md-arrow-dropdown'},
                    style: {marginRight: '5px', fontSize: '20px', verticalAlign: 'bottom', transition: 'all 300ms'}
                  }),
                  h('span', {}, '日期')
                ],)
              }

            },
          ],
        }
      ],
      start_date: '',
      end_date: '',
      week_columns: [],
      week_data: [{}],
      weeks: 0,

      // tableData: [
      //   { pro: '早餐', time_type:'breakfast' },
      //   { pro: '午餐', time_type:'nooning' },
      //   { pro: '晚餐', time_type:'dinner' }
      // ],
      tableData: [],

      table_slot_list: [],

      foodTypeIndex: 0,
      foodDateIndex: 0,
      foodListIndex: [],
      foodListDataOld: [],
      update: true,
    };
  },

  components: {selectFood},

  computed: {
    //菜谱数据
    menuList() {
      return this.$store.state.menu.menuList.result;
    },
    //餐种数据
    goodsList() {
      return this.$store.state.goods.goodsList.result;
    },
    //菜品数据
    foodList() {
      return this.$store.state.food.foodList.result;
    },

  },

  methods: {
    getSelectedFoodList(val) {
      this.foodTypeIndex = val.foodTypeIndex;
      this.foodDateIndex = val.foodDateIndex;
      this.foodListIndex = val.foodListIndex;
      let menuGoodsFoodsItems = [];
      let foodNames = [];
      let that = this;
      this.foodListIndex.forEach(function (foodItem, foodIndex) {

        let foodListItem = _.filter(that.foodList, cur => {
          return cur.food_id === foodItem;
        });
        if (foodListItem != undefined) {
          let menuGoodsFoodsItemValue = {
            food_id: foodListItem[0].food_id || '',
            food_name: foodListItem[0].food_name || '',
            desc: foodListItem[0].desc || ''
          };
          foodNames.push(foodListItem[0].food_name);
          menuGoodsFoodsItems.push(menuGoodsFoodsItemValue);
        }
      });

      let dateInfoItem = {
        foodList: menuGoodsFoodsItems,
        desc: foodNames.toString(),
      };
      this.tableData[this.foodTypeIndex].date_info[this.table_slot_list[this.foodDateIndex]] = dateInfoItem;
      // this.$forceUpdate();

      // 移除组件
      this.update = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true;
      });
    },

    configFood: function (foodTypeIndex, foodDateIndex) {
      this.foodTypeIndex = foodTypeIndex;
      this.foodDateIndex = foodDateIndex;
      this.foodListDataOld = [];
      let that = this;

      let foodDateItem = this.tableData[foodTypeIndex].date_info[this.table_slot_list[foodDateIndex]];
      if (foodDateItem != '{}' && foodDateItem != undefined) {
        if (foodDateItem.foodList != undefined) {
          let foodList = foodDateItem.foodList;
          foodList.forEach(function (foodItem, foodIndex) {
            that.foodListDataOld.push(foodItem.food_id);
          });
        }
      }

      this.$store.commit('setSelectFoodModal', true);
    },
    //获取菜单信息列表
    getMenuData: async function () {
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        // start_date: '2021-12-06',
        start_date: this.start_date,
        end_date: '',
        page_size: 10000,

      };
      let that = this;
      let tableDataNew = [];
      await this.$store.dispatch('menuList', params).then(res => {
        let menuResult = res.data.result;
        if (!_.isEmpty(menuResult)) {
          this.goodsList.forEach(function (goodsItem, goodsIndex) {
            let info = goodsItem;
            let dateInfo = {};
            info.date_info = {};
            menuResult.forEach(function (menuItem, menuIndex) {
              that.end_date = menuItem.date > that.end_date ? menuItem.date : that.end_date;
              let menuGoods = menuItem.goods;
              menuGoods.forEach(function (menuGoodsItem, menuGoodsIndex) {
                if (goodsItem.goods_id == menuGoodsItem.goods_id) {
                  let menuGoodsFoods = menuGoodsItem.foods;
                  let menuGoodsFoodsItems = [];
                  let foodNames = [];
                  menuGoodsFoods.forEach(function (menuGoodsFoodsItem, menuGoodsFoodsIndex) {
                    let menuGoodsFoodsItemValue = {
                      food_id: menuGoodsFoodsItem.food_id || '',
                      food_name: menuGoodsFoodsItem.food_name || '',
                      desc: menuGoodsFoodsItem.desc || ''
                    };
                    foodNames.push(menuGoodsFoodsItem.food_name);
                    menuGoodsFoodsItems.push(menuGoodsFoodsItemValue);
                  });
                  let dateInfoItem = {
                    foodList: menuGoodsFoodsItems,
                    desc: foodNames.toString(),
                  };
                  info.date_info[menuItem.date] = dateInfoItem;
                }
              });
            });
            tableDataNew.push(info);
          });
        }
        else{
          this.goodsList.forEach(function (goodsItem, goodsIndex) {
            let info = goodsItem;
            let dateInfo = {};
            info.date_info = {};

            tableDataNew.push(info);
          });
        }
      });

      if (this.table_slot_list.length > 0) {
        for (let tableDataItem of tableDataNew) {
          for (let foodDate of this.table_slot_list) {
            tableDataItem.date_info[foodDate] = tableDataItem.date_info[foodDate] ? tableDataItem.date_info[foodDate] : {};
          }
        }
      }

      if (tableDataNew.length > 0){
        this.tableData = tableDataNew;
      }

      let days = moment(this.end_date).diff(moment(this.start_date), 'days')
      this.weeks = Math.floor(days / 7);
    },

    //获取菜品列表
    getFoodData: async function () {
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        is_enable: 1,
        page_size: 10000
        // time_type: val,
      };
      await this.$store.dispatch('foodList', params);
    },

    //获取餐种列表
    getGoodsData: async function () {
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        is_enable: 1,
        page_size: 10000
        // time_type: val,
      };
      await this.$store.dispatch('goodsList', params);
    },

    init: async function () {
      let myWeek = this.myDate.getDay()
      this.start_date = moment().subtract(myWeek, 'days').format('YYYY-MM-DD');
      this.end_date = moment().add(6 - myWeek, 'days').format('YYYY-MM-DD');
      this.week_columns = dataConfig.week_columns;
      this.week_data = dataConfig.week_data;

      await this.getFoodData();
      await this.getGoodsData();
      await this.getMenuData();

      this.initDateTable(0);
      for (let week = 1; week <= this.weeks; week++) {
        this.addRow(week);
      }
    },
    // 初始化菜单日历
    initDateTable(index) {
      for (let i = 0; i <= 6; i++) {
        let tmp = {
          slot: moment(this.start_date).add(i + index * 7, 'days').format('YYYY-MM-DD'),
          title: moment(this.start_date).add(i + index * 7, 'days').format('YYYY-MM-DD'),
          align: 'center',
        }
        this.table_list[index].date_columns.push(tmp);
        this.table_slot_list.push(tmp.slot);
      };

      this.myDateIndex = _.indexOf(this.table_slot_list, moment().format('YYYY-MM-DD'));
      let del = {
        title: '清除',
        align: 'center',
        slot: 'del',
        width: '60'
      };
      this.table_list[index].date_columns.push(del)
      let new_table_slot_list = this.table_slot_list.slice(index * 7);

      for (let item of this.tableData) {
        for (let ele of new_table_slot_list) {
          item.date_info[ele] = item.date_info[ele] ? item.date_info[ele] : {};
        };
      };

    },
    // 选择菜品
    selectedFood(event, index, i) {
      if (event) {
        let result = _.find(this.foodList, cur => {
          return cur.food_id == this.tableData[index].date_info[this.table_slot_list[i]].foodid;
        });
        let foodInfo = {
          food_id: result.food_id,
          food_name: result.food_name,
          desc: result.desc ? result.desc.replace(/<[^>]+>/g, "").replace("&nbsp;", " ") : '祝您用餐愉快',
        }

        if (this.tableData[index].date_info[this.table_slot_list[i]].foodList == undefined) {
          this.tableData[index].date_info[this.table_slot_list[i]].foodList = [];
        }

        this.tableData[index].date_info[this.table_slot_list[i]].foodList.push(foodInfo);
        this.tableData[index].date_info[this.table_slot_list[i]].desc = this.tableData[index].date_info[this.table_slot_list[i]].desc ? this.tableData[index].date_info[this.table_slot_list[i]].desc : '' + ',' + foodInfo.food_name;

      } ;
    },

    // 添加下周菜单
    addRow(week) {
      let cur = [{
        title: '日期',
        align: 'center',
        key: 'goods_name',
        width: '80',
        className: 'first-column',
        renderHeader: (h, params) => {
          return h('div', {
            style: {cursor: 'pointer'},
            on: {
              click: () => {
                // console.log(week);
                let tables = document.getElementById('tables');
                let cur_table = tables.children[week];
                let cur_table_body = cur_table.getElementsByClassName('ivu-table-body')[0];
                let cur_icon = cur_table.getElementsByClassName('ivu-icon-md-arrow-dropdown')[0];
                let cur_body_height = cur_table_body.offsetHeight;
                let deg = '';
                if (cur_body_height == 0) {
                  deg = '0deg';
                  cur_table_body.style.height = 'auto';
                  cur_icon.style.transform = "rotate(" + deg + ")";
                } else {
                  deg = '-90deg';
                  cur_table_body.style.height = '0';
                  cur_icon.style.transform = "rotate(" + deg + ")";
                }
              }
            }
          }, [
            h('Icon', {
              props: {type: 'md-arrow-dropdown'},
              style: {marginRight: '5px', fontSize: '20px', verticalAlign: 'bottom', transition: 'all 300ms'}
            }),
            h('span', {}, '日期')
          ],)
        }
      }]
      this.table_list.push({date_columns: cur});
      this.initDateTable(this.table_list.length - 1);
    },
    //点击清除
    delRow(index, i) {
      let obj = this.tableData[index].date_info;
      for (let num = 0; num < 7; num++) {
        if (i * 7 + num >= this.myDateIndex) {
          // obj[this.table_slot_list[i*7+num]] = {};
          obj[this.table_slot_list[i * 7 + num]].foodList = [];
          obj[this.table_slot_list[i * 7 + num]].desc = '';
        }
      }
    },

    handleCommit() {
      let params = [];
      for (let item of this.tableData) {
        for (let key in item.date_info) {
          if (JSON.stringify(item.date_info[key]) == "{}") {
            continue;
          }

          for (let foodListItem of item.date_info[key].foodList) {
            let tmp = {};
            tmp.merchant_id = this.$store.state.user.curMerchantId;
            tmp.goods_id = item.goods_id;
            tmp.date = key;
            tmp.food_id = foodListItem.food_id;
            params.push(tmp);


          }

        }
      }
      params = _.filter(params, cur => {
        return cur.food_id != '';
      })

      let Base64 = require('js-base64').Base64;
      let goods_detail = Base64.encode(JSON.stringify(params));

      let detail = {
        goods_detail: goods_detail,
      };
      // this.$store.dispatch('goodsDateEditNew', detail).then(res=>{
      this.$store.dispatch('menuEdit', detail).then(res => {
        if (res.return_code == 0) {
          this.$Message.success('提交成功！');
          this.getMenuData();
        }
      });
    },

    handleCommitMenu() {
      let params = [];
      for (let item of this.tableData) {
        for (let key in item.date_info) {
          if (JSON.stringify(item.date_info[key]) == "{}") {
            continue;
          }

          let menuInfoItem = {
            merchant_id : this.$store.state.user.curMerchantId,
            goods_id : item.goods_id,
            date : key,
            foods : [],
          };

          for (let foodListItem of item.date_info[key].foodList) {

            menuInfoItem.foods.push(foodListItem.food_id);
          }
          params.push(menuInfoItem);
        }
      }

      let Base64 = require('js-base64').Base64;
      let goods_detail = Base64.encode(JSON.stringify(params));

      let detail = {
        goods_detail: goods_detail,
      };

      this.$store.dispatch('menuEditV2', detail).then(res => {
        if (res.return_code == 0) {
          this.$Message.success('提交成功！');
          this.getMenuData();
        }
      });
    }
  },

  mounted() {
    this.init();
  },

};
</script>
<style lang='less' scoped>
@import "./style";

.border-top {
  border-top: 1px solid #dcdee2;
}

.border-bottom {
  border-bottom: 1px solid #dcdee2;
}

/deep/ .ivu-table-wrapper {
  overflow: visible;
}
.ivu-select-item{
  text-align: left;
}


</style>
