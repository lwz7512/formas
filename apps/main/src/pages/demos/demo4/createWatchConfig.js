// createWatchConfig.js
import watchConfigData from './watchConfig.json';

export const createWatchConfig = (form) => ({
  '#': (val) => {
    // console.log('表单的实时数据为：', val);
  },
  ...Object.keys(watchConfigData).reduce((acc, key) => {
    // 创建一个闭包，这样可以在调用时访问 form
    acc[key] = (val) => {
      const func = new Function('val', 'form', watchConfigData[key]);
      func(val, form);
    };
    return acc;
  }, {})
});
