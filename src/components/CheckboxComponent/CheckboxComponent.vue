<template>
  <div class="checkbox-text">
    <span class="label-name">{{labelName}}</span>
    <el-select 
    v-model="selectInputVal" 
    placeholder="请选择">
      <el-checkbox-group v-model="checkboxCompVal" @change="checkboxChange">
        <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item.value"
        class="chkbox-item">{{item.label}}</el-checkbox>
      </el-checkbox-group>
       <!-- :value="item.value"  -->
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-option value="" class="option-items">
      </el-option>
    </el-select>
  </div>
</template>

<style src="./checkboxComponent.css" type="text/css">
</style>

<script>
export default {
  name: "CheckboxComponent",
  props: ["options", "labelName", "compVal", "labelId"],
  data() {
    return {
      checkboxCompVal: this.compVal,
      selectInputVal: '',
      checkAll: false,
      isIndeterminate: true
    };
  },
  computed: {
    checkAllItemsVal: function(){
      let checkedAllItemsTemp = [];
      for(let item of this.compVal){
        checkedAllItemsTemp.push(item.value);
      }
      // checkedAllItemsTemp = checkedAllItemsTemp.concat();
      return checkedAllItemsTemp;
    }
  },
  methods: {
    checkboxChange(value) {
      const displayItems = [];
      for(let selectItem of value){
        for(let optionItem of this.options){
          if(selectItem === optionItem.value){
            displayItems.push(optionItem.label);
          }
        }
      }
      this.selectInputVal = displayItems.join(',');
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
      const checkboxValTemp = {
        compVal: this.checkboxCompVal,
        labelId: this.labelId
      };
      this.$emit("checkboxChange", checkboxValTemp); //向上级组件传递最新的值
    },
    handleCheckAllChange: function(val){
      this.checkboxCompVal = val ? this.checkAllItemsVal : [];
      this.isIndeterminate = false;
    }
  }
};
</script>

