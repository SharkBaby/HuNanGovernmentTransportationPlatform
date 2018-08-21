<template>
  <div class="TransportCheckRank">
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
import { axiosRequest, getLastMonth, getLastDay } from "@/common/common";
import { commonConfig } from "@/config/commonConfig";
export default {
  name: "TransportCheckRank",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "report_transportCheckRank_table",
      activeNameIndex: 0,
      getCheckManageByZoneUrl:
        commonConfig.rootUrl + commonConfig.GetCheckManageByZone,
      exportCheckManageDataUrl:
        commonConfig.rootUrl + commonConfig.ExportCheckManageData,
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
          tabLabel: "交通厅地区考核排名",
          tabName: "report_transportCheckRank_table", //将作为标识符来区分
          nType: 4 //根据重构前的请求，可以看到nType 为4
        },
        secTab: {
          tabLabel: "企业排名",
          tabName: "report_transporttransCheckRank_table", //将作为标识符来区分
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
              labelName: "所属地区:",
              labelId: "ZoneId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南省",
              compId: "43000000" // 在需要使用预搜索的输入框需要compId字段
            },
            {
              searchType: "select",
              labelName: "考核类型:",
              labelId: "CheckType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 1, //默认选择月度考核
              options: [
                {
                  value: 1,
                  label: "月度考核",
                  searchType: "singleDatePicker", //月份选择器和年份选择器为同一组件，只是根据不同的参数来改变展示方式
                  labelName: "月份",
                  labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
                  compVal: getLastMonth(),
                  type: "month",
                  placeholder: "请选择月份",
                  format: "yyyy-MM",
                  valueformat: "yyyyMM"
                },
                {
                  value: 2,
                  label: "年度考核",
                  searchType: "singleDatePicker", //月份选择器和年份选择器为同一组件，只是根据不同的参数来改变展示方式
                  labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
                  compVal: "",
                  labelName: "年份",
                  type: "year",
                  placeholder: "请选择年份",
                  format: "yyyy",
                  valueformat: "yyyy"
                },
                {
                  value: 3,
                  label: "当月实时考核",
                  searchType: "fromTodatePicker", //月份选择器和年份选择器为同一组件，只是根据不同的参数来改变展示方式
                  labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
                  compVal: "",
                  labelName: "时间起 - 时间至",
                  type: "daterange",
                  placeholder: "请选择日期起 - 日期至",
                  format: "yyyy-MM-dd",
                  valueformat: "yyyyMMdd"
                }
              ]
            },
            {
              searchType: "singleDatePicker",
              labelName: "月份:",
              labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: getLastMonth(),
              type: "month",
              placeholder: "请选择月份",
              format: "yyyy-MM",
              valueformat: "yyyyMM"
            },
            {
              searchType: "checkbox",
              itemTitle: "车辆类型：",
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
            //       value: 0x2,
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
              searchType: "singleChkbox",
              labelName: "是否包含下级",
              labelId: "IsIncludeLower", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "ZName",
              headerVal: "地区名称",
              subHeaders: []
            },
            {
              headerKey: "Score",
              headerVal: "扣分情况",
              subHeaders: []
            },
            {
              labelName: "入网率情况",
              // subHeaders: {
              //   InstallRate: "入网率",
              //   InstallScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "InstallRate",
                  headerVal: "入网率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "InstallScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "上线率情况",
              // subHeaders: {
              //   UplineRate: "上线率",
              //   UplineCount: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "UplineRate",
                  headerVal: "上线率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "UplineCount",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "数据合格率情况",
              // subHeaders: {
              //   ValidRate: "数据合格率",
              //   ValidScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "ValidRate",
                  headerVal: "数据合格率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ValidScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "轨迹完整率情况",
              // subHeaders: {
              //   LocInteRate: "轨迹完整率",
              //   LocInteScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "LocInteRate",
                  headerVal: "轨迹完整率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "LocInteScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "超速情况",
              // subHeaders: {
              //   OverSpeedCount: "车辆超速次数",
              //   OverSpeedRate: "平均车辆超速率",
              //   ProvinceOverSpeedRate: "全省平均车辆超速率",
              //   OverSpeedScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "OverSpeedCount",
                  headerVal: "车辆超速次数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "OverSpeedRate",
                  headerVal: "平均车辆超速率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ProvinceOverSpeedRate",
                  headerVal: "全省平均车辆超速率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "OverSpeedScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "疲劳驾驶情况",
              // subHeaders: {
              //   FatigueDriveCount: "车辆疲劳驾驶次数",
              //   FatigueDriveRate: "平均车辆疲劳驾驶率",
              //   ProvinceFatigueDriveRate: "全省平均车辆疲劳驾驶率",
              //   FatigueDriveScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "FatigueDriveCount",
                  headerVal: "车辆疲劳驾驶次数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "FatigueDriveRate",
                  headerVal: "平均车辆疲劳驾驶率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ProvinceFatigueDriveRate",
                  headerVal: "全省平均车辆疲劳驾驶率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "FatigueDriveScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "凌晨2点至5点违规运行情况",
              // subHeaders: {
              //   AbnormalCount: "车辆违规运行次数",
              //   AbnormalRate: "平均车辆违规运行率",
              //   ProvinceAbnormalRate: "全省平均车辆违规运行率",
              //   AbnormalScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "AbnormalCount",
                  headerVal: "车辆违规运行次数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "AbnormalRate",
                  headerVal: "平均车辆违规运行率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ProvinceAbnormalRate",
                  headerVal: "全省平均车辆违规运行率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "AbnormalScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
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
              labelName: "运输企业:",
              labelId: "UnitId", //该ID主要是用来判断在子组件中出发了哪一种个子组件
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
              searchType: "select",
              labelName: "考核类型:",
              labelId: "CheckType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: 1, //默认选择月度考核
              options: [
                {
                  value: 1,
                  label: "月度考核",
                  searchType: "singleDatePicker", //月份选择器和年份选择器为同一组件，只是根据不同的参数来改变展示方式
                  labelName: "月份",
                  labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
                  compVal: getLastMonth(),
                  type: "month",
                  placeholder: "请选择月份",
                  format: "yyyy-MM",
                  valueformat: "yyyyMM"
                },
                {
                  value: 2,
                  label: "年度考核",
                  searchType: "singleDatePicker", //月份选择器和年份选择器为同一组件，只是根据不同的参数来改变展示方式
                  labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
                  compVal: "",
                  labelName: "年份",
                  type: "year",
                  placeholder: "请选择年份",
                  format: "yyyy",
                  valueformat: "yyyy"
                },
                {
                  value: 3,
                  label: "当月实时考核",
                  searchType: "fromTodatePicker", //月份选择器和年份选择器为同一组件，只是根据不同的参数来改变展示方式
                  labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
                  compVal: "",
                  labelName: "时间起 - 时间至",
                  type: "daterange",
                  placeholder: "请选择日期起 - 日期至",
                  format: "yyyy-MM-dd",
                  valueformat: "yyyyMMdd"
                }
              ]
            },
            {
              searchType: "singleDatePicker",
              labelName: "月份:",
              labelId: "DatePicker", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: getLastMonth(),
              type: "month",
              placeholder: "请选择月份",
              format: "yyyy-MM",
              valueformat: "yyyyMM"
            },
            {
              searchType: "checkbox",
              itemTitle: "",
              labelId: "CarType", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              labelName: "车辆类型：",
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
            //       value: 0x2,
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
              searchType: "singleChkbox",
              labelName: "是否包含下级",
              labelId: "IsIncludeLower", //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "UnitName",
              headerVal: "企业名称",
              subHeaders: []
            },
            {
              headerKey: "ZName",
              headerVal: "地区名称",
              subHeaders: []
            },
            {
              headerKey: "Score",
              headerVal: "扣分情况",
              subHeaders: []
            },
            {
              labelName: "超速情况",
              // subHeaders: {
              //   OverSpeedCount: "车辆超速次数",
              //   OverSpeedRate: "平均车辆超速率",
              //   ProvinceOverSpeedRate: "全省平均车辆超速率",
              //   OverSpeedScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "OverSpeedCount",
                  headerVal: "车辆超速次数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "OverSpeedRate",
                  headerVal: "平均车辆超速率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ProvinceOverSpeedRate",
                  headerVal: "全省平均车辆超速率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "OverSpeedScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "疲劳驾驶情况",
              // subHeaders: {
              //   FatigueDriveCount: "车辆疲劳驾驶次数",
              //   FatigueDriveRate: "平均车辆疲劳驾驶率",
              //   ProvinceFatigueDriveRate: "全省平均车辆疲劳驾驶率",
              //   FatigueDriveScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "FatigueDriveCount",
                  headerVal: "车辆疲劳驾驶次数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "FatigueDriveRate",
                  headerVal: "平均车辆疲劳驾驶率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ProvinceFatigueDriveRate",
                  headerVal: "全省平均车辆疲劳驾驶率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "FatigueDriveScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "凌晨2点至5点违规运行情况",
              // subHeaders: {
              //   AbnormalCount: "车辆违规运行次数",
              //   AbnormalRate: "平均车辆违规运行率",
              //   ProvinceAbnormalRate: "全省平均车辆违规运行率",
              //   AbnormalScore: "扣分"
              // }
              subHeaders: [
                {
                  headerKey: "AbnormalCount",
                  headerVal: "车辆违规运行次数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "AbnormalRate",
                  headerVal: "平均车辆违规运行率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ProvinceAbnormalRate",
                  headerVal: "全省平均车辆违规运行率",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "AbnormalScore",
                  headerVal: "扣分",
                  columnType: this.columnType.text
                }
              ]
            }
          ],
          TabCtnt: [
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
            // },
            // {
            //   ZName: "2016-05-03",
            //   Score: "王小虎",
            //   InstallRate: "上海",
            //   InstallScore: "普陀区",
            //   UplineRate: "上海市普陀区金沙江路 1518 弄",
            //   UplineCount: 200333
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
        }
      ];
    }
  },
  methods: {
    handleClickSearch: function(msg) {
      //处理子组件触发的查询事件
      const self = this;
      // 封装函数来组装每一页请求的参数
      const GetCheckManageByZoneParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage
      );
      console.log('fdsfadf')
      console.log(msg.isSplitPage)
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.transCheckSourceData = [];
      axiosRequest
        .axiosGet(this.getCheckManageByZoneUrl, GetCheckManageByZoneParams)
        .then(function(response) {
          const transCheckRankTemp = response.data.DetailList;
          for (let transCheckItem of transCheckRankTemp) {
            self.transCheckSourceData.push(
              self.pushSourceData(transCheckItem, msg.activeName)
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
    pushSourceData: function(transCheckItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: transCheckItem.sybid,
            ZName: transCheckItem.ZName,
            Score: transCheckItem.Score,
            InstallRate: transCheckItem.InstallRate,
            InstallScore: transCheckItem.InstallScore,
            UplineRate: transCheckItem.UplineRate,
            UplineCount: transCheckItem.UplineCount,
            ValidRate: transCheckItem.ValidRate,
            ValidScore: transCheckItem.ValidScore,
            LocInteRate: transCheckItem.LocInteRate,
            LocInteScore: transCheckItem.LocInteScore,

            OverSpeedCount: transCheckItem.OverSpeedCount,
            OverSpeedRate: transCheckItem.OverSpeedRate,
            ProvinceOverSpeedRate: transCheckItem.ProvinceOverSpeedRate,
            OverSpeedScore: transCheckItem.OverSpeedScore,

            FatigueDriveCount: transCheckItem.FatigueDriveCount,
            FatigueDriveRate: transCheckItem.FatigueDriveRate,
            ProvinceFatigueDriveRate: transCheckItem.ProvinceFatigueDriveRate,
            FatigueDriveScore: transCheckItem.FatigueDriveScore,

            AbnormalCount: transCheckItem.AbnormalCount,
            AbnormalRate: transCheckItem.AbnormalRate,
            ProvinceAbnormalRate: transCheckItem.ProvinceAbnormalRate,
            AbnormalScore: transCheckItem.AbnormalScore
          };
          break;
        case this.tabNameObj.secTab.tabName:
          return {
            sybid: transCheckItem.sybid,
            UnitName: transCheckItem.UnitName,
            ZName: transCheckItem.ZName,
            Score: transCheckItem.Score,

            OverSpeedCount: transCheckItem.OverSpeedCount,
            OverSpeedRate: transCheckItem.OverSpeedRate,
            ProvinceOverSpeedRate: transCheckItem.ProvinceOverSpeedRate,
            OverSpeedScore: transCheckItem.OverSpeedScore,

            FatigueDriveCount: transCheckItem.FatigueDriveCount,
            FatigueDriveRate: transCheckItem.FatigueDriveRate,
            ProvinceFatigueDriveRate: transCheckItem.ProvinceFatigueDriveRate,
            FatigueDriveScore: transCheckItem.FatigueDriveScore,

            AbnormalCount: transCheckItem.AbnormalCount,
            AbnormalRate: transCheckItem.AbnormalRate,
            ProvinceAbnormalRate: transCheckItem.ProvinceAbnormalRate,
            AbnormalScore: transCheckItem.AbnormalScore
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
      const GetCheckManageByZoneParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage //是否分页 - 导出数据
      );
      self.tabCtntList[self.activeNameIndex].loading = true;//下载数据的时候，显示正在下载数据的logo
      axiosRequest
        .axiosGet(this.exportCheckManageDataUrl, GetCheckManageByZoneParams)
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
      let monthDate = '';
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          this.activeNameIndex = 0;
          nType = this.tabNameObj.firTab.nType; 
          for (let msgItem of msg) {
            if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "CheckType") checkType = msgItem.compVal;
            else if (msgItem.labelId === "DatePicker") {
              switch (msgItem.type) {
                case "month":
                  beginDate = msgItem.compVal + "01";
                  endDate =
                    msgItem.compVal +
                    getLastDay(
                      msgItem.compVal.substr(0, 4),
                      msgItem.compVal.substr(4)
                    );
                  break;
                case "year":
                  beginDate = msgItem.compVal + "0101";
                  endDate = msgItem.compVal + "1231";
                  break;
                case "daterange":
                  beginDate = msgItem.compVal[0]; //时间起
                  endDate = msgItem.compVal[1]; //时间止
                  break;
                default:
              }
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            } else if (msgItem.labelId === "IsIncludeLower") isIncludeLower = Number(msgItem.compVal);
          }
          break;
        case this.tabNameObj.secTab.tabName:
          this.activeNameIndex = 1;
          nType = this.tabNameObj.secTab.nType;
          for (let msgItem of msg) {
            if (msgItem.labelId === "UnitId") unitId = msgItem.compId;
            else if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "CheckType") checkType = msgItem.compVal;
            else if (msgItem.labelId === "DatePicker") {
              switch (msgItem.type) {
                case "month":
                  beginDate = msgItem.compVal + "01";
                  endDate =
                    msgItem.compVal +
                    getLastDay(
                      msgItem.compVal.substr(0, 4),
                      msgItem.compVal.substr(4)
                    );
                  break;
                case "year":
                  beginDate = msgItem.compVal + "0101";
                  endDate = msgItem.compVal + "1231";
                  break;
                case "daterange":
                  beginDate = msgItem.compVal[0]; //时间起
                  endDate = msgItem.compVal[1]; //时间止
                  break;
                default:
              }
            } else if (msgItem.labelId === "CarType") {
              for (let carItem of msgItem.compVal) {
                carType += carItem;
              }
            } else if (msgItem.labelId === "IsIncludeLower") isIncludeLower = Number(msgItem.compVal);
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
        endDate,
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
