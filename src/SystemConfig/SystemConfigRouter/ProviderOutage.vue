<template>
  <div class="ProviderOutage">
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
<style src="./systemConfigRouter.css" type="text/css"></style>
<script>
import InputComponent from '@/components/InputComponent/InputComponent'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import CheckboxComponent from '@/components/CheckboxComponent/CheckboxComponent'
import SingleChkboxComponent from '@/components/SingleChkboxComponent/SingleChkboxComponent'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
import TableComponent from '@/components/TableComponent/TableComponent'
export default {
  name: 'ProviderOutage',
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
          iconName: 'el-icon-close',
          btnName: '结束停业务'
      }],
      searchCreteria: [{
        searchType: 'input',
        labelName: '接入平台：',
        compVal: '',
        },{
          searchType: 'input',
          labelName: '服务商：',
          compVal: '',
      }],
      tabCtntList: {
        tabHeader: {
          GnssCenterID: '接入码',
          PlatformName: '接入平台名称',
          ProviderName: '对应服务商',
          ServeVehicleTypeName: '平台服务车辆类型',
          RegisteredName: '平台备案情况',
          BDate: '停业务开始日期',
          EDate: '停业务结束日期'
        },
        TabCtnt:[{
          GnssCenterID: '接入码',
          PlatformName: '接入平台名称',
          ProviderName: '对应服务商',
          ServeVehicleTypeName: '平台服务车辆类型',
          RegisteredName: '平台备案情况',
          BDate: '停业务开始日期',
          EDate: '停业务结束日期'
        }],
      }
    }
  }
}
</script>
