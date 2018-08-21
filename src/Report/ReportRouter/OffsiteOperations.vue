<template>
  <div class="OffsiteOperations">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'OffsiteOperations',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_offsiteOperations_total_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '异地经营明细',
            tabName: 'report_offsiteOperations_total_table',
            tabCount: 1,
            btnEvents: [{
              iconName: 'el-icon-search',
              btnName: '查询'
            }, {
              iconName: 'el-icon-download',
              btnName: '导出数据'
            }],
            searchCreteria: [{
              searchType: 'input',
              labelName: '车牌号:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '所属地区:',
              compVal: '湖南省'
            }, {
              searchType: 'input',
              labelName: '运输企业:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }],
            tabHeader: [{
              headerKey: 'LicensePlat',
              headerVal: '车牌号',
              subHeaders: []
            }, {
              headerKey: 'PlateColor',
              headerVal: '车牌颜色',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '企业所属地区',
              subHeaders: []
            }, {
              headerKey: 'CityName',
              headerVal: '企业所属市（州）',
              subHeaders: []
            }, {
              headerKey: 'UnitName',
              headerVal: '企业名称',
              subHeaders: []
            }, {
              headerKey: 'VehicleType',
              headerVal: '车辆类型',
              subHeaders: []
            }, {
              headerKey: 'PlatformName',
              headerVal: '接入平台',
              subHeaders: []
            }],
            TabCtnt: [{
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              CompanyZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              CompanyZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              CompanyZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              CompanyZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              CompanyZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              CompanyZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }]
          }
        }
      }
    }
  }
</script>
