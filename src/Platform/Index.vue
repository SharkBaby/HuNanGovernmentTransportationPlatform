<template>
  <div class="platform-index">
    <el-row class="platform-row-top">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="platform-col">
        <!-- 接入平台连接情况 -->
        <platform-components-topleft :platformTopLeftList="platformTopLeftList" :pieEcharts="pieEcharts"></platform-components-topleft>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="platform-col">
        <!-- 接入平台报警与定位 -->
        <platform-components-topright :platformTopRightList="platformTopRightList"></platform-components-topright>
      </el-col>
    </el-row>
    <el-row class="platform-row-bottom">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="platform-col">
        <!-- 接入平台基本信息 -->
        <platform-component-bottomleft :platformBottomLeftList="platformBottomLeftList"></platform-component-bottomleft>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="platform-col">
        <!-- 接入平台定位数据 -->
        <platform-component-bottomcenter :platformBottomCenterList="platformBottomCenterList"></platform-component-bottomcenter>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="platform-col">
        <!-- 接入平台数据传输质量 -->
        <platform-component-bottomright :platformBottomRightList="platformBottomRightList"></platform-component-bottomright>
      </el-col>
    </el-row>
  </div>
</template>

<style type="text/css" src="./index.css">
  
</style>

<script>
  import PlatformComponentsTopleft from '@/Platform/PlatformComponents/PlatformComponentsTopleft'
  import PlatformComponentsTopright from '@/Platform/PlatformComponents/PlatformComponentsTopright'
  import PlatformComponentBottomleft from '@/Platform/PlatformComponents/PlatformComponentBottomleft'
  import PlatformComponentBottomcenter from '@/Platform/PlatformComponents/PlatformComponentBottomcenter'
  import PlatformComponentBottomright from '@/Platform/PlatformComponents/PlatformComponentBottomright'
  import {
    axiosRequest,
    storageOperation
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'Platform-Index',
    components: {
      PlatformComponentsTopleft,
      PlatformComponentsTopright,
      PlatformComponentBottomleft,
      PlatformComponentBottomcenter,
      PlatformComponentBottomright
    },
    data() {
      return {
        getPlatformListUrl: commonConfig.rootUrl + commonConfig.GetPlatformList,
        getPlatformLinkTotalUrl: commonConfig.rootUrl + commonConfig.GetPlatformLinkTotal,
        platformTopLeftList: {
          title: '接入平台链接情况',
          items: [],
          total: 0,
          seriesdata1: 0,
          seriesdata2: 0
        },
        platformTopRightList: {
          title: '接入平台报警与定位'
        },
        platformBottomLeftList: {
          title: '接入平台基本信息'
        },
        platformBottomCenterList: {
          title: '接入平台定位数据'
        },
        platformBottomRightList: {
          title: '接入平台数据传输质量'
        }
      }
    },
    computed: {
      pieEcharts: function(){
        return {
          // routerLink: '/Home/Platform/PlatformCheck',
          routerLink: '/Home/PlatformCheck',
          idName: 'platform-top-left',
          titleName: '接入平台总数:' + this.platformTopLeftList.total,
          color: ['#3dbeef', '#0056c0'],
          data: ['正常在线平台数', '从链路断线数'],
          seriesName: '接入平台链接情况',
          seriesdata: [{
              value: this.platformTopLeftList.seriesdata1,
              name: '正常在线平台数',
              selected: true
            },
            {
              value: this.platformTopLeftList.seriesdata2,
              name: '从链路断线数',
              selected: true
          }]
        }
      }
    },
    mounted: function() {
      this.GetPlatformList();
      this.GetPlatformLinkTotal();
    },
    methods: {
      GetPlatformList: function() {
        const self = this;
        axiosRequest.axiosGet(this.getPlatformListUrl)
          .then(function(response) {
            for (let item of response.data) {
              self.platformTopLeftList.items.push({
                connectStatus: self.getPlatformListColor(item.MainLink, item.SubordinateLink),
                linkName: item.Name,
                titleName: item.status
              })
            }
          })
          .catch()
      },
      GetPlatformLinkTotal: function() {
        const self = this;
        axiosRequest.axiosGet(this.getPlatformLinkTotalUrl)
          .then(function(response) {
            self.platformTopLeftList.total = response.data[0].PlatformCNT;
            self.platformTopLeftList.seriesdata1 = response.data[0].ONLINECNT;
            self.platformTopLeftList.seriesdata2 = response.data[0].SubLinkOFFLINECNT;
          })
          .catch()
      },
      getPlatformListColor: function(m, f) {
        if (m == 1 && f == 1) return 'connect';
        else if (m == 0 && f == 0) return 'disconnect';
        else if (m == 1 && f == 0) return 'mainconnect';
        else if (m == 0 && f == 1) return 'subordinateconnect';
      }
    },
    created: function(){
      const breadNavs = JSON.parse(storageOperation.getItem('breadNavs'));
      this.$emit('viewIn', breadNavs);
    }
  }
</script>