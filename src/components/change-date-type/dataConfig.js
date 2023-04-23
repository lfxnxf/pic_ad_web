// 定义选择日期类型
const dateTypeList = [
  {
    label: '按日',
    value: 'day',
    config: {
      picker1: true,
      picker2: false,
      type: 'daterange',
      placeholder: ['选择日期'],
      format: 'yyyy-MM-DD',
      style: 'date-picker-daterange',
    },
  },
  {
    label: '按月',
    value: 'month',
    config: {
      picker1: true,
      picker2: false,
      type: 'month',
      placeholder: ['选择开始月份', '选择结束月份'],
      format: 'yyyy-MM',
      style: 'date-picker-month',
    },
  },
  {
    label: '按年',
    value: 'year',
    config: {
      picker1: true,
      pkcker2: true,
      type: 'year',
      placeholder: ['选择开始月份', '选择结束月份'],
      format: 'yyyy',
      style: 'date-picker-year',
    },
  },
];

export { dateTypeList };
