<template>
  <el-row class="transferChartComponent">
    <div :id="transferPlatformRslt.idName" :class="['transferChartComponent-Echarts', transferPlatformRslt.displayAllItems]"></div>
  </el-row>
</template>

<style type="text/css" src="./transferChartComponent.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'transferChartComponent',
    props: ['transferPlatformEcharts'],
    data() {
      return {
        transferPlatformRslt: this.transferPlatformEcharts
      }
    },
    watch: {
      transferPlatformEcharts: function(val){
        this.transferPlatformRslt = val;
        this.drawTransferChart();
      }
    },
    mounted() {
      this.drawTransferChart();
    },
    methods: {
      drawTransferChart: function() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.transferPlatformRslt.idName));
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: 'center',
            y: '30',
            itemGap: 12,
            data: ['无效数据', '速度值超范围', '限速值超范围', '飘移'],
            textStyle: {
              color: '#fff'
            },
            selectedMode: false
          },
          color: ['#8EFEFF', '#3882ED', '#64D5EE', '#1FC5EC'],
          grid: {
            borderWidth: 0,
            containLabel: true,
          },
          xAxis: [{
            type: 'value',
            position: 'top',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
          }],
          yAxis: [{
            type: 'category',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            // data: ['伊爱北斗', '浏阳北斗', '天地通智', '益阳湘运', '北斗伊爱', '其他'],
            data: this.transferPlatformRslt.yAxisData,
            axisLabel: {
              textStyle: {
                color: '#FFF'
              }
            },
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '无效数据',
            type: 'bar',
            stack: '总量',
            // data: [9.62, 9.62, 9.62, 9.62, 1.0, 2.0],
            data: this.transferPlatformRslt.seriesData0,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'insideRight',
                  textStyle: {
                    color: '#FFF'
                  }
                },
                barBorderRadius: [5, 5, 5, 5],
              },
            }
          }, {
            name: '速度值超范围',
            type: 'bar',
            stack: '总量',
            // data: [6.14, 6.14, 6.14, 6.14, 2.0, 3.0],
            data: this.transferPlatformRslt.seriesData1,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'insideLeft',
                  textStyle: {
                    color: '#FFF'
                  }
                },
                barBorderRadius: [5, 5, 5, 5],
              },
            }
          }, {
            name: '限速值超范围',
            type: 'bar',
            stack: '总量',
            // data: [2.30, 2.30, 2.30, 2.30, 3.0, 4.0],
            data: this.transferPlatformRslt.seriesData2,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'insideLeft',
                  textStyle: {
                    color: '#FFF'
                  }
                },
                barBorderRadius: [5, 5, 5, 5],
              },
            }
          }, {
            name: '飘移',
            type: 'bar',
            stack: '总量',
            // data: [2.30, 2.30, 2.30, 2.30, 4.0, 5.0],
            data: this.transferPlatformRslt.seriesData3,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'insideLeft',
                  textStyle: {
                    color: '#FFF'
                  }
                },
                barBorderRadius: [5, 5, 5, 5],
              },
            }
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.resize();//注意这里需要手动的重新绘制
      }
    }
  }
</script>
