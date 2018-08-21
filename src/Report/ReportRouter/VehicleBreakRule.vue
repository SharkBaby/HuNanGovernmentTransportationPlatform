<template>
  <div class="VehicleBreakRule">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
  
</style>

<script>
  import MultiLevelTableComponent from '@/components/MultiLevelTableComponent/MultiLevelTableComponent'
  export default {
    name: 'VehicleBreakRule',
    components: {
      MultiLevelTableComponent,
    },
    data() {
      return {
        activeName: 'report_vehiclebreakrule_zone_table',
        tabCtntList: {
          firCtnt: {
            tabLabel: '地区汇总',
            tabName: 'report_vehiclebreakrule_zone_table',
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
              labelName: '所属地区:',
              compVal: '湖南省'
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
              searchType: 'treeCheckbox',
              labelName: '',
              compVal: '',
              treeOps: [{
                id: '1',
                label: '违章及报警汇总类型',
                children: [{
                  id: '1-1',
                  label: '超速',
                  children: [{
                    id: '1-1-1',
                    label: '持续30秒'
                  }, {
                    id: '1-1-2',
                    label: '持续1分钟'
                  }]
                }]
              }],
              treeChkboxProps: {
                label: 'label',
                chidlren: 'children'
              }
            }],
            tabHeader: [{
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'InstalledCount',
              headerVal: '入网车辆数',
              subHeaders: []
            }, {
              labelName: '超速',
              subHeaders: {
                OverspeedV: '违章车辆数',
                Overspeed: '违章次数',
                OverspeedVRate: '违章率'
              }
            }, {
              labelName: '凌晨2-5点异动',
              subHeaders: {
                BreakBanV: '违章车辆数',
                NightBan: '违章次数',
                BreakBanVRate: '违章率'
              }
            }, {
              labelName: '疲劳驾驶',
              subHeaders: {
                FatigueDriveV: '违章车辆数',
                FatigueDrive: '违章次数',
                FatigueDriveVRate: '违章率'
              }
            }, {
              labelName: '合计',
              subHeaders: {
                BreakRuleV: '违章车辆数',
                BreakRule: '违章次数',
                BreakRuleVRate: '违章率'
              }
            }],
            TabCtnt: [{
              ZoneName: '2016-05-03',
              InstalledCount: '王小虎',
              OverspeedV: '上海',
              Overspeed: '普陀区',
              OverspeedVRate: '上海市普陀区金沙江路 1518 弄',
              BreakBanV: 200333
            }, {
              ZoneName: '2016-05-03',
              InstalledCount: '王小虎',
              OverspeedV: '上海',
              Overspeed: '普陀区',
              OverspeedVRate: '上海市普陀区金沙江路 1518 弄',
              BreakBanV: 200333
            }]
          },
          secCtnt: {
            tabLabel: '企业汇总',
            tabName: 'report_vehiclebreakrule_company_table',
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
              compVal: '',
            }, {
              searchType: 'treeCheckbox',
              labelName: '',
              compVal: '',
              treeOps: [{
                id: '1',
                label: '违章及报警汇总类型',
                children: [{
                  id: '1-1',
                  label: '超速',
                  children: [{
                    id: '1-1-1',
                    label: '持续30秒'
                  }, {
                    id: '1-1-2',
                    label: '持续1分钟'
                  }]
                }]
              }],
              treeChkboxProps: {
                label: 'label',
                chidlren: 'children'
              }
            }],
            tabHeader: [{
              headerKey: 'ZoneName',
              headerVal: '所属企业地区',
              subHeaders: []
            }, {
              headerKey: 'CompanyName',
              headerVal: '企业',
              subHeaders: []
            }, {
              headerKey: 'InstalledCount',
              headerVal: '入网车辆数',
              subHeaders: []
            }, {
              labelName: '超速',
              subHeaders: {
                OverspeedV: '违章车辆数',
                Overspeed: '违章次数',
                OverspeedVRate: '违章率'
              }
            }, {
              labelName: '凌晨2-5点异动',
              subHeaders: {
                BreakBanV: '违章车辆数',
                NightBan: '违章次数',
                BreakBanVRate: '违章率'
              }
            }, {
              labelName: '疲劳驾驶',
              subHeaders: {
                FatigueDriveV: '违章车辆数',
                FatigueDrive: '违章次数',
                FatigueDriveVRate: '违章率'
              }
            }, {
              labelName: '合计',
              subHeaders: {
                BreakRuleV: '违章车辆数',
                BreakRule: '违章次数',
                BreakRuleVRate: '违章率'
              }
            }],
            TabCtnt: [{
              ZoneName: '2016-05-03',
              InstalledCount: '王小虎',
              OverspeedV: '上海',
              Overspeed: '普陀区',
              OverspeedVRate: '上海市普陀区金沙江路 1518 弄',
              BreakBanV: 200333
            }, {
              ZoneName: '2016-05-03',
              InstalledCount: '王小虎',
              OverspeedV: '上海',
              Overspeed: '普陀区',
              OverspeedVRate: '上海市普陀区金沙江路 1518 弄',
              BreakBanV: 200333
            }]
          },
          trdCtnt: {
            tabLabel: '车辆汇总',
            tabName: 'report_vehiclebreakrule_vehicle_table',
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
              searchType: 'select',
              labelName: '违章类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '2',
                label: '超速',
              }, {
                value: '3',
                label: '疲劳驾驶',
              }, {
                value: '10',
                label: '凌晨2-5点异动',
              }],
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
            }, {
              searchType: 'treeCheckbox',
              labelName: '',
              compVal: '',
              treeOps: [{
                id: '1',
                label: '违章及报警汇总类型',
                children: [{
                  id: '1-1',
                  label: '超速',
                  children: [{
                    id: '1-1-1',
                    label: '持续30秒'
                  }, {
                    id: '1-1-2',
                    label: '持续1分钟'
                  }]
                }]
              }],
              treeChkboxProps: {
                label: 'label',
                chidlren: 'children'
              }
            }],
            tabHeader: [{
              headerKey: 'LicensePlat',
              headerVal: '车牌号',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'CompanyName',
              headerVal: '企业',
              subHeaders: []
            }, {
              headerKey: 'Overspeed',
              headerVal: '超速次数',
              subHeaders: []
            }, {
              headerKey: 'NightBan',
              headerVal: '凌晨2-5点违规运行次数',
              subHeaders: []
            }, {
              headerKey: 'FatigueDrive',
              headerVal: '疲劳驾驶次数',
              subHeaders: []
            }, {
              headerKey: 'BreakRule',
              headerVal: '合计',
              subHeaders: []
            }],
            TabCtnt: [{
              LicensePlat: '2016-05-03',
              ZoneName: '王小虎',
              CompanyName: '上海',
              Overspeed: '普陀区',
              NightBan: '上海市普陀区金沙江路 1518 弄',
              FatigueDrive: 200333
            }, {
              LicensePlat: '2016-05-03',
              ZoneName: '王小虎',
              CompanyName: '上海',
              Overspeed: '普陀区',
              NightBan: '上海市普陀区金沙江路 1518 弄',
              FatigueDrive: 200333
            }]
          },
          frthCtnt: {
            tabLabel: '车辆报警明细',
            tabName: 'report_vehiclebreakrule_detail_table',
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
              searchType: 'select',
              labelName: '违章类型:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '2',
                label: '超速',
              }, {
                value: '3',
                label: '疲劳驾驶',
              }, {
                value: '10',
                label: '凌晨2-5点异动',
              }],
            }, {
              searchType: 'fromTodatePicker',
              compVal: '',
            }, {
              searchType: 'treeCheckbox',
              labelName: '',
              compVal: '',
              treeOps: [{
                id: '1',
                label: '违章及报警汇总类型',
                children: [{
                  id: '1-1',
                  label: '超速',
                  children: [{
                    id: '1-1-1',
                    label: '持续30秒'
                  }, {
                    id: '1-1-2',
                    label: '持续1分钟'
                  }]
                }]
              }],
              treeChkboxProps: {
                label: 'label',
                chidlren: 'children'
              }
            }],
            tabHeader: [{
              headerKey: 'LicensePlat',
              headerVal: '车牌号',
              subHeaders: []
            }, {
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'CompanyName',
              headerVal: '企业',
              subHeaders: []
            }, {
              headerKey: 'Overspeed',
              headerVal: '超速次数',
              subHeaders: []
            }, {
              headerKey: 'NightBan',
              headerVal: '凌晨2-5点违规运行次数',
              subHeaders: []
            }, {
              headerKey: 'FatigueDrive',
              headerVal: '疲劳驾驶次数',
              subHeaders: []
            }, {
              headerKey: 'BreakRule',
              headerVal: '合计',
              subHeaders: []
            }],
            TabCtnt: [{
              LicensePlat: '2016-05-03',
              ZoneName: '王小虎',
              CompanyName: '上海',
              Overspeed: '普陀区',
              NightBan: '上海市普陀区金沙江路 1518 弄',
              FatigueDrive: 200333
            }, {
              LicensePlat: '2016-05-03',
              ZoneName: '王小虎',
              CompanyName: '上海',
              Overspeed: '普陀区',
              NightBan: '上海市普陀区金沙江路 1518 弄',
              FatigueDrive: 200333
            }]
          },
        }
      }
    }
  }
</script>
