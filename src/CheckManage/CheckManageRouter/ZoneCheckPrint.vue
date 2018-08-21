<template>
  <div class="zoneCheckPrint">
    <el-row>
      <el-col :span="4" class="noprint">
        <el-tree 
        :data="zoneArray.zoneData" 
        :props="zoneArray.defaultProps" 
        class="zone-check-eltree" 
        :default-expanded-keys="[1]"
        @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <el-row class="noprint">
          <input-component
          :labelName="searchItem.labelName" 
          :compVal="searchItem.compVal"
          :compId="searchItem.compId"
          :labelId="searchItem.labelId" 
          v-if="searchItem.searchType === searchType.input" 
          v-for="(searchItem, searchKey) of tabCtntList.searchCreteria" 
          :key="searchKey"
          v-on:inputChange="inputChange"></input-component>
          <select-component
          :options="searchItem.options"
          :labelName="searchItem.labelName"
          :compVal="searchItem.compVal"
          :labelId="searchItem.labelId"
          v-else-if="searchItem.searchType === searchType.select"
          v-on:selectChange="selectChange"></select-component>
          <checkbox-component 
          :options="searchItem.options" 
          :labelName="searchItem.labelName" 
          :compVal="searchItem.compVal" 
          :labelId="searchItem.labelId" 
          v-else-if="searchItem.searchType === searchType.checkbox"
          v-on:checkboxChange="checkboxChange"></checkbox-component>
          <single-chkbox-component
          :labelName="searchItem.labelName" 
          :compVal="searchItem.compVal" 
          :labelId="searchItem.labelId" 
          v-else-if="searchItem.searchType === searchType.singleChkbox"
          v-on:singleChkboxChange="singleChkboxChange"></single-chkbox-component>
          <!--注释人：向浩
          注释时间：2018-06-13
          注释原因：封装年份，月份选择器
          -->
          <single-date-picker-component
          :labelName="searchItem.labelName" 
          :compVal="searchItem.compVal" 
          :labelId="searchItem.labelId"
          :type ="searchItem.type"
          :placeholder="searchItem.placeholder"
          :format="searchItem.format"
          :valueformat="searchItem.valueformat"
          v-else-if="searchItem.searchType === searchType.singleDatePicker"
          v-on:singleDatePickerChange="singleDatePickerChange"></single-date-picker-component>
          <!-- Add from date to end date -->
          <date-picker-component 
          :labelName="searchItem.labelName" 
          :compVal="searchItem.compVal" 
          :labelId="searchItem.labelId"
          v-else-if="searchItem.searchType === searchType.fromTodatePicker"
          v-on:datePickerChange="datePickerChange"></date-picker-component>
          <el-row>
            <!-- <button-component 
            :iconName="btnItem.iconName" 
            :btnName="btnItem.btnName" 
            v-for="(btnItem, btnKey) of tabCtntList.btnEvents" 
            :key="btnKey"></button-component> -->
            <!--注释人：向浩
                注释时间：2018-06-08
                注释原因: 参考了multiLevelTableComponent来修改了按钮事件(由于不方便调用button单击事件，所以取消将button封装为一个组件)
            -->
          <el-button 
          type="primary" 
          :icon="btnItem.iconName" 
          v-for="(btnItem, btnKey) of tabCtntList.btnEvents" 
          :key="btnKey" 
          @click="handleBtnClick(btnItem.btnId)" 
          class="btn-com"
          :disabled=btnItem.isDisabled>{{btnItem.btnName}}</el-button>
          </el-row>
        </el-row>
        <!-- startprint -->
        <!-- <span startprint="" style="display: none;"></span> -->
        <div class="print-part" v-loading="tabCtntList.loading">
          <zone-check-span-table-component 
          :tabName="tabCtntList.tabDetail.tabName" 
          :TabCtnt="tabCtntList.tabDetail.TabCtnt" 
          :tabHeader="tabCtntList.tabDetail.tabHeader"></zone-check-span-table-component>
          <!-- endprint -->
          <!-- <span endprint="" style="display: none;"></span> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style src="./checkManageRouter.css" type="text/css">
</style>

<script>
import InputComponent from "@/components/InputComponent/InputComponent";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import CheckboxComponent from "@/components/CheckboxComponent/CheckboxComponent";
import SingleChkboxComponent from "@/components/SingleChkboxComponent/SingleChkboxComponent";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import ZoneCheckSpanTableComponent from "@/components/ZoneCheckSpanTableComponent/ZoneCheckSpanTableComponent";
import DatePickerComponent from "@/components/DatePickerComponent/DatePickerComponent";
import SingleDatePickerComponent from "@/components/SingleDatePickerComponent/SingleDatePickerComponent";
import {
  axiosRequest,
  formSourceData,
  getLastMonth,
  getLastDay
} from "@/common/common";
import { commonConfig } from "@/config/commonConfig";
export default {
  name: "zoneCheckPrint",
  components: {
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    SingleChkboxComponent,
    ButtonComponent,
    ZoneCheckSpanTableComponent,
    DatePickerComponent,
    SingleDatePickerComponent
  },
  data() {
    return {
      searchType: {
        input: "input",
        select: "select",
        checkbox: "checkbox",
        singleChkbox: "singleChkbox",
        datePicker: "datePicker",
        singleDatePicker: "singleDatePicker", //单个日期组件
        fromTodatePicker: "fromTodatePicker",
        treeCheckbox: "treeCheckbox"
      },
      selectType: {
        Year: "Year",
        Month: "Month",
        CheckType: "CheckType",
        DatePicker: "DatePicker"
      },
      getZoneToUserIDUrl: commonConfig.rootUrl + commonConfig.GetZoneToUserID, // 用户地区树
      getCheckManageByZoneUrl:
        commonConfig.rootUrl + commonConfig.GetCheckManageByZone, //查询请求接口
      preSearchType: ["ZoneId", "UnitId", "VehicleId", "PlatformId"],
      // 采用手动校正来将返回的结果覆盖到指定的列
      munalMappingTab: {
        InstallRateScore: 0,
        UplineRateScore: 2,
        DriftRateScore: 3,
        LocInteRateScore: 5,
        ValidRateScore: 7
      },
      tabCtntList: {
        loading: false,
        btnEvents: [
          {
            iconName: "el-icon-search",
            btnId: "search", //该ID主要是用来判断在子组件中出发了哪一个按钮
            btnName: "查询",
            isDisabled: false //控制查询数据按钮初始状态为enabled
          },
          {
            iconName: "el-icon-printer",
            btnId: "print", //该ID主要是用来判断在子组件中出发了哪一个按钮
            btnName: "打印",
            isDisabled: false //控制查询数据按钮初始状态为enabled
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
            labelName: "是否包含下級",
            labelId: "IsIncludeLower", //该ID主要是用来判断在子组件中出发了哪一种个子组件
            compVal: true
          }
        ],
        tabDetail: {
          tabName: "联网联控系统考核表（道路运输管理机构）",
          tabHeader: {
            chkObject: "考核对象",
            chkCtnt: "考核内容",
            score: "分值",
            scoreCreteria: "计分标准",
            rate: "指标比率",
            getScore: "得分",
            amount: "总分"
          },
          TabCtnt: [
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "车辆入网率",
              score: "5",
              scoreCreteria: "入网率*5。",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "车辆入网率",
              score: "5",
              scoreCreteria: "低于90%不得分。",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "车辆上线率",
              score: "10",
              scoreCreteria: "上线率*10。",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "卫星定位漂移车辆率",
              score: "15",
              scoreCreteria: "15-卫星定位漂移车辆率*15；",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "卫星定位漂移车辆率",
              score: "15",
              scoreCreteria: "高于5%不得分。",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "轨迹完整率",
              score: "40",
              scoreCreteria: "轨迹完整率*40；",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "轨迹完整率",
              score: "40",
              scoreCreteria: "低于70%不得分。",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "数据合格率",
              score: "30",
              scoreCreteria: "数据合格率*30；",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "管理部门监管平台",
              chkCtnt: "数据合格率",
              score: "30",
              scoreCreteria: "低于80%不得分。",
              rate: "",
              getScore: "",
              amount: ""
            },
            {
              chkObject: "社会化监控平台",
              chkCtnt:
                "<p>注：</p>" +
                "<p>①因上级监管平台或网络运营商等情况造成断线并提前报备的，不计为断线时长；</p>" +
                "<p>②平台上传的车辆数据存在车牌号、车牌颜色、日期时间、经度、纬度、速度、方向、海拔、车辆状态、报警状态等错误信息的，数据判断为不合格。具体参照《JT/T 809-2011》4.5.8相关信息数据体结构之规则；</p>" +
                "<p>③数据合理参考范围：日期时间：≤当前时间；经度范围：73°33′E至135°05′E；纬度范围：3°51′N至53°33′N；速度：0至160间；海拔：-200至6500之间；</p>" +
                "<p>④各省可结合地方实际情况优化考核内容及分值。</p>",
              score: "",
              scoreCreteria: "",
              rate: "",
              getScore: "",
              amount: ""
            }
          ]
        }
      },
      zoneArray: {
        zoneData: [
          // {
          //   label: "湖南省",
          //   children: [
          //     {
          //       label: "長沙市",
          //       children: [
          //         {
          //           label: "市辖区"
          //         },
          //         {
          //           label: "芙蓉区"
          //         },
          //         {
          //           label: "天心区"
          //         },
          //         {
          //           label: "岳麓区"
          //         },
          //         {
          //           label: "开福区"
          //         },
          //         {
          //           label: "雨花区"
          //         },
          //         {
          //           label: "长沙区"
          //         }
          //       ]
          //     }
          //   ]
          // }
        ],
        defaultProps: {
          children: "children",
          label: "label",
          isLeaf: "leaf"
        }
      }
    };
  },
  mounted() {
    this.getZoneToUserID();
  },
  methods: {
    // 获取用户地区树
    getZoneToUserID: function() {
      const self = this;
      axiosRequest
        .axiosGet(this.getZoneToUserIDUrl)
        .then(function(response) {
          /**
             * Id
            :
            43010000
            Level
            :
            2
            UpZoneId
            :
            43000000
            ZoneName
            :
            "长沙市"
             */
          // 封装一个函数根据数据源来组装需要的数据集
          self.zoneArray.zoneData = formSourceData(response.data);
        })
        .catch();
    },
    // 处理Input子组件传递上来的最新值
    inputChange: function(msg) {
      this.mapNewToSourceData(msg);
    },
    // 处理select子组件传递上来的最新值
    selectChange: function(msg) {
      this.mapNewToSourceData(msg);
      if (msg.labelId === this.selectType.CheckType) {
        //判断点击的单选框为考核类型
        for (let searchItem in this.tabCtntList.searchCreteria) {
          let searchTemp = this.tabCtntList.searchCreteria[searchItem];
          if (searchTemp.labelId === this.selectType.DatePicker) {
            //找到日期选择器的配置项singleDatePicker
            this.tabCtntList.searchCreteria[searchItem] = this.searchCheckType(msg.compVal, msg.options);
            return;
          }
        }
      }
    },
    // 封装查找选中的考核类型的函数
    searchCheckType: function(value, options) {
      for (let optItem of options) {
        if (optItem.value === value) {
          return optItem
        }
      }
    },
    // 处理checkbox子组件传递上来的最新值
    checkboxChange: function(msg) {
      this.mapNewToSourceData(msg);
    },
    // 处理singlecheckbox子组件传递上来的最新值
    singleChkboxChange: function(msg) {
      this.mapNewToSourceData(msg);
    },
    // 处理datePicker子组件传递上来的最新值
    datePickerChange: function(msg) {
      this.mapNewToSourceData(msg);
    },
    // 处理datePicker子组件传递上来的最新值
    singleDatePickerChange: function(msg) {
      this.mapNewToSourceData(msg);
    },
    // 将子组件传上来的最新值赋给对应的数据集封装为一个函数
    mapNewToSourceData: function(msg) {
      for (let searchItem of this.tabCtntList.searchCreteria) {
        if (searchItem.labelId === msg.labelId) {
          if (this.preSearchType.indexOf(msg.labelId) >= 0) {
            searchItem.compVal = msg.compVal;
            searchItem.compId = msg.compId;
          } else {
            searchItem.compVal = msg.compVal;
          }
          break;
        }
      }
    },
    handleBtnClick: function(btnId) {
      switch (btnId) {
        case commonConfig.btnEventsId.search:
          this.handleClickSearch(this.tabCtntList.searchCreteria, 1);
          break;
        case commonConfig.btnEventsId.print:
          this.handleClickPrint();
          break;
      }
    },
    //处理子组件触发的查询事件
    handleClickSearch: function(msg, currentPage) {
      const self = this;
      // 封装函数来组装每一页请求的参数
      const GetCheckManageByZoneParams = self.formPageParams(msg, currentPage);
      self.tabCtntList.loading = true; //加载数据的时候，显示加载数据的logo
      self.tabCtntList.btnEvents[0].isDisabled = true; //单击查询按钮后，禁止使用查询和打印按钮，防止重复操作
      self.tabCtntList.btnEvents[1].isDisabled = true; //单击查询按钮后，禁止使用查询和打印按钮，防止重复操作
      axiosRequest
        .axiosGet(this.getCheckManageByZoneUrl, GetCheckManageByZoneParams)
        .then(function(response) {
          const zonecheckPrintTemp = response.data.TotalList;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.InstallRateScore
          ].rate =
            zonecheckPrintTemp.InstallRate;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.InstallRateScore
          ].getScore =
            zonecheckPrintTemp.InstallScore;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.InstallRateScore
          ].amount =
            zonecheckPrintTemp.Score;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.UplineRateScore
          ].rate =
            zonecheckPrintTemp.UplineRate;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.UplineRateScore
          ].getScore =
            zonecheckPrintTemp.UplineScore;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.DriftRateScore
          ].rate =
            zonecheckPrintTemp.DriftRate;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.DriftRateScore
          ].getScore =
            zonecheckPrintTemp.DriftScore;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.LocInteRateScore
          ].rate =
            zonecheckPrintTemp.LocInteRate;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.LocInteRateScore
          ].getScore =
            zonecheckPrintTemp.LocInteScore;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.ValidRateScore
          ].rate =
            zonecheckPrintTemp.ValidRate;
          self.tabCtntList.tabDetail.TabCtnt[
            self.munalMappingTab.ValidRateScore
          ].getScore =
            zonecheckPrintTemp.ValidScore;
          self.tabCtntList.loading = false;
          self.tabCtntList.btnEvents[0].isDisabled = false; //操作成功后，使能查询和打印按钮
          self.tabCtntList.btnEvents[1].isDisabled = false; //操作成功后，使能查询和打印按钮
        })
        .catch(function(error) {});
    },
    handleClickPrint: function() {
      //处理子组件触发的打印事件
      // 1. 第一种打印方法行不通，因为需要覆盖原来的页面内容
      // let bdhtml = window.document.body.innerHTML,
      //     sprnstr = '<span startprint="" style="display: none;"></span>',
      //     eprnstr = '<span endprint="" style="display: none;"></span>';
      // let prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+sprnstr.length);
      // prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
      // window.document.body.innerHTML=prnhtml;
      // window.print();
      // 2. 第二种方法,采用css2里面的@media print
      window.print();
    },
    formPageParams: function(msg, pageIndex) {
      let nType = 1,
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
      for (let msgItem of msg) {
        if (msgItem.labelId === "ZoneId") zoneId = msgItem.compId;
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
        } else if (msgItem.labelId === "IsIncludeLower")
          isIncludeLower = Number(msgItem.compVal);
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
        
        pageSize, //默认参数 - 分页大小
        readPage, //默认参数 - 目前还不清楚这个参数的作用

        isIncludeLower,
        sortName,
        sortOrder,
        pageIndex
      };
    },
    // 处理左边地区点击事件
    handleNodeClick: function(data) {
      // 将该地区赋值给地区输入框
      for (let msgItem of this.tabCtntList.searchCreteria) {
        if (msgItem.labelId === "ZoneId") {
          msgItem.compVal = data.label;
          msgItem.compId = data.Id;
        }
      }
      this.handleClickSearch(this.tabCtntList.searchCreteria, 1); //不仅需要替换地区的内容，而且还需要得到结果
    }
  }
};
</script>
