<template>
  <el-row class="piePlatformComponent">
    <div :id="piePlatformRslt.idName" class="piePlatformComponent-Echarts"></div>
    <p class="platform-alarm-count">
      <label>{{piePlatformRslt.alarmCNT}}</label>
    </p>
  </el-row>
</template>

<style type="text/css" src="./piePlatformComponent.css">
  
</style>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'piePlatformComponent',
    props: ['piePlatformEcharts'],
    data() {
      return {
        piePlatformRslt: this.piePlatformEcharts
      }
    },
    watch: {
      piePlatformEcharts: function(val) {
        this.piePlatformRslt = val;
        this.drawPieItem();
      }
    },
    mounted() {
      this.drawPieItem();
    },
    methods: {
      drawPieItem: function() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.piePlatformRslt.idName));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: this.piePlatformRslt.unAlarmCNT,
            x: 'center',
            y: document.getElementById(this.piePlatformRslt.idName).offsetHeight * 0.52,
            textStyle: {
              color: '#fff',
              fontSize: 10,
              fontWeight: 'lighter'
            }
          },
          legend: {
            orient: 'horizontal',
            //x: '60%',
            y: '5%',
            textStyle: {
              color: '#FFF'
            },
            data: [{
                name: '定位',
                icon: 'rectangle'
              },
              {
                name: '未报警',
                icon: 'rectangle'
              },
              {
                name: '报警',
                icon: 'rectangle'
              }
            ],
            selectedMode: false
          },
          tooltip: {
            trigger: 'item',
            formatter: "未报警总数 : {d}% ({c})"
            // formatter: function (params) {
            //     var str = "定位总数 : ";
            //     var percent =0;
            //     if(platformData.alarmLinePie.locationCNT!=0){
            //         percent = (platformData.alarmLinePie.unAlarmCNT / platformData.alarmLinePie.locationCNT * 100).toFixed(2);
            //     }
            //     str += percent + "%(" + platformData.alarmLinePie.locationCNT + ")";
            //     return str;
            // }
          },
          color: ['#8DFFFF', '#02F4F5', '#FF2122'],
          calculable: false,
          grid: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            x: '25%',
            x2: '25%',
            y: '40%',
            y2: '30%'
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            show: false,
            data: ['占位', '一', '二', '三', '四', '五', '六', '日', '占位']
          }],
          yAxis: [{
            type: 'value',
            boundaryGap: [0, 0],
            show: false,
            max: 200
          }],
          animation: false,
          series: [{
              name: '定位',
              type: 'pie',
              clickable: false,
              clockWise: true,
              radius: ['72%', '75%'],
              center: ['50%', '50%'],
              funnelAlign: 'left',
              data: [{
                value: this.piePlatformRslt.locationCNT,
                name: '定位'
              }],
              itemStyle: {
                normal: {
                  labelLine: {
                    show: true,
                    lineStyle: {
                      type: 'dashed'
                    },
                    length: 5
                  },
                  label: {
                    position: 'inner',
                    textStyle: {
                      color: '#FFF',
                      fontFamily: 'Microsoft YaHei',
                      fontSize: 14
                    },
                    formatter: "{c}",
                    distance: 0.6
                  }
                }
              }
            },
            {
              name: '未报警',
              type: 'pie',
              clickable: false,
              clockWise: true,
              radius: ['0%', '0%'],
              center: ['50%', '50%'],
              data: [{
                value: 0,
                name: '未报警'
              }, ],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              }
            },
            {
              name: '报警',
              type: 'pie',
              clickable: false,
              clockWise: true,
              radius: ['0%', '0%'],
              center: ['50%', '50%'],
              data: [{
                value: this.piePlatformRslt.alarmCNT,
                name: '报警'
              }],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              }
            },
            {
              name: '',
              type: 'line',
              symbol: 'none',
              showAllSymbol: true,
              smooth: true,
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default'
                  }
                }
              },
              data: [120, 130, 140, 144, 151, 170, 140, 120, 120],
              tooltip: {
                show: false
              },
            },
            {
              name: '边框',
              type: 'pie',
              clickable: false,
              clockWise: true,
              radius: ['49%', '50%'],
              center: ['50%', '50%'],
  
              data: [{
                value: 1,
                name: '边框'
              }, ],
              itemStyle: {
                normal: {
                  color: '#8DFFFF',
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              }
            },
            // {
            //   name: '',
            //   type: 'pie',
            //   tooltip: {
            //     show: false
            //   },
            //   radius: ['50%', '100%'],
            //   center: ['50%', '50%'],
            //   itemStyle: {
            //     normal: {
            //       color: color, //'#142539',
            //       label: {
            //         show: false
            //       },
            //       labelLine: {
            //         show: false
            //       },
            //     },
            //     emphasis: {
            //       color: 'rgba(0,0,0,0)',
            //     }
            //   },
            //   data: [{
            //     value: 10,
            //     name: '报警'
            //   }],
            // }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>
