<template>
  <div class="VerifyVehicle">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'VerifyVehicle',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_verifyVehicle_detail_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '通过禁行审核车辆',
            tabName: 'report_verifyVehicle_detail_table',
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
              searchType: 'treeCheckbox',
              labelName: '车辆类型:',
              compVal: '',
              treeOps: [{
                id: '1',
                label: '所有车辆',
                children: [{
                  id: '1-1',
                  label: '重点营运车辆',
                  children: [{
                    id: '1-1-1',
                    label: '两客一危'
                  }, {
                    id: '1-1-2',
                    label: '重货车辆'
                  }]
                }, {
                  id: '1-2',
                  label: '非重点营运车辆',
                  children: [{
                    id: '1-2-1',
                    label: '普通货运'
                  }, {
                    id: '1-2-2',
                    label: '农村客运'
                  }, {
                    id: '1-2-3',
                    label: '驾培车'
                  }, {
                    id: '1-2-4',
                    label: '出租车'
                  }, {
                    id: '1-2-5',
                    label: '公交车'
                  }, {
                    id: '1-2-6',
                    label: '租赁客车'
                  }, {
                    id: '1-2-7',
                    label: '校园车辆'
                  }, {
                    id: '1-2-8',
                    label: '其他车'
                  }]
                }]
              }],
              treeChkboxProps: {
                label: 'label',
                chidlren: 'children'
              }
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '审核类型',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '6',
                label: '2-5点运行',
              }, {
                value: '7',
                label: '疲劳驾驶',
              }],
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
              headerKey: 'UnitName',
              headerVal: '所属企业',
              subHeaders: []
            }, {
              headerKey: 'LogicUnitName',
              headerVal: '运管机构',
              subHeaders: []
            }, {
              headerKey: 'GnssCenterName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'VehicleType',
              headerVal: '车辆类型',
              subHeaders: []
            }, {
              headerKey: 'TypeName',
              headerVal: '审核类型',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '车辆籍贯地',
              subHeaders: []
            }, {
              headerKey: 'CityName',
              headerVal: '企业所属市(州)',
              subHeaders: []
            }, {
              headerKey: 'DatePeriod',
              headerVal: '申请时间段',
              subHeaders: []
            }, {
              headerKey: 'LoginCode',
              headerVal: '审核人',
              subHeaders: []
            }, {
              headerKey: 'VerifyTime',
              headerVal: '审核时间',
              subHeaders: []
            }],
            TabCtnt: [{
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              UnitName: '上海',
              LogicUnitName: '普陀区',
              GnssCenterName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              UnitName: '上海',
              LogicUnitName: '普陀区',
              GnssCenterName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              UnitName: '上海',
              LogicUnitName: '普陀区',
              GnssCenterName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              UnitName: '上海',
              LogicUnitName: '普陀区',
              GnssCenterName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              UnitName: '上海',
              LogicUnitName: '普陀区',
              GnssCenterName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              UnitName: '上海',
              LogicUnitName: '普陀区',
              GnssCenterName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }]
          }
        }
      }
    }
  }
</script>
