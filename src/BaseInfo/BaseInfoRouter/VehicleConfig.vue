<template>
  <div class="VehicleConfig">
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
  name: 'VehicleConfig',
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
          iconName: 'el-icon-setting',
          btnName: '设置为停运'
        },{
          iconName: '',
          btnName: '动作类型'
      }],
      searchCreteria: [{
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
        },{
          searchType: 'select',
          labelName: '已入网GPS:',
          compVal: '',
          options: [{
            value: '-1',
            label: '全部',
          }, {
            value: '1',
            label: '已入网',
          }, {
            value: '0',
            label: '未入网',
          }],
        },{
          searchType: 'singleChkbox',
          labelName: '是否已删除',
          compVal: '',
        },{
        searchType: 'checkbox',
        labelName: '状态:',
        compVal: '',
        options: [{
          value: '0x2',
          label: '营运',
          checked: true
          }, {
            value: '0x1',
            label: '报废',
            checked: false
          }, {
            value: '0x4',
            label: '停运',
            checked: false
          }, {
            value: '0x8',
            label: '注销',
            checked: false
          }, {
            value: '0x10',
            label: '转出',
            checked: false
          }, {
            value: '0x20',
            label: '挂失',
            checked: false
          },{
            value: '0x40',
            label: '歇业',
            checked: false
          },{
            value: '0x100',
            label: '锁定',
            checked: false
          },{
            value: '0x80',
            label: '删除',
            checked: false
          }],
        },{
        searchType: 'select',
        labelName: '动作类型:',
        compVal: '',
        options: [{
            value: '0x1',
            label: '每1分钟计算在线率',
          }, {
            value: '0x2',
            label: '区域偏离',
          }, {
            value: '',
            label: '全选',
        }],
      }],
      tabCtntList: {
        tabHeader: {
          Licenseplat: '车牌号',
          Platecolor: '车牌颜色',
          UnitName: '所属企业',
          LogicUnitName: '运管机构',
          ZoneName: '车辆籍贯地',
          GnssCenterName: '接入平台',
          VehicleType: '车辆类型',
          GOVStatusName: '状态'
        },
        TabCtnt:[{
          Licenseplat: '车牌号',
          Platecolor: '车牌颜色',
          UnitName: '所属企业',
          LogicUnitName: '运管机构',
          ZoneName: '车辆籍贯地',
          GnssCenterName: '接入平台',
          VehicleType: '车辆类型',
          GOVStatusName: '状态'
        }],
      }
    }
  }
}
</script>
