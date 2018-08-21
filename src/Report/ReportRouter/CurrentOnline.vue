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
        activeName: 'currentOnline_tables_zone_div',
        tabCtntList: {
          firCtnt: {
            tabLabel: '地区汇总',
            tabName: 'currentOnline_tables_zone_div',
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
              searchType: 'checkbox',
              labelName: '状态:',
              compVal: '',
              options: [{
                value: '0x2',
                label: '营运',
                checked: true
              }, {
                value: '0x4',
                label: '停运',
                checked: false
              }, {
                value: '0x40',
                label: '歇业',
                checked: false
              }, {
                value: '0x10',
                label: '转出',
                checked: false
              }],
            }],
            tabHeader: [{
              headerKey: 'ZoneName',
              headerVal: '地区',
              subHeaders: []
            }, {
              headerKey: 'InnetCount',
              headerVal: '入网车辆数',
              subHeaders: []
            }, {
              headerKey: 'OnlineCount',
              headerVal: '在线车辆数',
              subHeaders: []
            }, {
              headerKey: 'NoOnlineCount',
              headerVal: '不在线车辆数',
              subHeaders: []
            }, {
              headerKey: 'OnlineRate',
              headerVal: '在线率',
              subHeaders: []
            }],
            TabCtnt: [{
              ZoneName: '2016-05-03',
              InnetCount: '王小虎',
              OnlineCount: '上海',
              NoOnlineCount: '普陀区',
              OnlineRate: '上海市普陀区金沙江路 1518 弄'
            }, {
              ZoneName: '2016-05-03',
              InnetCount: '王小虎',
              OnlineCount: '上海',
              NoOnlineCount: '普陀区',
              OnlineRate: '上海市普陀区金沙江路 1518 弄'
            }]
          },
          secCtnt: {
            tabLabel: '接入平台汇总',
            tabName: 'currentOnline_tables_platform_div',
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
              searchType: 'checkbox',
              labelName: '状态:',
              compVal: '',
              options: [{
                value: '0x2',
                label: '营运',
                checked: true
              }, {
                value: '0x4',
                label: '停运',
                checked: false
              }, {
                value: '0x40',
                label: '歇业',
                checked: false
              }, {
                value: '0x10',
                label: '转出',
                checked: false
              }],
            }],
            tabHeader: [{
              headerKey: 'PlatformName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'InnetCount',
              headerVal: '入网车辆数',
              subHeaders: []
            }, {
              headerKey: 'OnlineCount',
              headerVal: '在线车辆数',
              subHeaders: []
            }, {
              headerKey: 'NoOnlineCount',
              headerVal: '不在线车辆数',
              subHeaders: []
            }, {
              headerKey: 'OnlineRate',
              headerVal: '在线率',
              subHeaders: []
            }],
            TabCtnt: [{
              PlatformName: '2016-05-03',
              InnetCount: '王小虎',
              OnlineCount: '上海',
              NoOnlineCount: '普陀区',
              OnlineRate: '上海市普陀区金沙江路 1518 弄'
            }, {
              PlatformName: '2016-05-03',
              InnetCount: '王小虎',
              OnlineCount: '上海',
              NoOnlineCount: '普陀区',
              OnlineRate: '上海市普陀区金沙江路 1518 弄'
            }]
          },
          trdCtnt: {
            tabLabel: '企业汇总',
            tabName: 'currentOnline_tables_company_div',
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
              labelName: '地区:',
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
              searchType: 'checkbox',
              labelName: '状态:',
              compVal: '',
              options: [{
                value: '0x2',
                label: '营运',
                checked: true
              }, {
                value: '0x4',
                label: '停运',
                checked: false
              }, {
                value: '0x40',
                label: '歇业',
                checked: false
              }, {
                value: '0x10',
                label: '转出',
                checked: false
              }],
            }],
            tabHeader: [{
              headerKey: 'CompanyName',
              headerVal: '企业',
              subHeaders: []
            }, {
              headerKey: 'CompanyZoneName',
              headerVal: '所属地区',
              subHeaders: []
            }, {
              headerKey: 'InnetCount',
              headerVal: '入网车辆数',
              subHeaders: []
            }, {
              headerKey: 'OnlineCount',
              headerVal: '在线车辆数',
              subHeaders: []
            }, {
              headerKey: 'NoOnlineCount',
              headerVal: '不在线车辆数',
              subHeaders: []
            }, {
              headerKey: 'OnlineRate',
              headerVal: '在线率',
              subHeaders: []
            }],
            TabCtnt: [{
              CompanyName: '2016-05-03',
              CompanyZoneName: '王小虎',
              InnetCount: '上海',
              OnlineCount: '普陀区',
              NoOnlineCount: '上海市普陀区金沙江路 1518 弄'
            }, {
              CompanyName: '2016-05-03',
              CompanyZoneName: '王小虎',
              InnetCount: '上海',
              OnlineCount: '普陀区',
              NoOnlineCount: '上海市普陀区金沙江路 1518 弄'
            }]
          },
          frthCtnt: {
            tabLabel: '在线车辆明细',
            tabName: 'currentOnline_tables_vehicle_div',
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
              labelName: '地区:',
              compVal: '湖南省'
            }, {
              searchType: 'input',
              labelName: '接入平台:',
              compVal: ''
            }, {
              searchType: 'select',
              labelName: '车辆在线情况:',
              compVal: '',
              options: [{
                value: '0',
                label: '全部',
              }, {
                value: '1',
                label: '在线',
              }, {
                value: '2',
                label: '不在线',
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
            }, {
              searchType: 'checkbox',
              labelName: '状态:',
              compVal: '',
              options: [{
                value: '0x2',
                label: '营运',
                checked: true
              }, {
                value: '0x4',
                label: '停运',
                checked: false
              }, {
                value: '0x40',
                label: '歇业',
                checked: false
              }, {
                value: '0x10',
                label: '转出',
                checked: false
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
              headerKey: 'ZoneName',
              headerVal: '企业所属地区',
              subHeaders: []
            }, {
              headerKey: 'CityName',
              headerVal: '企业所属市(州)',
              subHeaders: []
            }, {
              headerKey: 'UnitName',
              headerVal: '企业',
              subHeaders: []
            }, {
              headerKey: 'VehicleType',
              headerVal: '车辆类型',
              subHeaders: []
            }, {
              headerKey: 'PlatformName',
              headerVal: '接入平台',
              subHeaders: []
            }, {
              headerKey: 'GPSDate',
              headerVal: 'GPS最后一条定位时间',
              subHeaders: []
            }],
            TabCtnt: [{
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }, {
              LicensePlat: '2016-05-03',
              PlateColor: '王小虎',
              ZoneName: '上海',
              CityName: '普陀区',
              UnitName: '上海市普陀区金沙江路 1518 弄',
              VehicleType: 200333
            }]
          }
        }
      }
    }
  }
</script>
