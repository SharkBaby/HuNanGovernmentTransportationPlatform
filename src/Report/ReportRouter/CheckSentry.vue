<template>
  <div class="CurrentOnline">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
    <p class="check-footer-p">
      注 : 此处入网车辆数统计截止到昨天
    </p>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'CurrentOnline',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_checksentry_zone_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '运管机构汇总',
            tabName: 'report_checksentry_zone_table',
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
              labelName: '地区:',
              compVal: '湖南省'
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
            }],
            tabHeader: [{
              headerKey: 'ZName',
              headerVal: '地区',
              subHeaders: []
            }, {
              labelName: '被查岗次数',
              subHeaders: {
                CheckTotal: '合计',
                ProviceCheckTotal: '省局',
                CityCheckTotal: '地市'
              }
            }, {
              labelName: '响应次数',
              subHeaders: {
                ResponseTotal: '合计',
                ProviceResponseTotal: '省局',
                CityResponseTotal: '地市'
              }
            }, {
              headerKey: 'CheckRate',
              headerVal: '查岗响应率',
              subHeaders: []
            }],
            TabCtnt: [{
              ZName: '2016-05-03',
              CheckTotal: '王小虎',
              ProviceCheckTotal: '上海',
              CityCheckTotal: '普陀区',
              ResponseTotal: '上海市普陀区金沙江路 1518 弄'
            }, {
              ZName: '2016-05-03',
              CheckTotal: '王小虎',
              ProviceCheckTotal: '上海',
              CityCheckTotal: '普陀区',
              ResponseTotal: '上海市普陀区金沙江路 1518 弄'
            }]
          },
          secCtnt: {
            tabLabel: '运管机构明细',
            tabName: 'report_checksentry_zonedetail_table',
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
              labelName: '地区:',
              compVal: '湖南省'
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
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
              headerKey: 'ZoneName',
              headerVal: '地区',
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
              headerKey: 'ConfirmUserName',
              headerVal: '应答人',
              subHeaders: []
            }, {
              headerKey: 'CheckMode',
              headerVal: '查岗方式',
              subHeaders: []
            }],
            TabCtnt: [{
              ZoneName: '2016-05-03',
              IsOnGuard: '王小虎',
              CheckDate: '上海',
              Question: '普陀区',
              CheckUserName: '上海市普陀区金沙江路 1518 弄'
            }, {
              ZoneName: '2016-05-03',
              IsOnGuard: '王小虎',
              CheckDate: '上海',
              Question: '普陀区',
              CheckUserName: '上海市普陀区金沙江路 1518 弄'
            }]
          }
        }
      }
    }
  }
</script>
