<template>
  <div class="CompanyCheckRank">
    <multi-level-table-component 
    :activeName="activeName" 
    :tabCtntList="tabCtntList" 
    class="zone-check-multilevel"
    v-on:handleClickSearch="handleClickSearch"
    v-on:handleClickExpData="handleClickExpData"
    v-on:handleCurrentChange="handleCurrentChange"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css">
</style>

<script>
import MultiLevelTableComponent from "@/components/MultiLevelTableComponent/MultiLevelTableComponent";
import { axiosRequest, getLastMonth, getLastDay } from "@/common/common";
import { commonConfig, carTypeOptions } from "@/config/commonConfig";

export default {
  name: "CompanyCheckRank",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "report_vehicleinstall_zone_table",
      activeNameIndex: 0,
      getVehicleInstallDataUrl:
        commonConfig.rootUrl +
        commonConfig.StatisticConst.GetVehicleInstallData,
      exportVehicleInstallDataUrl:
        commonConfig.rootUrl +
        commonConfig.StatisticConst.ExportVehicleInstallData,
      // 每一列的类型，目前已经有纯文本和router-link
      columnType: {
        text: "text",
        router_link: "router_link"
      },
      // 存储每10行的数据
      zoneCheckSourceData: [],
      // 存储合计的数据
      countData: [],
      // tabName作为标识符
      tabNameObj: {
        firTab: {
          tabLabel: "地区汇总",
          tabName: "report_vehicleinstall_zone_table", //将作为标识符来区分
          nType: 1 //根据重构前的请求，可以看到nType 为1
        },
        secTab: {
          tabLabel: "接入平台汇总",
          tabName: "report_vehicleinstall_platform_table", //将作为标识符来区分
          nType: 2 //根据重构前的请求，可以看到nType 为2
        },
        thiTab: {
          tabLabel: "企业汇总",
          tabName: "report_vehicleinstall_company_table", //将作为标识符来区分
          nType: 3 //根据重构前的请求，可以看到nType 为3
        },
        fouTab: {
          tabLabel: "车辆入网明细",
          tabName: "report_vehicleinstall_detail_table", //将作为标识符来区分
          nType: 4 //根据重构前的请求，可以看到nType 为4
        },
        fifTab: {
          tabLabel: "新装车辆入网明细",
          tabName: "report_vehicleinstall_newdetail_table", //将作为标识符来区分
          nType: 5 //根据重构前的请求，可以看到nType 为5
        }
      }
    };
  },
  computed: {
    tabCtntList: function() {
      return [
        {
          tabLabel: this.tabNameObj.firTab.tabLabel,
          tabName: this.tabNameObj.firTab.tabName, //将作为标识符来区分
          currentPage: 1, //当前页数
          total: 0, //总条数
          loading: false,
          btnEvents: [
            {
              iconName: "el-icon-search",
              btnId: "search", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "查询",
              isDisabled: false //控制查询数据按钮初始状态为enabled
            },
            {
              iconName: "el-icon-download",
              btnId: "export_data", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "导出数据",
              isDisabled: true //控制导出数据按钮初始状态为disabled
            }
          ],
          searchCreteria: [
            {
              searchType: "input",
              labelName: "地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "select",
              labelName: "车载终端配置:",
              labelId: "DeviceID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "支持行驶记录仪"
                },
                {
                  value: 2,
                  label: "支持视频"
                },
                {
                  value: 3,
                  label: "其他"
                }
              ]
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
            }
            // {
            //   searchType: "checkbox",
            //   labelName: "车辆状态:",
            //   labelId: 'GovStatus', //该ID主要是用来判断在子组件中出发了哪一种个子组件
            //   compVal: [],
            //   options: [{
            //     value: 0x2,
            //       label: "营运"
            //     },
            //     {
            //       value: 0x4,
            //       label: "停运"
            //     },
            //     {
            //       value: 0x10,
            //       label: "转出"
            //     },
            //     {
            //       value: 0x40,
            //       label: "歇业"
            //     },
            //     {
            //       value: 0x100,
            //       label: "锁定"
            //     }
            //   ]
            // },
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: [],
              columnType: this.columnType.text,
            },
            {
              headerKey: "ZName",
              headerVal: "地区名称",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "IncrementVehicle",
              headerVal: "新装车辆数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "OfflineCountV",
              headerVal: "下线车辆数",
              subHeaders: [],
              columnType: this.columnType.text,
            },
            {
              headerKey: "AddCountV",
              headerVal: "净增长车辆数",
              subHeaders: [],
              columnType: this.columnType.text,
            },
            {
              headerKey: "ALLVehicle",
              headerVal: "应入网车辆数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "InstalledVehicle",
              headerVal: "已入网车辆总数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "InstalledRate",
              headerVal: "入网率",
              subHeaders: [],
              columnType: this.columnType.text,
            },
            {
              labelName: "累计入网车辆数",
              subHeaders: [
                {
                  slabelName: "三类以上班线客车（不包含高速、超长）",
                  // subHeaders: {
                  //   ALLVehicle_sanlei: "应入网",
                  //   InstalledVehicle_sanlei: "已入网",
                  //   InstalledRate_sanlei: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_sanlei",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_sanlei",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_sanlei",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "高速客车",
                  // subHeaders: {
                  //   ALLVehicle_GAOSU: "应入网",
                  //   InstalledVehicle_GAOSU: "已入网",
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_GAOSU",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_GAOSU",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_GAOSU",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "超长客车",
                  // subHeaders: {
                  //   ALLVehicle_CHAOCHANG: "应入网",
                  //   InstalledVehicle_CHAOCHANG: "已入网",
                  //   InstalledRate_CHAOCHANG: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_CHAOCHANG",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_CHAOCHANG",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_CHAOCHANG",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "旅游客车",
                  // subHeaders: {
                  //   ALLVehicle_LVYOU: "应入网",
                  //   InstalledVehicle_LVYOU: "已入网",
                  //   InstalledRate_LVYOU: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_LVYOU",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_LVYOU",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_LVYOU",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "包车客运",
                  // subHeaders: {
                  //   ALLVehicle_BAOCHE: "应入网",
                  //   InstalledVehicle_BAOCHE: "已入网",
                  //   InstalledRate_BAOCHE: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BAOCHE",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_BAOCHE",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_BAOCHE",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "危险品运输车",
                  // subHeaders: {
                  //   ALLVehicle_WEIXIAN: "应入网",
                  //   InstalledVehicle_WEIXIAN: "已入网",
                  //   InstalledRate_WEIXIAN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_WEIXIAN",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_WEIXIAN",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_WEIXIAN",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "重型货运运输车",
                  // subHeaders: {
                  //   ALLVehicle_ZHONGHUO: "应入网",
                  //   InstalledVehicle_ZHONGHUO: "已入网",
                  //   InstalledRate_ZHONGHUO: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_ZHONGHUO",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_ZHONGHUO",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_ZHONGHUO",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "半挂牵引车",
                  // subHeaders: {
                  //   ALLVehicle_BANGUA: "应入网",
                  //   InstalledVehicle_BANGUA: "已入网",
                  //   InstalledRate_BANGUA: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BANGUA",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_BANGUA",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_BANGUA",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "普通货车",
                  // subHeaders: {
                  //   ALLVehicle_puhuo: "应入网",
                  //   InstalledVehicle_puhuo: "已入网",
                  //   InstalledRate_puhuo: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_puhuo",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_puhuo",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_puhuo",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "农村客运",
                  // subHeaders: {
                  //   ALLVehicle_NONGCUN: "应入网",
                  //   InstalledVehicle_NONGCUN: "已入网",
                  //   InstalledRate_NONGCUN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_NONGCUN",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_NONGCUN",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_NONGCUN",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "驾培车",
                  // subHeaders: {
                  //   ALLVehicle_jiaolian: "应入网",
                  //   InstalledVehicle_jiaolian: "已入网",
                  //   InstalledRate_jiaolian: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_jiaolian",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_jiaolian",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_jiaolian",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "出租车",
                  // subHeaders: {
                  //   ALLVehicle_chuzu: "应入网",
                  //   InstalledVehicle_chuzu: "已入网",
                  //   InstalledRate_chuzu: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_chuzu",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_chuzu",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_chuzu",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "公交车",
                  // subHeaders: {
                  //   ALLVehicle_gongjiao: "应入网",
                  //   InstalledVehicle_gongjiao: "已入网",
                  //   InstalledRate_gongjiao: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_gongjiao",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_gongjiao",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_gongjiao",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "租赁客车",
                  // subHeaders: {
                  //   ALLVehicle_zulin: "应入网",
                  //   InstalledVehicle_zulin: "已入网",
                  //   InstalledRate_zulin: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_zulin",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_zulin",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_zulin",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "校园车辆",
                  // subHeaders: {
                  //   ALLVehicle_xiaoyuan: "应入网",
                  //   InstalledVehicle_xiaoyuan: "已入网",
                  //   InstalledRate_xiaoyuan: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_xiaoyuan",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_xiaoyuan",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_xiaoyuan",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "其他车",
                  // subHeaders: {
                  //   ALLVehicle_qita: "应入网",
                  //   InstalledVehicle_qita: "已入网",
                  //   InstalledRate_qita: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_qita",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_qita",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_qita",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   ZName: "2016-05-03",
            //   OfflineCountV: "王小虎",
            //   AddCountV: "上海",
            //   ALLVehicle: "普陀区",
            //   InstalledVehicle: "上海市普陀区金沙江路 1518 弄",
            //   InstalledRate: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   OfflineCountV: "王小虎",
            //   AddCountV: "上海",
            //   ALLVehicle: "普陀区",
            //   InstalledVehicle: "上海市普陀区金沙江路 1518 弄",
            //   InstalledRate: 200333
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.secTab.tabLabel,
          tabName: this.tabNameObj.secTab.tabName, //将作为标识符来区分
          currentPage: 1, //当前页数
          total: 0, //总条数
          loading: false,
          btnEvents: [
            {
              iconName: "el-icon-search",
              btnId: "search", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "查询",
              isDisabled: false //控制查询数据按钮初始状态为enabled
            },
            {
              iconName: "el-icon-download",
              btnId: "export_data", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "导出数据",
              isDisabled: true //控制导出数据按钮初始状态为disabled
            }
          ],
          searchCreteria: [
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000"
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "select",
              labelName: "车载终端配置:",
              labelId: "DeviceID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "支持行驶记录仪"
                },
                {
                  value: 2,
                  label: "支持视频"
                },
                {
                  value: 3,
                  label: "其他"
                }
              ]
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
            },
            // {
            //   searchType: "checkbox",
            //   labelName: "车辆状态:",
            //   labelId: 'GovStatus', //该ID主要是用来判断在子组件中出发了哪一种个子组件
            //   compVal: [],
            //   options: [{
            //     value: 0x2,
            //       label: "营运"
            //     },
            //     {
            //       value: 0x4,
            //       label: "停运"
            //     },
            //     {
            //       value: 0x10,
            //       label: "转出"
            //     },
            //     {
            //       value: 0x40,
            //       label: "歇业"
            //     },
            //     {
            //       value: 0x100,
            //       label: "锁定"
            //     }
            //   ]
            // },
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "Name",
              headerVal: "接入平台名称",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "IncrementVehicle",
              headerVal: "新装车辆数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "OfflineCountV",
              headerVal: "下线车辆数",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "AddCountV",
              headerVal: "净增长车辆数",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              labelName: "累计入网车辆数",
              // subHeaders: {
              //   Amount: "合计",
              //   ThreeCategoryVehicle: "三类以上班线客车（不包含高速、超长）",
              //   HighSpeedVehicle: "高速客车",
              //   LongVehicle: "超长客车",
              //   TravelVehicle: "旅游客车",
              //   TakeVehicle: "包车客运",
              //   RiskTransferVehicle: "危险品运输车",
              //   HeavyVehicle: "重型货运运输车",
              //   PullPushVehicle: "半挂牵引车",
              //   NormalVehicle: "普通货车",
              //   VillageVehicle: "农村客运",
              //   DriverVehicle: "驾培车",
              //   TaxiVehicle: "出租车",
              //   BusVehicle: "公交车",
              //   RentVehicle: "租赁客车",
              //   SchoolVehicle: "校园车辆",
              //   OtherVehicle: "其他车"
              // }
              subHeaders: [
                {
                  headerKey: "InstalledVehicle",
                  headerVal: "合计",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_sanlei",
                  headerVal: "三类以上班线客车（不包含高速、超长）",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_GAOSU",
                  headerVal: "高速客车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_CHAOCHANG",
                  headerVal: "超长客车",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "InstalledVehicle_LVYOU",
                  headerVal: "旅游客车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_BAOCHE",
                  headerVal: "包车客运",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_WEIXIAN",
                  headerVal: "危险品运输车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_ZHONGHUO",
                  headerVal: "重型货运运输车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_BANGUA",
                  headerVal: "半挂牵引车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_puhuo",
                  headerVal: "普通货车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_NONGCUN",
                  headerVal: "农村客运",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_jiaolian",
                  headerVal: "驾培车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_chuzu",
                  headerVal: "出租车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_gongjiao",
                  headerVal: "公交车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_zulin",
                  headerVal: "租赁客车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_xiaoyuan",
                  headerVal: "校园车辆",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InstalledVehicle_qita",
                  headerVal: "其他车",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   Name: "2016-05-03",
            //   IncrementVehicle: "王小虎",
            //   OfflineCountV: "上海",
            //   AddCountV: "普陀区"
            // },
            // {
            //   Name: "2016-05-03",
            //   IncrementVehicle: "王小虎",
            //   OfflineCountV: "上海",
            //   AddCountV: "普陀区"
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.thiTab.tabLabel,
          tabName: this.tabNameObj.thiTab.tabName, //将作为标识符来区分
          currentPage: 1, //当前页数
          total: 0, //总条数
          loading: false,
          btnEvents: [
            {
              iconName: "el-icon-search",
              btnId: "search", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "查询",
              isDisabled: false //控制查询数据按钮初始状态为enabled
            },
            {
              iconName: "el-icon-download",
              btnId: "export_data", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "导出数据",
              isDisabled: true //控制导出数据按钮初始状态为disabled
            }
          ],
          searchCreteria: [
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000"
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "select",
              labelName: "车载终端配置:",
              labelId: "DeviceID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "支持行驶记录仪"
                },
                {
                  value: 2,
                  label: "支持视频"
                },
                {
                  value: 3,
                  label: "其他"
                }
              ]
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
            },
            // {
            //   searchType: "checkbox",
            //   labelName: "车辆状态:",
            //   labelId: 'GovStatus', //该ID主要是用来判断在子组件中出发了哪一种个子组件
            //   compVal: [],
            //   options: [{
            //     value: 0x2,
            //       label: "营运"
            //     },
            //     {
            //       value: 0x4,
            //       label: "停运"
            //     },
            //     {
            //       value: 0x10,
            //       label: "转出"
            //     },
            //     {
            //       value: 0x40,
            //       label: "歇业"
            //     },
            //     {
            //       value: 0x100,
            //       label: "锁定"
            //     }
            //   ]
            // },
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ZName",
              headerVal: "企业所属地区",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UnitName",
              headerVal: "企业名称",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "IncrementVehicle",
              headerVal: "新装车辆数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "ALLVehicle",
              headerVal: "应入网车辆数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "InstalledVehicle",
              headerVal: "已入网车辆总数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "InstalledRate",
              headerVal: "入网率",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              labelName: "累计入网车辆数",
              subHeaders: [
                {
                  slabelName: "三类以上班线客车（不包含高速、超长）",
                  // subHeaders: {
                  //   ALLVehicle_sanlei: "应入网",
                  //   InstalledVehicle_sanlei: "已入网",
                  //   InstalledRate_sanlei: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_sanlei",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_sanlei",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_sanlei",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "高速客车",
                  // subHeaders: {
                  //   ALLVehicle_GAOSU: "应入网",
                  //   InstalledVehicle_GAOSU: "已入网",
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_GAOSU",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_GAOSU",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_GAOSU",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "超长客车",
                  // subHeaders: {
                  //   ALLVehicle_CHAOCHANG: "应入网",
                  //   InstalledVehicle_CHAOCHANG: "已入网",
                  //   InstalledRate_CHAOCHANG: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_CHAOCHANG",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_CHAOCHANG",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_CHAOCHANG",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "旅游客车",
                  // subHeaders: {
                  //   ALLVehicle_LVYOU: "应入网",
                  //   InstalledVehicle_LVYOU: "已入网",
                  //   InstalledRate_LVYOU: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_LVYOU",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_LVYOU",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_LVYOU",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "包车客运",
                  // subHeaders: {
                  //   ALLVehicle_BAOCHE: "应入网",
                  //   InstalledVehicle_BAOCHE: "已入网",
                  //   InstalledRate_BAOCHE: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BAOCHE",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_BAOCHE",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_BAOCHE",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "危险品运输车",
                  // subHeaders: {
                  //   ALLVehicle_WEIXIAN: "应入网",
                  //   InstalledVehicle_WEIXIAN: "已入网",
                  //   InstalledRate_WEIXIAN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_WEIXIAN",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_WEIXIAN",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_WEIXIAN",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "重型货运运输车",
                  // subHeaders: {
                  //   ALLVehicle_ZHONGHUO: "应入网",
                  //   InstalledVehicle_ZHONGHUO: "已入网",
                  //   InstalledRate_ZHONGHUO: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_ZHONGHUO",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_ZHONGHUO",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_ZHONGHUO",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "半挂牵引车",
                  // subHeaders: {
                  //   ALLVehicle_BANGUA: "应入网",
                  //   InstalledVehicle_BANGUA: "已入网",
                  //   InstalledRate_BANGUA: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BANGUA",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_BANGUA",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_BANGUA",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "普通货车",
                  // subHeaders: {
                  //   ALLVehicle_puhuo: "应入网",
                  //   InstalledVehicle_puhuo: "已入网",
                  //   InstalledRate_puhuo: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_puhuo",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_puhuo",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_puhuo",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "农村客运",
                  // subHeaders: {
                  //   ALLVehicle_NONGCUN: "应入网",
                  //   InstalledVehicle_NONGCUN: "已入网",
                  //   InstalledRate_NONGCUN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_NONGCUN",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_NONGCUN",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_NONGCUN",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "驾培车",
                  // subHeaders: {
                  //   ALLVehicle_jiaolian: "应入网",
                  //   InstalledVehicle_jiaolian: "已入网",
                  //   InstalledRate_jiaolian: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_jiaolian",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_jiaolian",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_jiaolian",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "出租车",
                  // subHeaders: {
                  //   ALLVehicle_chuzu: "应入网",
                  //   InstalledVehicle_chuzu: "已入网",
                  //   InstalledRate_chuzu: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_chuzu",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_chuzu",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_chuzu",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "公交车",
                  // subHeaders: {
                  //   ALLVehicle_gongjiao: "应入网",
                  //   InstalledVehicle_gongjiao: "已入网",
                  //   InstalledRate_gongjiao: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_gongjiao",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_gongjiao",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_gongjiao",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "租赁客车",
                  // subHeaders: {
                  //   ALLVehicle_zulin: "应入网",
                  //   InstalledVehicle_zulin: "已入网",
                  //   InstalledRate_zulin: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_zulin",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_zulin",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_zulin",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "校园车辆",
                  // subHeaders: {
                  //   ALLVehicle_xiaoyuan: "应入网",
                  //   InstalledVehicle_xiaoyuan: "已入网",
                  //   InstalledRate_xiaoyuan: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_xiaoyuan",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_xiaoyuan",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_xiaoyuan",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "其他车",
                  // subHeaders: {
                  //   ALLVehicle_qita: "应入网",
                  //   InstalledVehicle_qita: "已入网",
                  //   InstalledRate_qita: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_qita",
                      headerVal: "应入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledVehicle_qita",
                      headerVal: "已入网",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "InstalledRate_qita",
                      headerVal: "入网率",
                      columnType: this.columnType.text
                    }
                  ]
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   ZName: "2016-05-03",
            //   UnitName: "王小虎",
            //   IncrementVehicle: "上海",
            //   ALLVehicle: "普陀区",
            //   InstalledVehicle: "上海市普陀区金沙江路 1518 弄",
            //   InstalledRate: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   UnitName: "王小虎",
            //   IncrementVehicle: "上海",
            //   ALLVehicle: "普陀区",
            //   InstalledVehicle: "上海市普陀区金沙江路 1518 弄",
            //   InstalledRate: 200333
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.fouTab.tabLabel,
          tabName: this.tabNameObj.fouTab.tabName, //将作为标识符来区分
          currentPage: 1, //当前页数
          total: 0, //总条数
          loading: false,
          btnEvents: [
            {
              iconName: "el-icon-search",
              btnId: "search", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "查询",
              isDisabled: false //控制查询数据按钮初始状态为enabled
            },
            {
              iconName: "el-icon-download",
              btnId: "export_data", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "导出数据",
              isDisabled: true //控制导出数据按钮初始状态为disabled
            }
          ],
          searchCreteria: [
            {
              searchType: "input",
              labelName: "车牌号:",
              labelId: "VehicleId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000"
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "singleDayPicker",
              labelName: "日期止:",
              labelId: "EndDate", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
            },
            // {
            //   searchType: "checkbox",
            //   labelName: "车辆状态:",
            //   labelId: 'GovStatus', //该ID主要是用来判断在子组件中出发了哪一种个子组件
            //   compVal: [],
            //   options: [{
            //     value: 0x2,
            //       label: "营运"
            //     },
            //     {
            //       value: 0x4,
            //       label: "停运"
            //     },
            //     {
            //       value: 0x10,
            //       label: "转出"
            //     },
            //     {
            //       value: 0x40,
            //       label: "歇业"
            //     },
            //     {
            //       value: 0x100,
            //       label: "锁定"
            //     }
            //   ]
            // },
            {
              searchType: "select",
              labelName: "车载终端配置:",
              labelId: "DeviceID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "支持行驶记录仪"
                },
                {
                  value: 2,
                  label: "支持视频"
                },
                {
                  value: 3,
                  label: "其他"
                }
              ]
            },
            {
              searchType: "select",
              labelName: "GPS入网情况:",
              labelId: "InstallID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "应入网"
                },
                {
                  value: 1,
                  label: "已入网"
                },
                {
                  value: 2,
                  label: "未入网"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ZName",
              headerVal: "企业所属地区",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "CityName",
              headerVal: "企业所属市(州)",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UnitName",
              headerVal: "企业名称",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "GPSInstalled",
              headerVal: "GPS入网情况",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "GPSTime",
              headerVal: "GPS最后一次定位时间",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "DeviceConfig",
              headerVal: "车载终端配置",
              subHeaders: [],
              columnType: this.columnType.text
            }
          ],
          TabCtnt: [
            // {
            //   PlateColor: "2016-05-03",
            //   ZName: "王小虎",
            //   CityName: "上海",
            //   UnitName: "普陀区",
            //   VehicleType: "上海市普陀区金沙江路 1518 弄",
            //   PlatformName: 200333
            // },
            // {
            //   PlateColor: "2016-05-03",
            //   ZName: "王小虎",
            //   CityName: "上海",
            //   UnitName: "普陀区",
            //   VehicleType: "上海市普陀区金沙江路 1518 弄",
            //   PlatformName: 200333
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.fifTab.tabLabel,
          tabName: this.tabNameObj.fifTab.tabName, //将作为标识符来区分
          currentPage: 1, //当前页数
          total: 0, //总条数
          loading: false,
          btnEvents: [
            {
              iconName: "el-icon-search",
              btnId: "search", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "查询",
              isDisabled: false //控制查询数据按钮初始状态为enabled
            },
            {
              iconName: "el-icon-download",
              btnId: "export_data", //该ID主要是用来判断在子组件中出发了哪一个按钮
              btnName: "导出数据",
              isDisabled: true //控制导出数据按钮初始状态为disabled
            }
          ],
          searchCreteria: [
            {
              searchType: "input",
              labelName: "车牌号:",
              labelId: "VehicleId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000"
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
            },
            // {
            //   searchType: "checkbox",
            //   labelName: "车辆状态:",
            //   labelId: 'GovStatus', //该ID主要是用来判断在子组件中出发了哪一种个子组件
            //   compVal: [],
            //   options: [{
            //     value: 0x2,
            //       label: "营运"
            //     },
            //     {
            //       value: 0x4,
            //       label: "停运"
            //     },
            //     {
            //       value: 0x10,
            //       label: "转出"
            //     },
            //     {
            //       value: 0x40,
            //       label: "歇业"
            //     },
            //     {
            //       value: 0x100,
            //       label: "锁定"
            //     }
            //   ]
            // },
            {
              searchType: "select",
              labelName: "车载终端配置:",
              labelId: "DeviceID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "支持行驶记录仪"
                },
                {
                  value: 2,
                  label: "支持视频"
                },
                {
                  value: 3,
                  label: "其他"
                }
              ]
            },
            {
              searchType: "select",
              labelName: "GPS入网情况:",
              labelId: "GPSInstalled", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 0,
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "新装"
                },
                {
                  value: 2,
                  label: "下线"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ZName",
              headerVal: "企业所属地区",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "CityName",
              headerVal: "企业所属市(州)",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UnitName",
              headerVal: "企业名称",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "GPSInstalled",
              headerVal: "GPS入网情况",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "GPSTime",
              headerVal: "GPS最后一次定位时间",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "DeviceConfig",
              headerVal: "车载终端配置",
              subHeaders: [],
              columnType: this.columnType.text
            }
          ],
          TabCtnt: [
            // {
            //   LicensePlat: "2016-05-03",
            //   PlateColor: "王小虎",
            //   CompanyZoneName: "上海",
            //   CityName: "普陀区",
            //   CompanyName: "上海市普陀区金沙江路 1518 弄",
            //   VehicleType: 200333
            // },
            // {
            //   LicensePlat: "2016-05-03",
            //   PlateColor: "王小虎",
            //   CompanyZoneName: "上海",
            //   CityName: "普陀区",
            //   CompanyName: "上海市普陀区金沙江路 1518 弄",
            //   VehicleType: 200333
            // }
          ]
        }
      ];
    }
  },
  methods: {
    handleClickSearch: function(msg) {
      //处理子组件触发的查询事件
      const self = this;
      // 封装函数来组装每一页请求的参数
      const GetVehicleInstallDataUrlParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.transCheckSourceData = [];
      axiosRequest
        .axiosGet(this.getVehicleInstallDataUrl, GetVehicleInstallDataUrlParams)
        .then(function(response) {
          const detailListTemp = response.data.DetailList;
          for (let vehicleInstallItem of detailListTemp) {
            self.transCheckSourceData.push(
              self.pushSourceData(vehicleInstallItem, msg.activeName)
            );
          }
          self.tabCtntList[self.activeNameIndex].TabCtnt =
            self.transCheckSourceData;
          self.tabCtntList[self.activeNameIndex].total =
            response.data.CountTotal;
          self.tabCtntList[self.activeNameIndex].loading = false;
          self.tabCtntList[self.activeNameIndex].btnEvents[1].isDisabled = false; //单击查询按钮后，使能导出数据、打印按钮
          // 在某些特殊的Tab需要加上明细 - 平台连通率明细
          self.tabCtntList[self.activeNameIndex].TabCtnt.push(
            self.pushSourceData(response.data.TotalList, msg.activeName)
          );
        })
        .catch(function(error) {});
    },
    // 将插入表的数据组装为一个函数
    pushSourceData: function(vehicleInstallItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: vehicleInstallItem.sybid,
            ZName: vehicleInstallItem.ZName,
            IncrementVehicle: vehicleInstallItem.IncrementVehicle,
            OfflineCountV: vehicleInstallItem.OfflineCountV,
            AddCountV: vehicleInstallItem.AddCountV,
            ALLVehicle: vehicleInstallItem.ALLVehicle,
            InstalledVehicle: vehicleInstallItem.InstalledVehicle,
            InstalledRate: vehicleInstallItem.InstalledRate,

            ALLVehicle_sanlei: vehicleInstallItem.ALLVehicle_sanlei,
            InstalledVehicle_sanlei: vehicleInstallItem.InstalledVehicle_sanlei,
            InstalledRate_sanlei: vehicleInstallItem.InstalledRate_sanlei,

            ALLVehicle_GAOSU: vehicleInstallItem.ALLVehicle_GAOSU,
            InstalledVehicle_GAOSU: vehicleInstallItem.InstalledVehicle_GAOSU,
            InstalledRate_GAOSU: vehicleInstallItem.InstalledRate_GAOSU,

            ALLVehicle_CHAOCHANG: vehicleInstallItem.ALLVehicle_CHAOCHANG,
            InstalledVehicle_CHAOCHANG: vehicleInstallItem.InstalledVehicle_CHAOCHANG,
            FatigueDrivInstalledRate_CHAOCHANGeRate: vehicleInstallItem.InstalledRate_CHAOCHANG,
            
            ALLVehicle_LVYOU: vehicleInstallItem.ALLVehicle_LVYOU,
            InstalledVehicle_LVYOU: vehicleInstallItem.InstalledVehicle_LVYOU,
            InstalledRate_LVYOU: vehicleInstallItem.InstalledRate_LVYOU,

            ALLVehicle_BAOCHE: vehicleInstallItem.ALLVehicle_BAOCHE,
            InstalledVehicle_BAOCHE: vehicleInstallItem.InstalledVehicle_BAOCHE,
            InstalledRate_BAOCHE: vehicleInstallItem.InstalledRate_BAOCHE,

            ALLVehicle_WEIXIAN: vehicleInstallItem.ALLVehicle_WEIXIAN,
            InstalledVehicle_WEIXIAN: vehicleInstallItem.InstalledVehicle_WEIXIAN,
            InstalledRate_WEIXIAN: vehicleInstallItem.InstalledRate_WEIXIAN,

            ALLVehicle_ZHONGHUO: vehicleInstallItem.ALLVehicle_ZHONGHUO,
            InstalledVehicle_ZHONGHUO: vehicleInstallItem.InstalledVehicle_ZHONGHUO,
            InstalledRate_ZHONGHUO: vehicleInstallItem.InstalledRate_ZHONGHUO,

            ALLVehicle_BANGUA: vehicleInstallItem.ALLVehicle_BANGUA,
            InstalledVehicle_BANGUA: vehicleInstallItem.InstalledVehicle_BANGUA,
            InstalledRate_BANGUA: vehicleInstallItem.InstalledRate_BANGUA,

            ALLVehicle_puhuo: vehicleInstallItem.ALLVehicle_puhuo,
            InstalledVehicle_puhuo: vehicleInstallItem.InstalledVehicle_puhuo,
            InstalledRate_puhuo: vehicleInstallItem.InstalledRate_puhuo,

            ALLVehicle_NONGCUN: vehicleInstallItem.ALLVehicle_NONGCUN,
            InstalledVehicle_NONGCUN: vehicleInstallItem.InstalledVehicle_NONGCUN,
            InstalledRate_NONGCUN: vehicleInstallItem.InstalledRate_NONGCUN,

            ALLVehicle_jiaolian: vehicleInstallItem.ALLVehicle_jiaolian,
            InstalledVehicle_jiaolian: vehicleInstallItem.InstalledVehicle_jiaolian,
            InstalledRate_jiaolian: vehicleInstallItem.InstalledRate_jiaolian,

            ALLVehicle_chuzu: vehicleInstallItem.ALLVehicle_chuzu,
            InstalledVehicle_chuzu: vehicleInstallItem.InstalledVehicle_chuzu,
            InstalledRate_chuzu: vehicleInstallItem.InstalledRate_chuzu,

            ALLVehicle_gongjiao: vehicleInstallItem.ALLVehicle_gongjiao,
            InstalledVehicle_gongjiao: vehicleInstallItem.InstalledVehicle_gongjiao,
            InstalledRate_gongjiao: vehicleInstallItem.InstalledRate_gongjiao,

            ALLVehicle_zulin: vehicleInstallItem.ALLVehicle_zulin,
            InstalledVehicle_zulin: vehicleInstallItem.InstalledVehicle_zulin,
            InstalledRate_zulin: vehicleInstallItem.InstalledRate_zulin,

            ALLVehicle_xiaoyuan: vehicleInstallItem.ALLVehicle_xiaoyuan,
            InstalledVehicle_xiaoyuan: vehicleInstallItem.InstalledVehicle_xiaoyuan,
            InstalledRate_xiaoyuan: vehicleInstallItem.InstalledRate_xiaoyuan,

            ALLVehicle_qita: vehicleInstallItem.ALLVehicle_qita,
            InstalledVehicle_qita: vehicleInstallItem.InstalledVehicle_qita,
            InstalledRate_qita: vehicleInstallItem.InstalledRate_qita
          };
          break;
        case this.tabNameObj.secTab.tabName:
          return {
            sybid: vehicleInstallItem.sybid,
            Name: vehicleInstallItem.Name,
            IncrementVehicle: vehicleInstallItem.IncrementVehicle,
            OfflineCountV: vehicleInstallItem.OfflineCountV,
            AddCountV: vehicleInstallItem.AddCountV,

            InstalledVehicle: vehicleInstallItem.InstalledVehicle,
            InstalledVehicle_sanlei: vehicleInstallItem.InstalledVehicle_sanlei,
            InstalledVehicle_GAOSU: vehicleInstallItem.InstalledVehicle_GAOSU,
            InstalledVehicle_CHAOCHANG: vehicleInstallItem.InstalledVehicle_CHAOCHANG,
            InstalledVehicle_LVYOU: vehicleInstallItem.InstalledVehicle_LVYOU,
            InstalledVehicle_BAOCHE: vehicleInstallItem.InstalledVehicle_BAOCHE,

            InstalledVehicle_WEIXIAN: vehicleInstallItem.InstalledVehicle_WEIXIAN,
            InstalledVehicle_ZHONGHUO: vehicleInstallItem.InstalledVehicle_ZHONGHUO,
            InstalledVehicle_BANGUA: vehicleInstallItem.InstalledVehicle_BANGUA,

            InstalledVehicle_puhuo: vehicleInstallItem.InstalledVehicle_puhuo,
            InstalledVehicle_NONGCUN: vehicleInstallItem.InstalledVehicle_NONGCUN,
            InstalledVehicle_jiaolian: vehicleInstallItem.InstalledVehicle_jiaolian,
            
            InstalledVehicle_chuzu: vehicleInstallItem.InstalledVehicle_chuzu,
            InstalledVehicle_gongjiao: vehicleInstallItem.InstalledVehicle_gongjiao,
            InstalledVehicle_zulin: vehicleInstallItem.InstalledVehicle_zulin,

            InstalledVehicle_xiaoyuan: vehicleInstallItem.InstalledVehicle_xiaoyuan,
            InstalledVehicle_qita: vehicleInstallItem.InstalledVehicle_qita
          };
          break;
        case this.tabNameObj.thiTab.tabName:
          return {
            sybid: vehicleInstallItem.sybid,
            ZName: vehicleInstallItem.ZName,
            UnitName: vehicleInstallItem.UnitName,
            IncrementVehicle: vehicleInstallItem.IncrementVehicle,
            ALLVehicle: vehicleInstallItem.ALLVehicle,

            InstalledVehicle: vehicleInstallItem.InstalledVehicle,
            InstalledRate: vehicleInstallItem.InstalledRate,

            ALLVehicle_sanlei: vehicleInstallItem.ALLVehicle_sanlei,
            InstalledVehicle_sanlei: vehicleInstallItem.InstalledVehicle_sanlei,
            InstalledRate_sanlei: vehicleInstallItem.InstalledRate_sanlei,

            ALLVehicle_GAOSU: vehicleInstallItem.ALLVehicle_GAOSU,
            InstalledVehicle_GAOSU: vehicleInstallItem.InstalledVehicle_GAOSU,
            InstalledRate_GAOSU: vehicleInstallItem.InstalledRate_GAOSU,

            ALLVehicle_CHAOCHANG: vehicleInstallItem.ALLVehicle_CHAOCHANG,
            InstalledVehicle_CHAOCHANG: vehicleInstallItem.InstalledVehicle_CHAOCHANG,
            FatigueDrivInstalledRate_CHAOCHANGeRate: vehicleInstallItem.InstalledRate_CHAOCHANG,
            
            ALLVehicle_LVYOU: vehicleInstallItem.ALLVehicle_LVYOU,
            InstalledVehicle_LVYOU: vehicleInstallItem.InstalledVehicle_LVYOU,
            InstalledRate_LVYOU: vehicleInstallItem.InstalledRate_LVYOU,

            ALLVehicle_BAOCHE: vehicleInstallItem.ALLVehicle_BAOCHE,
            InstalledVehicle_BAOCHE: vehicleInstallItem.InstalledVehicle_BAOCHE,
            InstalledRate_BAOCHE: vehicleInstallItem.InstalledRate_BAOCHE,

            ALLVehicle_WEIXIAN: vehicleInstallItem.ALLVehicle_WEIXIAN,
            InstalledVehicle_WEIXIAN: vehicleInstallItem.InstalledVehicle_WEIXIAN,
            InstalledRate_WEIXIAN: vehicleInstallItem.InstalledRate_WEIXIAN,

            ALLVehicle_ZHONGHUO: vehicleInstallItem.ALLVehicle_ZHONGHUO,
            InstalledVehicle_ZHONGHUO: vehicleInstallItem.InstalledVehicle_ZHONGHUO,
            InstalledRate_ZHONGHUO: vehicleInstallItem.InstalledRate_ZHONGHUO,

            ALLVehicle_BANGUA: vehicleInstallItem.ALLVehicle_BANGUA,
            InstalledVehicle_BANGUA: vehicleInstallItem.InstalledVehicle_BANGUA,
            InstalledRate_BANGUA: vehicleInstallItem.InstalledRate_BANGUA,

            ALLVehicle_puhuo: vehicleInstallItem.ALLVehicle_puhuo,
            InstalledVehicle_puhuo: vehicleInstallItem.InstalledVehicle_puhuo,
            InstalledRate_puhuo: vehicleInstallItem.InstalledRate_puhuo,

            ALLVehicle_NONGCUN: vehicleInstallItem.ALLVehicle_NONGCUN,
            InstalledVehicle_NONGCUN: vehicleInstallItem.InstalledVehicle_NONGCUN,
            InstalledRate_NONGCUN: vehicleInstallItem.InstalledRate_NONGCUN,

            ALLVehicle_jiaolian: vehicleInstallItem.ALLVehicle_jiaolian,
            InstalledVehicle_jiaolian: vehicleInstallItem.InstalledVehicle_jiaolian,
            InstalledRate_jiaolian: vehicleInstallItem.InstalledRate_jiaolian,

            ALLVehicle_chuzu: vehicleInstallItem.ALLVehicle_chuzu,
            InstalledVehicle_chuzu: vehicleInstallItem.InstalledVehicle_chuzu,
            InstalledRate_chuzu: vehicleInstallItem.InstalledRate_chuzu,

            ALLVehicle_gongjiao: vehicleInstallItem.ALLVehicle_gongjiao,
            InstalledVehicle_gongjiao: vehicleInstallItem.InstalledVehicle_gongjiao,
            InstalledRate_gongjiao: vehicleInstallItem.InstalledRate_gongjiao,

            ALLVehicle_zulin: vehicleInstallItem.ALLVehicle_zulin,
            InstalledVehicle_zulin: vehicleInstallItem.InstalledVehicle_zulin,
            InstalledRate_zulin: vehicleInstallItem.InstalledRate_zulin,

            ALLVehicle_xiaoyuan: vehicleInstallItem.ALLVehicle_xiaoyuan,
            InstalledVehicle_xiaoyuan: vehicleInstallItem.InstalledVehicle_xiaoyuan,
            InstalledRate_xiaoyuan: vehicleInstallItem.InstalledRate_xiaoyuan,

            ALLVehicle_qita: vehicleInstallItem.ALLVehicle_qita,
            InstalledVehicle_qita: vehicleInstallItem.InstalledVehicle_qita,
            InstalledRate_qita: vehicleInstallItem.InstalledRate_qita
          };
          break;
        case this.tabNameObj.fouTab.tabName:
          return {
            sybid: vehicleInstallItem.sybid,
            LicensePlat: vehicleInstallItem.LicensePlat,
            PlateColor: vehicleInstallItem.PlateColor,
            ZName: vehicleInstallItem.ZName,
            CityName: vehicleInstallItem.CityName,

            UnitName: vehicleInstallItem.UnitName,
            VehicleType: vehicleInstallItem.VehicleType,
            PlatformName: vehicleInstallItem.PlatformName,
            GPSInstalled: vehicleInstallItem.GPSInstalled,
            GPSTime: vehicleInstallItem.GPSTime,
            DeviceConfig: vehicleInstallItem.DeviceConfig
          };
          break;
        case this.tabNameObj.fifTab.tabName:
          return {
            sybid: vehicleInstallItem.sybid,
            LicensePlat: vehicleInstallItem.LicensePlat,
            PlateColor: vehicleInstallItem.PlateColor,
            ZName: vehicleInstallItem.ZName,
            CityName: vehicleInstallItem.CityName,

            UnitName: vehicleInstallItem.UnitName,
            VehicleType: vehicleInstallItem.VehicleType,
            PlatformName: vehicleInstallItem.PlatformName,
            GPSInstalled: vehicleInstallItem.GPSInstalled,
            GPSTime: vehicleInstallItem.GPSTime,
            DeviceConfig: vehicleInstallItem.DeviceConfig
          };
          break;
        default:
      }
    },
    // 注释人：向浩
    // 注释时间：2018-06-12
    // 注释原因：实现导出数据功能
    handleClickExpData: function(msg) {
      //处理子组件触发的导出数据事件
      const self = this;
      // 封装函数来组装每一页请求的参数
      const exportVehicleInstallDataParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage //是否分页 - 导出数据
      );
      self.tabCtntList[self.activeNameIndex].loading = true;//下载数据的时候，显示正在下载数据的logo
      axiosRequest
        .axiosGet(this.exportVehicleInstallDataUrl, exportVehicleInstallDataParams)
        .then(function(response) {
          self.downloadServerFile(decodeURIComponent(response.data));
          // 下载完成后，隐藏正在下载的logo
          self.tabCtntList[self.activeNameIndex].loading = false;
        })
        .catch(function(error) {});
    },
    formPageParams: function(msg, pageIndex, activeName, isSplitPage) {
      let nType = 0,
        beginDate = "",
        endDate = "",
        zoneId = "",
        carType = 0,
        isIncludeLower = 1,
        sortName = "",
        sortOrder = "",
        vehicleId = "",
        platformId = "",
        installID = "",
        upLineFlag = "",
        checkUnitID = "",
        checkType = "",
        isOnGuard = "",
        unitId = "",
        targetUserId = "",
        deviceID = "",
        gPSInstalled = "",
        pageSize = 10,
        readPage = "";
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          this.activeNameIndex = 0;
          nType = this.tabNameObj.firTab.nType; 
          for (let msgItem of msg) {
            if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "DeviceID") deviceID = msgItem.compVal;
            else if (msgItem.labelId === "CarType") carType = msgItem.compVal;
          }
          break;
        case this.tabNameObj.secTab.tabName:
          this.activeNameIndex = 1;
          nType = this.tabNameObj.secTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "DeviceID") deviceID = msgItem.compVal;
            else if (msgItem.labelId === "CarType") carType = msgItem.compVal;
          }
          break;
        case this.tabNameObj.thiTab.tabName:
          this.activeNameIndex = 2;
          nType = this.tabNameObj.thiTab.nType; 
          for (let msgItem of msg) {
            if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "DeviceID") deviceID = msgItem.compVal;
            else if (msgItem.labelId === "CarType") carType = msgItem.compVal;
          }
          break;
        case this.tabNameObj.fouTab.tabName:
          this.activeNameIndex = 3;
          nType = this.tabNameObj.fouTab.nType; 
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "EndDate") endDate = msgItem.compVal;
            else if (msgItem.labelId === "CarType") carType = msgItem.compVal;
            else if (msgItem.labelId === "DeviceID") deviceID = msgItem.compVal;
            else if (msgItem.labelId === "InstallID") installID = msgItem.compVal;
          }
          break;
        case this.tabNameObj.fifTab.tabName:
          this.activeNameIndex = 4;
          nType = this.tabNameObj.fifTab.nType; 
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") carType = msgItem.compVal;
            else if (msgItem.labelId === "DeviceID") deviceID = msgItem.compVal;
            else if (msgItem.labelId === "GPSInstalled") gPSInstalled = msgItem.compVal;
          }
          break;
        default:
      }
      return {
        nType,
        beginDate,
        endDate,
        zoneId,
        carType,
        isIncludeLower,
        sortName,
        sortOrder,
        vehicleId,
        platformId,
        installID,
        upLineFlag,
        checkUnitID,
        checkType,
        isOnGuard,
        unitId,
        targetUserId,
        deviceID,
        gPSInstalled,
        pageSize,
        pageIndex,
        isSplitPage,
        readPage
      };
    },
    // 处理子组件出发的换页数据加载
    handleCurrentChange: function(msg) {
      this.handleClickSearch(msg);
    },
    // 封装函数来通过HTML5的a标签来下载服务器生成的报表文件
    downloadServerFile: function(url) {
      // 使用HTML5的 <a download></a>来下载服务器文件
      let a = document.createElement("a");
      a.href = url;
      a.click();
    }
  }
};
</script>
