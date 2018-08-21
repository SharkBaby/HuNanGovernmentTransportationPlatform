<template>
  <div class="PlatformCheckPostStatistics">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'PlatformCheckPostStatistics',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'PlatformTotal_tables_total_div',
        tabCtntList: {
          firCtnt: {
            tabLabel: '接入平台汇总',
            tabName: 'PlatformTotal_tables_total_div',
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
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }],
            tabHeader: [{
              headerKey: 'PlatformName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'CheckCount',
              headerVal: '查岗次数',
              subHeaders: []
            }, {
              headerKey: 'AnswerCount',
              headerVal: '响应次数',
              subHeaders: []
            }, {
              headerKey: 'AnswerRate',
              headerVal: '查岗响应率',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              CheckCount: '王小虎',
              AnswerCount: '上海'
            }, {
              PlatformName: '2016-05-03',
              CheckCount: '王小虎',
              AnswerCount: '上海'
            }]
          },
          secCtnt: {
            tabLabel: '查岗明细',
            tabName: 'PlatformCheckPostDetail_tables_total_div',
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
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }],
            tabHeader: [{
              headerKey: 'PlatformName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'CheckDate',
              headerVal: '查岗时间',
              subHeaders: []
            }, {
              headerKey: 'Question',
              headerVal: '查岗问题',
              subHeaders: []
            }, {
              headerKey: 'CheckUserName',
              headerVal: '查岗人',
              subHeaders: []
            }, {
              headerKey: 'ConfirmDate',
              headerVal: '应答时间',
              subHeaders: []
            }, {
              headerKey: 'Answer',
              headerVal: '应答答案',
              subHeaders: []
            }, {
              headerKey: 'IsOnGuard',
              headerVal: '是否在岗',
              subHeaders: []
            }, {
              headerKey: 'CheckMode',
              headerVal: '查岗方式',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              CheckDate: '王小虎',
              Question: '上海'
            }, {
              PlatformName: '2016-05-03',
              CheckDate: '王小虎',
              Question: '上海'
            }]
          }
        }
      }
    }
  }
</script>
