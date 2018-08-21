<template>
  <div id="home_security_map" class="home_security_ul">
  </div>
</template>

<style type="text/css" src="./securityCtntMap.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  import 'echarts/map/js/china.js';
  import 'echarts/map/js/province/hunan.js';
  import axios from 'axios';
  import {
    axiosRequest
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'SecurityContent',
    props: ['mapType', 'mapItem'],
    data() {
      return {
        secHeadTitle: '安全监管',
        mapItemEcharts: this.mapItem,
        getVehicleSpreadDataUrl: commonConfig.rootUrl + commonConfig.GetVehicleSpreadData, // 车辆分布页面上的地图点击事件接口
        getOrgOnlineUrl: commonConfig.rootUrl + commonConfig.GetLevelPlatDataDetail,// 获得Regulation组件的数据
        mapTypeVal: { // 定义是哪一个页面调用该地图模块
          Regulation: 'Regulation',
          VehicleDistibution: 'VehicleDistibution'
        }
      }
    },
    watch: {
      mapItem: function(val) {
        this.mapItemEcharts = val;
        // if (val.idName != 'home_security_map_alarm_chart') this.mapItemEcharts.chart_map['markPointdata'] = '';
        echarts.init(document.getElementById('home_security_map')).clear();
        this.drawSecCtntMap();
      }
    },
    mounted() {
      this.drawSecCtntMap();
    },
    methods: {
      // 获得VehicleDistribution组件的数据
      getVehicleSpecificCity: function(zoneId) {
        const self = this;
        axiosRequest.axiosGet(this.getVehicleSpreadDataUrl, {
            zoneId: zoneId,
            vehicleType: 0
          })
          .then(function(response) {
            const specificCityArr = [];
            let VehicleAllCnt = 0;
            if (response.data[0].VehicleCnt !== 0) VehicleAllCnt = response.data[0].VehicleCnt; // 获得当前省份或者地区的所有入网车辆
            for (let vhcleItem of response.data) {
              specificCityArr.push({
                ZName: vhcleItem.ZoneName,
                Rate: VehicleAllCnt == 0 ? '0.00' : (vhcleItem.VehicleCnt / VehicleAllCnt * 100).toFixed(2) + '%',
                VhcleCount: vhcleItem.VehicleCnt,
                CurrnetVhcleCount: vhcleItem.VehicleCnt, //这是一个临时变量来保存当前勾选筛选框后的总量
                CBusTotalCount: vhcleItem.CBusTotalCount,
                TourTotalCount: vhcleItem.TourTotalCount,
                LineTotalCount: vhcleItem.LineTotalCount,
                DTotalCount: vhcleItem.DTotalCount,
                HeavyTotalCount: vhcleItem.HeavyTotalCount,
                TractorTotalCount: vhcleItem.TractorTotalCount
              });
            }
            self.$emit('handleVhcleRight', specificCityArr);
          })
          .catch(function(error) {});
      },
      // 获得Regulation组件的数据
      getRegulationSpecificCity: function(zoneID) {
        const self = this;
        axiosRequest.axiosGet(this.getOrgOnlineUrl, {
            zoneID
          })
          .then(function(response) {
            const specificCityArr = [];
            for (let vhcleItem of response.data) {
              specificCityArr.push({
                InnetCount: vhcleItem.InnetCount,
                IsEmployed: vhcleItem.IsEmployed,
                OnlinePlatTime: vhcleItem.OnlinePlatTime,
                OnlineTime: vhcleItem.OnlineTime,
                VehicleCount: vhcleItem.VehicleCount,
                ZoneID: vhcleItem.ZoneID,
                ZoneName: vhcleItem.ZoneName
              });
            }
            self.$emit('handleRegulationData', specificCityArr);
          })
          .catch(function(error) {});
      },
      drawSecCtntMap: function() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('home_security_map'));
        // 指定图表的配置项和数据
        var option = this.getChinaMapOption();
        // 使用刚指定的配置项和数据显示图表。
        // this.initChart('home_security_ul');
        myChart.setOption(option);
        let self = this;
        if (self.mapItemEcharts.mapType == self.mapTypeVal.VehicleDistibution) {
          //处理mouseover 事件来改变元饼图的数据
          myChart.on('mouseover', function(params) {
            const seriesdataTemp = self.mapItemEcharts.sourceData[params.dataIndex];
            const pieRslt = {
              titleName: '车辆：' + seriesdataTemp.VehicleCnt,
              seriesdata: [{
                  value: seriesdataTemp.CBusTotalCount,
                  name: '包车客车'
                },
                {
                  value: seriesdataTemp.TourTotalCount,
                  name: '旅游客车'
                }, {
                  value: seriesdataTemp.LineTotalCount,
                  name: '三类班线客车'
                }, {
                  value: seriesdataTemp.DTotalCount,
                  name: '危险品车'
                }, {
                  value: seriesdataTemp.HeavyTotalCount + seriesdataTemp.TractorTotalCount,
                  name: '重货、半挂牵引车'
                }
              ]
            }
            self.$emit('handleVhcleLeft', pieRslt);
          });
          //处理mouseup 事件来改变右边的信息
          myChart.on('mouseup', function(params) {
            self.getVehicleSpecificCity(self.mapItemEcharts.sourceData[params.dataIndex].ZoneID);
          });
        }else if (self.mapItemEcharts.mapType == self.mapTypeVal.Regulation) {
          //处理mouseup 事件来改变右边的信息
          myChart.on('mouseup', function(params) {
            self.getRegulationSpecificCity(self.mapItemEcharts.sourceData[params.dataIndex].ZoneID);
          });
        }
      },
      // this function is for china map instead of province map
      getChinaMapOption: function() {
        return {
          title: {
            text: this.mapItemEcharts.mapTitle,
            y: 'bottom',
            x: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 15,
              fontWeight: 300
            }
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            min: 0,
            max: 0,
            left: 'right',
            top: '40%',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            precision: 2,
            inRange: {
              // color: ['#DCF0FF', '#68BDFF', '#4593FF', '#1483D9', '#106BB2']
            }
          },
          series: [{
            name: '省级地域分布',
            type: 'map',
            mapType: this.mapType,
            roam: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            selectedMode: 'single',
            itemStyle: {
              normal: {
                areaColor: 'rgb(43,61,78)',
                borderColor: 'rgb(228,230,231)'
              },
              emphasis: {
                areaColor: 'rgb(26,44,54)'
              }
            },
            hoverable: true,
            data: this.mapItemEcharts.chart_map.data,
            markPoint: {
              symbolSize: 3,
              large: true,
              effect: {
                show: true,
                shadowBlur: 0
              },
              itemStyle: {
                color: '#10c6c7',
                borderColor: '#10c6c7'
              },
              data: this.mapItemEcharts.chart_map.markPointdata
            }
          }]
        }
      },
    }
  }
</script>
