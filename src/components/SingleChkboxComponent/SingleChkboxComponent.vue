<template>
    <div class="single-chkbox-text">
        <el-checkbox v-model="singleChkboxVal" @change="singleChkboxChange(labelId)">{{labelName}}</el-checkbox>
    </div>
</template>
<style src="./singleChkboxComponent.css" type="text/css"></style>
<script>
export default {
  name: "SingleChkboxComponent",
  props: ["compVal", "labelName", 'labelId'],
  data() {
    return {
      singleChkboxVal: this.compVal //不能在子组件内直接改变传过来的props
    };
  },
  methods: {
      singleChkboxChange(labelId){
        const singleChkboxValTemp = {
          compVal: this.singleChkboxVal,
          labelId
        }
        this.$emit('singleChkboxChange', singleChkboxValTemp); //向上级组件传递最新的值
      }
    }
};
</script>

