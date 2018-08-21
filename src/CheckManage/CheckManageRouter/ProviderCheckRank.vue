<template>
  <div class="ProviderCheckRank">
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
  name: "ProviderCheckRank",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "report_providerCheckRank_table",
      activeNameIndex: 0,
      getCheckManageByZoneUrl:
        commonConfig.rootUrl + commonConfig.GetCheckManageByZone,
      exportCheckManageDataUrl:
        commonConfig.rootUrl + commonConfig.ExportCheckManageData,
      // 每一大列的满分得分
      columnFullScore: {
        ptltl: 20,
        sxl: 10,
        gjwzl: 25,
        sjhgl: 25,
        wxpyl: 20,
        pjcscs: 0,
        pjpjsc: 0
      },
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
          tabLabel: "服务商考核排名",
          tabName: "report_providerCheckRank_table", //将作为标识符来区分
          nType: 3 //根据重构前的请求，可以看到nType 为3
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
            }
          ],
          tabHeader: [
            {
              headerKey: "sybid",
              headerVal: "序号",
              subHeaders: []
            },
            {
              headerKey: "PlatformName",
              headerVal: "接入平台名称",
              subHeaders: []
            },
            {
              headerKey: "ProviderName",
              headerVal: "所属服务商名称",
              subHeaders: []
            },
            {
              labelName: "平台连通率（" + this.columnFullScore.ptltl + "）",
              // subHeaders: {
              //   AllConnectTime: "应连通时长",
              //   ConnectTime: "实际连通时长",
              //   ConnectRate: "连通率（%）",
              //   ConnectScore: "分数"
              // }
              subHeaders: [
                {
                  headerKey: "AllConnectTime",
                  headerVal: "应连通时长",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "ConnectTime",
                  headerVal: "实际连通时长",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "ConnectRate",
                  headerVal: "连通率（%）",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ConnectScore",
                  headerVal: "分数",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "车辆上线率（" + this.columnFullScore.sxl + "）",
              // subHeaders: {
              //   InnetCount: "应上线",
              //   UplineCount: "已上线",
              //   UplineRate: "上线率（%）",
              //   UplineScore: "分数"
              // }
              subHeaders: [
                {
                  headerKey: "InnetCount",
                  headerVal: "应上线",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "UplineCount",
                  headerVal: "已上线",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "UplineRate",
                  headerVal: "上线率（%）",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "UplineScore",
                  headerVal: "分数",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "轨迹完整率（" + this.columnFullScore.gjwzl + "）",
              // subHeaders: {
              //   AllDistance: "总里程",
              //   InteDistance: "轨迹完整里程",
              //   LocInteRate: "轨迹完整率（%）",
              //   LocInteScore: "分数"
              // }
              subHeaders: [
                {
                  headerKey: "AllDistance",
                  headerVal: "总里程",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "InteDistance",
                  headerVal: "轨迹完整里程",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "LocInteRate",
                  headerVal: "轨迹完整率（%）",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "LocInteScore",
                  headerVal: "分数",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "数据合格率（" + this.columnFullScore.sjhgl + "）",
              // subHeaders: {
              //   AllLoc: "总条数",
              //   ValidLoc: "合格条数",
              //   ValidRate: "数据合格率（%）",
              //   ValidScore: "分数"
              // }
              subHeaders: [
                {
                  headerKey: "AllLoc",
                  headerVal: "总条数",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "ValidLoc",
                  headerVal: "合格条数",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "ValidRate",
                  headerVal: "数据合格率（%）",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "ValidScore",
                  headerVal: "分数",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              labelName: "卫星飘移率（" + this.columnFullScore.wxpyl + "）",
              // subHeaders: {
              //   AllOnlineVehicle: "上线车辆数",
              //   DriftCount: "漂移车辆数",
              //   DriftRate: "卫星漂移率（%）",
              //   DriftScore: "分数"
              // }
              subHeaders: [
                {
                  headerKey: "AllOnlineVehicle",
                  headerVal: "上线车辆数",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "DriftCount",
                  headerVal: "漂移车辆数",
                  columnType: this.columnType.router_link,
                  router_link: commonConfig.routerConst.ProviderCheckDetail
                },
                {
                  headerKey: "DriftRate",
                  headerVal: "卫星漂移率（%）",
                  columnType: this.columnType.text
                },
                {
                  headerKey: "DriftScore",
                  headerVal: "分数",
                  columnType: this.columnType.text
                }
              ]
            },
            {
              headerKey: "Score",
              headerVal: "总分",
              subHeaders: []
            },
            {
              headerKey: "LinkRelativeRatio",
              headerVal: "环比增加",
              subHeaders: []
            }
          ],
          TabCtnt: [
            // {
            //   PlatformName: "2016-05-03",
            //   ProviderName: "王小虎",
            //   AllConnectTime: "上海",
            //   ConnectTime: "普陀区",
            //   ConnectRate: "上海市普陀区金沙江路 1518 弄",
            //   InnetCount: 200333
            // },
            // {
            //   PlatformName: "2016-05-03",
            //   ProviderName: "王小虎",
            //   AllConnectTime: "上海",
            //   ConnectTime: "普陀区",
            //   ConnectRate: "上海市普陀区金沙江路 1518 弄",
            //   InnetCount: 200333
            // },
            // {
            //   PlatformName: "2016-05-03",
            //   ProviderName: "王小虎",
            //   AllConnectTime: "上海",
            //   ConnectTime: "普陀区",
            //   ConnectRate: "上海市普陀区金沙江路 1518 弄",
            //   InnetCount: 200333
            // },
            // {
            //   PlatformName: "2016-05-03",
            //   ProviderName: "王小虎",
            //   AllConnectTime: "上海",
            //   ConnectTime: "普陀区",
            //   ConnectRate: "上海市普陀区金沙江路 1518 弄",
            //   InnetCount: 200333
            // },
            // {
            //   PlatformName: "2016-05-03",
            //   ProviderName: "王小虎",
            //   AllConnectTime: "上海",
            //   ConnectTime: "普陀区",
            //   ConnectRate: "上海市普陀区金沙江路 1518 弄",
            //   InnetCount: 200333
            // },
            // {
            //   PlatformName: "2016-05-03",
            //   ProviderName: "王小虎",
            //   AllConnectTime: "上海",
            //   ConnectTime: "普陀区",
            //   ConnectRate: "上海市普陀区金沙江路 1518 弄",
            //   InnetCount: 200333
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
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.providerCheckSourceData = [];
      axiosRequest
        .axiosGet(this.getCheckManageByZoneUrl, GetCheckManageByZoneParams)
        .then(function(response) {
          const providerCheckRankTemp = response.data.DetailList;
          for (let providerCheckItem of providerCheckRankTemp) {
            self.providerCheckSourceData.push(
              self.pushSourceData(providerCheckItem, msg.activeName)
            );
          }
          // 加上合计这一行
          self.countData = self.pushSourceData(
            response.data.TotalList,
            msg.activeName
          );
          self.tabCtntList[self.activeNameIndex].TabCtnt = self.providerCheckSourceData;
          self.tabCtntList[self.activeNameIndex].TabCtnt.push(self.countData);
          self.tabCtntList[self.activeNameIndex].total = response.data.CountTotal;
          self.tabCtntList[self.activeNameIndex].loading = false;
          self.tabCtntList[self.activeNameIndex].btnEvents[1].isDisabled = false; //单击查询按钮后，使能导出数据、打印按钮
        })
        .catch(function(error) {});
    },
    // 将插入表的数据组装为一个函数
    pushSourceData: function(providerCheckItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: providerCheckItem.sybid,
            PlatformName: providerCheckItem.PlatformName,
            ProviderName: providerCheckItem.ProviderName,
            AllConnectTime: providerCheckItem.AllConnectTime,
            ConnectTime: providerCheckItem.ConnectTime,
            ConnectRate: providerCheckItem.ConnectRate,
            ConnectScore: providerCheckItem.ConnectScore,

            InnetCount: providerCheckItem.InnetCount,
            UplineCount: providerCheckItem.UplineCount,
            UplineRate: providerCheckItem.UplineRate,
            UplineScore: providerCheckItem.UplineScore,

            AllDistance: providerCheckItem.AllDistance,
            InteDistance: providerCheckItem.InteDistance,
            LocInteRate: providerCheckItem.LocInteRate,
            LocInteScore: providerCheckItem.LocInteScore,

            AllLoc: providerCheckItem.AllLoc,
            ValidLoc: providerCheckItem.ValidLoc,
            ValidRate: providerCheckItem.ValidRate,
            ValidScore: providerCheckItem.ValidScore,

            AllOnlineVehicle: providerCheckItem.AllOnlineVehicle,
            DriftCount: providerCheckItem.DriftCount,
            DriftRate: providerCheckItem.DriftRate,
            DriftScore: providerCheckItem.DriftScore,

            Score: providerCheckItem.Score,
            LinkRelativeRatio: providerCheckItem.LinkRelativeRatio
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
      let nType = 3,
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
            if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
            else if (msgItem.labelId === "PlatformId")
              platformId = msgItem.compId;
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
            }
          }
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
