<template>
  <div class="VehicleUplineRate">
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
import {
  commonConfig,
  carTypeOptions,
  reportLabelId
} from "@/config/commonConfig";
export default {
  name: "VehicleUplineRate",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "report_vehicleuplinerate_zone_table",
      activeNameIndex: 0,
      getVehicleUplineDataUrl:
        commonConfig.rootUrl + commonConfig.StatisticConst.GetVehicleUplineData,
      exportVehicleUplineDataUrl:
        commonConfig.rootUrl +
        commonConfig.StatisticConst.ExportVehicleUplineData,
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
          tabName: "report_vehicleuplinerate_zone_table", //将作为标识符来区分
          nType: 1 //根据重构前的请求，可以看到nType 为1
        },
        secTab: {
          tabLabel: "接入平台汇总",
          tabName: "report_vehicleuplinerate_platform_table", //将作为标识符来区分
          nType: 2 //根据重构前的请求，可以看到nType 为2
        },
        thiTab: {
          tabLabel: "企业汇总",
          tabName: "report_vehicleuplinerate_company_table", //将作为标识符来区分
          nType: 3 //根据重构前的请求，可以看到nType 为3
        },
        fouTab: {
          tabLabel: "上线车辆明细",
          tabName: "report_vehicleuplinerate_detail_table", //将作为标识符来区分
          nType: 4 //根据重构前的请求，可以看到nType 为4
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
              labelId: reportLabelId.ZoneId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: reportLabelId.PlatformId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: reportLabelId.fromTodatePicker, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: reportLabelId.CarType, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
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
              headerKey: "ZoneName",
              headerVal: "地区",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "InstalledCount",
              headerVal: "应上线车辆总数",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UpCount",
              headerVal: "已上线车辆总数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "UpRate",
              headerVal: "上线率",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              labelName: "上线车辆数",
              subHeaders: [
                {
                  slabelName: "三类以上班线客车（不包含高速、超长）",
                  // subHeaders: {
                  //   ALLVehicle_sanlei: "应入网",
                  //   UplineVehicle_sanlei: "已入网",
                  //   UplineRate_sanlei: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_sanlei",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_sanlei",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_sanlei",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "高速客车",
                  // subHeaders: {
                  //   ALLVehicle_GAOSU: "应入网",
                  //   UplineVehicle_GAOSU: "已入网",
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_GAOSU",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_GAOSU",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_GAOSU",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "超长客车",
                  // subHeaders: {
                  //   ALLVehicle_CHAOCHANG: "应入网",
                  //   UplineVehicle_CHAOCHANG: "已入网",
                  //   UplineRate_CHAOCHANG: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_CHAOCHANG",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_CHAOCHANG",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_CHAOCHANG",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "旅游客车",
                  // subHeaders: {
                  //   ALLVehicle_LVYOU: "应入网",
                  //   UplineVehicle_LVYOU: "已入网",
                  //   UplineRate_LVYOU: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_LVYOU",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_LVYOU",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_LVYOU",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "包车客运",
                  // subHeaders: {
                  //   ALLVehicle_BAOCHE: "应入网",
                  //   UplineVehicle_BAOCHE: "已入网",
                  //   UplineRate_BAOCHE: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BAOCHE",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_BAOCHE",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_BAOCHE",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "危险品运输车",
                  // subHeaders: {
                  //   ALLVehicle_WEIXIAN: "应入网",
                  //   UplineVehicle_WEIXIAN: "已入网",
                  //   UplineRate_WEIXIAN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_WEIXIAN",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_WEIXIAN",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_WEIXIAN",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "重型货运运输车",
                  // subHeaders: {
                  //   ALLVehicle_ZHONGHUO: "应入网",
                  //   UplineVehicle_ZHONGHUO: "已入网",
                  //   UplineRate_ZHONGHUO: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_ZHONGHUO",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_ZHONGHUO",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_ZHONGHUO",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "半挂牵引车",
                  // subHeaders: {
                  //   ALLVehicle_BANGUA: "应入网",
                  //   UplineVehicle_BANGUA: "已入网",
                  //   UplineRate_BANGUA: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BANGUA",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_BANGUA",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_BANGUA",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "普通货车",
                  // subHeaders: {
                  //   ALLVehicle_puhuo: "应入网",
                  //   UplineVehicle_puhuo: "已入网",
                  //   UplineRate_puhuo: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_puhuo",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_puhuo",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_puhuo",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "农村客运",
                  // subHeaders: {
                  //   ALLVehicle_NONGCUN: "应入网",
                  //   UplineVehicle_NONGCUN: "已入网",
                  //   UplineRate_NONGCUN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_NONGCUN",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_NONGCUN",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_NONGCUN",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "驾培车",
                  // subHeaders: {
                  //   ALLVehicle_jiaolian: "应入网",
                  //   UplineVehicle_jiaolian: "已入网",
                  //   UplineRate_jiaolian: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_jiaolian",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_jiaolian",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_jiaolian",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "出租车",
                  // subHeaders: {
                  //   ALLVehicle_chuzu: "应入网",
                  //   UplineVehicle_chuzu: "已入网",
                  //   UplineRate_chuzu: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_chuzu",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_chuzu",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_chuzu",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "公交车",
                  // subHeaders: {
                  //   ALLVehicle_gongjiao: "应入网",
                  //   UplineVehicle_gongjiao: "已入网",
                  //   UplineRate_gongjiao: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_gongjiao",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_gongjiao",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_gongjiao",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "租赁客车",
                  // subHeaders: {
                  //   ALLVehicle_zulin: "应入网",
                  //   UplineVehicle_zulin: "已入网",
                  //   UplineRate_zulin: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_zulin",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_zulin",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_zulin",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "校园车辆",
                  // subHeaders: {
                  //   ALLVehicle_xiaoyuan: "应入网",
                  //   UplineVehicle_xiaoyuan: "已入网",
                  //   UplineRate_xiaoyuan: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_xiaoyuan",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_xiaoyuan",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_xiaoyuan",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "其他车",
                  // subHeaders: {
                  //   ALLVehicle_qita: "应入网",
                  //   UplineVehicle_qita: "已入网",
                  //   UplineRate_qita: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_qita",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_qita",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_qita",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   ZoneName: "2016-05-03",
            //   InstalledCount: "王小虎",
            //   UpCount: "普陀区",
            //   UpRate: "上海市普陀区金沙江路 1518 弄"
            // },
            // {
            //   ZoneName: "2016-05-03",
            //   InstalledCount: "王小虎",
            //   UpCount: "普陀区",
            //   UpRate: "上海市普陀区金沙江路 1518 弄"
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
              labelId: reportLabelId.PlatformId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: reportLabelId.ZoneId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: reportLabelId.UnitId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: reportLabelId.fromTodatePicker, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "treeCheckbox",
              labelName: "车辆类型:",
              labelId: reportLabelId.CarType, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              treeOps: carTypeOptions,
              treeChkboxProps: {
                label: "label",
                chidlren: "children"
              }
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
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "InstalledCount",
              headerVal: "应上线车辆总数",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UpCount",
              headerVal: "已上线车辆总数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "UpRate",
              headerVal: "上线率",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              labelName: "入网车辆数",
              subHeaders: [
                {
                  slabelName: "三类以上班线客车（不包含高速、超长）",
                  // subHeaders: {
                  //   ALLVehicle_sanlei: "应入网",
                  //   UplineVehicle_sanlei: "已入网",
                  //   UplineRate_sanlei: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_sanlei",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_sanlei",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_sanlei",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "高速客车",
                  // subHeaders: {
                  //   ALLVehicle_GAOSU: "应入网",
                  //   UplineVehicle_GAOSU: "已入网",
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_GAOSU",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_GAOSU",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_GAOSU",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "超长客车",
                  // subHeaders: {
                  //   ALLVehicle_CHAOCHANG: "应入网",
                  //   UplineVehicle_CHAOCHANG: "已入网",
                  //   UplineRate_CHAOCHANG: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_CHAOCHANG",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_CHAOCHANG",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_CHAOCHANG",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "旅游客车",
                  // subHeaders: {
                  //   ALLVehicle_LVYOU: "应入网",
                  //   UplineVehicle_LVYOU: "已入网",
                  //   UplineRate_LVYOU: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_LVYOU",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_LVYOU",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_LVYOU",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "包车客运",
                  // subHeaders: {
                  //   ALLVehicle_BAOCHE: "应入网",
                  //   UplineVehicle_BAOCHE: "已入网",
                  //   UplineRate_BAOCHE: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BAOCHE",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_BAOCHE",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_BAOCHE",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "危险品运输车",
                  // subHeaders: {
                  //   ALLVehicle_WEIXIAN: "应入网",
                  //   UplineVehicle_WEIXIAN: "已入网",
                  //   UplineRate_WEIXIAN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_WEIXIAN",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_WEIXIAN",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_WEIXIAN",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "重型货运运输车",
                  // subHeaders: {
                  //   ALLVehicle_ZHONGHUO: "应入网",
                  //   UplineVehicle_ZHONGHUO: "已入网",
                  //   UplineRate_ZHONGHUO: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_ZHONGHUO",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_ZHONGHUO",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_ZHONGHUO",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "半挂牵引车",
                  // subHeaders: {
                  //   ALLVehicle_BANGUA: "应入网",
                  //   UplineVehicle_BANGUA: "已入网",
                  //   UplineRate_BANGUA: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BANGUA",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_BANGUA",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_BANGUA",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "普通货车",
                  // subHeaders: {
                  //   ALLVehicle_puhuo: "应入网",
                  //   UplineVehicle_puhuo: "已入网",
                  //   UplineRate_puhuo: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_puhuo",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_puhuo",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_puhuo",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "农村客运",
                  // subHeaders: {
                  //   ALLVehicle_NONGCUN: "应入网",
                  //   UplineVehicle_NONGCUN: "已入网",
                  //   UplineRate_NONGCUN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_NONGCUN",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_NONGCUN",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_NONGCUN",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "驾培车",
                  // subHeaders: {
                  //   ALLVehicle_jiaolian: "应入网",
                  //   UplineVehicle_jiaolian: "已入网",
                  //   UplineRate_jiaolian: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_jiaolian",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_jiaolian",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_jiaolian",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "出租车",
                  // subHeaders: {
                  //   ALLVehicle_chuzu: "应入网",
                  //   UplineVehicle_chuzu: "已入网",
                  //   UplineRate_chuzu: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_chuzu",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_chuzu",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_chuzu",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "公交车",
                  // subHeaders: {
                  //   ALLVehicle_gongjiao: "应入网",
                  //   UplineVehicle_gongjiao: "已入网",
                  //   UplineRate_gongjiao: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_gongjiao",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_gongjiao",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_gongjiao",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "租赁客车",
                  // subHeaders: {
                  //   ALLVehicle_zulin: "应入网",
                  //   UplineVehicle_zulin: "已入网",
                  //   UplineRate_zulin: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_zulin",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_zulin",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_zulin",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "校园车辆",
                  // subHeaders: {
                  //   ALLVehicle_xiaoyuan: "应入网",
                  //   UplineVehicle_xiaoyuan: "已入网",
                  //   UplineRate_xiaoyuan: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_xiaoyuan",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_xiaoyuan",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_xiaoyuan",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "其他车",
                  // subHeaders: {
                  //   ALLVehicle_qita: "应入网",
                  //   UplineVehicle_qita: "已入网",
                  //   UplineRate_qita: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_qita",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_qita",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_qita",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   PlatformName: "2016-05-03",
            //   InstalledCount: "王小虎",
            //   UpCount: "上海",
            //   UpRate: "普陀区"
            // },
            // {
            //   PlatformName: "2016-05-03",
            //   InstalledCount: "王小虎",
            //   UpCount: "上海",
            //   UpRate: "普陀区"
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
              labelName: "运输企业:",
              labelId: reportLabelId.UnitId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: reportLabelId.ZoneId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: reportLabelId.PlatformId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: reportLabelId.fromTodatePicker, //该ID主要是用来判断在子组件中出发了哪一种个子组件
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
              headerKey: "CompanyZoneName",
              headerVal: "企业所属地区",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "CompanyName",
              headerVal: "企业名称",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "InstalledCount",
              headerVal: "应上线车辆总数",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UpCount",
              headerVal: "已上线车辆总数",
              subHeaders: [],
              columnType: this.columnType.router_link,
              router_link: commonConfig.routerConst.ProviderCheckDetail
            },
            {
              headerKey: "UpRate",
              headerVal: "上线率",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              labelName: "上线车辆数",
              subHeaders: [
                {
                  slabelName: "三类以上班线客车（不包含高速、超长）",
                  // subHeaders: {
                  //   ALLVehicle_sanlei: "应入网",
                  //   UplineVehicle_sanlei: "已入网",
                  //   UplineRate_sanlei: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_sanlei",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_sanlei",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_sanlei",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "高速客车",
                  // subHeaders: {
                  //   ALLVehicle_GAOSU: "应入网",
                  //   UplineVehicle_GAOSU: "已入网",
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_GAOSU",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_GAOSU",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_GAOSU",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "超长客车",
                  // subHeaders: {
                  //   ALLVehicle_CHAOCHANG: "应入网",
                  //   UplineVehicle_CHAOCHANG: "已入网",
                  //   UplineRate_CHAOCHANG: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_CHAOCHANG",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_CHAOCHANG",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_CHAOCHANG",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "旅游客车",
                  // subHeaders: {
                  //   ALLVehicle_LVYOU: "应入网",
                  //   UplineVehicle_LVYOU: "已入网",
                  //   UplineRate_LVYOU: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_LVYOU",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_LVYOU",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_LVYOU",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "包车客运",
                  // subHeaders: {
                  //   ALLVehicle_BAOCHE: "应入网",
                  //   UplineVehicle_BAOCHE: "已入网",
                  //   UplineRate_BAOCHE: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BAOCHE",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_BAOCHE",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_BAOCHE",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "危险品运输车",
                  // subHeaders: {
                  //   ALLVehicle_WEIXIAN: "应入网",
                  //   UplineVehicle_WEIXIAN: "已入网",
                  //   UplineRate_WEIXIAN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_WEIXIAN",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_WEIXIAN",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_WEIXIAN",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "重型货运运输车",
                  // subHeaders: {
                  //   ALLVehicle_ZHONGHUO: "应入网",
                  //   UplineVehicle_ZHONGHUO: "已入网",
                  //   UplineRate_ZHONGHUO: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_ZHONGHUO",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_ZHONGHUO",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_ZHONGHUO",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "半挂牵引车",
                  // subHeaders: {
                  //   ALLVehicle_BANGUA: "应入网",
                  //   UplineVehicle_BANGUA: "已入网",
                  //   UplineRate_BANGUA: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_BANGUA",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_BANGUA",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_BANGUA",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "普通货车",
                  // subHeaders: {
                  //   ALLVehicle_puhuo: "应入网",
                  //   UplineVehicle_puhuo: "已入网",
                  //   UplineRate_puhuo: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_puhuo",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_puhuo",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_puhuo",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "农村客运",
                  // subHeaders: {
                  //   ALLVehicle_NONGCUN: "应入网",
                  //   UplineVehicle_NONGCUN: "已入网",
                  //   UplineRate_NONGCUN: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_NONGCUN",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_NONGCUN",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_NONGCUN",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "驾培车",
                  // subHeaders: {
                  //   ALLVehicle_jiaolian: "应入网",
                  //   UplineVehicle_jiaolian: "已入网",
                  //   UplineRate_jiaolian: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_jiaolian",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_jiaolian",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_jiaolian",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "出租车",
                  // subHeaders: {
                  //   ALLVehicle_chuzu: "应入网",
                  //   UplineVehicle_chuzu: "已入网",
                  //   UplineRate_chuzu: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_chuzu",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_chuzu",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_chuzu",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "公交车",
                  // subHeaders: {
                  //   ALLVehicle_gongjiao: "应入网",
                  //   UplineVehicle_gongjiao: "已入网",
                  //   UplineRate_gongjiao: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_gongjiao",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_gongjiao",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_gongjiao",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "租赁客车",
                  // subHeaders: {
                  //   ALLVehicle_zulin: "应入网",
                  //   UplineVehicle_zulin: "已入网",
                  //   UplineRate_zulin: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_zulin",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_zulin",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_zulin",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "校园车辆",
                  // subHeaders: {
                  //   ALLVehicle_xiaoyuan: "应入网",
                  //   UplineVehicle_xiaoyuan: "已入网",
                  //   UplineRate_xiaoyuan: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_xiaoyuan",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_xiaoyuan",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_xiaoyuan",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                },
                {
                  slabelName: "其他车",
                  // subHeaders: {
                  //   ALLVehicle_qita: "应入网",
                  //   UplineVehicle_qita: "已入网",
                  //   UplineRate_qita: "入网率"
                  // }
                  ssubHeaders: [
                    {
                      headerKey: "ALLVehicle_qita",
                      headerVal: "应上线",
                      columnType: this.columnType.text
                    },
                    {
                      headerKey: "UplineVehicle_qita",
                      headerVal: "已上线",
                      columnType: this.columnType.router_link,
                      router_link: commonConfig.routerConst.ProviderCheckDetail
                    },
                    {
                      headerKey: "UplineRate_qita",
                      headerVal: "上线率",
                      columnType: this.columnType.text
                    }
                  ]
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   CompanyZoneName: "2016-05-03",
            //   CompanyName: "王小虎",
            //   InstalledCount: "上海",
            //   UpCount: "普陀区",
            //   UpRate: "上海市普陀区金沙江路 1518 弄"
            // },
            // {
            //   CompanyZoneName: "2016-05-03",
            //   CompanyName: "王小虎",
            //   InstalledCount: "上海",
            //   UpCount: "普陀区",
            //   UpRate: "上海市普陀区金沙江路 1518 弄"
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
              labelName: "接入平台:",
              labelId: reportLabelId.PlatformId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: reportLabelId.ZoneId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: reportLabelId.UnitId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: reportLabelId.fromTodatePicker, //该ID主要是用来判断在子组件中出发了哪一种个子组件
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
            {
              searchType: "select",
              labelName: "上线情况:",
              compVal: 1,
              options: [
                {
                  value: 1,
                  label: "已上线"
                },
                {
                  value: 0,
                  label: "未上线"
                },
                {
                  value: 2,
                  label: "全部"
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
              headerKey: "CompanyZoneName",
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
              headerKey: "CompanyName",
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
              headerKey: "GPSLastDate",
              headerVal: "GPS最后一次定位时间",
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
      const GetVehicleUplineDataParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.transCheckSourceData = [];
      axiosRequest
        .axiosGet(this.getVehicleUplineDataUrl, GetVehicleUplineDataParams)
        .then(function(response) {
          console.log(response.data);
          const detailListTemp = response.data.DetailList;
          for (let vehicleUplineItem of detailListTemp) {
            self.transCheckSourceData.push(
              self.pushSourceData(vehicleUplineItem, msg.activeName)
            );
          }
          self.tabCtntList[self.activeNameIndex].TabCtnt =
            self.transCheckSourceData;
          self.tabCtntList[self.activeNameIndex].total =
            response.data.CountTotal;
          self.tabCtntList[self.activeNameIndex].loading = false;
          self.tabCtntList[
            self.activeNameIndex
          ].btnEvents[1].isDisabled = false; //单击查询按钮后，使能导出数据、打印按钮
          // 在某些特殊的Tab需要加上明细 - 平台连通率明细
          self.tabCtntList[self.activeNameIndex].TabCtnt.push(
            self.pushSourceData(response.data.TotalList, msg.activeName)
          );
        })
        .catch(function(error) {});
    },
    // 将插入表的数据组装为一个函数
    pushSourceData: function(vehicleUplineItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: vehicleUplineItem.sybid,
            ZoneName: vehicleUplineItem.ZoneName,
            InstalledCount: vehicleUplineItem.InstalledCount,
            UpCount: vehicleUplineItem.UpCount,
            UpRate: vehicleUplineItem.UpRate,

            ALLVehicle_sanlei: vehicleUplineItem.ALLVehicle_sanlei,
            UplineVehicle_sanlei: vehicleUplineItem.UplineVehicle_sanlei,
            UplineRate_sanlei: vehicleUplineItem.UplineRate_sanlei,

            ALLVehicle_GAOSU: vehicleUplineItem.ALLVehicle_GAOSU,
            UplineVehicle_GAOSU: vehicleUplineItem.UplineVehicle_GAOSU,
            UplineRate_GAOSU: vehicleUplineItem.UplineRate_GAOSU,

            ALLVehicle_CHAOCHANG: vehicleUplineItem.ALLVehicle_CHAOCHANG,
            UplineVehicle_CHAOCHANG: vehicleUplineItem.UplineVehicle_CHAOCHANG,
            UplineRate_CHAOCHANG: vehicleUplineItem.UplineRate_CHAOCHANG,

            ALLVehicle_LVYOU: vehicleUplineItem.ALLVehicle_LVYOU,
            UplineVehicle_LVYOU: vehicleUplineItem.UplineVehicle_LVYOU,
            UplineRate_LVYOU: vehicleUplineItem.UplineRate_LVYOU,

            ALLVehicle_BAOCHE: vehicleUplineItem.ALLVehicle_BAOCHE,
            UplineVehicle_BAOCHE: vehicleUplineItem.UplineVehicle_BAOCHE,
            UplineRate_BAOCHE: vehicleUplineItem.UplineRate_BAOCHE,

            ALLVehicle_WEIXIAN: vehicleUplineItem.ALLVehicle_WEIXIAN,
            UplineVehicle_WEIXIAN: vehicleUplineItem.UplineVehicle_WEIXIAN,
            UplineRate_WEIXIAN: vehicleUplineItem.UplineRate_WEIXIAN,

            ALLVehicle_ZHONGHUO: vehicleUplineItem.ALLVehicle_ZHONGHUO,
            UplineVehicle_ZHONGHUO: vehicleUplineItem.UplineVehicle_ZHONGHUO,
            UplineRate_ZHONGHUO: vehicleUplineItem.UplineRate_ZHONGHUO,

            ALLVehicle_BANGUA: vehicleUplineItem.ALLVehicle_BANGUA,
            UplineVehicle_BANGUA: vehicleUplineItem.UplineVehicle_BANGUA,
            UplineRate_BANGUA: vehicleUplineItem.UplineRate_BANGUA,

            ALLVehicle_puhuo: vehicleUplineItem.ALLVehicle_puhuo,
            UplineVehicle_puhuo: vehicleUplineItem.UplineVehicle_puhuo,
            UplineRate_puhuo: vehicleUplineItem.UplineRate_puhuo,

            ALLVehicle_NONGCUN: vehicleUplineItem.ALLVehicle_NONGCUN,
            UplineVehicle_NONGCUN: vehicleUplineItem.UplineVehicle_NONGCUN,
            UplineRate_NONGCUN: vehicleUplineItem.UplineRate_NONGCUN,

            ALLVehicle_jiaolian: vehicleUplineItem.ALLVehicle_jiaolian,
            UplineVehicle_jiaolian: vehicleUplineItem.UplineVehicle_jiaolian,
            UplineRate_jiaolian: vehicleUplineItem.UplineRate_jiaolian,

            ALLVehicle_chuzu: vehicleUplineItem.ALLVehicle_chuzu,
            UplineVehicle_chuzu: vehicleUplineItem.UplineVehicle_chuzu,
            UplineRate_chuzu: vehicleUplineItem.UplineRate_chuzu,

            ALLVehicle_gongjiao: vehicleUplineItem.ALLVehicle_gongjiao,
            UplineVehicle_gongjiao: vehicleUplineItem.UplineVehicle_gongjiao,
            UplineRate_gongjiao: vehicleUplineItem.UplineRate_gongjiao,

            ALLVehicle_zulin: vehicleUplineItem.ALLVehicle_zulin,
            UplineVehicle_zulin: vehicleUplineItem.UplineVehicle_zulin,
            UplineRate_zulin: vehicleUplineItem.UplineRate_zulin,

            ALLVehicle_xiaoyuan: vehicleUplineItem.ALLVehicle_xiaoyuan,
            UplineVehicle_xiaoyuan: vehicleUplineItem.UplineVehicle_xiaoyuan,
            UplineRate_xiaoyuan: vehicleUplineItem.UplineRate_xiaoyuan,

            ALLVehicle_qita: vehicleUplineItem.ALLVehicle_qita,
            UplineVehicle_qita: vehicleUplineItem.UplineVehicle_qita,
            UplineRate_qita: vehicleUplineItem.UplineRate_qita
          };
          break;
        case this.tabNameObj.secTab.tabName:
          return {
            sybid: vehicleUplineItem.sybid,
            PlatformName: vehicleUplineItem.PlatformName,
            InstalledCount: vehicleUplineItem.InstalledCount,
            UpCount: vehicleUplineItem.UpCount,
            UpRate: vehicleUplineItem.UpRate,

            ALLVehicle_sanlei: vehicleUplineItem.ALLVehicle_sanlei,
            UplineVehicle_sanlei: vehicleUplineItem.UplineVehicle_sanlei,
            UplineRate_sanlei: vehicleUplineItem.UplineRate_sanlei,

            ALLVehicle_GAOSU: vehicleUplineItem.ALLVehicle_GAOSU,
            UplineVehicle_GAOSU: vehicleUplineItem.UplineVehicle_GAOSU,
            UplineRate_GAOSU: vehicleUplineItem.UplineRate_GAOSU,

            ALLVehicle_CHAOCHANG: vehicleUplineItem.ALLVehicle_CHAOCHANG,
            UplineVehicle_CHAOCHANG: vehicleUplineItem.UplineVehicle_CHAOCHANG,
            UplineRate_CHAOCHANG: vehicleUplineItem.UplineRate_CHAOCHANG,

            ALLVehicle_LVYOU: vehicleUplineItem.ALLVehicle_LVYOU,
            UplineVehicle_LVYOU: vehicleUplineItem.UplineVehicle_LVYOU,
            UplineRate_LVYOU: vehicleUplineItem.UplineRate_LVYOU,

            ALLVehicle_BAOCHE: vehicleUplineItem.ALLVehicle_BAOCHE,
            UplineVehicle_BAOCHE: vehicleUplineItem.UplineVehicle_BAOCHE,
            UplineRate_BAOCHE: vehicleUplineItem.UplineRate_BAOCHE,

            ALLVehicle_WEIXIAN: vehicleUplineItem.ALLVehicle_WEIXIAN,
            UplineVehicle_WEIXIAN: vehicleUplineItem.UplineVehicle_WEIXIAN,
            UplineRate_WEIXIAN: vehicleUplineItem.UplineRate_WEIXIAN,

            ALLVehicle_ZHONGHUO: vehicleUplineItem.ALLVehicle_ZHONGHUO,
            UplineVehicle_ZHONGHUO: vehicleUplineItem.UplineVehicle_ZHONGHUO,
            UplineRate_ZHONGHUO: vehicleUplineItem.UplineRate_ZHONGHUO,

            ALLVehicle_BANGUA: vehicleUplineItem.ALLVehicle_BANGUA,
            UplineVehicle_BANGUA: vehicleUplineItem.UplineVehicle_BANGUA,
            UplineRate_BANGUA: vehicleUplineItem.UplineRate_BANGUA,

            ALLVehicle_puhuo: vehicleUplineItem.ALLVehicle_puhuo,
            UplineVehicle_puhuo: vehicleUplineItem.UplineVehicle_puhuo,
            UplineRate_puhuo: vehicleUplineItem.UplineRate_puhuo,

            ALLVehicle_NONGCUN: vehicleUplineItem.ALLVehicle_NONGCUN,
            UplineVehicle_NONGCUN: vehicleUplineItem.UplineVehicle_NONGCUN,
            UplineRate_NONGCUN: vehicleUplineItem.UplineRate_NONGCUN,

            ALLVehicle_jiaolian: vehicleUplineItem.ALLVehicle_jiaolian,
            UplineVehicle_jiaolian: vehicleUplineItem.UplineVehicle_jiaolian,
            UplineRate_jiaolian: vehicleUplineItem.UplineRate_jiaolian,

            ALLVehicle_chuzu: vehicleUplineItem.ALLVehicle_chuzu,
            UplineVehicle_chuzu: vehicleUplineItem.UplineVehicle_chuzu,
            UplineRate_chuzu: vehicleUplineItem.UplineRate_chuzu,

            ALLVehicle_gongjiao: vehicleUplineItem.ALLVehicle_gongjiao,
            UplineVehicle_gongjiao: vehicleUplineItem.UplineVehicle_gongjiao,
            UplineRate_gongjiao: vehicleUplineItem.UplineRate_gongjiao,

            ALLVehicle_zulin: vehicleUplineItem.ALLVehicle_zulin,
            UplineVehicle_zulin: vehicleUplineItem.UplineVehicle_zulin,
            UplineRate_zulin: vehicleUplineItem.UplineRate_zulin,

            ALLVehicle_xiaoyuan: vehicleUplineItem.ALLVehicle_xiaoyuan,
            UplineVehicle_xiaoyuan: vehicleUplineItem.UplineVehicle_xiaoyuan,
            UplineRate_xiaoyuan: vehicleUplineItem.UplineRate_xiaoyuan,

            ALLVehicle_qita: vehicleUplineItem.ALLVehicle_qita,
            UplineVehicle_qita: vehicleUplineItem.UplineVehicle_qita,
            UplineRate_qita: vehicleUplineItem.UplineRate_qita
          };
          break;
        case this.tabNameObj.thiTab.tabName:
          return {
            sybid: vehicleUplineItem.sybid,
            CompanyZoneName: vehicleUplineItem.CompanyZoneName,
            CompanyName: vehicleUplineItem.CompanyName,
            InstalledCount: vehicleUplineItem.InstalledCount,
            UpCount: vehicleUplineItem.UpCount,
            UpRate: vehicleUplineItem.UpRate,

            ALLVehicle_sanlei: vehicleUplineItem.ALLVehicle_sanlei,
            UplineVehicle_sanlei: vehicleUplineItem.UplineVehicle_sanlei,
            UplineRate_sanlei: vehicleUplineItem.UplineRate_sanlei,

            ALLVehicle_GAOSU: vehicleUplineItem.ALLVehicle_GAOSU,
            UplineVehicle_GAOSU: vehicleUplineItem.UplineVehicle_GAOSU,
            UplineRate_GAOSU: vehicleUplineItem.UplineRate_GAOSU,

            ALLVehicle_CHAOCHANG: vehicleUplineItem.ALLVehicle_CHAOCHANG,
            UplineVehicle_CHAOCHANG: vehicleUplineItem.UplineVehicle_CHAOCHANG,
            UplineRate_CHAOCHANG: vehicleUplineItem.UplineRate_CHAOCHANG,

            ALLVehicle_LVYOU: vehicleUplineItem.ALLVehicle_LVYOU,
            UplineVehicle_LVYOU: vehicleUplineItem.UplineVehicle_LVYOU,
            UplineRate_LVYOU: vehicleUplineItem.UplineRate_LVYOU,

            ALLVehicle_BAOCHE: vehicleUplineItem.ALLVehicle_BAOCHE,
            UplineVehicle_BAOCHE: vehicleUplineItem.UplineVehicle_BAOCHE,
            UplineRate_BAOCHE: vehicleUplineItem.UplineRate_BAOCHE,

            ALLVehicle_WEIXIAN: vehicleUplineItem.ALLVehicle_WEIXIAN,
            UplineVehicle_WEIXIAN: vehicleUplineItem.UplineVehicle_WEIXIAN,
            UplineRate_WEIXIAN: vehicleUplineItem.UplineRate_WEIXIAN,

            ALLVehicle_ZHONGHUO: vehicleUplineItem.ALLVehicle_ZHONGHUO,
            UplineVehicle_ZHONGHUO: vehicleUplineItem.UplineVehicle_ZHONGHUO,
            UplineRate_ZHONGHUO: vehicleUplineItem.UplineRate_ZHONGHUO,

            ALLVehicle_BANGUA: vehicleUplineItem.ALLVehicle_BANGUA,
            UplineVehicle_BANGUA: vehicleUplineItem.UplineVehicle_BANGUA,
            UplineRate_BANGUA: vehicleUplineItem.UplineRate_BANGUA,

            ALLVehicle_puhuo: vehicleUplineItem.ALLVehicle_puhuo,
            UplineVehicle_puhuo: vehicleUplineItem.UplineVehicle_puhuo,
            UplineRate_puhuo: vehicleUplineItem.UplineRate_puhuo,

            ALLVehicle_NONGCUN: vehicleUplineItem.ALLVehicle_NONGCUN,
            UplineVehicle_NONGCUN: vehicleUplineItem.UplineVehicle_NONGCUN,
            UplineRate_NONGCUN: vehicleUplineItem.UplineRate_NONGCUN,

            ALLVehicle_jiaolian: vehicleUplineItem.ALLVehicle_jiaolian,
            UplineVehicle_jiaolian: vehicleUplineItem.UplineVehicle_jiaolian,
            UplineRate_jiaolian: vehicleUplineItem.UplineRate_jiaolian,

            ALLVehicle_chuzu: vehicleUplineItem.ALLVehicle_chuzu,
            UplineVehicle_chuzu: vehicleUplineItem.UplineVehicle_chuzu,
            UplineRate_chuzu: vehicleUplineItem.UplineRate_chuzu,

            ALLVehicle_gongjiao: vehicleUplineItem.ALLVehicle_gongjiao,
            UplineVehicle_gongjiao: vehicleUplineItem.UplineVehicle_gongjiao,
            UplineRate_gongjiao: vehicleUplineItem.UplineRate_gongjiao,

            ALLVehicle_zulin: vehicleUplineItem.ALLVehicle_zulin,
            UplineVehicle_zulin: vehicleUplineItem.UplineVehicle_zulin,
            UplineRate_zulin: vehicleUplineItem.UplineRate_zulin,

            ALLVehicle_xiaoyuan: vehicleUplineItem.ALLVehicle_xiaoyuan,
            UplineVehicle_xiaoyuan: vehicleUplineItem.UplineVehicle_xiaoyuan,
            UplineRate_xiaoyuan: vehicleUplineItem.UplineRate_xiaoyuan,

            ALLVehicle_qita: vehicleUplineItem.ALLVehicle_qita,
            UplineVehicle_qita: vehicleUplineItem.UplineVehicle_qita,
            UplineRate_qita: vehicleUplineItem.UplineRate_qita
          };
          break;
        case this.tabNameObj.fouTab.tabName:
          return {
            sybid: vehicleUplineItem.sybid,
            LicensePlat: vehicleUplineItem.LicensePlat,
            PlateColor: vehicleUplineItem.PlateColor,
            CompanyZoneName: vehicleUplineItem.CompanyZoneName,
            CityName: vehicleUplineItem.CityName,
            CompanyName: vehicleUplineItem.CompanyName,
            VehicleType: vehicleUplineItem.VehicleType,
            PlatformName: vehicleUplineItem.PlatformName,
            GPSLastDate: vehicleUplineItem.GPSLastDate
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
      const exportvehicleUplineDataParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage //是否分页 - 导出数据
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //下载数据的时候，显示正在下载数据的logo
      axiosRequest
        .axiosGet(
          this.exportVehicleUplineDataUrl,
          exportvehicleUplineDataParams
        )
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
          break;
        case this.tabNameObj.secTab.tabName:
          this.activeNameIndex = 1;
          nType = this.tabNameObj.secTab.nType;
          break;
        case this.tabNameObj.thiTab.tabName:
          this.activeNameIndex = 2;
          nType = this.tabNameObj.thiTab.nType;
          break;
        case this.tabNameObj.fouTab.tabName:
          this.activeNameIndex = 3;
          nType = this.tabNameObj.fouTab.nType;
          break;
        default:
      }
      //统一为每一种类型赋值，而不需要单独判断
      for (let msgItem of msg) {
        switch (msgItem.labelId) {
          case reportLabelId.ZoneId:
            zoneId = msgItem.compId;
            break;
          case reportLabelId.PlatformId:
            platformId = msgItem.compId;
            break;
          case reportLabelId.fromTodatePicker:
            beginDate = msgItem.compVal[0]; //时间起
            endDate = msgItem.compVal[1]; //时间止
            break;
          case reportLabelId.CarType:
            carType = msgItem.compVal;
            break;
          case reportLabelId.UnitId:
            unitId = msgItem.compId;
            break;
          case reportLabelId.IsIncludeLower:
            isIncludeLower = msgItem.compVal;
            break;
          case reportLabelId.VehicleId:
            vehicleId = msgItem.compId;
            break;
          case reportLabelId.InstallID:
            installID = msgItem.compVal;
            break;
          case reportLabelId.UpLineFlag:
            upLineFlag = msgItem.compVal;
            break;
          case reportLabelId.CheckUnitID:
            checkUnitID = msgItem.compVal;
            break;
          case reportLabelId.CheckType:
            checkType = msgItem.compVal;
            break;
          case reportLabelId.IsOnGuard:
            isOnGuard = msgItem.compVal;
            break;
          case reportLabelId.TargetUserId:
            targetUserId = msgItem.compVal;
            break;
          case reportLabelId.DeviceID:
            deviceID = msgItem.compVal;
            break;
          case reportLabelId.GPSInstalled:
            gPSInstalled = msgItem.compVal;
            break;
          default:
        }
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
