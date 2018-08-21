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
        activeName: 'report_savelogs_user_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '用户操作日志',
            tabName: 'report_savelogs_user_table',
            tabCount: 0,
            btnEvents: [{
              iconName: 'el-icon-search',
              btnName: '查询'
            }, {
              iconName: 'el-icon-download',
              btnName: '导出数据'
            }],
            searchCreteria: [{
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }],
            tabHeader: [{
              headerKey: 'UserName',
              headerVal: '用户名',
              subHeaders: []
            }, {
              headerKey: 'LoginIP',
              headerVal: '登录IP',
              subHeaders: []
            }, { 
              headerKey: 'TypeName',
              headerVal: '操作类型',
              subHeaders: []
            }, {
              headerKey: 'Operation',
              headerVal: '操作内容',
              subHeaders: []
            }, {
              headerKey: 'CreateDate',
              headerVal: '操作时间',
              subHeaders: []
            }, {
              headerKey: 'Remark',
              headerVal: '备注',
              subHeaders: []
            }],
            TabCtnt: [{
              UserName: '2016-05-03',
              LoginIP: 'TYPE1',
              TypeName: '王小虎',
              Operation: '上海'
            }, {
              UserName: '2016-05-03',
              LoginIP: 'TYPE1',
              TypeName: '王小虎',
              Operation: '上海'
            }]
          }
        }
      }
    }
  }
</script>
