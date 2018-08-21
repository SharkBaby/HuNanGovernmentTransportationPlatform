<template>
  <el-row class="regulatioBarComponent">
    <el-row class="regulation-title">
      <span class="regulation-title-font">{{regulationBarRslt.title}}</span>
      <a :class="['regulation-baseinfo-more-base', iconStatus.clickClass]" @mouseup="changeBaseInfoItems()" @mouseover="mouseOver()" @mouseout="mouseOut()"></a>
    </el-row>
    <el-row class="regulation-body">
      <basic-bar-chart-component :basicBarChartRslt="regulationBar"></basic-bar-chart-component>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./regulationBarComponent.css">
  
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
    name: 'regulatioBarComponent',
    props: ['regulationBar', 'iconStatus'],
    components: {
      BasicBarChartComponent
    },
    data() {
      return {
        regulationBarRslt: this.regulationBar
      }
    },
    watch: {
      regulationBar: function(val){
        this.regulationBarRslt = val;
      }
    },
    // data() {
    //   return {
    //     getPlatformBaseInfoUrl: commonConfig.rootUrl + commonConfig.GetPlatformBaseInfo,
    //     baseInfoData: { //临时保存的数据集合，根据鼠标点击事件而变化真正需要展示的数目
    //       xAxisData: [],
    //       series0Data: [],
    //       series1Data: [],
    //       displayAllItems: '',
    //       clickClass: ''
    //     },
    //     xAxisData: [],
    //     series0Data: [],
    //     series1Data: [],
    //     changeBaseInfoFlag: false,
    //   }
    // },
    // computed: {
    //   bottomLeftChartRslt: function() {
    //     return {
    //       idName: 'platform-bottom-left',
    //       xAxisData: this.xAxisData,
    //       series0Data: this.series0Data,
    //       series1Data: this.series1Data,
    //       displayAllItems: this.baseInfoData.displayAllItems
    //     }
    //   }
    // },
    // mounted() {
    //   this.GetPlatformBaseInfo();
    // },
    methods: {
      // GetPlatformBaseInfo: function() {
      //   const self = this;
      //   axiosRequest.axiosGet(this.getPlatformBaseInfoUrl)
      //     .then(function(response) {
      //       let baseInfoTemp = [];
      //       for (let item of response.data) {
      //         baseInfoTemp.push({
      //           name: getShortName(item.ShortName, 4),
      //           carCnt: item.CARCNT,
      //           truckCnt: item.TruckCNT,
      //           total: item.CARCNT + item.TruckCNT
      //         })
      //       }
      //       //基本信息排序，根据图表设置取数据
      //       baseInfoTemp.sort(function(a, b) {
      //         return b.total - a.total
      //       });
      //       // 根据排序的进行倒序显示
      //       for (let item of baseInfoTemp) {
      //         self.baseInfoData.xAxisData.push(item.name);
      //         self.baseInfoData.series0Data.push(item.carCnt);
      //         self.baseInfoData.series1Data.push(item.truckCnt);
      //       }
      //       self.changeBaseInfoItems();
      //     })
      //     .catch()
      // },
      // mouseup事件改变柱状图显示的数目 regulationBarRslt
      changeBaseInfoItems: function() {
        this.$emit('eventTrigger',{mouseup: true});
      },
      mouseOver: function() {
        this.$emit('eventTrigger',{mouseover: true});
      },
      mouseOut: function() {
        this.$emit('eventTrigger',{mouseout: true});
      }
    }
  }
</script>