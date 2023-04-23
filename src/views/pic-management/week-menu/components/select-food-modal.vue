
<!-- 选择菜品 -->
<template>
  <Modal
    v-model="selectFoodModal"
    title="选择菜品"
    :footer-hide="true"
    width="840px">
      <Transfer
          :titles="['菜品列表', '选中菜品']"
          :data="foodData"
          :target-keys="selectedFoodData"
          filterable
          :filter-method="filterMethod"
          @on-change="handleChange2"></Transfer>
      <div class="text-center margin-bottom-20 margin-top-30">
        <Button class="margin-right-20" @click="$store.commit('setSelectFoodModal', false)">取消</Button>
        <Button type="primary" :loading="btnLoading" @click="selectedFood">确定</Button>
      </div>

  </Modal>
</template>

<script>

export default {
  props: {
    foodTypeIndex: Number,
    foodDateIndex: Number,
    foodListDataOld: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      btnLoading: false,
      foodStatus: true,
      form: {
        name: '',
      },

      foodData: [],
      selectedFoodData: [],
    };
  },

  components: {},

  computed: {
    selectFoodModal:{
      get(){
        return this.$store.state.menu.selectFoodModal;
      },
      set(val){
        this.$store.commit('setSelectFoodModal', val);
      }
    },
    //菜品数据
    foodList() {
      return this.$store.state.food.foodList.result;
    },

    foodListDataOldVal(){
      return this.foodListDataOld;
    }
  },

  watch: {
    foodListDataOldVal: function (val) {
      // console.log("foodListDataOldVal>>>>>>>" + JSON.stringify(val))
      this.getTargetKeys();
    }
  },

  methods: {
    init: async function() {
      await this.getFoodListData();
      await this.getFoodData();
    },

    //获取菜品列表
    getFoodListData: async function(){
      let params = {
        merchant_id: this.$store.state.user.curMerchantId,
        is_enable: 1,
        page_size: 10000
        // time_type: val,
      };
      await this.$store.dispatch('foodList', params);
    },

    selectedFood: function(){
      // console.log("===selectedFood===foodListDataOld>>>" + JSON.stringify(this.foodListDataOld));
      // console.log("===selectedFood===selectedFoodData>>>" + JSON.stringify(this.selectedFoodData));
      let selectedFoodList = {
        foodTypeIndex : this.foodTypeIndex,
        foodDateIndex : this.foodDateIndex,
        foodListIndex : this.selectedFoodData,
      }
      console.log("selectedFood===selectedFoodList>>>" + JSON.stringify(selectedFoodList));
      this.$emit('setSelectedFoodList', selectedFoodList);
      this.$store.commit('setSelectFoodModal', false);

    },

    getFoodData: async function(){
      // console.log("getFoodData===foodList>>>" + JSON.stringify(this.foodList))
      for (let foodItem of this.foodList) {
        this.foodData.push({
          key: foodItem.food_id,
          label: foodItem.food_name,
          description: foodItem.desc,
          disabled: foodItem.is_enable?false:true,
        });
      }
      // console.log("getFoodData===foodData>>>" + JSON.stringify(this.foodData))
    },
    getTargetKeys() {
      // console.log("===getTargetKeys===foodListDataOld>>>" + JSON.stringify(this.foodListDataOld));
      // console.log("===getTargetKeys===selectedFoodData>>>" + JSON.stringify(this.selectedFoodData));
      // this.selectedFoodData.push( this.foodListDataOld.toString());
      this.selectedFoodData = JSON.parse(JSON.stringify( this.foodListDataOld));
      // return this.getFoodData()
      //     .filter(() => Math.random() * 2 > 1)
      //     .map(item => item.key);
    },
    handleChange2 (newTargetKeys) {
      this.selectedFoodData = newTargetKeys;
    },
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1;
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='less' scoped>
  @import '../style';
  /deep/.ivu-modal{
    .ivu-modal-body{
      height: calc(100% - 51px);
    }
    .ivu-modal-content{
      height: 100%;
    }
    .ivu-transfer{
      text-align: center;
      padding: 10px;
      min-height: 86%;
      display: flex;
      align-items: stretch;
      .ivu-transfer-list{
        text-align: left;
        width: calc((100% - 62px) / 2);
        height: auto;
      }
      .ivu-transfer-operation{
        padding-top: 30%;
      }
    }
  }

</style>
