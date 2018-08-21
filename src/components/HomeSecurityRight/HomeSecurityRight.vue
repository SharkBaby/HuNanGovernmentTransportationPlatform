
<template>
  <el-row class="home-security-right-part">
    <el-col class="home-security-left" :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
      <security-content-vue :mapItem="mapItem"></security-content-vue>
    </el-col>
    <el-col class="home-security-right" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
      <div @mouseover="overShow(hmSecItem.key)" v-for="hmSecItem in HomeSecurityItems" :key="hmSecItem.key" class="home-security-right-item" :style="{background: hmSecItem.activeflag}">
        <home-security-item :idName="hmSecItem.idName" :homSecItmTitle="hmSecItem.homSecItmTitle" :subTitle="hmSecItem.subTitle" :seriesData="hmSecItem.seriesData"></home-security-item>
      </div>
    </el-col>
  </el-row>
</template>

<style type="text/css" src="./homeSecurityRight.css">
  
</style>

<script>
  import HomeSecurityItem from "./HomeSecurityItem/HomeSecurityItem";
  import SecurityContentVue from '@/components/SecurityContent/SecurityContent';
  import {
    axiosRequest,
    formatterNumber,
    getFromLastDayToLastMonth
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'HomeSecurityRight',
    components: {
      HomeSecurityItem,
      SecurityContentVue
    },
    data() {
      return {
        chartNumbers: {
          online_chart: 0,
          break_chart: 0,
          alarm_chart: 0
        },
        chartCounts: {
          online_chartCount: 0,
          break_chartCount: 0,
          alarm_chartCount: 0
        },
        activeFlag: {
          online_chart_flag: 'rgb(73,92,110)',
          break_chart_flag: 'none',
          alarm_chart_flag: 'none'
        },
        getUrl1: commonConfig.rootUrl + commonConfig.GetCurrentOnlineData,
        getUrl2: commonConfig.rootUrl + commonConfig.GetVehicleBreakData,
        getUrl3: commonConfig.rootUrl + commonConfig.GetSecurityAlarmPoint,
        mapDetailItems: [{
          chart_map: {
            data: ''
          },
          mapTitle: '车辆在线情况',
        }, {
          chart_map: {
            data: ''
          },
          mapTitle: '车辆违章情况',
        }, {
          chart_map: {
            data: '',
            markPointdata: ''
          },
          mapTitle: '报警热点',
        }],
        mapItem: {
          chart_map: '',
          mapTitle: '',
        }
      }
    },
    computed: {
      HomeSecurityItems: function() {
        return [{
          key: 0,
          idName: 'home_security_online_chart',
          homSecItmTitle: '车辆在线情况',
          activeflag: this.activeFlag.online_chart_flag,
          subTitle: '重点：' + formatterNumber(this.chartNumbers.online_chart) + '辆',
          seriesData: [{
            value: this.chartCounts.online_chartCount,
            name: '在线'
          }, {
            value: this.chartNumbers.online_chart - this.chartCounts.online_chartCount,
            name: '未在线'
          }]
        }, {
          key: 1,
          idName: 'home_security_break_chart',
          homSecItmTitle: '车辆违章情况',
          activeflag: this.activeFlag.break_chart_flag,
          subTitle: '两客：' + formatterNumber(this.chartNumbers.break_chart) + '辆',
          seriesData: [{
            value: this.chartCounts.break_chartCount,
            name: '违章车辆'
          }, {
            value: this.chartNumbers.break_chart - this.chartCounts.break_chartCount,
            name: '未违章车辆'
          }]
        }, {
          key: 2,
          idName: 'home_security_alarm_chart',
          homSecItmTitle: '报警热点',
          activeflag: this.activeFlag.alarm_chart_flag,
          seriesData: [{
            value: this.chartCounts.alarm_chartCount,
            name: '报警数'
          }, {
            value: this.chartNumbers.alarm_chart - this.chartCounts.alarm_chartCount,
            name: '未报警数'
          }]
        }]
      }
    },
    mounted: function() {
      this.GetCurrentOnlineData();
      this.GetVehicleBreakData();
      this.GetSecurityAlarmPoint();
      // const self = this;
      // for (let i = 0; i < 3; i++) {
      //   (function(value) {
      //     setInterval(() => {
      //       self.overShow(i);
      //     }, 2000);
      //   }(i))
      // }
    },
    methods: {
      GetCurrentOnlineData: function() {
        const self = this;
        axiosRequest.axiosGet(this.getUrl1)
          .then(function(response) {
            const online_chartcount = response.data.ZoneCount;
            let total = 0,
              count = 0,
              temp = [];
            for (var i = 0; i < online_chartcount.length; i++) {
              temp.push({
                name: online_chartcount[i].ZoneName,
                value: online_chartcount[i].OnlineCount
              });
              total += online_chartcount[i].InnetCount;
              count += online_chartcount[i].OnlineCount;
            }
            // self.chartNumbers.online_chart = formatterNumber(total);
            self.chartNumbers.online_chart = total;
            self.chartCounts.online_chartCount = count;
            self.mapDetailItems[0].chart_map.data = temp;
            console.log(temp)
            self.mapItem = self.mapDetailItems[0];
          })
          .catch(function(error) {});
      },
      GetVehicleBreakData: function() {
        const self = this;
        axiosRequest.axiosGet(this.getUrl2)
          .then(function(response) {
            const break_chartcount = response.data.ViolationList;
            let total = 0,
              count = 0,
              temp = [];
            for (let i = 0; i < break_chartcount.length; i++) {
              let value = 0;
              let breakCount = break_chartcount[i].BreakBanV;
              if (break_chartcount[i].InstalledCount != 0) {
                value = breakCount / break_chartcount[i].InstalledCount * 100;
              }
              temp.push({
                name: break_chartcount[i].ZoneName,
                value: (value).toFixed(4)
              });
              total += break_chartcount[i].InstalledCount;
              count += break_chartcount[i].BreakBanV;
            }
            self.chartNumbers.break_chart = total;
            self.chartCounts.break_chartCount = count;
            self.mapDetailItems[1].chart_map.data = temp;
          })
          .catch(function(error) {});
      },
      GetSecurityAlarmPoint: function() {
        const self = this;
        const datetime = new Date();
        const startEnd = getFromLastDayToLastMonth(datetime);
        /*
        startDate: 20170121
        endDate: 20171017
         */
        // commonConfig.GetSecurityAlarmPointParams.beginDate = startEnd.startDate;
        // commonConfig.GetSecurityAlarmPointParams.endDate = startEnd.endDate;
        commonConfig.GetSecurityAlarmPointParams.beginDate = 20171013;
        commonConfig.GetSecurityAlarmPointParams.endDate = 20171017;
        commonConfig.GetSecurityAlarmPointParams.alarmType = 3;
        axiosRequest.axiosGet(this.getUrl3, commonConfig.GetSecurityAlarmPointParams)
          .then(function(response) {
            const alarm_chartcount = response.data.AlarmPointData,
              totalData = response.data.AlarmTatalsData;
            let geoData = [],
              geoTotal = [],
              total = 0,
              count = 0;
            for (let i = 0; i < alarm_chartcount.length; i++) {
              // total += alarm_chartcount[i].InstalledCount;
              // count += alarm_chartcount[i].BreakBanV;
              // Comment: 后端已经将经纬度解析并返回给前端
              // 注释时间：2018-05-25
              // if (!alarm_chartcount[i].BLongitude && !alarm_chartcount[i].Blatitude) {
              //   continue;
              // }
              try {
                geoData.push({
                  name: alarm_chartcount[i].ID,
                  // value: 100,
                  // geoCoord: [alarm_chartcount[i].BLongitudeCNY, alarm_chartcount[i].BLatitudeCNY]
                  coord: [alarm_chartcount[i].BLongitudeCNY, alarm_chartcount[i].BLatitudeCNY]
                });
              } catch (e) {}
            }
            for (let j = 0; j < totalData.length; j++) {
              geoTotal.push({
                name: totalData[j].ZoneName,
                value: totalData[j].Total
              });
            }
            self.chartNumbers.alarm_chart = total;
            self.chartCounts.alarm_chartcount = count;
            self.mapDetailItems[2].chart_map.markPointdata = geoData;
            self.mapDetailItems[2].chart_map.data = geoTotal;
          })
          .catch(function(error) {});
      },
      overShow(key) {
        this.mapItem = this.mapDetailItems[key];
        switch (key) {
          case 0:
            this.activeFlag.online_chart_flag = 'rgb(73,92,110)';
            this.activeFlag.break_chart_flag = 'none';
            this.activeFlag.alarm_chart_flag = 'none';
            break;
          case 1:
            this.activeFlag.online_chart_flag = 'none';
            this.activeFlag.break_chart_flag = 'rgb(73,92,110)';
            this.activeFlag.alarm_chart_flag = 'none';
            break;
          case 2:
            this.activeFlag.online_chart_flag = 'none';
            this.activeFlag.break_chart_flag = 'none';
            this.activeFlag.alarm_chart_flag = 'rgb(73,92,110)';
            break;
          default:
        }
      }
    }
  }
</script>
