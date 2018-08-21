<template>
  <div class="CompanyCheckSentry">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'CompanyCheckSentry',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_companychecksentry_total_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '企业汇总',
            tabName: 'report_companychecksentry_total_table',
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
              labelName: '运输企业:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '所属地区:',
              compVal: '湖南省'
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '企业类别',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '1',
                label: '客运企业',
              }, {
                value: '2',
                label: '危险品企业',
              }],
            }],
            tabHeader: [{
              headerKey: 'CompanyName',
              headerVal: '运输企业',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '企业所属地区',
              subHeaders: []
            }, {
              headerKey: 'AnswerCount',
              headerVal: '响应次数',
              subHeaders: []
            }, {
              labelName: '被查岗次数',
              subHeaders: {
                CheckCount: '合计',
                ProviceCheckCount: '省局',
                CityCheckCount: '地市',
                CountyCheckCount: '区县'
              }
            }, {
              labelName: '响应次数',
              subHeaders: {
                ResponseCount: '合计',
                ProviceResponseCount: '省局',
                CityResponseCount: '地市',
                CountyResponseCount: '区县'
              }
            }, {
              headerKey: 'ResponseRate',
              headerVal: '查岗响应率',
              subHeaders: []
            }],
            TabCtnt: [{
              CompanyName: '2016-05-03',
              ZoneName: '王小虎',
              CheckCount: '上海'
            }, {
              CompanyName: '2016-05-03',
              ZoneName: '王小虎',
              CheckCount: '上海'
            }]
          },
          secCtnt: {
            tabLabel: '企业明细',
            tabName: 'report_companychecksentry_detail_table',
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
              labelName: '运输企业:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '企业所属地区:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '查岗人:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '查岗机构:',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '查岗方式:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '1',
                label: '自动',
              }, {
                value: '2',
                label: '手动',
              }],
            }, {
              searchType: 'select',
              labelName: '是否在岗:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '1',
                label: '是',
              }, {
                value: '2',
                label: '否',
              }],
            }],
            tabHeader: [{
              headerKey: 'CompanyName',
              headerVal: '运输企业',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '企业所属地区',
              subHeaders: []
            }, {
              headerKey: 'IsOnGuard',
              headerVal: '是否在岗',
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
              headerKey: 'CheckUnitName',
              headerVal: '查岗机构',
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
              headerKey: 'CheckMode',
              headerVal: '查岗方式',
              subHeaders: []
            }],
            TabCtnt: [{
              CompanyName: '2016-05-03',
              ZoneName: '王小虎',
              IsOnGuard: '上海'
            }, {
              CompanyName: '2016-05-03',
              ZoneName: '王小虎',
              IsOnGuard: '上海'
            }]
          }
        }
      }
    }
  }
</script>
