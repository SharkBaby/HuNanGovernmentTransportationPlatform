<template>
  <div class="Role">
    <input-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-if="searchItem.searchType === searchType.input" v-for="(searchItem, searchKey) of searchCreteria" :key="searchKey"></input-component>
    <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.select"></select-component>
    <checkbox-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.checkbox"></checkbox-component>
    <single-chkbox-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.singleChkbox"></single-chkbox-component>
    <el-row>
      <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of btnEvents" :key="btnKey"></button-component>
    </el-row>
    <table-component :TabCtnt="tabCtntList.TabCtnt" :tabHeader="tabCtntList.tabHeader"></table-component>
  </div>
</template>
<style src="./baseInfoRouter.css" type="text/css"></style>
<script>
import InputComponent from '@/components/InputComponent/InputComponent'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import CheckboxComponent from '@/components/CheckboxComponent/CheckboxComponent'
import SingleChkboxComponent from '@/components/SingleChkboxComponent/SingleChkboxComponent'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
import TableComponent from '@/components/TableComponent/TableComponent'
export default {
  name: 'Role',
  components: {
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    SingleChkboxComponent,
    ButtonComponent,
    TableComponent,
  },
  data(){
    return{
      searchType: {
        input: 'input',
        select: 'select',
        checkbox: 'checkbox',
        singleChkbox: 'singleChkbox'
      },
      btnEvents: [{
          iconName: 'el-icon-search',
          btnName: '查询'
        }, {
          iconName: 'el-icon-circle-plus-outline',
          btnName: '增加'
        }, {
          iconName: 'el-icon-edit',
          btnName: '修改'
        }, {
          iconName: 'el-icon-remove-outline',
          btnName: '删除'
        }, {
          iconName: 'el-icon-setting',
          btnName: '权限配置'
      }],
      searchCreteria: [{
          searchType: 'input',
          labelName: '角色名称:',
          compVal: ''
        }, {
          searchType: 'input',
          labelName: '角色代码:',
          compVal: ''
      }],
      tabCtntList: {
        tabHeader: {
          Name: '角色名称',
          Code: '角色代码',
          State: '是否启用',
          Comm: '备注',
        },
        TabCtnt:[{
          Name: '角色名称',
          Code: '角色代码',
          State: '是否启用',
          Comm: '备注'
        }]
      }
    }
  }
}
</script>
