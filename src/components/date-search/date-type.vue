<template>
  <Form :model="formValidate">
    <FormItem class="margin-right-0">
      <Select v-model="formValidate.dateType" placeholder="选择日期" @on-change='handleChangeDateType'>
        <Option v-for='(item, index) in dateOpt' :value="item.value" :key="index">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem class="margin-left-10 margin-right-0" v-show='isCustom'>
      <DatePicker v-model='formValidate.dateCustom' style="width: 200px" type="daterange" placeholder="选择日期" formater="YYYY-MM-DD" @on-change="customPicker"></DatePicker>
    </FormItem>
  </Form>
</template>
<script>
import _ from 'underscore';
import moment from 'moment-timezone';

export default {
  name: 'date-search',
  props: {
    current: {
      type: String,
      default: '2' // 1-今日，2-最近一周, 3-最近一个月, 4-最近三个月, 5-自定义(默认当日)
    },
    type: {
      type: String,
      default: 'd' // d-日期，m-月，y-年
    }
  },
  data() {
    return {
      formValidate: {
        dateType: '',
        dateCustom: []
      },
      dateOpt: [
        { label: '今日', value: '1' },
        { label: '最近一周', value: '2' },
        { label: '最近一个月', value: '3' },
        { label: '最近三个月', value: '4' },
        { label: '自定义', value: '5' }
      ],
      isCustom: false,
    };
  },
  methods: {
    init() {
      this.handleChangeDateType(this.current);
      // this.formValidate.dateType = '';
      // this.formValidate.dateCustom = [];
      this.isCustom = false;
    },
    customPicker(val) {
      this.formValidate.dateCustom = val;
      this.$emit('handleSelectDate', this.formValidate.dateCustom);
    },
    handleChangeDateType(val) {
      this.formValidate.dateType = val;
      this.isCustom = val == '5' ? true : false;
      let start, end;
      switch (val) {
        // 当日
        case '1':
          start = moment().format('YYYY-MM-DD');
          end = moment().format('YYYY-MM-DD');
          this.formValidate.dateCustom = [start, end];
          break;
          // 最近一周
        case '2':
          start = moment().add(-1, 'w').format('YYYY-MM-DD');
          end = moment().format('YYYY-MM-DD');
          this.formValidate.dateCustom = [start, end];
          break;
          // 最近一个月
        case '3':
          start = moment().add(-1, 'M').format('YYYY-MM-DD');
          end = moment().format('YYYY-MM-DD');
          this.formValidate.dateCustom = [start, end];
          break;
          // 最近三个月
        case '4':
          start = moment().add(-3, 'M').format('YYYY-MM-DD');
          end = moment().format('YYYY-MM-DD');
          this.formValidate.dateCustom = [start, end];
          break;
          // 自定义日期  
        case '5':
          start = moment().format('YYYY-MM-DD');
          end = moment().format('YYYY-MM-DD');
          this.formValidate.dateCustom = [start, end];
          break;
        default:
          // statements_def
          break;
      }
      this.$emit('handleSelectDate', this.formValidate.dateCustom);
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    current(val) {
      this.handleChangeDateType(val);
    }
  }
};
</script>
<style lang="less" scoped>
  
</style>