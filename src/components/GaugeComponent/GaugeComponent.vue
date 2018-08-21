<template>
  <div :id="idName">
  </div>
</template>

<style type="text/css" src="./gaugeComponent.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  import 'echarts/map/js/china.js';
  import 'echarts/map/js/province/hunan.js';
  export default {
    name: 'gaugeComponent',
    props: ['idPName', 'value'],
    data() {
      return {
        idName: this.idPName,
      }
    },
    mounted() {
      this.drawGaugeMap();
    },
    methods: {
      drawGaugeMap: function() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.idName));
        // 指定图表的配置项和数据
        var option = this.getGaugeOption();
        // 使用刚指定的配置项和数据显示图表。
        // this.initChart('home_security_ul');
        myChart.setOption(option);
        setInterval(function() {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          myChart.setOption(option, true);
        }, 2000);
      },
      // this function is for china map instead of province map
      getGaugeOption: function() {
        return {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [{
            name: '业务指标',
            type: 'gauge',
            detail: {
              formatter: '{value}条/s',
              backgroundColor: '#25384f',
              borderWidth: 1,
              borderColor: '#fff',
              shadowColor: '#fff', //默认透明
              shadowBlur: 5,
              offsetCenter: [0, '50%'], // x, y，单位px
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff'
              },
              offsetCenter: [0, '80%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              fontSize: 20
            },
            data: [{
              value: this.value,
              name: ''
            }]
          }]
        }
      },
    }
  }
</script>
