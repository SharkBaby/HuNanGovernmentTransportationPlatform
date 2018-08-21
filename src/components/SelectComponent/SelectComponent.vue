<template>
  <div class="select-text">
    <span class="label-name">{{labelName}}</span>
    <el-select v-model="selectVal" filterable placeholder="请选择" @change="selectChange(labelId)">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<style src="./selectComponent.css" type="text/css">
  
</style>

<script>
  export default {
    name: 'SelectComponent',
    props: ['options', 'labelName', 'compVal', 'labelId'],
    data() {
      return {
        selectVal: this.compVal //不能在子组件内直接改变传过来的props
      }
    },
    methods: {
      selectChange(labelId){
        const selectValTemp = {
          compVal: this.selectVal,
          labelId,
          options: this.options //需要根据选择的考核类型来展示不同的日期选择器
        }
        this.$emit('selectChange', selectValTemp); //向上级组件传递最新的值
      }
    }
  }
</script>

