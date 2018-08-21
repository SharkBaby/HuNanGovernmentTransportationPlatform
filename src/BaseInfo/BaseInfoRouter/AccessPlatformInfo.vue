<template>
  <div class="AccessPlatformInfo">
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
  name: 'AccessPlatformInfo',
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
        },{
          iconName: 'el-icon-circle-plus-outline',
          btnName: '增加'
        },{
          iconName: 'el-icon-edit',
          btnName: '修改'
        },{
          iconName: 'el-icon-remove-outline',
          btnName: '删除'
        },{
          iconName: 'el-icon-download',
          btnName: '导出数据'
        },{
          iconName: 'el-icon-setting',
          btnName: '参数配置'
      }],
      searchCreteria: [{
          searchType: 'input',
          labelName: '平台名称:',
          compVal: ''
        },{
          searchType: 'input',
          labelName: '服务商:',
          compVal: ''
        },{
          searchType: 'select',
          labelName: '服务车辆类型',
          compVal: '',
          options: [{
              value: '-1',
              label: '全选',
            }, {
              value: '0',
              label: '两客一危、重型货车及半挂牵引车',
            }, {
              value: '1',
              label: '重型货车及半挂牵引车',
          }],
        },{
          searchType: 'select',
          labelName: '平台备案情况',
          compVal: '',
          options: [{
              value: '-1',
              label: '全部',
            }, {
              value: '1',
              label: '已备案',
            }, {
              value: '0',
              label: '未备案',
          }],
      }],
      tabCtntList: {
        tabHeader: {
          PlatformName: '平台名称',
          ServeVehicleTypeName: '服务商车辆类型',
          ZoneCount: '服务市州（个）',
          Zone: '服务市州',
          ProviderName: '对应服务商',
          Developer: '平台开发商',
          Nature: '接入平台性质',
          FunctionDes: '接入平台支持功能',
          RegisteredName: '平台备案情况',
        },
        TabCtnt:[{
          PlatformName: 'first-1',
          ServeVehicleTypeName: 'first-1',
          ZoneCount: 'first-1',
          Zone: 'first-1',
          ProviderName: 'first-1',
          Developer: 'first-1',
          Nature: 'first-1',
          FunctionDes: 'first-1',
          RegisteredName: 'first-1'
        }]
      }
    }
  }
}
</script>
