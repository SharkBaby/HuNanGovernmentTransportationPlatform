<template>
  <div class="regulation">
    <el-row class="regulation-row">
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="regulation-col-left">
        <org-online-component class="regulation-content-left-top" :orgOnline="orgOnline"></org-online-component>
        <org-oncheck-component class="regulation-content-left-top" :orgOncheck="orgOncheck"></org-oncheck-component>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="regulation-col-center">
        <security-ctnt-map :mapType="mapType" :mapItem="mapItem" v-on:handleRegulationData="handleRegulationData" :class="regulationCenter.hideCenterMap"></security-ctnt-map>
        <el-tabs v-model="regulationCenter.activeName" :class="['regulation-center-check-info-publish', regulationCenter.hideCenterCheckMsg]">
          <el-tab-pane label="查岗" name="checksentry">
            <el-row class="tab-content">
              <el-col :span="8" class="tab-left">
                <el-tree :data="regulationCenter.checkTab.data" :props="regulationCenter.defaultProps" show-checkbox :default-expanded-keys="[1]"></el-tree>
              </el-col>
              <el-col :span="16" class="tab-right">
                <el-row>
                  <el-input type="textarea" :rows="2" placeholder="" v-model="regulationCenter.checkTab.checkQuestion" class="question-input"></el-input>
                </el-row>
                <el-row>
                  <el-input type="textarea" :rows="4" placeholder="" v-model="regulationCenter.checkTab.checkAnswer" class="answer-input">
                  </el-input>
                </el-row>
                <el-row class="supervise-button">
                  <button-component btnName="查岗"></button-component>
                  <button-component btnName="问题切换"></button-component>
                </el-row>
                <div class="regulation-map regulation-checksentry-return" title="返回地图" @mouseup="gobackMap"></div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="信息发布" name="message-publish">
            <el-row>
              <el-col :span="8" class="tab-left">
                <el-tree :data="regulationCenter.msgPublishTab.data" :props="regulationCenter.defaultProps" show-checkbox :default-expanded-keys="[1]"></el-tree>
              </el-col>
              <el-col :span="16" class="tab-right">
                <el-input type="textarea" :rows="6" placeholder="请输入信息发布的内容" v-model="regulationCenter.msgPublishContent">
                </el-input>
                <div class="searchcreteria-item" v-for="(msgPublishItem, msgPublishKey) of regulationCenter.msgPublishTab.msgPUblishCreteria" :key="msgPublishKey">
                  <el-row class="item-title">{{msgPublishItem.itemTitle}}</el-row>
                  <input-component :labelName="msgPublishItem.labelName" :compVal="msgPublishItem.compVal" v-if="msgPublishItem.searchType === searchType.input"></input-component>
                  <select-component :options="msgPublishItem.options" :labelName="msgPublishItem.labelName" :compVal="msgPublishItem.compVal" v-else-if="msgPublishItem.searchType === searchType.select"></select-component>
                  <el-date-picker v-else-if="msgPublishItem.searchType === searchType.datePicker" v-model="msgPublishItem.compVal" type="date" placeholder="请输入抽查时间" class="item-datepicker">
                  </el-date-picker>
                </div>
                <!-- Button Event -->
                <el-row class="regulation-button">
                  <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of regulationCenter.msgPublishTab.btnEvents" :key="btnKey"></button-component>
                </el-row>
                <div class="regulation-map regulation-checksentry-return" title="返回地图" @mouseup="gobackMap"></div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-row :class="['regulation-content-center-btn', regulationCenter.hideCenterMap]">
          <div class="regulation-map regulation-map-info" title="信息发布" @mouseup="showCenter('message-publish')"></div>
          <div class="regulation-map regulation-map-checksentry" title="查岗" @mouseup="showCenter('checksentry')"></div>
          <div class="regulation-map regulation-map-return" title="返回上级行政区域" @mouseup="getPlatFormOnlineData"></div>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="regulation-col-right">
        <regulation-bar-component :regulationBar="vhcleInnet" :iconStatus="onlineIconStatus" class="regulation-col-right-item" v-on:eventTrigger="innetEventTrigger"></regulation-bar-component>
        <regulation-bar-component :regulationBar="vhcleOnline" :iconStatus="onlineIconStatus" class="regulation-col-right-item" v-on:eventTrigger="onlineEventTrigger"></regulation-bar-component>
      </el-col>
    </el-row>
  </div>
</template>

<style type="text/css" src="./regulation.css">
  
</style>

<script>
  import OrgOnlineComponent from '@/components/OrgOnlineComponent/OrgOnlineComponent'
  import OrgOncheckComponent from '@/components/OrgOncheckComponent/OrgOncheckComponent'
  import SecurityCtntMap from "@/components/SecurityContent/SecurityCtntMap/SecurityCtntMap"
  import RegulationBarComponent from '@/components/RegulationBarComponent/RegulationBarComponent'
  import ButtonComponent from '@/components/ButtonComponent/ButtonComponent';
  import InputComponent from '@/components/InputComponent/InputComponent'
  import SelectComponent from '@/components/SelectComponent/SelectComponent'
  import {
    axiosRequest,
    getShortName,
    getSplitData,
    storageOperation,
    isNullUndefEmpty,
    formSourceData
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'regulation',
    components: {
      OrgOnlineComponent,
      OrgOncheckComponent,
      SecurityCtntMap,
      RegulationBarComponent,
      ButtonComponent,
      InputComponent,
      SelectComponent,
    },
    data() {
      return {
        getOrgOnlineUrl: commonConfig.rootUrl + commonConfig.GetLevelPlatDataDetail,
        getZoneToUserIDUrl: commonConfig.rootUrl + commonConfig.GetZoneToUserID, // 用户地区树
        orgOnline: {
          title: '机构在线情况',
          items: []
        },
        // orgOncheck: {
        //   title: '机构在岗情况',
        //   mapItems: [{
        //     itemClass: 'companyindex-circlemap-item-0',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-1',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-2',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-3',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-4',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-5',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-6',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-7',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-8',
        //     itemVal: ''
        //   }, {
        //     itemClass: 'companyindex-circlemap-item-9',
        //     itemVal: ''
        //   }]
        // },
        orgOnCheckmapItems: [],
        // 中间地图需要的数据
        mapType: '湖南',
        mapData: [],
        sourceData: [],
        // 中间查岗，信息发布的数据
        searchType: {
          input: 'input',
          select: 'select',
          datePicker: 'datePicker'
        },
        regulationCenter: {
          activeName: 'checksentry',
          hideCenterMap: '',
          hideCenterCheckMsg: 'hide-center',
          defaultProps: {
            children: 'children',
            label: 'label',
            isLeaf: 'leaf'
          },
          checkTab: {
            data: [{
              label: '湖南省',
              children: [{
                label: '長沙市',
                Id: 111,
                children: [{
                  label: '市辖区',
                  Id: 111,
                }, {
                  label: '芙蓉区',
                  Id: 111,
                }, {
                  label: '天心区'
                }, {
                  label: '岳麓区'
                }, {
                  label: '开福区'
                }, {
                  label: '雨花区'
                }, {
                  label: '长沙区'
                }]
              }]
            }],
            checkQuestion: '',
            checkAnswer: ''
          },
          msgPublishTab: {
            data: [{
              label: '湖南省',
              children: [{
                label: '長沙市',
                children: [{
                  label: '市辖区'
                }, {
                  label: '芙蓉区'
                }, {
                  label: '天心区'
                }, {
                  label: '岳麓区'
                }, {
                  label: '开福区'
                }, {
                  label: '雨花区'
                }, {
                  label: '长沙区'
                }]
              }]
            }],
            msgPublishContent: '',
            msgPUblishCreteria: [{
              searchType: 'input',
              itemTitle: '标题',
              labelName: '',
              compVal: ''
            }, {
              searchType: 'select',
              itemTitle: '类型',
              labelName: '',
              compVal: '',
              options: [{
                value: '0',
                label: '一般',
              }, {
                value: '1',
                label: '紧急',
              }, {
                value: '2',
                label: '非常紧急',
              }],
            }, {
              searchType: 'select',
              itemTitle: '是否回复',
              labelName: '',
              compVal: '',
              options: [{
                value: '0',
                label: '不需要',
              }, {
                value: '1',
                label: '需要',
              }],
            }, {
              searchType: 'datePicker',
              itemTitle: '截止日期',
              compVal: '',
            }],
            btnEvents: [{
              iconName: '',
              btnName: '发布'
            }, {
              iconName: '',
              btnName: '初始化'
            }]
          }
        },
  
        baseInfoData: { //临时保存的数据集合，根据鼠标点击事件而变化真正需要展示的数目
          xAxisData: [],
          series0Data: [],
          series1Data: [],
          displayAllItems: '',
          clickClass: ''
        },
        xAxisData: [],
        series0Data: [],
        series1Data: [],
        changeBaseInfoFlag: false,
        // 车辆上线情况
        // 柱状图样式
        itemStyle: {
          normal: {
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14
              }
            }
          }
        }
      }
    },
    computed: {
      orgOncheck: function() {
        return {
          title: '机构在岗情况',
          mapItems: this.orgOnCheckmapItems
        }
      },
      mapItem: function() {
        return {
          chart_map: {
            data: this.mapData
            // data: [{
            //   name: "湖南省",
            //   value: 0
            // }, {
            //   name: "长沙市",
            //   value: 0
            // }, {
            //   name: "株洲市",
            //   value: 0
            // }, {
            //   name: "湘潭市",
            //   value: 0
            // }, {
            //   name: "衡阳市",
            //   value: 0
            // }, {
            //   name: "邵阳市",
            //   value: 0
            // }, {
            //   name: "岳阳市",
            //   value: 0
            // }]
          },
          mapTitle: '运营机构监管',
          sourceData: this.sourceData,
          mapType: 'Regulation' // 这个参数会在地图组建中区分是来自于哪一个页面的调用，从而处理不同的逻辑
        }
      },
      // 车辆类型入网概况
      vhcleInnet: function() {
        return {
          idName: 'regulation-vehicle-innet',
          title: '车辆入网情况',
          xAxisData: this.xAxisData,
          seriesdata: [{
            name: '车辆总数',
            type: 'bar',
            // data: [4642, 3816, 2528, 2435,14075]
            data: this.series0Data,
            itemStyle: this.itemStyle,
            // barGap: '40%',
            // barWidth: 14,
            // barCategoryGap:'40%'
          }, {
            name: '入网总数',
            type: 'bar',
            // data: [0,10,20,30,40]
            data: this.series1Data,
            itemStyle: this.itemStyle,
            // barGap: '40%',
            // barWidth: 14,
            // barCategoryGap:'40%'
          }],
          displayAllItems: this.baseInfoData.displayAllItems,
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'top',
            data: ['车辆总数', '入网总数'],
            textStyle: {
              color: '#fff'
            }
          },
        }
      },
      innetIconStatus: function() { //将小icon的事件独立出来，不然会导致重绘
        return {
          clickClass: this.baseInfoData.clickClass,
          changeBaseInfoFlag: this.changeBaseInfoFlag
        }
      },
      // 车辆上线情况
      vhcleOnline: function() {
        return {
          idName: 'regulation-vehicle-online',
          title: '车辆上线情况',
          xAxisData: this.xAxisData,
          seriesdata: [{
            name: '应上线车辆数',
            type: 'bar',
            // data: [4642, 3816, 2528, 2435,14075]
            data: this.series0Data,
            itemStyle: this.itemStyle,
            // barGap: '40%',
            // barWidth: 14,
            // barCategoryGap:'40%'
          }, {
            name: '已上线车辆数',
            type: 'bar',
            // data: [0,10,20,30,40]
            data: this.series1Data,
            itemStyle: this.itemStyle,
            // barGap: '40%',
            // barWidth: 14,
            // barCategoryGap:'40%'
          }],
          displayAllItems: this.baseInfoData.displayAllItems,
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'top',
            data: ['应上线车辆数', '已上线车辆数'],
            textStyle: {
              color: '#fff'
            }
          },
        }
      },
      onlineIconStatus: function() { //将小icon的事件独立出来，不然会导致重绘
        return {
          clickClass: this.baseInfoData.clickClass,
          changeBaseInfoFlag: this.changeBaseInfoFlag,
        }
      },
    },
    mounted: function() {
      this.getPlatFormOnlineData(); //获取左边机构在线情况、机构在岗情况的初始数据
    },
    methods: {
      //获取左边机构在线情况、机构在岗情况的初始数据
      getPlatFormOnlineData: function() {
        const self = this;
        if (!isNullUndefEmpty(commonConfig.OrgOnCheckInterval))
          clearInterval(storageOperation.getItem(commonConfig.OrgOnCheckInterval));
        axiosRequest.axiosGet(this.getOrgOnlineUrl, {
            zoneID: 0
          })
          .then(function(response) {
            self.sourceData = response.data;
            /**
             * HandleCount
            :
            0
            InnetCount
            :
            5928
            IsEmployed
            :
            1
            OnlinePlatTime
            :
            155
            OnlineTime
            :
            0
            StatDate
            :
            20180118
            SupervisedCount
            :
            0
            VehicleCount
            :
            6043
            ZoneID
            :
            43010000
            ZoneName
            :
            "长沙市"
             */
            // 封装为一个函数来进行初始化的时候数据加载和处理展示、单击地图某一个城市的数据加载和处理展示
            self.initMouseupHandle(self.sourceData);
            // 初始化中间地图
            self.initRegulationMap(self.sourceData);
          })
          .catch()
      },
      // 初始化中间地图
      initRegulationMap: function(dataRslt) {
        for (let dataItem of dataRslt) {
          this.mapData.push({
            name: dataItem.ZoneName,
            value: dataItem.InnetCount
          }); //中间地图的数据加载
        }
      },
      // 车辆入网情况，车辆上线情况
      initvhcleInnet: function(data) {
        let baseInfoTemp = [];
        for (let item of data) {
          baseInfoTemp.push({
            ZoneName: getShortName(item.ZoneName, 3),
            InnetCount: item.InnetCount,
            VehicleCount: item.VehicleCount,
            ZoneID: item.ZoneID,
            IsEmployed: item.IsEmployed,
            OnlinePlatTime: item.OnlinePlatTime,
            OnlineTime: item.OnlineTime
          })
        }
        //基本信息排序，根据图表设置取数据
        baseInfoTemp.sort(function(a, b) {
          return b.InnetCount - a.InnetCount
        });
        // 总结：先清空已有的数据，然后再进行添加
        this.baseInfoData = {
          xAxisData: [],
          series0Data: [],
          series1Data: [],
          displayAllItems: '',
          clickClass: ''
        };
        // 根据排序的进行倒序显示
        for (let item of baseInfoTemp) {
          this.baseInfoData.xAxisData.push(item.ZoneName);
          this.baseInfoData.series0Data.push(item.InnetCount);
          this.baseInfoData.series1Data.push(item.VehicleCount);
        }
        this.changeBaseInfoItems();
      },
      changeBaseInfoItems: function() {
        if (this.changeBaseInfoFlag || this.baseInfoData.xAxisData.length <= 5) {
          // 根据排序的进行倒序显示
          this.xAxisData = this.baseInfoData.xAxisData;
          this.series0Data = this.baseInfoData.series0Data;
          this.series1Data = this.baseInfoData.series1Data;
          this.baseInfoData.displayAllItems = '';
        } else {
          this.xAxisData = this.baseInfoData.xAxisData.slice(0, 4);
          this.xAxisData.push('其他');
          this.series0Data = getSplitData(4, this.baseInfoData.series0Data);
          this.series1Data = getSplitData(4, this.baseInfoData.series1Data);
          this.baseInfoData.displayAllItems = 'displayAllRegulationItems';
        }
        if (this.baseInfoData.clickClass != 'regulation-baseinfo-more-click')
          this.baseInfoData.clickClass = 'regulation-baseinfo-more-click';
        else this.baseInfoData.clickClass = 'regulation-baseinfo-more-toggleclick';
        if (this.changeBaseInfoFlag) this.baseInfoData.clickClass = 'regulation-baseinfo-more-toggleclick';
        this.changeBaseInfoFlag = !this.changeBaseInfoFlag;
      },
      // 子组件向父组件传递事件，然后在父组件中相应事件，然后再将最新状态传回到子组件，后期需要调查有没有更方便的写法
      innetEventTrigger: function(message) {
        if (message.mouseover) this.baseInfoData.clickClass = 'regulation-baseinfo-more-toggleclick';
        else if (message.mouseout) {
          if (!this.changeBaseInfoFlag) this.baseInfoData.clickClass = 'regulation-baseinfo-more-toggleclick';
          else this.baseInfoData.clickClass = 'regulation-baseinfo-more-click';
        } else if (message.mouseup) {
          this.changeBaseInfoItems();
        }
      },
      onlineEventTrigger: function(message) {
        if (message.mouseover) this.baseInfoData.clickClass = 'regulation-baseinfo-more-toggleclick';
        else if (message.mouseout) {
          if (!this.changeBaseInfoFlag) this.baseInfoData.clickClass = 'regulation-baseinfo-more-toggleclick';
          else this.baseInfoData.clickClass = 'regulation-baseinfo-more-click';
        } else if (message.mouseup) {
          this.changeBaseInfoItems();
        }
      },
      // 点击地图上的某一个城市，响应事件
      handleRegulationData: function(message) {
        clearInterval(storageOperation.getItem(commonConfig.OrgOnCheckInterval));
        this.initMouseupHandle(message);
      },
      // 封装为一个函数来进行初始化的时候数据加载和处理展示、单击地图某一个城市的数据加载和处理展示
      initMouseupHandle: function(data) {
        const self = this;
        // 总结：先清空已有的数据，然后再进行添加
        self.orgOnline = {
          title: '机构在线情况',
          items: []
        };
        self.orgOnCheckmapItems = [];
        for (let item in data) {
          let width = '',
            score = '',
            cityName = '';
          if (data[item].OnlinePlatTime != 0)
            width = (data[item].OnlineTime / data[item].OnlinePlatTime * 100) + '%';
          else width = '100%';
          score = data[item].OnlineTime + '/' + data[item].OnlinePlatTime;
          cityName = getShortName(data[item].ZoneName, 3);
          // 机构在线情况
          self.orgOnline.items.push({
            cityName,
            width,
            score
          });
          // 机构在岗情况
          self.orgOnCheckmapItems.push({
            itemVal: cityName,
            IsEmployed: data[item].IsEmployed ? 'onGuard' : 'post', //控制显示的状态
            hoverClass: '', //控制mousehover事件的放大样式显示
            leftVal: '', //随机生成每一个元素的横向位置
            topHeight: '', //控制离上边距的距离
            direction: '' //控制运动方向
          });
        }
        // 展示车辆入网情况
        self.initvhcleInnet(data);
      },
      // 响应单击信息发布，查岗按钮来展示响应的中间页面
      showCenter: function(val) {
        this.regulationCenter.activeName = val;
        this.regulationCenter.hideCenterMap = 'hide-3d-transform';
        const self = this;
        setTimeout(() => {
          self.regulationCenter.hideCenterMap += ' hide-center'; // 注意这个空格是必须的，以便于分开两个不同的class
        }, 500);
        this.regulationCenter.hideCenterCheckMsg = 'show-default';
        setTimeout(() => {
          this.regulationCenter.hideCenterCheckMsg += ' show-3d-transform'; // 注意这个空格是必须的，以便于分开两个不同的class
        }, 500);
        // 获取用户地区树
        axiosRequest.axiosGet(this.getZoneToUserIDUrl)
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
            self.regulationCenter.checkTab.data = formSourceData(response.data); //查岗地区信息
            self.regulationCenter.msgPublishTab.data = formSourceData(response.data); //信息发布地区信息
          })
          .catch();
      },
      // 点击返回到地图按钮
      gobackMap: function() {
        this.regulationCenter.hideCenterCheckMsg = 'hide-3d-transform';
        const self = this;
        setTimeout(() => {
          self.regulationCenter.hideCenterCheckMsg += ' hide-center'; // 注意这个空格是必须的，以便于分开两个不同的class
        }, 500);
        setTimeout(() => {
          self.regulationCenter.hideCenterMap = 'show-default'; // 注意这个空格是必须的，以便于分开两个不同的class
        }, 600);
        setTimeout(() => {
          self.regulationCenter.hideCenterMap += ' show-3d-transform'; // 注意这个空格是必须的，以便于分开两个不同的class
        }, 700);
      }
    },
    created: function(){
      const breadNavs = JSON.parse(storageOperation.getItem('breadNavs'));
      this.$emit('viewIn', breadNavs);
    }
  }
</script>