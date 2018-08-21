<template>
  <div class="ErorrData">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'ErorrData',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'errorData_tables_total_div',
        tabCtntList: {
          firCtnt: {
            tabLabel: '异常数据',
            tabName: 'errorData_tables_total_div',
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
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              labelName: '',
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
            }],
            tabHeader: [{
              headerKey: 'PlatName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'InstalledCount',
              headerVal: '入网车辆数',
              subHeaders: []
            }, {
              labelName: '超速（次）',
              subHeaders: {
                LonLatCount: '经纬度异常',
                SpeedCount: '速度异常',
                SpeedLimitCount: '限速异常',
                DateCount: '时间异常',
                OverspeedRateCount: '超速率异常'
              }
            }, {
              labelName: '夜间异动（次）',
              subHeaders: [{
                slabelName: '客车2-5点运行',
                subHeaders: {
                  LonLatCount25_1: '经纬度异常',
                  ContinueTimeCount25_1: '持续时间异常',
                  AlarmTimeCount25_1: '报警时间异常'
                }
              }, {
                slabelName: '山区公路22-6点运行',
                subHeaders: {
                  LonLatCount25_2: '经纬度异常',
                  ContinueTimeCount25_2: '持续时间异常',
                  AlarmTimeCount25_2: '报警时间异常'
                }
              }]
            }, {
              labelName: '疲劳驾驶（次）',
              subHeaders: {
                LonLatCount25_3: '经纬度异常',
                ContinueTimeCount25_3: '时间异常',
              }
            }, {
              headerKey: 'Total',
              headerVal: '合计',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatName: '2016-05-03',
              InstalledCount: '王小虎',
              LonLatCount: '上海',
              SpeedCount: '普陀区',
              SpeedLimitCount: '上海市普陀区金沙江路 1518 弄',
              DateCount: 200333
            }, {
              PlatName: '2016-05-03',
              InstalledCount: '王小虎',
              LonLatCount: '上海',
              SpeedCount: '普陀区',
              SpeedLimitCount: '上海市普陀区金沙江路 1518 弄',
              DateCount: 200333
            }]
          },
          secCtnt: {
            tabLabel: '超速异常明细',
            tabName: 'errorData_tables_overSpeed_div',
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
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '运输企业:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '车牌号:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
            }, {
              searchType: 'select',
              labelName: '异常数据类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '-2',
                label: '经纬度异常',
              }, {
                value: '-3',
                label: '速度异常',
              }, {
                value: '-4',
                label: '限速异常',
              }, {
                value: '-5',
                label: '时间异常',
              }, {
                value: '-6',
                label: '超速率异常',
              }],
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
            }],
            tabHeader: [{
              headerKey: 'RecDateTime',
              headerVal: '系统接收时间',
              subHeaders: []
            }, {
              headerKey: 'DealResult',
              headerVal: '异常数据类型',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'CityName',
              headerVal: '企业所属市(州)',
              subHeaders: []
            }, {
              headerKey: 'LicensePlat',
              headerVal: '车牌号',
              subHeaders: []
            }, {
              headerKey: 'VehicleType',
              headerVal: '车辆类型',
              subHeaders: []
            }, {
              headerKey: 'UnitName',
              headerVal: '所属道路运输企业',
              subHeaders: []
            }, {
              headerKey: 'BDate',
              headerVal: '开始时间',
              subHeaders: []
            }, {
              headerKey: 'EDate',
              headerVal: '结束时间',
              subHeaders: []
            }, {
              headerKey: 'ContinueTime',
              headerVal: '持续时长',
              subHeaders: []
            }, {
              headerKey: 'SpeedLimit',
              headerVal: '限速(km/h)',
              subHeaders: []
            }, {
              headerKey: 'Speed',
              headerVal: '速度（km/h)',
              subHeaders: []
            }, {
              headerKey: 'OverspeedRate',
              headerVal: '超速率（%）',
              subHeaders: []
            }, {
              headerKey: 'BLocation',
              headerVal: '开始位置',
              subHeaders: []
            }, {
              headerKey: 'ELocation',
              headerVal: '结束位置',
              subHeaders: []
            }, {
              headerKey: 'OverspeedType',
              headerVal: '超速类型',
              subHeaders: []
            }, {
              headerKey: 'PlatformName',
              headerVal: '入网服务商',
              subHeaders: []
            }],
            TabCtnt: [{
              RecDateTime: '2016-05-03',
              DealResult: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              LicensePlat: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              RecDateTime: '2016-05-03',
              DealResult: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              LicensePlat: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }]
          },
          trdCtnt: {
            tabLabel: '夜间异动明细',
            tabName: 'errorData_tables_abnormal_div',
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
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '运输企业:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '车牌号:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
            }, {
              searchType: 'select',
              labelName: '夜间异动类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '1',
                label: '2-5点异动',
              }, {
                value: '2',
                label: '22-6点异动',
              }],
            }, {
              searchType: 'select',
              labelName: '异常数据类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '-2',
                label: '经纬度异常',
              }, {
                value: '-3',
                label: '持续时间异常',
              }, {
                value: '-4',
                label: '报警时间异常',
              }],
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
            }],
            tabHeader: [{
              headerKey: 'RecDateTime',
              headerVal: '系统接收时间',
              subHeaders: []
            }, {
              headerKey: 'Type',
              headerVal: '夜间异动类型',
              subHeaders: []
            }, {
              headerKey: 'DealResult',
              headerVal: '异常数据类型',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'CityName',
              headerVal: '企业所属市(州)',
              subHeaders: []
            }, {
              headerKey: 'LicensePlat',
              headerVal: '车牌号',
              subHeaders: []
            }, {
              headerKey: 'VehicleType',
              headerVal: '车辆类型',
              subHeaders: []
            }, {
              headerKey: 'UnitName',
              headerVal: '所属道路运输企业',
              subHeaders: []
            }, {
              headerKey: 'BDate',
              headerVal: '开始时间',
              subHeaders: []
            }, {
              headerKey: 'EDate',
              headerVal: '结束时间',
              subHeaders: []
            }, {
              headerKey: 'ContinueTime',
              headerVal: '持续时长',
              subHeaders: []
            }, {
              headerKey: 'BLocation',
              headerVal: '开始位置',
              subHeaders: []
            }, {
              headerKey: 'ELocation',
              headerVal: '结束位置',
              subHeaders: []
            }, {
              headerKey: 'PlatformName',
              headerVal: '入网服务商',
              subHeaders: []
            }],
            TabCtnt: [{
              RecDateTime: '2016-05-03',
              DealResult: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              LicensePlat: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              RecDateTime: '2016-05-03',
              DealResult: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              LicensePlat: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }]
          },
          frthCtnt: {
            tabLabel: '疲劳驾驶明细',
            tabName: 'errorData_tables_fatigue_div',
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
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '运输企业:',
              compVal: ''
            }, {
              searchType: 'input',
              labelName: '车牌号:',
              compVal: ''
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
            }, {
              searchType: 'select',
              labelName: '夜间异动类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '1',
                label: '2-5点异动',
              }, {
                value: '2',
                label: '22-6点异动',
              }],
            }, {
              searchType: 'select',
              labelName: '异常数据类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '-2',
                label: '经纬度异常',
              }, {
                value: '-3',
                label: '时间异常',
              }],
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
            }],
            tabHeader: [{
              headerKey: 'RecDateTime',
              headerVal: '系统接收时间',
              subHeaders: []
            }, {
              headerKey: 'DealResult',
              headerVal: '异常数据类型',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'CityName',
              headerVal: '企业所属市(州)',
              subHeaders: []
            }, {
              headerKey: 'LicensePlat',
              headerVal: '车牌号',
              subHeaders: []
            }, {
              headerKey: 'VehicleType',
              headerVal: '车辆类型',
              subHeaders: []
            }, {
              headerKey: 'UnitName',
              headerVal: '所属道路运输企业',
              subHeaders: []
            }, {
              headerKey: 'DriveBDate',
              headerVal: '驾驶开始时间',
              subHeaders: []
            }, {
              headerKey: 'BDate',
              headerVal: '违章开始时间',
              subHeaders: []
            }, {
              headerKey: 'EDate',
              headerVal: '违章结束时间',
              subHeaders: []
            }, {
              headerKey: 'ContinueTime',
              headerVal: '持续时长',
              subHeaders: []
            }, {
              headerKey: 'BLocation',
              headerVal: '开始位置',
              subHeaders: []
            }, {
              headerKey: 'ELocation',
              headerVal: '结束位置',
              subHeaders: []
            }, {
              headerKey: 'PlatformName',
              headerVal: '入网服务商',
              subHeaders: []
            }],
            TabCtnt: [{
              RecDateTime: '2016-05-03',
              DealResult: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              LicensePlat: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              RecDateTime: '2016-05-03',
              DealResult: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              LicensePlat: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }]
          }
        }
      }
    }
  }
</script>
