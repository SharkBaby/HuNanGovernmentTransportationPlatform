<template>
  <div class="DangerousGoodsLine">
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
import DatePickerComponent from "@/components/DatePickerComponent/DatePickerComponent";
export default {
  name: 'DangerousGoodsLine',
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
      searchCreteria: [
        {
          searchType: 'input',
          labelName: '车牌号:',
          compVal: '',
        },{
          searchType: 'input',
          labelName: '运单编号:',
          compVal: '',
        },{
          searchType: 'datePicker',
          compVal: '',
        }
      ],
      tabCtntList: {
        tabHeader: {
          Licenseplat: '车牌号',
          Platecolor: '车牌颜色',
          TranferNumber: '运单编号',
          GoodsDate: '装货日期',
          GoodsPlace: '装货地点',
          UnmountGoodsPlace: '卸货地点',
          EstimateArriveDate: '预计到达日期',
          MainProgressStop: '预计到达日期',
          Distance: '里程'
        },
        TabCtnt:[{
          Licenseplat: 'first-1',
          Platecolor: 'first-1',
          TranferNumber: 'first-1',
          GoodsDate: 'first-1',
          GoodsPlace: 'first-1',
          UnmountGoodsPlace: 'first-1',
          EstimateArriveDate: 'first-1',
          MainProgressStop: 'first-1',
          Distance: 'first-1'
        }],
      }
    }
  }
}
</script>
