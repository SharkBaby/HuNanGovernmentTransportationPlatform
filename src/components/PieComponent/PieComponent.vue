<template>
  <el-row class="pieComponent">
    <div :id="pieRslt.idName" class="pieComponent-Echarts"></div>
  </el-row>
</template>

<style type="text/css" src="./pieComponent.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'pieComponent',
    props: ['pieEcharts'],
    data() {
      return {
        pieRslt: this.pieEcharts
      }
    },
    watch: {
      pieEcharts: function(val) {
        this.pieRslt = val;
        this.drawPieItem();
      }
    },
    mounted() {
      this.drawPieItem();
    },
    methods: {
      drawPieItem: function() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.pieRslt.idName));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: this.pieRslt.titleName,
            x: 'center',
            y: 'center',
            offsetCenter: ['50%', '55%'],
            textStyle: {
              color: '#fff',
              fontSize: 10,
              fontWeight: 'lighter'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: ({d}%) {c}"
          },
          color: this.pieRslt.color,
          legend: { //设置标题栏的位置和样式
            orient: 'horizontal',
            x: 'center',
            y: 'top',
            data: this.pieRslt.data,
            textStyle: {
              color: '#fff'
            }
          },
          series: [{
            name: this.pieRslt.seriesName,
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            selectedMode: 'multiple',
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.pieRslt.seriesdata
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>
