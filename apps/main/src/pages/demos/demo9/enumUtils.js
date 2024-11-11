
export const getEnumFromDataview = (form, dataview, dependencies) => {
  if (dataview === "1" || dataview === 1) {
    // 示例映射，你可以根据实际情况进行修改
    const enumMapping = {
      1: {
        enum: ["m", "a", "e"],
        enumNames: ["上午", "下午", "晚上"],
      },
      // 其他dataview到enum和enumNames的映射可以在这里添加
    };

    // 返回对应dataview的enum和enumNames，如果没有匹配项则返回空对象
    return enumMapping[dataview] || {};
  } else if (dataview === "2" || dataview === 2) {
    const enumMapping = {
      m: [
        { value: "1", label: "1 AM" },
        { value: "2", label: "2 AM" },
        { value: "3", label: "3 AM" },
      ],
      a: [
        { value: "13", label: "1 PM" },
        { value: "14", label: "2 PM" },
        { value: "15", label: "3 PM" },
      ],
      e: [
        { value: "18", label: "6 AM" },
        { value: "19", label: "7 AM" },
        { value: "20", label: "8 AM" },
      ],
    };

    const result = {};
    dependencies.forEach((dep) => {
      const value = form.getValues(dep);
      const key = value[dep];
      if (enumMapping[key]) {
        result.enum = enumMapping[key].map((item) => item.value);
        result.enumNames = enumMapping[key].map((item) => item.label);
      }
    });
    return result;
  } else if (dataview === "3" || dataview === 3) {
    const enumMapping = {
      1: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
      ],
      2: [
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
      ],
      3: [
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
      ],
      13: [
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
      ],
      14: [
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
      ],
      15: [
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
      ],
      18: [
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
      ],
      19: [
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
      ],
      20: [
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
      ],
    };

    const result = {};
    dependencies.forEach((dep) => {
      const value = form.getValues(dep);
      const key = value[dep];
      if (enumMapping[key]) {
        result.enum = enumMapping[key].map((item) => item.value);
        result.enumNames = enumMapping[key].map((item) => item.label);
      }
    });
    return result;
  }

  // 对于其他dataview值，返回空对象或者相应的映射
  return {};
};