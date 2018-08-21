import {
  storageOperation
} from "@/common/common";
const packageZone = "湖南";
const packageCity = "长沙";
let cityInfo = [{
    name: "湘西土家族苗族自治州",
    value: 0
  }, {
    name: "怀化市",
    value: 0
  }, {
    name: "邵阳市",
    value: 0
  },
  {
    name: "湘潭市",
    value: 0
  }, {
    name: "常德市",
    value: 0
  }, {
    name: "益阳市",
    value: 0
  }, {
    name: "张家界市",
    value: 0
  },
  {
    name: "岳阳市",
    value: 0
  }, {
    name: "株洲市",
    value: 0
  }, {
    name: "永州市",
    value: 0
  }, {
    name: "郴州市",
    value: 0
  },
  {
    name: "长沙市",
    value: 0
  }, {
    name: "衡阳市",
    value: 0
  }, {
    name: "娄底市",
    value: 0
  }
];
// 注释人：向浩
// 注释时间：2018-06-15
// 注释原因：换肤的功能
var chgElemtColor = function (elemtId, crntColor) {
  document.getElementById(elemtId).style.backgroundColor = crntColor;
  storageOperation.setItem('changeTheme', crntColor);
}
// 注释人：向浩
// 注释时间：2018-06-20
// 注释原因：当前session都是有效的换肤
var initElemtColor = function (elemtId, crntColor) {
  document.getElementById(elemtId).style.backgroundColor = crntColor;
}
export {
  packageZone,
  packageCity,
  cityInfo,
  chgElemtColor,
  initElemtColor
}
