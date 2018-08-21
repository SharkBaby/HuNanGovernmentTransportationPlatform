<template>
  <el-row class="single-datepicker-component">
    <el-row class="label-name">{{labelName}}</el-row>
    <el-date-picker
    v-model="singleDatePickerVal"
    :type="type"
    :placeholder="placeholder" 
    :format="format"
    :value-format="valueformat"
    @change="singleDatePickerChange(labelId)">
    </el-date-picker>
  </el-row>
</template>
<style src="./singleDatePickerComponent.css" type="text/css"></style>
<script>
export default {
  name: "SingleDatePickerComponent",
  props: ["labelName", "compVal", "labelId", "type", "placeholder", "format", "valueformat"],
  data() {
    return {
      singleDatePickerVal: this.compVal //不能在子组件内直接改变传过来的props
    };
  },
  watch: {
    compVal: function(val){
      this.singleDatePickerVal = val;
    }
  },
  methods: {
    singleDatePickerChange(labelId) {
      const singleDatePickerTemp = {
        compVal: this.singleDatePickerVal,
        labelId
      };
      this.$emit("singleDatePickerChange", singleDatePickerTemp); //向上级组件传递最新的值
    }
  }
};
</script>

