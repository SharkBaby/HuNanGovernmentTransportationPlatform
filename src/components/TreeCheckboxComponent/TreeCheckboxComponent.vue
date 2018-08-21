<template>
  <div class="treeCheckboxComponent">
    <span class="label-name">{{labelName}}</span>
    <el-select v-model="selectInputVal" placeholder="请选择">
        <el-tree 
        :data="treeOps" 
        show-checkbox 
        default-expand-all 
        node-key="id" 
        ref="tree" 
        highlight-current 
        :props="treeChkboxProps"
        @check="handleCheckChange"></el-tree>
        <el-option value="" class="option-items">
        </el-option>
    </el-select>
  </div>
</template>
<style src="./treeCheckboxComponent.css" type="text/css">
</style>
<script>
export default {
  name: "treeCheckboxComponent",
  props: ["labelName", "treeOps", "treeChkboxProps", "compVal", "labelId"],
  data() {
    return {
      treeCheckboxVal: this.compVal, //不能在子组件内直接改变传过来的props
      selectInputVal: '' //在下拉输入框中显示的值
    };
  },
  methods: {
    handleCheckChange() {
      // (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点，默认值为 false
      const checkedNodes = this.$refs.tree.getCheckedNodes(true);
      const checkedObj = this.recursiveNode(checkedNodes);
      this.selectInputVal = checkedObj.selectInputVal.join(',');
      const treeCheckboxValTemp = {
        compVal: checkedObj.compVal,
        labelId: this.labelId
      };
      this.$emit("treeCheckboxChange", treeCheckboxValTemp); //向上级组件传递最新的值
    },
    // 递归查找某一个json对象有没有某一个子节点
    recursiveNode(nodes){
      const checkedObj = {
        compVal: 0,
        selectInputVal: [],
      }
      for(let nodeItem of nodes){
        if(typeof(nodeItem.value) !== 'undefined' && typeof(nodeItem.label) !== 'undefined'){ //如果不存在children子节点，那就看有没有value属性,来进行相加
          checkedObj.selectInputVal.push(nodeItem.label);
          checkedObj.compVal +=nodeItem.value;
        }
      }
      return checkedObj;
    }
  }
};
</script>
