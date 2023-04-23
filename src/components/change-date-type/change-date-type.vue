<style lang="less">
@import './styles.less';
</style>
<template>
  <FormItem ref="dateType" class="date-type">
    <RadioGroup v-model="radio" @on-change="handleChangeType">
      <Radio v-for="item of radioList" :key="item.value" :label="item.value">{{
        item.label
      }}</Radio>
    </RadioGroup>
    <DatePicker
      v-if="picker1"
      :editable="false"
      :class="picker1Style"
      :type="picker1Type"
      :value="picker1Value"
      :placeholder="picker1Placeholder"
      @on-change="handleChangePicker1"
    ></DatePicker>
    <span v-if="picker2">—</span>
    <DatePicker
      v-if="picker2"
      :editable="false"
      :class="picker2Style"
      :type="picker2Type"
      :value="picker2Value"
      :placeholder="picker2Placeholder"
      @on-change="handleChangePicker2"
    ></DatePicker>
  </FormItem>
</template>
<script>
/**
  功能：切换选择日期类型的组件，选择天、月、年，返回对应的格式
  使用方法： 调用组件时候监听事件：changeDateType
  返回参数：
    date_search_type 当前选择的类型，如：day - 天， month - 月， year - 年
    start 开始时间，格式如： 2018-10-25，2018-10，2018
    end 结束时间，格式如：2018-10-25，2018-10，2018
 */
import * as dataConfig from './dataConfig';
import _ from 'underscore';
import moment from 'moment-timezone'
export default {
  name: 'dateType',
  components: {},
  data() {
    return {
      picker1: true,
      picker2: false,
      radio: 'day',
      picker1Type: 'daterange',
      picker1Style: 'date-picker-daterange',
      picker1Value: null,
      picker1Placeholder: '选择日期',
      picker2Type: 'daterange',
      picker2Style: 'date-picker-daterange',
      picker2Value: null,
      picker2Placeholder: '选择日期',
      radioList: dataConfig.dateTypeList,
    };
  },
  methods: {
    init() {
      this.picker1Value = [
        moment()
          .add(-7, 'day')
          .format('YYYY-MM-DD'),
        moment()
          .add(-1, 'days')
          .format('YYYY-MM-DD'),
      ];
    },
    // 改变日期类型
    handleChangeType: function(val) {
      this.radio = val;
      let start = '';
      let end = '';
      let typeConfig = _.find(dataConfig.dateTypeList, (cur) => {
        return cur.value === val;
      })['config'];
      switch (val) {
        case 'day':
          this.picker1 = true;
          this.picker2 = false;
          this.picker1Type = typeConfig['type'];
          this.picker1Style = typeConfig['style'];
          this.picker1Value = [
            moment()
              .add(-7, 'days')
              .format('YYYY-MM-DD'),
            moment()
              .add(-1, 'days')
              .format('YYYY-MM-DD'),
          ];
          this.picker1Placeholder = typeConfig['placeholder'][0];
          start = this.picker1Value[0];
          end = this.picker1Value[1];
          break;
        case 'month':
          this.picker1 = true;
          this.picker2 = true;
          this.picker1Type = typeConfig['type'];
          this.picker1Style = typeConfig['style'];
          this.picker1Value = moment()
            .add(-7, 'months')
            .format('YYYY-MM');
          this.picker1Placeholder = typeConfig['placeholder'][0];
          this.picker2Type = typeConfig['type'];
          this.picker2Style = typeConfig['style'];
          this.picker2Value = moment().format('YYYY-MM');
          this.picker2Placeholder = typeConfig['placeholder'][1];
          start = this.picker1Value;
          end = this.picker2Value;
          break;
        case 'year':
          this.picker1 = true;
          this.picker2 = true;
          this.picker1Type = typeConfig['type'];
          this.picker1Style = typeConfig['style'];
          this.picker1Value = moment()
            .add(-7, 'year')
            .format('YYYY');
          this.picker1Placeholder = typeConfig['placeholder'][0];
          this.picker2Type = typeConfig['type'];
          this.picker2Style = typeConfig['style'];
          this.picker2Value = moment().format('YYYY');
          this.picker2Placeholder = typeConfig['placeholder'][1];
          start = this.picker1Value;
          end = this.picker2Value;
          break;
        default:
      }
      // 选定时候将默认值传给父组件
      this.emitParent(start, end);
    },
    // 改变日期选择框
    handleChangePicker1: function() {
      let start;
      let end = this.picker2Value;
      if (this.radio === 'day') {
        this.picker1Value = arguments[0];
        start = arguments[0][0];
        end = arguments[0][1];
      } else {
        this.picker1Value = arguments[0];
        start = arguments[0];
      }
      this.emitParent(start, end);
    },
    handleChangePicker2: function() {
      this.picker2Value = arguments[0];
      this.emitParent(this.picker1Value, this.picker2Value);
    },
    emitParent: function(start, end) {
      this.$emit('changeDateType', { date_search_type: this.radio, start: start, end: end });
    },
  },
  created() {
    this.init();
  },
};
</script>
