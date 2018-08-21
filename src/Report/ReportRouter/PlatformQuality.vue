<template>
  <div class="PlatformQuality">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'PlatformQuality',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'platformQuality_tables_total_div',
        tabCtntList: {
          firCtnt: {
            tabLabel: '数据质量统计',
            tabName: 'platformQuality_tables_total_div',
            tabCount: 0,
            btnEvents: [{
              iconName: 'el-icon-search',
              btnName: '查询'
            }, {
              iconName: 'el-icon-download',
              btnName: '导出数据'
            }],
            searchCreteria: [{
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'datePicker',
              labelName: '',
              compVal: ''
            }],
            tabHeader: [{
              headerKey: 'PlatformName',
              headerVal: 'Control',
              subHeaders: []
            }, {
              headerKey: 'VehicleCNT',
              headerVal: '入网车辆总数',
              subHeaders: []
            }, {
              headerKey: 'AbVehicleCNT',
              headerVal: '异常车辆总数',
              subHeaders: []
            }, {
              headerKey: 'AbVehicleRate',
              headerVal: '异常车辆比例',
              subHeaders: []
            }, {
              headerKey: 'PostionCNT',
              headerVal: '总定位条数',
              subHeaders: []
            }, {
              headerKey: 'AbPostionCNT',
              headerVal: '异常定位条数',
              subHeaders: []
            }, {
              headerKey: 'AbPositionRate',
              headerVal: '异常定位比例',
              subHeaders: []
            }, {
              labelName: '车载终端标记',
              subHeaders: {
                InvalidPosition: '无效定位'
              }
            }, {
              labelName: '政府平台分析',
              subHeaders: {
                LimitSpeedAb: '限速值超范围',
                SpeedAb: '速度值超范围',
                PositionOutRange: '经纬度超范围',
                TimeOutRange: '时间值超范围',
                PositionAb: '位置异常',
                DriftingCNT: '漂移定位',
                LimitSpeedChangeAb: '限速值连续变化',
                TimeAb: '重复数据'
              }
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              VehicleCNT: '王小虎',
              AbVehicleCNT: '上海'
            }, {
              PlatformName: '2016-05-03',
              VehicleCNT: '王小虎',
              AbVehicleCNT: '上海'
            }]
          }
        }
      }
    }
  }
</script>
