<template>
  <div class="PlatformRunLog">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'PlatformRunLog',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_platformonline_month_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '在线情况月统计',
            tabName: 'report_platformonline_month_table',
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
              headerKey: 'Name',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'total',
              headerVal: '合计',
              subHeaders: []
            }, {
              headerKey: 'First',
              headerVal: '1号',
              subHeaders: []
            }, {
              headerKey: 'Second',
              headerVal: '2号',
              subHeaders: []
            }, {
              headerKey: 'Third',
              headerVal: '3号',
              subHeaders: []
            }, {
              headerKey: 'Forth',
              headerVal: '4号',
              subHeaders: []
            }, {
              headerKey: 'Fifth',
              headerVal: '5号',
              subHeaders: []
            }, {
              headerKey: 'Sixth',
              headerVal: '6号',
              subHeaders: []
            }, {
              headerKey: 'Seventh',
              headerVal: '7号',
              subHeaders: []
            }, {
              headerKey: 'Eighth',
              headerVal: '8号',
              subHeaders: []
            }, {
              headerKey: 'Nineth',
              headerVal: '9号',
              subHeaders: []
            }, {
              headerKey: 'Tenth',
              headerVal: '10号',
              subHeaders: []
            }, {
              headerKey: 'Eleventh',
              headerVal: '11号',
              subHeaders: []
            }, {
              headerKey: 'Twelfth',
              headerVal: '12号',
              subHeaders: []
            }, {
              headerKey: 'Thirteenth',
              headerVal: '13号',
              subHeaders: []
            }, {
              headerKey: 'Fourteenth',
              headerVal: '14号',
              subHeaders: []
            }, {
              headerKey: 'Fifteenth',
              headerVal: '15号',
              subHeaders: []
            }, {
              headerKey: 'Sixteenth',
              headerVal: '16号',
              subHeaders: []
            }, {
              headerKey: 'Seventeenth',
              headerVal: '17号',
              subHeaders: []
            }, {
              headerKey: 'Eighteenth',
              headerVal: '18号',
              subHeaders: []
            }, {
              headerKey: 'Nineteenth',
              headerVal: '19号',
              subHeaders: []
            }, {
              headerKey: 'Twentith',
              headerVal: '20号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-First',
              headerVal: '21号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Second',
              headerVal: '22号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Third',
              headerVal: '23号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Fourth',
              headerVal: '24号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Fifth',
              headerVal: '25号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Sixth',
              headerVal: '26号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Seventh',
              headerVal: '27号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Eighth',
              headerVal: '28号',
              subHeaders: []
            }, {
              headerKey: 'Twenty-Nineth',
              headerVal: '29号',
              subHeaders: []
            }, {
              headerKey: 'Thirty',
              headerVal: '30号',
              subHeaders: []
            }, {
              headerKey: 'Thirty-First',
              headerVal: '31号',
              subHeaders: []
            }],
            TabCtnt: [{
              Name: '2016-05-03',
              total: '王小虎',
              First: '上海'
            }, {
              Name: '2016-05-03',
              total: '王小虎',
              First: '上海'
            }]
          },
          secCtnt: {
            tabLabel: '接入平台运行日志',
            tabName: 'platformRunLog_tables_total_div',
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
              headerKey: 'OnTime',
              headerVal: '平台接入时间',
              subHeaders: []
            }, {
              headerKey: 'OfflineCount',
              headerVal: '平台断开次数',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              PlatformType: '王小虎',
              OnTime: '上海'
            }, {
              PlatformName: '2016-05-03',
              PlatformType: '王小虎',
              OnTime: '上海'
            }]
          },
          trdCtnt: {
            tabLabel: '日志详情',
            tabName: 'platformLog_tables_total_div',
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
              headerKey: 'OfflineStartTime',
              headerVal: '平台断开时间',
              subHeaders: []
            }, {
              headerKey: 'OfflineEndTime',
              headerVal: '平台恢复时间',
              subHeaders: []
            }, {
              headerKey: 'OfflineTime',
              headerVal: '平台断线时长',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              PlatformType: '王小虎',
              OnTime: '上海'
            }, {
              PlatformName: '2016-05-03',
              PlatformType: '王小虎',
              OnTime: '上海'
            }]
          }
        }
      }
    }
  }
</script>
