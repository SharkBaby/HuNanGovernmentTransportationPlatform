<template>
  <div class="basicBarChartComponent">
    <div :id="barPlatformRslt.idName" :class="['basicBarChartComponent-Echarts', barPlatformRslt.displayAllItems]"></div>
  </div>
</template>

<style type="text/css" src="./basicBarChartComponent.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'barPlatformComponent',
    props: ['basicBarChartRslt'],
    components: {},
    data() {
      return {
        barPlatformRslt: this.basicBarChartRslt,
      }
    },
    watch: {
      basicBarChartRslt: function(val) {
        this.barPlatformRslt = val;
        this.drawLine();
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.barPlatformRslt.idName));
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
          legend: this.barPlatformRslt.legend, //显示的柱状图筛选项
          calbulable: false,
          color: ['rgb(2,244,245)', 'rgb(142,254,245)'],
          grid: {
            borderWidth: 0,
            y: '80',
            x: '30',
            x2: '30'
          },
          xAxis: {
            type: 'category',
            // data: ['中交兴路', '宏地道路', '湘北斗车', '衡阳国脉', '其他'],
            data: this.barPlatformRslt.xAxisData,
            axisLabel: { //设置横轴坐标字体的颜色
              textStyle: {
                color: '#fff'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLine: { //是否显示横轴线
              show: false
            }
          },
          yAxis: {
            type: 'value',
            name: '',
            // min: 0,
            // max: 15000,
            // interval: 2000,
            axisLabel: {
              formatter: ''
            },
            splitLine: { //是否显示分隔线
              show: false
            },
            show: false //是否显示纵轴
          },
          series: this.barPlatformRslt.seriesdata
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.resize(); //重新绘制柱状图
      }
    }
  }
</script>
