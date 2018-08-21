<template>
  <el-row class="platformComponentTopright">
    <p class="platfom-title-font">{{platformTopRightList.title}}</p>
    <el-col :span="15" class="topright-col">
      <basic-line-chart :basicLineChartRslt="topRightChartRslt"></basic-line-chart>
    </el-col>
    <el-col :span="9" class="topright-col">
      <pie-platform-component :piePlatformEcharts="topRightPiePlatformRslt"></pie-platform-component>
    </el-col>
  </el-row>
</template>

<style type="text/css" src="./platformComponents.css">
  
</style>

<script>
  import BasicLineChart from '@/components/BasicLineChartComponent/BasicLineChartComponent'
  import PiePlatformComponent from '@/components/PiePlatformComponent/PiePlatformComponent'
  import {
    axiosRequest
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'platformComponentTopright',
    props: ['platformTopRightList'],
    components: {
      BasicLineChart,
      PiePlatformComponent
    },
    data() {
      return {
        getPlatformAlarmLinePieUrl: commonConfig.rootUrl + commonConfig.GetPlatformAlarmLinePie,
        // 折线图
        xAxisdata: [],
        seriesdata0: [],
        seriesdata1: [],
        // 报警定位饼图
        titleText: '',
        locationCNT: '',
        alarmCNT: '',
        unAlarmCNT: ''
      }
    },
    computed: {
      topRightChartRslt: function() {
        return {
          idName: 'platform-top-right-basicline',
          legenddata: [],
          xAxisdata: this.xAxisdata,
          // yAxis: {
          //   min: 0,
          //   max: 6000000,
          //   interval: 1000000
          // },
          seriesdata: [{
            name: '报警',
            type: 'line',
            // data: [492, 540, 416, 344, 310, 364, 492, 540, 416, 344, 310, 364, 492, 540, 416, 416],
            data: this.seriesdata0,
            smooth: true,
            lineStyle: { // 设置线条颜色
              color: 'rgb(189,48,78)'
            }
          }, {
            name: '定位',
            type: 'line',
            // data: [5451332, 2501730, 1717655, 1647899, 1645375, 1633319, 5451332, 2501730, 1717655, 1647899, 1645375, 1633319, 5451332, 2501730, 1717655, 1717655],
            data: this.seriesdata1,
            smooth: true,
            lineStyle: { // 设置线条颜色
              color: 'rgb(140,251,252)'
            }
          }]
        }
      },
      topRightPiePlatformRslt: function() {
        return {
          idName: 'platform-top-right-pie',
          titleText: this.titleText,
          locationCNT: this.locationCNT,
          alarmCNT: this.alarmCNT,
          unAlarmCNT: this.unAlarmCNT
        }
      }
    },
    mounted: function() {
      this.GetPlatformAlarmLinePie();
    },
    methods: {
      GetPlatformAlarmLinePie: function() {
        const self = this;
        axiosRequest.axiosGet(this.getPlatformAlarmLinePieUrl)
          .then(function(response) {
            let alarmLinePie = {
              hour: [],
              alarm: [],
              location: [],
              locationCNT: 0,
              alarmCNT: 0,
              unAlarmCNT: 0
            }
            for (let item of response.data) {
              if (!item.AlarmCNT) item.AlarmCNT = 0;
              if (!item.PlocCnt) item.PlocCnt = 0;
              if (!item.UNAarmCNT) item.UNAarmCNT = 0;
              alarmLinePie.hour.push(item.Hour);
              alarmLinePie.alarm.push(item.AlarmCNT * 100);
              alarmLinePie.location.push(item.PlocCnt);
              alarmLinePie.locationCNT += item.PlocCnt;
              alarmLinePie.alarmCNT += item.AlarmCNT;
              alarmLinePie.unAlarmCNT += item.UNAarmCNT;
            }
            // 折线图
            self.xAxisdata = alarmLinePie.hour;
            self.seriesdata0 = alarmLinePie.alarm;
            self.seriesdata1 = alarmLinePie.location;
            // 元饼图
            self.titleText = alarmLinePie.unAlarmCNT;
            self.locationCNT = alarmLinePie.locationCNT;
            self.alarmCNT = alarmLinePie.alarmCNT;
            self.unAlarmCNT = alarmLinePie.alarmCNT;
          })
          .catch()
      },
    }
  }
</script>