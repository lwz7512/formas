export const codeFromDB = [
  `
    return {
      number_a: (val) => {
        const { number_b } = form.getValues('number_b');
        form.setValueByPath('number_sum', val + (number_b || 0));
      },
    };
  `,
  `
    return {
      number_b: (val) => {
        const { number_a } = form.getValues('number_a');
        form.setValueByPath('number_sum', val + (number_a || 0));
      },
    };
  `,
  `
    return {
      date_begin: (val) => {
        const { date_end } = form.getValues('date_end');
        console.log(val, date_end);
        if (val && date_end) {
          // 将字符串转换为Date对象
          const date1 = new Date(val);
          const date2 = new Date(date_end);
          // 使用getTime()方法获取时间戳并比较
          if (date1.getTime() < date2.getTime()) {
            const errors = [{
              name: "date_begin",
              error: "",
            },{
              name: "date_end",
              error: "",
            }];
            form.setErrorFields(errors);
          } else if (date1.getTime() > date2.getTime()) {
            console.log("开始日期必须小于结束日期");
            const errors = [{
              name: "date_begin",
              error: ["开始日期必须小于结束日期"],
            }];
            form.setErrorFields(errors);
          } else {
            const errors = [{
              name: "date_begin",
              error: "",
            },{
              name: "date_end",
              error: "",
            }];
            form.setErrorFields(errors);
          }
        }
      },
    };
  `,
  `
    return {
      date_end: (val) => {
        const { date_begin } = form.getValues('date_begin');
        console.log(date_begin, val);
        if (val && date_begin) {
          // 将字符串转换为Date对象
          const date1 = new Date(date_begin);
          const date2 = new Date(val);
          // 使用getTime()方法获取时间戳并比较
          if (date1.getTime() < date2.getTime()) {
            const errors = [{
              name: "date_begin",
              error: "",
            },{
              name: "date_end",
              error: "",
            }];
            form.setErrorFields(errors);
          } else if (date1.getTime() > date2.getTime()) {
            console.log("结束日期必须大于开始日期");
            const errors = [{
              name: "date_end",
              error: ["结束日期必须大于开始日期"],
            }];
            form.setErrorFields(errors);
          } else {
            const errors = [{
              name: "date_begin",
              error: "",
            },{
              name: "date_end",
              error: "",
            }];
            form.setErrorFields(errors);
          }
        }
      },
    };
  `,
  // 可以在这里添加更多的 watch 配置
];
