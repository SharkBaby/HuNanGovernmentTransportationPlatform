<template>
  <div class="ChangeDetail">
    <multi-level-table-component :activeName="activeName" :tabCtntList="tabCtntList" class="zone-check-multilevel" v-on:handleClickSearch="handleClickSearch" v-on:handleClickExpData="handleClickExpData" v-on:handleCurrentChange="handleCurrentChange"></multi-level-table-component>
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
  name: "ChangeDetail",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "report_changedetail_unit_table",
      activeNameIndex: 0,
      getChangeDetailDataUrl:
        commonConfig.rootUrl + commonConfig.StatisticConst.GetChangeDetailData,
      exportChangeDetailDataUrl:
        commonConfig.rootUrl +
        commonConfig.StatisticConst.ExportChangeDetailData,
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
          tabLabel: "企业变更",
          tabName: "report_changedetail_unit_table", //将作为标识符来区分
          nType: 1 //根据重构前的请求，可以看到nType 为1
        },
        secTab: {
          tabLabel: "车辆变更",
          tabName: "report_changedetail_vehicle_table", //将作为标识符来区分
          nType: 2 //根据重构前的请求，可以看到nType 为2
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
              searchType: "select",
              labelName: "变更来源类型:",
              labelId: reportLabelId.ChangeSourceType, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "运政系统"
                },
                {
                  value: 2,
                  label: "备案库"
                },
                {
                  value: 3,
                  label: "操作员"
                },
                {
                  value: 4,
                  label: "企业平台"
                }
              ]
            },
            {
              searchType: "select",
              labelName: "操作类型:",
              labelId: reportLabelId.OperationType, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "新增"
                },
                {
                  value: 2,
                  label: "修改"
                },
                {
                  value: 3,
                  label: "删除"
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
              headerKey: "ChangeTime",
              headerVal: "变更时间",
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
              headerKey: "LicenceNumber",
              headerVal: "经营许可证号",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UpUnitName",
              headerVal: "上级企业",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ZoneName",
              headerVal: "所属地区",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ChangeSource",
              headerVal: "变更来源类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "LoginCode",
              headerVal: "具体来源",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "OptionType",
              headerVal: "操作类型",
              subHeaders: [],
              columnType: this.columnType.text
            }
          ],
          TabCtnt: [
            // {
            //   ChangeTime: '2016-05-03',
            //   UnitName: '王小虎',
            //   LicenceNumber: '上海',
            //   UpUnitName: '普陀区'
            // }, {
            //   ChangeTime: '2016-05-03',
            //   UnitName: '王小虎',
            //   LicenceNumber: '上海',
            //   UpUnitName: '普陀区'
            // }, {
            //   ChangeTime: '2016-05-03',
            //   UnitName: '王小虎',
            //   LicenceNumber: '上海',
            //   UpUnitName: '普陀区'
            // }, {
            //   ChangeTime: '2016-05-03',
            //   UnitName: '王小虎',
            //   LicenceNumber: '上海',
            //   UpUnitName: '普陀区'
            // }, {
            //   ChangeTime: '2016-05-03',
            //   UnitName: '王小虎',
            //   LicenceNumber: '上海',
            //   UpUnitName: '普陀区'
            // }, {
            //   ChangeTime: '2016-05-03',
            //   UnitName: '王小虎',
            //   LicenceNumber: '上海',
            //   UpUnitName: '普陀区'
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
              labelName: "运输企业:",
              labelId: reportLabelId.UnitId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "input",
              labelName: "车牌号:",
              labelId: reportLabelId.VehicleId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
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
              labelName: "变更来源类型:",
              labelId: reportLabelId.ChangeSourceType, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "运政系统"
                },
                {
                  value: 2,
                  label: "备案库"
                },
                {
                  value: 3,
                  label: "操作员"
                },
                {
                  value: 4,
                  label: "企业平台"
                }
              ]
            },
            {
              searchType: "select",
              labelName: "操作类型:",
              labelId: reportLabelId.OperationType, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: 0,
                  label: "全部"
                },
                {
                  value: 1,
                  label: "新增"
                },
                {
                  value: 2,
                  label: "修改"
                },
                {
                  value: 3,
                  label: "删除"
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
              headerKey: "ChangeTime",
              headerVal: "变更时间",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "PlateNumber",
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
              headerKey: "VehicleType",
              headerVal: "车牌类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "UnitName",
              headerVal: "所属企业",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ZoneName",
              headerVal: "所属县所",
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
              headerKey: "PlatformName",
              headerVal: "接入平台",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "GpsInstalled",
              headerVal: "GPS入网",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ChangeSource",
              headerVal: "变更来源类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "LoginCode",
              headerVal: "具体来源",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "OptionType",
              headerVal: "操作类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "ProviderName",
              headerVal: "服务商",
              subHeaders: [],
              columnType: this.columnType.text
            }
          ],
          TabCtnt: [
            // {
            //   ChangeTime: '2016-05-03',
            //   PlateNumber: '王小虎',
            //   VehicleType: '上海',
            //   UnitName: '普陀区',
            //   ZoneName: '上海市普陀区金沙江路 1518 弄',
            //   CityName: 200333
            // }, {
            //   ChangeTime: '2016-05-03',
            //   PlateNumber: '王小虎',
            //   VehicleType: '上海',
            //   UnitName: '普陀区',
            //   ZoneName: '上海市普陀区金沙江路 1518 弄',
            //   CityName: 200333
            // }, {
            //   ChangeTime: '2016-05-03',
            //   PlateNumber: '王小虎',
            //   VehicleType: '上海',
            //   UnitName: '普陀区',
            //   ZoneName: '上海市普陀区金沙江路 1518 弄',
            //   CityName: 200333
            // }, {
            //   ChangeTime: '2016-05-03',
            //   PlateNumber: '王小虎',
            //   VehicleType: '上海',
            //   UnitName: '普陀区',
            //   ZoneName: '上海市普陀区金沙江路 1518 弄',
            //   CityName: 200333
            // }, {
            //   ChangeTime: '2016-05-03',
            //   PlateNumber: '王小虎',
            //   VehicleType: '上海',
            //   UnitName: '普陀区',
            //   ZoneName: '上海市普陀区金沙江路 1518 弄',
            //   CityName: 200333
            // }, {
            //   ChangeTime: '2016-05-03',
            //   PlateNumber: '王小虎',
            //   VehicleType: '上海',
            //   UnitName: '普陀区',
            //   ZoneName: '上海市普陀区金沙江路 1518 弄',
            //   CityName: 200333
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
      const getChangeDetailDataUrlParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.transCheckSourceData = [];
      axiosRequest
        .axiosGet(this.getChangeDetailDataUrl, getChangeDetailDataUrlParams)
        .then(function(response) {
          const detailListTemp = response.data.DetailList;
          for (let changeDetailItem of detailListTemp) {
            self.transCheckSourceData.push(
              self.pushSourceData(changeDetailItem, msg.activeName)
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
    pushSourceData: function(changeDetailItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: changeDetailItem.sybid,
            ChangeTime: changeDetailItem.ChangeTime,
            UnitName: changeDetailItem.UnitName,
            LicenceNumber: changeDetailItem.LicenceNumber,
            UpUnitName: changeDetailItem.UpUnitName,
            ZoneName: changeDetailItem.ZoneName,
            ChangeSource: changeDetailItem.ChangeSource,
            LoginCode: changeDetailItem.LoginCode,
            OptionType: changeDetailItem.OptionType
          };
          break;
        case this.tabNameObj.secTab.tabName:
          return {
            sybid: changeDetailItem.sybid,
            ChangeTime: changeDetailItem.ChangeTime,
            PlateNumber: changeDetailItem.PlateNumber,
            PlateColor: changeDetailItem.PlateColor,
            VehicleType: changeDetailItem.VehicleType,
            UnitName: changeDetailItem.UnitName,
            ZoneName: changeDetailItem.ZoneName,
            CityName: changeDetailItem.CityName,
            PlatformName: changeDetailItem.PlatformName,
            GpsInstalled: changeDetailItem.GpsInstalled,
            ChangeSource: changeDetailItem.ChangeSource,
            LoginCode: changeDetailItem.LoginCode,
            OptionType: changeDetailItem.OptionType,
            ProviderName: changeDetailItem.ProviderName
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
      const exportchangeDetailDataParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage //是否分页 - 导出数据
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //下载数据的时候，显示正在下载数据的logo
      axiosRequest
        .axiosGet(
          this.exportchangeDetailDataUrl,
          exportchangeDetailDataParams
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
        readPage = "",
        changeSourceType = "",
        operationType = "";
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          this.activeNameIndex = 0;
          nType = this.tabNameObj.firTab.nType;
          break;
        case this.tabNameObj.secTab.tabName:
          this.activeNameIndex = 1;
          nType = this.tabNameObj.secTab.nType;
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
          case reportLabelId.ChangeSourceType:
            changeSourceType = msgItem.compVal;
            break;
          case reportLabelId.OperationType:
            operationType = msgItem.compVal;
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
        readPage,
        changeSourceType,
        operationType
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
