<template>
  <el-row class="platformComponentBottomleft">
    <el-row class="platform-title">
      <span class="platfom-title-font">{{platformBottomLeftList.title}}</span>
      <a :class="['platfom-baseinfo-more-base', baseInfoData.clickClass]" @mouseup="changeBaseInfoItems()" @mouseover="mouseOver()" @mouseout="mouseOut()"></a>
    </el-row>
    <el-row class="platform-body">
      <basic-bar-chart-component :basicBarChartRslt="bottomLeftChartRslt"></basic-bar-chart-component>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./platformComponents.css">
</style>

<script>
  import BasicBarChartComponent from '@/components/BasicBarChartComponent/BasicBarChartComponent'
  import {
    axiosRequest,
    getShortName,
    getSplitData
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'platformComponentBottomleft',
    props: ['platformBottomLeftList'],
    components: {
      BasicBarChartComponent
    },
    data() {
      return {
        getPlatformBaseInfoUrl: commonConfig.rootUrl + commonConfig.GetPlatformBaseInfo,
        baseInfoData: { //临时保存的数据集合，根据鼠标点击事件而变化真正需要展示的数目
          xAxisData: [],
          series0Data: [],
          series1Data: [],
          displayAllItems: '',
          clickClass: ''
        },
        xAxisData: [],
        series0Data: [],
        series1Data: [],
        changeBaseInfoFlag: false,
        // 柱状图样式
        itemStyle: {
          normal: {
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14
              }
            }
          }
        }
      }
    },
    computed: {
      bottomLeftChartRslt: function() {
        return {
          idName: 'platform-bottom-left',
          xAxisData: this.xAxisData,
          seriesdata: [{
            name: '两客一危入网数',
            type: 'bar',
            // data: [4642, 3816, 2528, 2435,14075]
            data: this.series0Data,
            itemStyle: this.itemStyle,
            // barGap: '40%',
            // barWidth: 14,
            // barCategoryGap:'40%'
          }, {
            name: '重货入网数',
            type: 'bar',
            // data: [0,10,20,30,40]
            data: this.series1Data,
            itemStyle: this.itemStyle,
            // barGap: '40%',
            // barWidth: 14,
            // barCategoryGap:'40%'
          }],
          displayAllItems: this.baseInfoData.displayAllItems,
          legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            data: ['两客一危入网数', '重货入网数'],
            textStyle: {
              color: '#fff'
            }
          },
        }
      }
    },
    mounted() {
      this.GetPlatformBaseInfo();
    },
    methods: {
      GetPlatformBaseInfo: function() {
        const self = this;
        axiosRequest.axiosGet(this.getPlatformBaseInfoUrl)
          .then(function(response) {
            let baseInfoTemp = [];
            for (let item of response.data) {
              baseInfoTemp.push({
                name: getShortName(item.ShortName, 4),
                carCnt: item.CARCNT,
                truckCnt: item.TruckCNT,
                total: item.CARCNT + item.TruckCNT
              })
            }
            //基本信息排序，根据图表设置取数据
            baseInfoTemp.sort(function(a, b) {
              return b.total - a.total
            });
            // 根据排序的进行倒序显示
            for (let item of baseInfoTemp) {
              self.baseInfoData.xAxisData.push(item.name);
              self.baseInfoData.series0Data.push(item.carCnt);
              self.baseInfoData.series1Data.push(item.truckCnt);
            }
            self.changeBaseInfoItems();
          })
          .catch()
      },
      // mouseup事件改变柱状图显示的数目
      changeBaseInfoItems: function() {
        if (this.changeBaseInfoFlag || this.baseInfoData.xAxisData.length <= 5) {
          // 根据排序的进行倒序显示
          this.xAxisData = this.baseInfoData.xAxisData;
          this.series0Data = this.baseInfoData.series0Data;
          this.series1Data = this.baseInfoData.series1Data;
          this.baseInfoData.displayAllItems = '';
        } else {
          this.xAxisData = this.baseInfoData.xAxisData.slice(0, 4);
          this.xAxisData.push('其他');
          this.series0Data = getSplitData(4, this.baseInfoData.series0Data);
          this.series1Data = getSplitData(4, this.baseInfoData.series1Data);
          this.baseInfoData.displayAllItems = 'displayAllItems';
        }
        this.changeBaseInfoFlag = !this.changeBaseInfoFlag;
        if(this.baseInfoData.clickClass != 'platfom-baseinfo-more-click')
          this.baseInfoData.clickClass = 'platfom-baseinfo-more-click';
        else this.baseInfoData.clickClass = 'platfom-baseinfo-more-toggleclick';
        if(!this.changeBaseInfoFlag) this.baseInfoData.clickClass = 'platfom-baseinfo-more-toggleclick';
      },
      mouseOver: function(){
        this.baseInfoData.clickClass = 'platfom-baseinfo-more-toggleclick';
      },
      mouseOut: function(){
        if(!this.changeBaseInfoFlag) this.baseInfoData.clickClass = 'platfom-baseinfo-more-toggleclick';
        else this.baseInfoData.clickClass = 'platfom-baseinfo-more-click';
      }
    }
  }
</script>