<template>
  <div class="AccessPlatform">
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
  name: 'AccessPlatform',
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
          iconName: 'el-icon-edit',
          btnName: '修改'
        }, {
          iconName: 'el-icon-remove-outline',
          btnName: '删除'
        }, {
          iconName: 'el-icon-download',
          btnName: '导出数据'
      }],
      searchCreteria: [{
          searchType: 'input',
          labelName: '平台名称:',
          compVal: ''
        },{
          searchType: 'select',
          labelName: '平台类型',
          compVal: '',
          options: [{
              value: '0',
              label: '全部',
            }, {
              value: '2',
              label: '两客一危',
            }, {
              value: '3',
              label: '货运平台',
          }],
      }],
      tabCtntList: {
        tabHeader: {
          GnssCenterID: '接入码',
          Name: '平台名称',
          Type: '平台类型',
          LoginCode: '用户名',
          LoginPass: '接入口令',
          ProtocolVer: '协议版本',
          GovAddress: '政府平台IP',
          M1: 'M1',
          IA1: 'IA1',
          IC1: 'IC1'
        },
        TabCtnt:[{
          GnssCenterID: '接入码',
          Name: '平台名称',
          Type: '平台类型',
          LoginCode: '用户名',
          LoginPass: '接入口令',
          ProtocolVer: '协议版本',
          GovAddress: '政府平台IP',
          M1: 'M1',
          IA1: 'IA1',
          IC1: 'IC1'
        }]
      }
    }
  }
}
</script>
