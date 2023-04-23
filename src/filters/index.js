export function toThousandFilter(num){
  let value = (+num || 0 );
  return parseFloat(value).toFixed(2).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

export function filtTimeType(val){
  let value = '';
  switch(val){
    case 'breakfast':
      value = "早餐";
      break;
    case 'nooning':
      value = "午餐";
      break;
    case 'dinner':
      value = "晚餐";
  }
  return value;
}





