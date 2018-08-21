<template>
  <el-row class="single-daypicker-component">
    <el-row class="label-name">{{labelName}}</el-row>
    <el-date-picker
    v-model="singleDayPickerVal"
    type="date" 
    placeholder="请选择日期" 
    format="yyyy-MM-dd"
    value-format="yyyyMMdd"
    @change="singleDayPickerChange(labelId)">
    </el-date-picker>
  </el-row>
</template>
<style src="./singleDayPickerComponent.css" type="text/css"></style>
<script>
export default {
  name: "singleDayPickerComponent",
  props: ["labelName", "compVal", "labelId"],
  data() {
    return {
      singleDayPickerVal: this.compVal //不能在子组件内直接改变传过来的props
    };
  },
  watch: {
    compVal: function(val){
      this.singleDayPickerVal = val;
    }
  },
  methods: {
    singleDayPickerChange(labelId) {
      const singleDayPickerTemp = {
        compVal: this.singleDayPickerVal,
        labelId
      };
      this.$emit("singleDayPickerChange", singleDayPickerTemp); //向上级组件传递最新的值
    }
  }
};
</script>

