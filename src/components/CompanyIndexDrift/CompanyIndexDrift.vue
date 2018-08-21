<template>
  <div class="companyIndexDrift">
    <p class="companyindex-header">卫星定位漂移车辆率
      <a href="#"></a>
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <div id="companyIndexDrift-echarts"></div>
  </div>
</template>

<style type="text/css" src="./companyIndexDrift.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'companyIndexDrift',
    components: {},
    data() {
      return {
        companyDriftTitle: '卫星定位漂移车辆率'
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('companyIndexDrift-echarts'));
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['湖南邵阳湘', '湘潭汽车运', '湖南高速运', '衡阳建滔运']
          },
          series: [{
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 335,
                name: '湖南邵阳湘'
              }, ]
            },{
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 335,
                name: '湘潭汽车运'
              }, ]
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '60%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 310,
                name: '湖南高速运'
              }, ]
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['60%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 234,
                name: '衡阳建滔运'
              }, ]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>
