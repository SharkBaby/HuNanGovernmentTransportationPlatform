<template>
  <div class="FatigueVehicleVerify">
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
  name: 'FatigueVehicleVerify',
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
      btnEvents: [
        {
          iconName: 'el-icon-search',
          btnName: '查询'
        },{
          iconName: 'el-icon-edit-outline',
          btnName: '审核'
        }
      ],
      searchCreteria: [
        {
          searchType: 'input',
          labelName: '车牌号:',
          compVal: '',
        },{
          searchType: 'input',
          labelName: '所属地区:',
          compVal: '湖南省',
        },{
          searchType: 'input',
          labelName: '所属单位:',
          compVal: '',
        },{
          searchType: 'input',
          labelName: '接入平台:',
          compVal: '',
        },{
          searchType: 'checkbox',
          labelName: '车辆类型:',
          compVal: '',
          options: [
            {
              value: '0x0001',
              label: '三类以上班线客车',
              checked: false
            }, {
              value: '0x1000',
              label: '高速客车',
              checked: false
            }, {
              value: '0x0002',
              label: '超长客车',
              checked: true
            }, {
              value: '0x0004',
              label: '旅游客车',
              checked: false
            }, {
              value: '0x100000',
              label: '包车客车',
              checked: false
            }, {
              value: '0x0010',
              label: '重型货物运输车',
              checked: false
            },{
              value: '0x0020',
              label: '半挂牵引车',
              checked: false
            },{
              value: '0x8000',
              label: '普通货车',
              checked: false
            },{
              value: '0x2000',
              label: '农村客运',
              checked: false
            },{
              value: '0x10000',
              label: '驾培车',
              checked: false
            },{
              value: '0x4000',
              label: '出租车',
              checked: false
            },{
              value: '0x20000',
              label: '公交车',
              checked: false
            },{
              value: '0X200000',
              label: '租赁客车',
              checked: false
            },{
              value: '0x40000',
              label: '校园车辆',
              checked: false
            },{
              value: '0x80000',
              label: '其他车',
              checked: false
            }
          ]
        },
      ],
      tabCtntList: {
        tabHeader: {
          Licenseplat: '车牌号',
          Platecolor: '车牌颜色',
          UnitName: '所属企业',
          LogicUnitName: '运管机构',
          GnssCenterName: '接入平台',
          VehicleType: '车辆类型',
          ZoneName: '车辆籍贯地',
          CityName: '企业所属市(州)',
          DatePeriod: '申请时间段'
        },
        TabCtnt:[{
          Licenseplat: 'first-1',
          Platecolor: 'first-1',
          UnitName: 'first-1',
          LogicUnitName: 'first-1',
          GnssCenterName: 'first-1',
          VehicleType: 'first-1',
          ZoneName: 'first-1',
          CityName: 'first-1',
          DatePeriod: 'first-1'
        }],
      }
    }
  }
}
</script>
