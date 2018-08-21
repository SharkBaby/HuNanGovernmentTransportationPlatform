<template>
  <div class="VehicleVedio">
    <multi-level-table-component 
    :activeName="activeName" 
    :tabCtntList="tabCtntList" 
    class="zone-check-multilevel"
    v-on:handleClickSearch="handleClickSearch"
    v-on:handleCurrentChange="handleCurrentChange"></multi-level-table-component>
  </div>
</template>

<style src="./reportRouter.css" type="text/css" scoped>
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
  name: "VehicleVedio",
  components: {
    MultiLevelTableComponent
  },
  data() {
    return {
      activeName: "report_vehicleVedio_table",
      activeNameIndex: 0,
      getVehicleVedioDataUrl:
        commonConfig.rootUrl + commonConfig.StatisticConst.GetVehicleVedioData,
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
          tabLabel: "车辆视频",
          tabName: "report_vehicleVedio_table", //将作为标识符来区分
          nType: 1 //根据重构前的请求，可以看到nType 为1
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
            }
          ],
          searchCreteria: [
            {
              searchType: "input",
              labelName: "车牌号:",
              labelId: reportLabelId.VehicleId, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              compId: ""
            },
            {
              searchType: "select",
              labelName: "车牌颜色:",
              labelId: reportLabelId.PlateColor, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "",
              options: [
                {
                  value: 0,
                  label: "不限制"
                },
                {
                  value: 1,
                  label: "蓝色"
                },
                {
                  value: 2,
                  label: "黄色"
                },
                {
                  value: 3,
                  label: "黑色"
                },
                {
                  value: 4,
                  label: "白色"
                },
                {
                  value: 5,
                  label: "其他"
                }
              ]
            },
            {
              searchType: "input",
              labelName: "区域:",
              labelId: reportLabelId.Area, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: "湖南"
            },
            {
              searchType: "input",
              labelName: "单位名称:",
              labelId: reportLabelId.UnitName, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
            },
            {
              searchType: "fromTodatePicker",
              labelName: "时间起 - 时间至",
              labelId: reportLabelId.fromTodatePicker, //该ID主要是用来判断在子组件中出发了哪一种个子组件
              compVal: ""
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
              headerKey: "ZoneName",
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
              headerKey: "AlarmType",
              headerVal: "报警类型",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "AlarmDate",
              headerVal: "报警时间",
              subHeaders: [],
              columnType: this.columnType.text
            },
            {
              headerKey: "Url",
              headerVal: "播放视频",
              subHeaders: [],
              columnType: this.columnType.text
            }
          ],
          TabCtnt: [
            // {
            //   PlateNumber: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   VehicleType: "普陀区",
            //   PlatformName: "上海市普陀区金沙江路 1518 弄",
            //   AlarmType: 200333
            // },
            // {
            //   PlateNumber: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   VehicleType: "普陀区",
            //   PlatformName: "上海市普陀区金沙江路 1518 弄",
            //   AlarmType: 200333
            // },
            // {
            //   PlateNumber: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   VehicleType: "普陀区",
            //   PlatformName: "上海市普陀区金沙江路 1518 弄",
            //   AlarmType: 200333
            // },
            // {
            //   PlateNumber: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   VehicleType: "普陀区",
            //   PlatformName: "上海市普陀区金沙江路 1518 弄",
            //   AlarmType: 200333
            // },
            // {
            //   PlateNumber: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   VehicleType: "普陀区",
            //   PlatformName: "上海市普陀区金沙江路 1518 弄",
            //   AlarmType: 200333
            // },
            // {
            //   PlateNumber: "2016-05-03",
            //   PlateColor: "王小虎",
            //   ZoneName: "上海",
            //   VehicleType: "普陀区",
            //   PlatformName: "上海市普陀区金沙江路 1518 弄",
            //   AlarmType: 200333
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
      const getVehicleVedioDataUrlParams = self.formPageParams(
        msg.searchCreteria,
        msg.currentPage,
        msg.activeName,
        msg.isSplitPage
      );
      self.tabCtntList[self.activeNameIndex].loading = true; //加载数据的时候，显示加载数据的logo
      // 清空当前数据的集合
      self.transCheckSourceData = [];
      axiosRequest
        .axiosGet(this.getVehicleVedioDataUrl, getVehicleVedioDataUrlParams)
        .then(function(response) {
          const detailListTemp = response.data.DetailList;
          for (let vehicleVideoItem of detailListTemp) {
            self.transCheckSourceData.push(
              self.pushSourceData(vehicleVideoItem, msg.activeName)
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
    pushSourceData: function(vehicleVideoItem, activeName) {
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          return {
            sybid: vehicleVideoItem.sybid,
            PlateNumber: vehicleVideoItem.PlateNumber,
            PlateColor: vehicleVideoItem.PlateColor,
            ZoneName: vehicleVideoItem.ZoneName,
            CompanyName: vehicleVideoItem.CompanyName,
            VehicleType: vehicleVideoItem.VehicleType,
            PlatformName: vehicleVideoItem.PlatformName,
            AlarmType: vehicleVideoItem.AlarmType,
            AlarmDate: vehicleVideoItem.AlarmDate,
            Url: vehicleVideoItem.Url
          };
          break;
        default:
      }
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
        operationType = "",
        plateColor = "",
        area = "",
        unitName = "";
      switch (activeName) {
        case this.tabNameObj.firTab.tabName:
          this.activeNameIndex = 0;
          nType = this.tabNameObj.firTab.nType;
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
          case reportLabelId.PlateColor:
            plateColor = msgItem.compVal;
            break;
          case reportLabelId.Area:
            area = msgItem.compVal;
            break;
          case reportLabelId.UnitName:
            unitName = msgItem.compVal;
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
        operationType,
        plateColor,
        area,
        unitName
      };
    },
    // 处理子组件出发的换页数据加载
    handleCurrentChange: function(msg) {
      this.handleClickSearch(msg);
    }
  }
};
</script>
