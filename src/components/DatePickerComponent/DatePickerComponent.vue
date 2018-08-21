<template>
  <el-row class="datepicker-component">
    <el-row class="label-name">{{labelName}}</el-row>
    <el-date-picker
    v-model="datePickerVal"
    type="daterange"
    range-separator="至"
    start-placeholder="日期起"
    end-placeholder="日期至"
    class="datepicker-com"
    format="yyyy-MM-dd"
    value-format="yyyyMMdd"
    @change="datePickerChange(labelId)">
    </el-date-picker>
  </el-row>
</template>
<style src="./datePickerComponent.css" type="text/css"></style>
<script>
export default {
  name: "DatePickerComponent",
  props: ["labelName", "compVal", "labelId"],
  data() {
    return {
      datePickerVal: this.compVal //不能在子组件内直接改变传过来的props
    };
  },
  watch: {
    compVal: function(val){
      this.datePickerVal = val;
    }
  },
  methods: {
    datePickerChange(labelId) {
      const datePickerTemp = {
        compVal: this.datePickerVal,
        labelId
      };
      this.$emit("datePickerChange", datePickerTemp); //向上级组件传递最新的值
    }
  }
};
</script>

