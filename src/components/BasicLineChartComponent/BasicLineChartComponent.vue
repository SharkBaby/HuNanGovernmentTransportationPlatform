<template>
  <div class="basicLineChartComponent">
    <div :id="basicLineRslt.idName" class="basiclineComponent-Echarts"></div>
  </div>
</template>

<style type="text/css" src="./basicLineChartComponent.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'basicLineChartComponent',
    props: ['basicLineChartRslt'],
    components: {},
    data() {
      return {
        basicLineRslt: this.basicLineChartRslt
      }
    },
    watch: {
      basicLineChartRslt: function(val) {
        this.basicLineRslt = val;
        this.drawLine();
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.basicLineRslt.idName));
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: this.basicLineRslt.legenddata
          },
          toolbox: {
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: {
            name: '时间',
            type: 'category',
            data: this.basicLineRslt.xAxisdata,
            boundaryGap: false,// 横轴坐标点位于每一个轴线上，而不是轴线之间
            nameTextStyle: {
              color: '#FFF'
            },
            nameLocation: 'start',
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#6F7983'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#6F7983'
              }
            },
            axisLabel: { //设置横轴坐标字体的颜色
              textStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            type: 'value',
            name: '数据量',
            nameTextStyle: {
              color: '#FFF'
            },
            // min: this.basicLineRslt.yAxis.min,
            // max: this.basicLineRslt.yAxis.max,
            // interval: this.basicLineRslt.yAxis.interval,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#6F7983'
              }
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#6F7983'
              }
            }
          },
          series: this.basicLineRslt.seriesdata
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>
