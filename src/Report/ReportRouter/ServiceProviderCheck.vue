<template>
  <div class="ServiceProviderCheck">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'ServiceProviderCheck',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_serviceprovidercheck_check_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '服务商考核统计',
            tabName: 'report_serviceprovidercheck_check_table',
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
              headerVal: '接入平台名称',
              subHeaders: []
            }, {
              headerKey: 'ProviderName',
              headerVal: '所属服务商名称',
              subHeaders: []
            }, {
              headerKey: 'Score',
              headerVal: '总分',
              subHeaders: []
            }, {
              labelName: '平台连通率',
              subHeaders: {
                ConnectedTimeAll: '应连通时长',
                ConnectedTime: '实际连通时长',
                ConnectedRate: '连通率（%）',
                ConnectedScore: '分数'
              }
            }, {
              labelName: '车辆上线率',
              subHeaders: {
                InnetCount: '入网车辆数',
                OnlineCount: '上线车辆数',
                OnlineRate: '连通率（%）',
                OnlineScore: '分数'
              }
            }, {
              labelName: '轨迹完整率',
              subHeaders: {
                OnlineCount1: '上线车辆总天次',
                VehicleCount_FULL: '轨迹完整车辆天次',
                FULLRate: '轨迹完整率（%）',
                FullScore: '分数'
              }
            }, {
              labelName: '数据合格率',
              subHeaders: {
                StaticValidRate: '静态数据合格率（%）',
                StaticValidScore: '分数（静）',
                DynamicValidRate: '动态数据合格率（%）',
                DynamicValidScore: '分数（动）'
              }
            }, {
              labelName: '卫星漂移率',
              subHeaders: {
                OnlineCount2: '上线车辆总天次',
                VehiclePYCNT: '卫星漂移车辆天次',
                VehiclePYRate: '卫星漂移率（%）',
                VehicleScore: '分数'
              }
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              ProviderName: '王小虎',
              Score: '上海'
            }, {
              PlatformName: '2016-05-03',
              ProviderName: '王小虎',
              Score: '上海'
            }]
          },
          secCtnt: {
            tabLabel: '数据合格率明细',
            tabName: 'report_serviceprovidercheck_datapass_table',
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
              headerVal: '接入平台名称',
              subHeaders: []
            }, {
              headerKey: 'ProviderName',
              headerVal: '所属服务商名称',
              subHeaders: []
            }, {
              labelName: '定位数据合格率',
              subHeaders: {
                ALLLOC: '总定位数',
                TimeAbnormal: '时间异常',
                PostionAbnormal: '位置异常',
                DirAbnormal: '方向异常',
                SpeedAbnormal: '速度异常',
                SpeedLimitAbnormal: '限速值异常',
                ValidRate: '定位数据合格率（%）'
              }
            }, {
              labelName: '报警（超速、异动）数据合格率',
              subHeaders: {
                ALARMCNT: '总报警数',
                AbnormalLoc: '位置异常',
                AbnormalSpeed: '速度异常',
                AbnormalSpeedLimit: '限速异常',
                AbnormalOverSpeedRate: '超速率异常',
                AbnormalNotMatch: '不匹配',
                INVALIDrATE: '报警数据合格率（%）'
              }
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              ProviderName: '王小虎',
              Score: '上海'
            }, {
              PlatformName: '2016-05-03',
              ProviderName: '王小虎',
              Score: '上海'
            }]
          }
        }
      }
    }
  }
</script>
