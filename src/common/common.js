import axios from 'axios';
import {
  commonConfig,
  animationPosition
} from '@/config/commonConfig';
import qs from 'qs';
var isNull = function (value) {
  if (value == null) return true;
  else return false;
}
const isNullUndefEmpty = function (value) {
  if (value == null || value == undefined || value == '')
    return true;
  else false;
}
// 循环对象然后返回一个数组
let ObjToArray = function (obj) {
  let arrTemp = [];
  for (let item in obj) {
    arrTemp.push(obj[item]);
  }
  return arrTemp;
}
// 两个数组相除以后合并为以为数组
let twoArrayDivide = function (para1, para2) {
  let temp = [];
  for (let item in para1) {
    temp.push((para1[item] / para2[item]) * 100);
  }
  return temp
}
// 规范显示的数据类型
function formatterNumber(num) {
  var str = "",
    fullstop = -1;
  num += "";
  fullstop = num.lastIndexOf(".");
  if (fullstop > 0) {
    str += num.substr(fullstop);
    num = num.substr(0, fullstop);
  }
  if (num.length > 4) {
    var count = Math.ceil(num.length / 4);
    for (var i = 0; i < count; i++) {
      if (i == 0) {
        str = num.substr(num.length - 4) + str;
      } else if (i == count - 1) {
        str = num + "," + str;
      } else {
        str = num.substr(num.length - 4) + "," + str;
      }
      num = num.substr(0, num.length - 4);
    }
  } else {
    str = num + str;
  }

  return str;
}
// 得到昨天到上一个月的昨天
var getFromLastDayToLastMonth = function (datetime) {
  datetime.setDate(datetime.getDate() - 1);
  let month = (datetime.getMonth() + 1) < 10 ? '0' + datetime.getMonth().toString() : datetime.getMonth().toString();
  let day = (datetime.getDate()) < 10 ? '0' + datetime.getDate().toString() : datetime.getDate().toString();
  const endDate = datetime.getFullYear().toString() + month + day;
  datetime.setMonth(datetime.getMonth() - 1);
  month = (datetime.getMonth() + 1) < 10 ? '0' + datetime.getMonth().toString() : datetime.getMonth().toString();
  day = (datetime.getDate()) < 10 ? '0' + datetime.getDate().toString() : datetime.getDate().toString();
  const startDate = datetime.getFullYear().toString() + month + day;
  return {
    startDate,
    endDate
  }
}
// 不满足三位的在前面补零
const setRegulationFormat = function (data) {
  let dataTemp = '';
  if (data < 10) {
    dataTemp = "00" + data;
  } else if (data >= 10 && data < 100) {
    dataTemp = "0" + data;
  } else dataTemp = data.toString();
  return dataTemp;
}
// Home运营机构监管的LED 数字显示
//行业监管
function getDigitsCss(num) {
  let numTemp = parseInt(num);
  switch (numTemp) {
    case 0:
      return "zero";
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    default:
      return "nine";
  }
}
// 获取字符串的前n个字符
const getShortName = function (name, length) {
  if (name.length > length)
    name = name.substr(0, length);
  return name;
}
// PlatformComponentBottomleft - 获取数组start以后放在一个元素里面
function getSplitData(start, arr) {
  if (arr.length <= start) {
    return arr;
  }
  var reData = [],
    total = 0;
  reData = arr.slice(0, start);
  for (var i = start; i < arr.length; i++) {
    total += parseFloat(arr[i]);
  }
  reData.push(total);

  return reData;
}
// 封装通用地区树
const formSourceData = function (data) {
  const sourceArr = [];
  for (let sourceItem of data) {
    switch (sourceItem.Level) {
      case 1: //一级目录
        sourceArr.push({
          label: sourceItem.ZoneName,
          children: [],
          Id: sourceItem.Id,
          UpZoneId: sourceItem.UpZoneId
        });
        break;
      case 2: //二级目录
        for (let firstLevelItem of sourceArr) {
          if (firstLevelItem.Id === sourceItem.UpZoneId) {
            firstLevelItem.children.push({
              label: sourceItem.ZoneName,
              children: [],
              Id: sourceItem.Id,
              UpZoneId: sourceItem.UpZoneId
            });
          }
        }
        break;
      case 3: //三级目录
        for (let firstLevelItem of sourceArr) {
          for (let secondLevelItem of firstLevelItem.children) {
            if (secondLevelItem.Id === sourceItem.UpZoneId) {
              secondLevelItem.children.push({
                label: sourceItem.ZoneName,
                children: [],
                Id: sourceItem.Id,
                UpZoneId: sourceItem.UpZoneId
              });
            }
          }
        }
        break;
      default:
    }
  }
  return sourceArr;
}
const storageOperation = {
  // Save data to sessionStorage
  setItem: function (key, value) {
    sessionStorage.setItem(key, value);
  },
  // Get saved data from sessionStorage
  getItem: function (key) {
    return sessionStorage.getItem(key);
  },
  // Remove saved data from sessionStorage
  removeItem: function (key) {
    sessionStorage.removeItem(key);
  },
  // Remove all saved data from sessionStorage
  clear: function () {
    sessionStorage.clear();
  }
}
// 获取上一个月的月份
const getLastMonth = function () {
  var date = new Date().getDate();
  var y = new Date().getFullYear();
  var m = new Date().getMonth() + 1;
  if (m == 1) {
    y = y - 1;
    m = 12
  } else {
    m = m - 1
  }
  if (m < 10) {
    m = "0" + m;
  }
  // return y + "-" + m;
  return y + m;
}
// 获取某年某月的最后一天
function getLastDay(year, month) {
    var new_year = year;  //取当前的年份   
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）   
    if (month > 12)      //如果当前大于12月，则年份转到下一年   
    {
        new_month -= 12;    //月份减   
        new_year++;      //年份增   
    }
    var new_date = new Date(new_year, new_month, 1);        //取当年当月中的第一天   
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期   
}
const axiosRequest = {
  axiosPost: function (postObj) {
    // let postInfo = new URLSearchParams();
    // for (var paramKey in postObj.params) {
    //   postInfo.append(paramKey, postObj.params[paramKey]);
    // }
    return new Promise((resolve, reject) => {
      //   axios.defaults.headers['token'] = 'fdsfadsfPerryXiang1';
      const token = storageOperation.getItem(commonConfig.Token) || '';
      axios.post(postObj.postUrl, qs.stringify(postObj.params), {
          headers: {
            'accept': 'application/json',
            // 'accept-language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Headers': 'token,Access-Control-Allow-Headers'
            // 'token': 'fdsfadsfPerryXiang2'
            'token': token //Access-Control-Allow-Headers: Content-Type(后台需要在web.config里面添加允许的头部字段)
          }
        }).then(response => { //then 请求成功之后进行什么操作
          resolve(response); //把请求到的数据发到引用请求的地方
        })
        .catch(error => {
          console.log('请求异常信息：' + error);
          reject(error);
        });
    });
  },
  axiosGet: function (getUrl, params) {
    // let postInfo = new URLSearchParams();
    // for (var paramKey in postObj.params) {
    //   postInfo.append(paramKey, postObj.params[paramKey]);
    // }
    return new Promise((resolve, reject) => {
      //   axios.defaults.headers['token'] = 'fdsfadsfPerryXiang1';
      const token = storageOperation.getItem(commonConfig.Token) || '';
      axios.get(getUrl, {
          params: params,
          headers: {
            'accept': 'application/json',
            // 'accept-language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Headers': 'token,Access-Control-Allow-Headers'
            // 'token': 'fdsfadsfPerryXiang2'
            'token': token //Access-Control-Allow-Headers: Content-Type(后台需要在web.config里面添加允许的头部字段)
          }
        }).then(response => { //then 请求成功之后进行什么操作
          resolve(response); //把请求到的数据发到引用请求的地方
        })
        .catch(error => {
          console.log('请求异常信息：' + error);
          reject(error);
        });
    });
  }
}
export {
  isNull,
  isNullUndefEmpty,
  axiosRequest,
  storageOperation,
  ObjToArray,
  twoArrayDivide,
  formatterNumber,
  getFromLastDayToLastMonth,
  setRegulationFormat,
  getDigitsCss,
  getShortName,
  getSplitData,
  executeAnimation,
  formSourceData,
  getLastMonth,
  getLastDay
};
