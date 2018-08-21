<template>
  <div class="home-security-item">
      <div :id="idName" class="home-security-pieEcharts">
      </div>
      <label>{{ homSecItmTitle }}</label>
      <br>
      <label id="home_security_online_count" class="home-security-label-online">{{subTitle}}</label>
  </div>
</template>
<style type="text/css" src="./homeSecurityItem.css"></style>
<script>
import * as echarts from 'echarts';
export default {
  name: 'HomeSecurityItem',
  props: ['idName','homSecItmTitle', 'subTitle', 'seriesData'],
  data(){
      return{
        securityItem: {
            idName: this.idName,
            homSecItmTitle: this.homSecItmTitle,
            subTitle: this.subTitle,
            seriesData: this.seriesData
      }
    }
  },
  watch: {
    subTitle: function(val){
    this.securityItem.subTitle = val;
    this.drawHomeSecItem();
    }
  },
  mounted(){
    this.drawHomeSecItem();
  },
  methods: {
    drawHomeSecItem: function(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.securityItem.idName));
      // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: ['rgb(142,254,245)', 'rgb(35,52,72)'],
        series: [{
                name:'车辆在线情况',
                type:'pie',
                radius: ['55%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
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
                hoverable: true,
                data: this.securityItem.seriesData
            }
        ]};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
}
</script>
