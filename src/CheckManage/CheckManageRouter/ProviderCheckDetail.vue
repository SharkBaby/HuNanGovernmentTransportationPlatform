<template>
  <div class="ProviderCheckDetail">
    <multi-level-table-component 
    :activeName="activeName" 
    :tabCtntList="tabCtntList" 
    class="zone-check-multilevel"
    v-on:handleClickSearch="handleClickSearch"
    v-on:handleClickExpData="handleClickExpData"
    v-on:handleCurrentChange="handleCurrentChange"></multi-level-table-component>
  </div>
</template>

<style src="./checkManageRouter.css" type="text/css">
</style>

<script>
import MultiLevelTableComponent from "@/components/MultiLevelTableComponent/MultiLevelTableComponent";
import { axiosRequest } from "@/common/common";
import { commonConfig } from "@/config/commonConfig";
export default {
  name: "ProviderCheckDetail",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "check_report_vehicleinstall_detail_table",
      activeNameIndex: 0,
      getProviderCheckDetailDataUrl: commonConfig.rootUrl + commonConfig.GetProviderCheckDetailData,
      exportProviderCheckDetailDataUrl: commonConfig.rootUrl + commonConfig.ExportProviderCheckDetailData,
      // // 每一大列的满分得分
      // columnFullScore: {
      //   rwl: 5,
      //   sxl: 10,
      //   wxpyl: 15,
      //   gjwzl: 40,
      //   sjhgl: 30,
      //   pjcscs: 0,
      //   pjpjsc: 0
      // },
      // 每一列的类型，目前已经有纯文本和router-link
      columnType: {
        text: "text",
        router_link: "router_link"
      },
      // 存储每10行的数据
      providerCheckSourceData: [],
      // 存储合计的数据
      countData: [],
      // tabName作为标识符
      tabNameObj: {
        firTab: {
          tabLabel: "入网明细",
          tabName: "check_report_vehicleinstall_detail_table", //将作为标识符来区分
          nType: 1 //根据重构前的请求，可以看到nType 为1
        },
        secTab: {
          tabLabel: "上线明细",
          tabName: "check_report_vehicleuplinerate_detail_table", //将作为标识符来区分
          nType: 2 //根据重构前的请求，可以看到nType 为2
        },
        thiTab: {
          tabLabel: "平台连通率明细",
          tabName: "check_report_vehicleconnectrate_detail_table", //将作为标识符来区分
          nType: 3 //根据重构前的请求，可以看到nType 为3
        },
        fouTab: {
          tabLabel: "轨迹完整率",
          tabName: "check_report_vehicletrail_detail_table", //将作为标识符来区分
          nType: 4 //根据重构前的请求，可以看到nType 为4
        },
        fifTab: {
          tabLabel: "数据合格率明细",
          tabName: "check_report_vehiclestandard_detail_table", //将作为标识符来区分
          nType: 5 //根据重构前的请求，可以看到nType 为5
        },
        sixTab: {
          tabLabel: "车辆平均超速明细",
          tabName: "check_report_vehicleoverspeed_detail_table", //将作为标识符来区分
          nType: 6 //根据重构前的请求，可以看到nType 为6
        },
        svnTab: {
          tabLabel: "车辆平均疲驾明细",
          tabName: "check_report_vehicletired_detail_table", //将作为标识符来区分
          nType: 7 //根据重构前的请求，可以看到nType 为7
        },
        egtTab: {
          tabLabel: "车辆漂移明细",
          tabName: "check_report_vehicledrift_detail_table", //将作为标识符来区分
          nType: 8 //根据重构前的请求，可以看到nType 为8
        },
        ninTab: {
          tabLabel: "平台查岗响应率明细",
          tabName: "check_report_vehicleresponse_detail_table", //将作为标识符来区分
          nType: 9 //根据重构前的请求，可以看到nType 为9
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
          total: 0, //总条数,
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
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "singleDayPicker",
              itemTitle: "日期止:",
              labelId: "EndDate", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
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
              labelName: "GPS入网情况:",
              labelId: "InstallID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
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
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: []
            },
            {
              headerKey: "ZName",
              headerVal: "车辆所属地区",
              subHeaders: []
            },
            {
              headerKey: "CityName",
              headerVal: "企业所属市(州)",
              subHeaders: []
            },
            {
              headerKey: "UnitName",
              headerVal: "企业名称",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "GPSInstalled",
              headerVal: "GPS入网情况",
              subHeaders: []
            },
            {
              headerKey: "GPSTime",
              headerVal: "GPS最后一次定位",
              subHeaders: []
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
            }
          ],
          TabCtnt: [
            //   {
            //     LicensePlat: "2016-05-03",
            //     PlateColor: "王小虎",
            //     ZName: "上海",
            //     CityName: "普陀区",
            //     UnitName: "上海市普陀区金沙江路 1518 弄",
            //     VehicleType: 200333
            //   },
            //   {
            //     LicensePlat: "2016-05-03",
            //     PlateColor: "王小虎",
            //     ZName: "上海",
            //     CityName: "普陀区",
            //     UnitName: "上海市普陀区金沙江路 1518 弄",
            //     VehicleType: 200333
            //   }
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
              labelName: "车牌号:",
              labelId: "VehicleId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            },
            {
              searchType: "select",
              itemTitle: "",
              labelName: "上线情况:",
              labelId: "UpLineFlag", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
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
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: []
            },
            {
              headerKey: "CompanyZoneName",
              headerVal: "车辆所属地区",
              subHeaders: []
            },
            {
              headerKey: "CityName",
              headerVal: "企业所属市(州)",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "企业名称",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "GPSLastDate",
              headerVal: "GPS最后一次定位时间",
              subHeaders: []
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   LicensePlat: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZName: "上海",
            //   CityName: "普陀区",
            //   UnitName: "上海市普陀区金沙江路 1518 弄",
            //   VehicleType: 200333
            // },
            // {
            //   LicensePlat: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZName: "上海",
            //   CityName: "普陀区",
            //   UnitName: "上海市普陀区金沙江路 1518 弄",
            //   VehicleType: 200333
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
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "所属地区:",
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
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "Name",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "OnlineTime",
              headerVal: "正常连接时长（小时）",
              subHeaders: []
            },
            {
              headerKey: "TotalTime",
              headerVal: "总时长（小时）",
              subHeaders: []
            },
            {
              headerKey: "OnlineRate",
              headerVal: "平台连通率（%）",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   Name: "2016-05-03",
            //   OnlineTime: "王小虎",
            //   TotalTime: "上海",
            //   OnlineRate: "普陀区"
            // },
            // {
            //   Name: "2016-05-03",
            //   OnlineTime: "王小虎",
            //   TotalTime: "上海",
            //   OnlineRate: "普陀区"
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
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: []
            },
            {
              headerKey: "CompanyZoneName",
              headerVal: "企业所属地区",
              subHeaders: []
            },
            {
              headerKey: "CityName",
              headerVal: "企业所属市(州)",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "企业名称",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "InteDistance",
              headerVal: "轨迹完整里程（千米）",
              subHeaders: []
            },
            {
              headerKey: "UninteDistance",
              headerVal: "轨迹不完整里程（千米）",
              subHeaders: []
            },
            {
              headerKey: "AllDistance",
              headerVal: "总里程（千米）",
              subHeaders: []
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
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
            // },
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
            // },
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
              compVal: ""
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: []
            },
            {
              headerKey: "CompanyZoneName",
              headerVal: "企业所属地区",
              subHeaders: []
            },
            {
              headerKey: "CityName",
              headerVal: "企业所属市(州)",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "企业名称",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "AllData",
              headerVal: "总条数",
              subHeaders: []
            },
            {
              headerKey: "ValidData",
              headerVal: "合格条数",
              subHeaders: []
            },
            {
              labelName: "不合格条数",
              // subHeaders: {
              //   InValidData: "不合格条数",
              //   LicensePlatAbnormal: "车牌号码",
              //   PlateColorAbnormal: "车牌颜色",
              //   LocAbnormal: "经纬度",
              //   HeightAbnormal: "海拔",
              //   SpeedAbnormal: "速度",
              //   DirAbnormal: "方向角",
              //   TimeAbnormal: "定位时间"
              // }
              subHeaders: [
                {
                  headerKey: "InValidData",
                  headerVal: "不合格条数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "LicensePlatAbnormal",
                  headerVal: "车牌号码",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "PlateColorAbnormal",
                  headerVal: "车牌颜色",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "LocAbnormal",
                  headerVal: "经纬度",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "HeightAbnormal",
                  headerVal: "海拔",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "SpeedAbnormal",
                  headerVal: "速度",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "DirAbnormal",
                  headerVal: "方向角",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "TimeAbnormal",
                  headerVal: "定位时间",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
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
            // },
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
            // },
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
        },
        {
          tabLabel: this.tabNameObj.sixTab.tabLabel,
          tabName: this.tabNameObj.sixTab.tabName, //将作为标识符来区分
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
              compVal: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "所属道路运输企业",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "BDate",
              headerVal: "超速开始时间",
              subHeaders: []
            },
            {
              headerKey: "EDate",
              headerVal: "超速结束时间",
              subHeaders: []
            },
            {
              headerKey: "ContinueTime",
              headerVal: "持续时长",
              subHeaders: []
            },
            {
              headerKey: "SpeedLimit",
              headerVal: "限速（km/h）",
              subHeaders: []
            },
            {
              headerKey: "Speed",
              headerVal: "最高速度（km/h）",
              subHeaders: []
            },
            {
              headerKey: "OverspeedRate",
              headerVal: "超速率（%）",
              subHeaders: []
            },
            {
              headerKey: "ZoneName",
              headerVal: "车辆所属地区",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "BLocation",
              headerVal: "开始位置",
              subHeaders: []
            },
            {
              headerKey: "ELocation",
              headerVal: "结束位置",
              subHeaders: []
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   LicensePlat: "2016-05-03",
            //   CompanyName: "王小虎",
            //   PlatformName: "上海",
            //   BDate: "普陀区",
            //   EDate: "上海市普陀区金沙江路 1518 弄",
            //   ContinueTime: 200333
            // },
            // {
            //   LicensePlat: "2016-05-03",
            //   CompanyName: "王小虎",
            //   PlatformName: "上海",
            //   BDate: "普陀区",
            //   EDate: "上海市普陀区金沙江路 1518 弄",
            //   ContinueTime: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.svnTab.tabLabel,
          tabName: this.tabNameObj.svnTab.tabName, //将作为标识符来区分
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
              compVal: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [],
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "ZoneName",
              headerVal: "车辆所属地区",
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "所属道路运输企业",
              subHeaders: []
            },
            {
              headerKey: "BDate",
              headerVal: "开始时间",
              subHeaders: []
            },
            {
              headerKey: "EDate",
              headerVal: "结束时间",
              subHeaders: []
            },
            {
              headerKey: "ContinueTime",
              headerVal: "持续时长",
              subHeaders: []
            },
            {
              headerKey: "BLocation",
              headerVal: "开始位置",
              subHeaders: []
            },
            {
              headerKey: "ELocation",
              headerVal: "结束位置",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   LicensePlat: "2016-05-03",
            //   CompanyName: "王小虎",
            //   PlatformName: "上海",
            //   BDate: "普陀区",
            //   EDate: "上海市普陀区金沙江路 1518 弄",
            //   ContinueTime: 200333
            // },
            // {
            //   LicensePlat: "2016-05-03",
            //   CompanyName: "王小虎",
            //   PlatformName: "上海",
            //   BDate: "普陀区",
            //   EDate: "上海市普陀区金沙江路 1518 弄",
            //   ContinueTime: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.egtTab.tabLabel,
          tabName: this.tabNameObj.egtTab.tabName, //将作为标识符来区分
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
              compVal: ""
            },
            {
              searchType: "input",
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "接入平台:",
              labelId: "PlatformId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: "fromTodatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "checkbox",
              labelName: "车辆类型：",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: [], //注意：如果是checkbox类型，这里的默认数据类型是array,需要进行push操作
              options: [
                {
                  value: 0x0001,
                  label: "三类以上班线客车"
                },
                {
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  value: 0x0080, // this value is customized by Perry,not securate
                  label: "危险品运输车"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "LicensePlat",
              headerVal: "车牌号",
              subHeaders: []
            },
            {
              headerKey: "PlateColor",
              headerVal: "车牌颜色",
              subHeaders: []
            },
            {
              headerKey: "ZoneName",
              headerVal: "车辆所属地区",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "企业名称",
              subHeaders: []
            },
            {
              headerKey: "VehicleType",
              headerVal: "车辆类型",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: []
            },
            {
              headerKey: "Bs",
              headerVal: "车辆经营范围",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   LicensePlat: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   CompanyName: "普陀区",
            //   VehicleType: "上海市普陀区金沙江路 1518 弄",
            //   platformName: 200333
            // },
            // {
            //   LicensePlat: "2016-05-03",
            //   CompanyName: "王小虎",
            //   PlatformName: "上海",
            //   BDate: "普陀区",
            //   EDate: "上海市普陀区金沙江路 1518 弄",
            //   ContinueTime: 200333
            // },
            // {
            //   LicensePlat: "2016-05-03",
            //   CompanyName: "王小虎",
            //   PlatformName: "上海",
            //   BDate: "普陀区",
            //   EDate: "上海市普陀区金沙江路 1518 弄",
            //   ContinueTime: 200333
            // }
          ]
        },
        {
          tabLabel: this.tabNameObj.ninTab.tabLabel,
          tabName: this.tabNameObj.ninTab.tabName, //将作为标识符来区分
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
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: "" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "input",
              labelName: "所属地区:",
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
              searchType: "input",
              labelName: "查岗人:",
              labelId: "TargetUserId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "input",
              labelName: "查岗机构:",
              labelId: "CheckUnitID", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "select",
              labelName: "查岗方式:",
              labelId: "CheckType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: -1,
                  label: "全部"
                },
                {
                  value: 0,
                  label: "自动"
                },
                {
                  value: 1,
                  label: "手动"
                }
              ]
            },
            {
              searchType: "select",
              labelName: "是否在岗:",
              labelId: "IsOnGuard", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: -1,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "是"
                },
                {
                  value: 0,
                  label: "否"
                }
              ]
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "CompanyName",
              headerVal: "运输企业",
              subHeaders: []
            },
            {
              headerKey: "ZoneName",
              headerVal: "企业所属地区",
              subHeaders: []
            },
            {
              headerKey: "IsOnGuard",
              headerVal: "是否在岗",
              subHeaders: []
            },
            {
              headerKey: "CheckDate",
              headerVal: "查岗时间",
              subHeaders: []
            },
            {
              headerKey: "Question",
              headerVal: "查岗问题",
              subHeaders: []
            },
            {
              headerKey: "CheckUserName",
              headerVal: "查岗人",
              subHeaders: []
            },
            {
              headerKey: "CheckUnitName",
              headerVal: "查岗机构",
              subHeaders: []
            },
            {
              headerKey: "ConfirmDate",
              headerVal: "应答时间",
              subHeaders: []
            },
            {
              headerKey: "Answer",
              headerVal: "应答答案",
              subHeaders: []
            },
            {
              headerKey: "ConfirmUserName",
              headerVal: "应答人",
              subHeaders: []
            },
            {
              headerKey: "CheckMode",
              headerVal: "查岗方式",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   CompanyName: "2016-05-03",
            //   ZoneName: "王小虎",
            //   IsOnGuard: "上海",
            //   CheckDate: "普陀区",
            //   Question: "上海市普陀区金沙江路 1518 弄",
            //   CheckUserName: 200333
            // },
            // {
            //   CompanyName: "2016-05-03",
            //   ZoneName: "王小虎",
            //   IsOnGuard: "上海",
            //   CheckDate: "普陀区",
            //   Question: "上海市普陀区金沙江路 1518 弄",
            //   CheckUserName: 200333
            // },
            // {
            //   CompanyName: "2016-05-03",
            //   ZoneName: "王小虎",
            //   IsOnGuard: "上海",
            //   CheckDate: "普陀区",
            //   Question: "上海市普陀区金沙江路 1518 弄",
            //   CheckUserName: 200333
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
      const getProviderCheckDetailDataParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.providerCheckSourceData = [];
      axiosRequest
        .axiosGet(
          this.getProviderCheckDetailDataUrl,
          getProviderCheckDetailDataParams
        )
        .then(function(response) {
          const providerCheckRankTemp = response.data.DetailList;
          for (let providerCheckItem of providerCheckRankTemp) {
            self.providerCheckSourceData.push(
              self.pushSourceData(providerCheckItem, msg.activeName)
            );
          }
          self.tabCtntList[self.activeNameIndex].TabCtnt =
            self.providerCheckSourceData;
          self.tabCtntList[self.activeNameIndex].total = response.data.CountTotal;
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
    pushSourceData: function(providerCheckItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            LicensePlat: providerCheckItem.LicensePlat,
            PlateColor: providerCheckItem.PlateColor,
            ZName: providerCheckItem.ZName,
            CityName: providerCheckItem.CityName,
            UnitName: providerCheckItem.UnitName,
            VehicleType: providerCheckItem.VehicleType,
            PlatformName: providerCheckItem.PlatformName,
            GPSInstalled: providerCheckItem.GPSInstalled,
            GPSTime: providerCheckItem.GPSTime,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.secTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            LicensePlat: providerCheckItem.LicensePlat,
            PlateColor: providerCheckItem.PlateColor,
            CompanyZoneName: providerCheckItem.CompanyZoneName,
            CityName: providerCheckItem.CityName,
            CompanyName: providerCheckItem.CompanyName,
            VehicleType: providerCheckItem.VehicleType,
            PlatformName: providerCheckItem.PlatformName,
            GPSLastDate: providerCheckItem.GPSLastDate,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.thiTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            Name: providerCheckItem.Name,
            OnlineTime: providerCheckItem.OnlineTime,
            TotalTime: providerCheckItem.TotalTime,
            CityName: providerCheckItem.CityName,
            OnlineRate: providerCheckItem.OnlineRate
          };
          break;
        case this.tabNameObj.fouTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            LicensePlat: providerCheckItem.LicensePlat,
            PlateColor: providerCheckItem.PlateColor,
            CompanyZoneName: providerCheckItem.CompanyZoneName,
            CityName: providerCheckItem.CityName,
            CompanyName: providerCheckItem.CompanyName,
            VehicleType: providerCheckItem.VehicleType,
            PlatformName: providerCheckItem.PlatformName,
            InteDistance: providerCheckItem.InteDistance,
            UninteDistance: providerCheckItem.UninteDistance,
            AllDistance: providerCheckItem.AllDistance,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.fifTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            LicensePlat: providerCheckItem.LicensePlat,
            PlateColor: providerCheckItem.PlateColor,
            CompanyZoneName: providerCheckItem.CompanyZoneName,
            CityName: providerCheckItem.CityName,
            CompanyName: providerCheckItem.CompanyName,
            VehicleType: providerCheckItem.VehicleType,
            PlatformName: providerCheckItem.PlatformName,
            AllData: providerCheckItem.AllData,
            ValidData: providerCheckItem.ValidData,
            InValidData: providerCheckItem.InValidData,
            LicensePlatAbnormal: providerCheckItem.LicensePlatAbnormal,
            PlateColorAbnormal: providerCheckItem.PlateColorAbnormal,
            LocAbnormal: providerCheckItem.LocAbnormal,
            HeightAbnormal: providerCheckItem.HeightAbnormal,
            SpeedAbnormal: providerCheckItem.SpeedAbnormal,
            DirAbnormal: providerCheckItem.DirAbnormal,
            TimeAbnormal: providerCheckItem.TimeAbnormal,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.sixTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            LicensePlat: providerCheckItem.LicensePlat,
            CompanyName: providerCheckItem.CompanyName,
            PlatformName: providerCheckItem.PlatformName,
            BDate: providerCheckItem.BDate,
            EDate: providerCheckItem.EDate,
            ContinueTime: providerCheckItem.ContinueTime,
            SpeedLimit: providerCheckItem.SpeedLimit,
            Speed: providerCheckItem.Speed,
            OverspeedRate: providerCheckItem.OverspeedRate,
            ZoneName: providerCheckItem.ZoneName,
            VehicleType: providerCheckItem.VehicleType,
            BLocation: providerCheckItem.BLocation,
            ELocation: providerCheckItem.ELocation,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.svnTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            ZoneName: providerCheckItem.ZoneName,
            LicensePlat: providerCheckItem.LicensePlat,
            VehicleType: providerCheckItem.VehicleType,
            CompanyName: providerCheckItem.CompanyName,
            BDate: providerCheckItem.BDate,
            EDate: providerCheckItem.EDate,
            BLocation: providerCheckItem.BLocation,
            ELocation: providerCheckItem.ELocation,
            PlatformName: providerCheckItem.PlatformName,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.egtTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            LicensePlat: providerCheckItem.LicensePlat,
            PlateColor:  providerCheckItem.PlateColor,
            ZoneName: providerCheckItem.ZoneName,
            CompanyName: providerCheckItem.CompanyName,
            VehicleType: providerCheckItem.VehicleType,
            PlatformName: providerCheckItem.PlatformName,
            Bs: providerCheckItem.Bs
          };
          break;
        case this.tabNameObj.ninTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            CompanyName: providerCheckItem.CompanyName,
            ZoneName: providerCheckItem.ZoneName,
            IsOnGuard: providerCheckItem.IsOnGuard,
            CheckDate: providerCheckItem.CheckDate,
            Question: providerCheckItem.Question,
            CheckUserName: providerCheckItem.CheckUserName,
            CheckUnitName: providerCheckItem.CheckUnitName,
            ConfirmDate: providerCheckItem.ConfirmDate,
            Answer: providerCheckItem.Answer,
            ConfirmUserName: providerCheckItem.ConfirmUserName,
            CheckMode: providerCheckItem.CheckMode
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
      const exportProviderCheckDetailDataParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage //是否分页 - 导出数据
      );
      self.tabCtntList[self.activeNameIndex].loading = true;//下载数据的时候，显示正在下载数据的logo
      axiosRequest
        .axiosGet(
          this.exportProviderCheckDetailDataUrl,
          exportProviderCheckDetailDataParams
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
        vehicleId = "", //入网明细 - 车牌号
        zoneId = "", //入网明细 - 所属地区
        platformId = "", //入网明细 - 接入平台
        unitId = "", //入网明细 - 运输企业
        endDate = "", //入网明细 - 日期止
        carType = 0, //入网明细 - 车辆类型：
        installID = "", //入网明细 - GPS入网情况
        upLineFlag = "", //上线明细 - 上线情况
        beginDate = "", //上线明细 - 事件止

        isOnGuard = "", //平台查岗响应率明细 - 是否在岗
        checkType = "", //平台查岗响应率明细 - 查岗方式
        checkUnitID = "", //平台查岗响应率明细 - 查岗机构
        targetUserId = "", //平台查岗响应率明细 - 查岗人

        pageSize = 10, //默认参数 - 分页大小
        readPage = "", //默认参数 - 目前还不清楚这个参数的作用
        isIncludeLower = 1,
        sortName = "",
        sortOrder = "";
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          this.activeNameIndex = 0;
          nType = this.tabNameObj.firTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId")
              platformId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "EndDate") endDate = msgItem.compVal;
            else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            } else if (msgItem.labelId === "InstallID")
              installID = msgItem.compVal;
          }
          break;
        case this.tabNameObj.secTab.tabName:
          this.activeNameIndex = 1;
          nType = this.tabNameObj.secTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            } else if (msgItem.labelId === "UpLineFlag")
              upLineFlag = msgItem.compVal;
          }
          break;
        case this.tabNameObj.thiTab.tabName:
          this.activeNameIndex = 2;
          nType = this.tabNameObj.thiTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            }
          }
          break;
        case this.tabNameObj.fouTab.tabName:
          this.activeNameIndex = 3;
          nType = this.tabNameObj.fouTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            }
          }
          break;
        case this.tabNameObj.fifTab.tabName:
          this.activeNameIndex = 4;
          nType = this.tabNameObj.fifTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            }
          }
          break;
        case this.tabNameObj.sixTab.tabName:
          this.activeNameIndex = 5;
          nType = this.tabNameObj.sixTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            }
          }
          break;
        case this.tabNameObj.svnTab.tabName:
          this.activeNameIndex = 6;
          nType = this.tabNameObj.svnTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            }
          }
          break;
        case this.tabNameObj.egtTab.tabName:
          this.activeNameIndex = 7;
          nType = this.tabNameObj.egtTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "VehicleId") vehicleId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId") platformId = msgItem.compId;
            else if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            }
          }
          break;
        case this.tabNameObj.ninTab.tabName:
          this.activeNameIndex = 8;
          nType = this.tabNameObj.ninTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "fromTodatePicker") {
              beginDate = msgItem.compVal[0]; //时间起
              endDate = msgItem.compVal[1]; //时间止
            }
            else if (msgItem.labelId === "TargetUserId") targetUserId = msgItem.compVal;
            else if (msgItem.labelId === "CheckUnitID") checkUnitID = msgItem.compVal;
            else if (msgItem.labelId === "CheckType") checkType = msgItem.compVal;
            else if (msgItem.labelId === "IsOnGuard") isOnGuard = msgItem.compVal;
          }
          break;
        default:
      }
      return {
        nType,
        vehicleId, //入网明细 - 车牌号
        zoneId, //入网明细 - 所属地区
        platformId, //入网明细 - 接入平台
        unitId, //入网明细 - 运输企业
        endDate, //入网明细 - 日期止
        carType, //入网明细 - 车辆类型：
        installID, //入网明细 - GPS入网情况
        upLineFlag,
        beginDate,

        isOnGuard,
        checkType,
        checkUnitID,
        targetUserId,

        isSplitPage, //默认参数 - 是否分页
        pageSize, //默认参数 - 分页大小
        readPage, //默认参数 - 目前还不清楚这个参数的作用

        isIncludeLower,
        sortName,
        sortOrder,
        pageIndex
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
