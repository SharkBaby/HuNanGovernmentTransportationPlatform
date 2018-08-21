<template>
  <div class="PlatformInspecteLog">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'PlatformInspecteLog',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'PlatformInspecteLog_tables_total_div',
        tabCtntList: {
          firCtnt: {
            tabLabel: '接入平台巡检日志',
            tabName: 'PlatformInspecteLog_tables_total_div',
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
              searchType: 'select',
              labelName: '平台类型',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '2',
                label: '两客一危平台',
              }, {
                value: '3',
                label: '货运平台',
              }, {
                value: '1',
                label: '其他平台',
              }],
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }],
            tabHeader: [{
              headerKey: 'PlatformName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'PlatformType',
              headerVal: '平台类型',
              subHeaders: []
            }, {
              headerKey: 'AbVehicleCNT',
              headerVal: '巡检时间',
              subHeaders: []
            }, {
              headerKey: 'AbVehicleRate',
              headerVal: '状态',
              subHeaders: []
            }, {
              headerKey: 'Remark',
              headerVal: '备注',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              PlatformType: '王小虎',
              AbVehicleCNT: '上海'
            }, {
              PlatformName: '2016-05-03',
              PlatformType: '王小虎',
              AbVehicleCNT: '上海'
            }]
          }
        }
      }
    }
  }
</script>
