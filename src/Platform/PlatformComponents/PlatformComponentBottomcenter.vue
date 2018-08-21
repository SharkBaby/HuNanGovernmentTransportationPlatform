<template>
  <el-row class="platformComponentBottomcenter">
    <el-row class="platform-title">
      <span class="platfom-title-font">{{platformBottomCenterList.title}}</span>
      <a :class="['platfom-location-configure', overClass]" @mouseup="displayDialog()" @mouseover="mouseOver()" @mouseout="mouseOut()"></a>
    </el-row>
    <el-row class="platform-body">
      <basic-line-chart :basicLineChartRslt="bottomCenterChartRslt"></basic-line-chart>
    </el-row>
    <el-dialog title="定位数据显示配置" :visible.sync="dialogVisible" width="30%" class="bottom-center-dialog">
      <p class="bottom-center-dialog-p">最多选择5项</p>
      <el-checkbox-group v-model="locationData.checkedseriesData" :min="1" :max="5" class="bottom-center-checkbox-group" @change="checkSeriesData()">
        <el-row class="" v-for="(chkBoxItem,chkBoxKey) of locationData.seriesDataInit" :key="chkBoxKey">
          <el-checkbox :label="chkBoxItem.name">{{chkBoxItem.nameReal}}</el-checkbox>
        </el-row>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="Save()">保存</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                  </span>
    </el-dialog>
  </el-row>
</template>

<style type="text/css" src="./platformComponents.css">
  
</style>

<script>
  import BasicLineChart from '@/components/BasicLineChartComponent/BasicLineChartComponent'
  import {
    axiosRequest,
    getShortName,
    storageOperation
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'platformComponentBottomcenter',
    props: ['platformBottomCenterList'],
    components: {
      BasicLineChart
    },
    data() {
      return {
        getPlatformLocationUrl: commonConfig.rootUrl + commonConfig.GetPlatformLocation,
        locationData: {
          seriesDataInit: [],
          checkedseriesData: []
        },
        legenddata: [],
        xAxisdata: [],
        seriesdata: [],
        overClass: 'platfom-location-configure-out',
        dialogVisible: false, //控制显示弹窗，
      }
    },
    computed: {
      bottomCenterChartRslt: function() {
        return {
          idName: 'platform-bottom-center',
          // legenddata: ['E-Trans', 'G-BOS智', '北斗伊爱', '部通信中', '烽火台部'],
          legenddata: this.legenddata,
          // xAxisdata: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          xAxisdata: this.xAxisdata,
          yAxis: {
            min: 0,
            max: 250000,
            interval: 50000
          },
          seriesdata: this.seriesdata
          // seriesdata: [{
          //   name: 'E-Trans',
          //   type: 'line',
          //   data: [9492, 9540, 9416, 9344, 9310, 9364, 9492, 9540, 9416, 9344, 9310, 9364, 9492, 9540, 9416, 9416],
          //   smooth: true,
          // }, {
          //   name: 'G-BOS智',
          //   type: 'line',
          //   data: [592, 540, 516, 544, 510, 564, 592, 540, 516, 344, 310, 364, 492, 540, 416, 416],
          //   smooth: true,
          // }, {
          //   name: '北斗伊爱',
          //   type: 'line',
          //   data: [166492, 166540, 166416, 166344, 1310, 188364, 1492, 188540, 199416, 1344, 1310, 199364, 1492, 1540, 1416, 1416],
          //   smooth: true,
          //   // lineStyle: { // 设置线条颜色
          //   //   color: 'rgb(189,48,78)'
          //   // }
          // }, {
          //   name: '部通信中',
          //   type: 'line',
          //   data: [11592, 11540, 11516, 11544, 11510, 11564, 11592, 11540, 11516, 11344, 11310, 11364, 11492, 11540, 11416, 11416],
          //   smooth: true,
          // }, {
          //   name: '烽火台部',
          //   type: 'line',
          //   data: [22592, 22540, 22516, 22544, 22510, 22564, 22592, 22540, 22516, 22344, 22310, 22364, 22492, 22540, 22416, 33416],
          //   smooth: true,
          // }]
        }
      }
    },
    mounted() {
      this.GetPlatformLocation();
    },
    methods: {
      GetPlatformLocation: function() {
        const self = this;
        axiosRequest.axiosGet(this.getPlatformLocationUrl)
          .then(function(response) {
            const resultData = {
              legenddata: [],
              xAxisdata: [],
              seriesData: []
            };
            for (let item of response.data) {
              if (resultData.xAxisdata.indexOf(item.Hour) < 0) resultData.xAxisdata.push(item.Hour);
              // series data
              let existedFlag = -1;
              for (let seriesDataItem in resultData.seriesData) {
                if (resultData.seriesData[seriesDataItem].nameReal == item.Name) {
                  existedFlag = seriesDataItem;
                  break;
                }
              }
              let name = getShortName(item.Name, 6);
              if (existedFlag >= 0) resultData.seriesData[existedFlag].data.push(item.PlocCnt);
              else {
                resultData.legenddata.push(name);
                resultData.seriesData.push({
                  nameReal: item.Name,
                  name,
                  type: 'line',
                  data: [item.PlocCnt],
                  smooth: true,
                });
              }
            }
            self.xAxisdata = resultData.xAxisdata;
            self.seriesdata = resultData.seriesData.slice(0, 5);
            self.legenddata = resultData.legenddata.slice(0, 5);
            self.locationData.seriesDataInit = resultData.seriesData;
            storageOperation.setItem(commonConfig.SessionPlatformLocation, JSON.stringify(resultData.seriesData)); //将获得的所有缓存到sessionStorage，这样服务商查岗页面使用
            self.locationData.checkedseriesData = resultData.legenddata.slice(0, 5);
          })
          .catch()
      },
      displayDialog: function() {
        this.dialogVisible = true;
      },
      mouseOver: function() {
        this.overClass = 'platfom-location-configure-hover';
      },
      mouseOut: function() {
        this.overClass = 'platfom-location-configure-out';
      },
      Save: function() {
        this.seriesdata = [],
          this.legenddata = [];
        for (let seriesDataInitItem of this.locationData.seriesDataInit) {
          for (let checkedItem of this.locationData.checkedseriesData) {
            if (seriesDataInitItem.name == checkedItem) {
              this.seriesdata.push(seriesDataInitItem);
              this.legenddata.push(checkedItem);
            }
          }
        }
        this.dialogVisible = false;
      },
      checkSeriesData: function(value) {
        this.$message({
          message: '最多选择5项接入平台 ！',
          type: 'warning'
        });
      }
    }
  }
</script>