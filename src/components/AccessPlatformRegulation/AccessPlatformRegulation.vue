<template>
  <div class="accessPlatform-regulation-part">
    <router-link :to="routerLink">
      <p class="accessPlatform-regulation-head">{{ accPlatTitle }}</p>
      <div class="accessPlatform-regulation-detail-part">
        <div class="accessPlatform-regulation-detail">
          <div class="">
            <img src="../../assets/online-platform-number-sector.png" class="online-platform-number">
            <label>{{accPlaRegDetTopTitle}}</label>
            <label>{{TYPE2CNT}}</label>
          </div>
          <div class="">
            <img src="../../assets/offline-platform-number-sector.png" class="offline-platform-number">
            <label>{{accPlaRegDetBotTitle}}</label>
            <label>{{TYPE3CNT}}</label>
          </div>
        </div>
        <el-row class="access-platform-echarts">
          <pie-component :pieEcharts="pieEcharts"></pie-component>
        </el-row>
        <div class="online-platform-total">
          <span class="online-platform_total_number">{{AccessPlatTotal}}</span>
          <label>{{onltotalText}}</label>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style type="text/css" src="./accessPlatformRegulation.css">
  
</style>

<script>
  import PieComponent from "@/components/PieComponent/PieComponent"
  import {
    axiosRequest
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'AccessPlatformRegulation',
    components: {
      PieComponent
    },
    data() {
      return {
        routerLink: '/Home/Platform',
        accPlatTitle: '接入监管平台',
        accPlaRegDetTopTitle: '两客一危',
        TYPE2CNT: 0,
        accPlaRegDetBotTitle: '重货及半挂牵引车',
        TYPE3CNT: 0,
        AccessPlatTotal: 0,
        onltotalText: '接入平台总数',
        getUrl: commonConfig.rootUrl + commonConfig.GetAccessPlatformRegulation
      }
    },
    computed: {
      pieEcharts: function(){
        return {
          routerLink: '',
          idName: 'access_platform_echarts',
          // data: ['包车客车', '旅游客车', '重货、半挂牵引车', '三类班线客车', '危险品车'],
          data: [],
          color: 'rgb(151,255,255)',
          seriesdata: [{
              value: this.TYPE2CNT,
              name: '两客一危'
            },
            {
              value: this.TYPE3CNT,
              name: '重货及半挂牵引车'
            }
          ]
          }
        }
    },
    mounted: function(){
      this.GetAccessPlatformRegulation();
    },
    methods:{
      GetAccessPlatformRegulation: function(){
        const self = this;
        axiosRequest.axiosGet(this.getUrl)
          .then(function(response) {
            /*AccessPlatTotal:27
            TYPE2CNT:27
            TYPE3CNT:0 */
            self.AccessPlatTotal = response.data.AccessPlatTotal;
            self.TYPE2CNT = response.data.TYPE2CNT;
            self.TYPE3CNT = response.data.TYPE3CNT;
          })
          .catch(function(error) {});
      }
    }
  }
</script>
