<template>
  <div class="InfoPublish">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'InfoPublish',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_infopublish_total_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '信息发布统计',
            tabName: 'report_infopublish_total_table',
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
              labelName: '标题:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '发布人:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '类型:',
              compVal: '',
              options: [{
                value: '-1',
                label: '全部',
              }, {
                value: '0',
                label: '一般',
              }, {
                value: '1',
                label: '紧急',
              }, {
                value: '2',
                label: '非常紧急',
              }],
            }, {
              searchType: 'select',
              labelName: '是否需要回复:',
              compVal: '',
              options: [{
                value: '-1',
                label: '全部',
              }, {
                value: '1',
                label: '是',
              }, {
                value: '0',
                label: '否',
              }],
            }],
            tabHeader: [{
              headerKey: 'Title',
              headerVal: '标题',
              subHeaders: []
            }, {
              headerKey: 'OrgName',
              headerVal: '发布机构',
              subHeaders: []
            }, {
              headerKey: 'LoginCode',
              headerVal: '发布人',
              subHeaders: []
            }, {
              headerKey: 'PublishDate',
              headerVal: '发布时间',
              subHeaders: []
            }, {
              headerKey: 'EndDate',
              headerVal: '截止日期',
              subHeaders: []
            }, {
              headerKey: 'FlagName',
              headerVal: '类型',
              subHeaders: []
            }, {
              headerKey: 'Object',
              headerVal: '发布对象',
              subHeaders: []
            }, {
              headerKey: 'IsReply',
              headerVal: '是否需要回复',
              subHeaders: []
            }],
            TabCtnt: [{
              Title: '2016-05-03',
              OrgName: '王小虎',
              LoginCode: '上海'
            }, {
              Title: '2016-05-03',
              OrgName: '王小虎',
              LoginCode: '上海'
            }]
          },
          secCtnt: {
            tabLabel: '信息发布明细',
            tabName: 'report_infopublish_detail_table',
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
              labelName: '标题:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '发布人:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '类型:',
              compVal: '',
              options: [{
                value: '-1',
                label: '全部',
              }, {
                value: '0',
                label: '一般',
              }, {
                value: '1',
                label: '紧急',
              }, {
                value: '2',
                label: '非常紧急',
              }],
            }, {
              searchType: 'select',
              labelName: '是否需要回复:',
              compVal: '',
              options: [{
                value: '-1',
                label: '全部',
              }, {
                value: '1',
                label: '是',
              }, {
                value: '0',
                label: '否',
              }],
            }, {
              searchType: 'input',
              labelName: '接收机构:',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '回复状态:',
              compVal: '',
              options: [{
                value: '-1',
                label: '全部',
              }, {
                value: '1',
                label: '已回复',
              }, {
                value: '0',
                label: '未回复',
              }, {
                value: '2',
                label: '不需回复',
              }],
            }],
            tabHeader: [{
              headerKey: 'Title',
              headerVal: '标题',
              subHeaders: []
            }, {
              headerKey: 'OrgName',
              headerVal: '发布机构',
              subHeaders: []
            }, {
              headerKey: 'LoginCode',
              headerVal: '发布人',
              subHeaders: []
            }, {
              headerKey: 'PublishDate',
              headerVal: '发布时间',
              subHeaders: []
            }, {
              headerKey: 'EndDate',
              headerVal: '截止日期',
              subHeaders: []
            }, {
              headerKey: 'FlagName',
              headerVal: '类型',
              subHeaders: []
            }, {
              headerKey: 'IsReply',
              headerVal: '是否需要回复',
              subHeaders: []
            }, {
              headerKey: 'RecvOrgName',
              headerVal: '接收机构',
              subHeaders: []
            }, {
              headerKey: 'IsReplyed',
              headerVal: '回复状态',
              subHeaders: []
            }, {
              headerKey: 'ReplyContent',
              headerVal: '回复内容',
              subHeaders: []
            }],
            TabCtnt: [{
              Title: '2016-05-03',
              OrgName: '王小虎',
              LoginCode: '上海'
            }, {
              Title: '2016-05-03',
              OrgName: '王小虎',
              LoginCode: '上海'
            }]
          }
        }
      }
    }
  }
</script>
