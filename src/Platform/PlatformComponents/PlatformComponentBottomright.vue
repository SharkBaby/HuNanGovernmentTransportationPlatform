<template>
  <el-row class="platformComponentBottomright">
    <el-row class="platform-title">
      <span class="platfom-title-font">{{platformBottomRightList.title}}</span>
      <a :class="['platfom-baseinfo-more-base', transferData.clickClass]" @mouseup="changeTranferMoreItems()" @mouseover="mouseOver()" @mouseout="mouseOut()"></a>
    </el-row>
    <el-row class="platform-body">
      <transfer-chart-component :transferPlatformEcharts="bottomRightChartRslt"></transfer-chart-component>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./platformComponents.css">
  
</style>

<script>
  import TransferChartComponent from '@/components/TransferChartComponent/TransferChartComponent'
  import {
    axiosRequest,
    getShortName,
    getSplitData
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'platformComponentBottomright',
    props: ['platformBottomRightList'],
    components: {
      TransferChartComponent
    },
    data() {
      return {
        getPlatformTransferUrl: commonConfig.rootUrl + commonConfig.GetPlatformTransfer,
        changeTransferFlag: false,
        transferData: {
          yAxisData: [],
          seriesData0: [],
          seriesData1: [],
          seriesData2: [],
          seriesData3: [],
          displayAllItems: '',
          clickClass: ''
        },
        yAxisData: [],
        seriesData0: [],
        seriesData1: [],
        seriesData2: [],
        seriesData3: [],
      }
    },
    computed: {
      bottomRightChartRslt: function() {
        return {
          idName: 'platform-bottom-right',
          yAxisData: this.yAxisData,
          seriesData0: this.seriesData0,
          seriesData1: this.seriesData1,
          seriesData2: this.seriesData2,
          seriesData3: this.seriesData3,
          displayAllItems: this.transferData.displayAllItems
        }
      }
    },
    mounted() {
      this.GetPlatformTransfer();
    },
    methods: {
      GetPlatformTransfer: function() {
        const self = this;
        axiosRequest.axiosGet(this.getPlatformTransferUrl)
          .then(function(response) {
            let transferOriginalDataTemp = [];
            for (let item of response.data) {
              transferOriginalDataTemp.push({
                name: getShortName(item.Name, 4),
                value: [item.InvalidPosition, item.OverSpeedCnt, item.OverLimitSpeed, item.DraftCNT],
                total: item.PlocCnt,
                abnormalTotal: item.InvalidPosition + item.OverSpeedCnt + item.OverLimitSpeed + item.DraftCNT
              });
            }
            //基本信息排序，根据图表设置取数据
            transferOriginalDataTemp.sort(function(a, b) {
              return b.abnormalTotal - a.abnormalTotal
            });
            // 根据排序的进行倒序显示
            for (let item of transferOriginalDataTemp) {
              self.transferData.yAxisData.push(item.name);
              let dataArr = [0.00,0.00,0.00,0.00];
              if (item.total != 0) {
                dataArr[0] = (item.value[0] / item.total * 100).toFixed(2);
                dataArr[1] = (item.value[1] / item.total * 100).toFixed(2);
                dataArr[2] = (item.value[2] / item.total * 100).toFixed(2);
                dataArr[3] = (item.value[3] / item.total * 100).toFixed(2);
              }
              self.transferData.seriesData0.push(dataArr[0]);
              self.transferData.seriesData1.push(dataArr[1]);
              self.transferData.seriesData2.push(dataArr[2]);
              self.transferData.seriesData3.push(dataArr[3]);
            }
            self.changeTranferMoreItems();
          })
          .catch()
      },
      // mouseup事件改变柱状图显示的数目
      changeTranferMoreItems: function() {
        if (this.changeTransferFlag || this.transferData.yAxisData.length <= 6) {
          // 根据排序的进行倒序显示
          this.yAxisData = this.transferData.yAxisData;
          this.seriesData0 = this.transferData.seriesData0;
          this.seriesData1 = this.transferData.seriesData1;
          this.seriesData2 = this.transferData.seriesData2;
          this.seriesData3 = this.transferData.seriesData3;
          this.transferData.displayAllItems = '';
        } else {
          this.yAxisData = this.transferData.yAxisData.slice(0, 5);
          this.yAxisData.push('其他');
          this.seriesData0 = getSplitData(5, this.transferData.seriesData0);
          this.seriesData1 = getSplitData(5, this.transferData.seriesData1);
          this.seriesData2 = getSplitData(5, this.transferData.seriesData2);
          this.seriesData3 = getSplitData(5, this.transferData.seriesData3);
          this.transferData.displayAllItems = 'displayAllItems';
        }
        this.changeTransferFlag = !this.changeTransferFlag;
        if(this.transferData.clickClass != 'platfom-baseinfo-more-click')
          this.transferData.clickClass = 'platfom-baseinfo-more-click';
        else this.transferData.clickClass = 'platfom-baseinfo-more-toggleclick';
        if(!this.changeTransferFlag) this.transferData.clickClass = 'platfom-baseinfo-more-toggleclick';
      },
      mouseOver: function(){
        this.transferData.clickClass = 'platfom-baseinfo-more-toggleclick';
      },
      mouseOut: function(){
        if(!this.changeTransferFlag) this.transferData.clickClass = 'platfom-baseinfo-more-toggleclick';
        else this.transferData.clickClass = 'platfom-baseinfo-more-click';
      }
    }
  }
</script>