<template>
  <div class="vehicle-distribute-part">
    <router-link :to="routerLink">
      <p class="vehicle-distribute-head">{{ vehDisDasTitle }}</p>
      <div id="vehicle-distribute-echarts"></div>
    </router-link>
  </div>
</template>

<style type="text/css" src="./vehicleDistributionDashboard.css">
  
</style>

<script>
  import {
    axiosRequest,
    ObjToArray,
    twoArrayDivide
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  import * as echarts from 'echarts';
  import vhcleEchartsConfig from './vhcleEchartsConfig.js'
  export default {
    name: 'VehicleDistributionDashboard',
    components: {},
    data() {
      return {
        routerLink: '/Home/VehicleDistribution',
        vehDisDasTitle: '车辆分布',
        getUrl: commonConfig.rootUrl + commonConfig.GetCarOnLine,
        CarOnlineNumberArr: '',
        CarOnlineNumberRate: '',
        VideoNumberArr: '',
        VideoNumberRate: '',
        CarTotalArr: '',
      }
    },
    mounted() {
      this.GetCarOnLine();
    },
    methods: {
      GetCarOnLine(){
        const self = this;
        axiosRequest.axiosGet(this.getUrl)
          .then(function(response) {
            self.CarOnlineNumberArr = ObjToArray(response.data.CarOnlineNumber);
            self.VideoNumberArr = ObjToArray(response.data.VideoNumber);
            self.CarTotalArr = ObjToArray(response.data.CarTotal);
            self.CarOnlineNumberRate = twoArrayDivide(self.CarOnlineNumberArr, self.CarTotalArr);
            self.VideoNumberRate = twoArrayDivide(self.VideoNumberArr, self.CarTotalArr);
            self.drawLine();
          })
          .catch(function(error) {});
      },
      
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('vehicle-distribute-echarts'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '车辆类型入网概况',
            subtext: '纯属虚构',
            x: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 15,
              fontWeight: 300
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: vhcleEchartsConfig.legendData
          },
          color: ['rgb(2,244,245)', 'rgb(2,244,245)', 'rgb(142,254,245)', 'rgb(142,254,245)'],
          // dataset: {
          //   source: [
          //     ['product','入网车辆数','视频入网数'],
          //     ['包车客车', 43.3, 85.8],
          //     ['旅游客车', 83.1, 73.4],
          //     ['三类班线', 86.4, 65.2],
          //     ['危险品', 72.4, 53.9]
          //   ]
          // },
          xAxis: {
            type: 'category',
            data: ['包车客车', '旅游客车', '三类班线', '危险品'],
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: [{
              type: 'value',
              name: '入网总量',
              min: 0,
              max: 20000,
              interval: 1000,
              axisLabel: {
                formatter: '{value} 台'
              }
            },
            {
              type: 'value',
              name: '入网百分比',
              min: 0,
              max: 100,
              interval: 5,
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [{
            name: '入网车辆数',
            type: 'bar',
            // data: [6685, 12963, 12155, 12954]
            data: this.CarOnlineNumberArr
          }, {
            name: '入网车辆率',
            type: 'line',
            // data: [0.5871 * 100, 0.5745 * 100, 0.2043 * 100, 0.0031 * 100],
            data: this.CarOnlineNumberRate,
            yAxisIndex: 1,
            smooth: true
          }, {
            name: '视频入网数',
            type: 'bar',
            data: this.VideoNumberArr
          }, {
            name: '视频入网率',
            type: 'line',
            data: this.VideoNumberRate,
            yAxisIndex: 1,
            smooth: true
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>
