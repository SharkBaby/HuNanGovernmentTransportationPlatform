<template>
  <div class="DangerousGoods">
    <!-- Search Creteria -->
    <input-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-if="searchItem.searchType === searchType.input" v-for="(searchItem, searchKey) of searchCreteria" :key="searchKey"></input-component>
    <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.select"></select-component>
    <checkbox-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.checkbox"></checkbox-component>
    <single-chkbox-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.singleChkbox"></single-chkbox-component>
    <date-picker-component :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.datePicker"></date-picker-component>
    <!-- Button Event -->
    <el-row>
      <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of btnEvents" :key="btnKey"></button-component>
    </el-row>
    <!-- Table List -->
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
import DatePickerComponent from "@/components/DatePickerComponent/DatePickerComponent"
export default {
  name: 'DangerousGoods',
  components: {
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    SingleChkboxComponent,
    ButtonComponent,
    TableComponent,
    DatePickerComponent
  },
  data(){
    return{
      searchType: {
        input: 'input',
        select: 'select',
        checkbox: 'checkbox',
        singleChkbox: 'singleChkbox',
        datePicker: 'datePicker'
      },
      btnEvents: [{
          iconName: 'el-icon-search',
          btnName: '查询'
        },{
          iconName: 'el-icon-download',
          btnName: '导出数据'
      }],
      searchCreteria: [{
          searchType: 'input',
          labelName: '运单编号:',
          compVal: '',
        },{
          searchType: 'input',
          labelName: '货物名称:',
          compVal: '',
        }
      ],
      tabCtntList: {
        tabHeader: {
          WaybillNumber: '运单编号',
          GoodsUnionNumber: '货物联合国编号',
          GoodsName: '货物名称',
          GoodsCategory: '货物类别',
          GoodsPackage: '货物包装',
          GoodsRules: '货物规格',
          TransferPrice: '运价',
          Amount: '数量'
        },
        TabCtnt:[{
          WaybillNumber: 'first-1',
          GoodsUnionNumber: 'first-1',
          GoodsName: 'first-1',
          GoodsCategory: 'first-1',
          GoodsPackage: 'first-1',
          GoodsRules: 'first-1',
          TransferPrice: 'first-1',
          Amount: 'first-1'
        }],
      }
    }
  }
}
</script>
