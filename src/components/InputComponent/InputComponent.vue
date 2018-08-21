<template>
  <div class="input-text noprint">
    <span class="label-name">{{labelName}}</span>
    <el-input v-model="inputCtnt.inputVal" :placeholder="phInput" @change="changePreSearch(inputCtnt.inputVal)" @blur="needClearInput"></el-input>
    <el-row class="pre-search">
      <el-row class="pre-search-item" v-for="(preSearchItem, preSearchKey) of preSearchItems" :key="preSearchKey">
        <label @mouseup="handlePreSearchSelect(preSearchItem.Value, preSearchItem.Name)">{{preSearchItem.Name}}</label>
      </el-row>
    </el-row>
  </div>
</template>

<style src="./inputComponent.css" type="text/css">
</style>

<script>
import { axiosRequest } from "@/common/common";
import { commonConfig } from "@/config/commonConfig";
export default {
  name: "InputComponent",
  props: ["labelName", "compVal", "compId", "labelId"],
  data() {
    return {
      getAutoDataListUrl: commonConfig.rootUrl + commonConfig.GetAutoDataList, // 通用接口 - 预搜索
      preSearchItems: [], //存储预搜索的返回结果
      isPreSearchSelected: true, //判断是否选择了预选框
      // 定义预搜索类型
      preSearchType: [
        {
          labelId: "ZoneId", //1: 地区预搜索
          type: 1
        },
        {
          labelId: "UnitId", //2: 企业预搜索
          type: 2
        },
        {
          labelId: "VehicleId", //3: 车牌号预搜索
          type: 3
        },
        {
          labelId: "PlatformId", //4: 接入平台预搜索
          type: 4
        }
      ]
    };
  },
  computed: {
    phInput: function() {
      return "请输入" + this.labelName;
    },
    inputCtnt: function() {
      return {
        inputVal: this.compVal, //不能在子组件内直接改变传过来的props
        inputId: this.compId
      };
    }
  },
  methods: {
    // Multil-Level预搜索功能
    changePreSearch: function(inputCtnt) {
      const self = this;
      let type = 0;
      //2. 设置选择了预选框里面的一条数据的标记位
      this.isPreSearchSelected = false;
      self.preSearchItems = [];
      for (let preSearchItem of self.preSearchType) {
        if (self.labelId === preSearchItem.labelId) {
          type = preSearchItem.type;
          break;
        }
      }
      axiosRequest
        .axiosGet(this.getAutoDataListUrl, {
          type, // 参数详细设置请参考commonConfig.js的说明
          text: inputCtnt.toString(),
          zoneId: 0,
          queryType: 0
        })
        .then(function(response) {
          const preSearchTemp = [];
          for (let preSearchItem of response.data) {
            preSearchTemp.push({
              Name: preSearchItem.Name,
              Value: preSearchItem.Value
            });
          }
          self.preSearchItems = preSearchTemp;
        })
        .catch(function(error) {});
    },
    //从预搜索中选择结果
    handlePreSearchSelect: function(Value, Name) {
      //1. 清除预搜索数据
      this.preSearchItems = [];
      //2. 设置选择了预选框里面的一条数据的标记位
      this.isPreSearchSelected = true;
      //3. 填充到当前输入框
      this.inputCtnt.inputVal = Name;
      this.inputCtnt.inputId = Value;
      const inputValTemp = {
        compId: this.inputCtnt.inputId,
        compVal: this.inputCtnt.inputVal,
        labelId: this.labelId
      };
      this.$emit("inputChange", inputValTemp); //从预选框里面选取值，然后通知上级组件，不然的话，但输入框失去焦点直接清空当前值
    },
    needClearInput: function() {
      if (!this.isPreSearchSelected) {
        this.inputCtnt.inputVal = "";
        this.inputCtnt.inputId = 0;
      }
    }
    // inputChange(labelId){
    //   const inputValTemp = {
    //     compVal: this.inputVal,
    //     labelId
    //   }
    //   this.$emit('inputChange', inputValTemp); //向上级组件传递最新的值
    // }
  }
};
</script>

