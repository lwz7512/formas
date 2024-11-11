// watchConfig.js
export const createWatchConfig = (form) => ({
  '#': (val) => {
    // console.log('表单的实时数据为：', val);
  },
  number_a: (val) => {
    const values = form.getValues();
    const val_b = values['number_b'];
    if (isNaN(val_b)) return;
    form.setValueByPath('number_sum', val + val_b);
  },
  number_b: (val) => {
    const values = form.getValues();
    const val_a = values['number_a'];
    if (isNaN(val_a)) return;
    form.setValueByPath('number_sum', val + val_a);
  },
  // 可以在这里添加更多的 watch 配置
});
