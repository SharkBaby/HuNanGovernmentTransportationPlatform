<template>
  <el-row class="platformComponentsTopleft">
    <el-col :span="12" class="platform-top-left-col">
      <p class="platfom-title-font">{{platformTopLeftList.title}}</p>
      <div class="platfrom-content-linksituation">
        <ul class="platfrom_link_list">
          <li :title="platformLinkItem.titleName" v-for="(platformLinkItem, platformLinkKey) of platformTopLeftList.items" :key="platformLinkKey">
            <div :class="['platform-link-left', platformLinkItem.connectStatus]"></div>
            <div class="platform-link-arrow"></div>
            <label class="platfrom-content-link-name">{{platformLinkItem.linkName}}</label>
            <span>
              <label>{{platformLinkItem.titleName}}</label>
            </span>
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :span="12" class="platform-top-right-col">
      <el-row class="platform-title">
        <router-link :to="pieEcharts.routerLink" :class="['platform-content-checksentry-basic', iconClass]" @mouseover="hoverShow()" @mouseout="outShow()"></router-link>
      </el-row>
      <el-row class="platform-body">
        <pie-component :pieEcharts="pieEcharts"></pie-component>
      </el-row>
    </el-col>
  </el-row>
</template>

<style type="text/css" src="./platformComponents.css">
  
</style>

<script>
  import PieComponent from "@/components/PieComponent/PieComponent"
  export default {
    name: 'PlatformComponentsTopleft',
    props: ['platformTopLeftList', 'pieEcharts'],
    components: {
      PieComponent
    },
    data(){
      return{
        iconClass: 'platform-content-checksentry-out'
      }
    },
    methods: {
      hoverShow: function(){
        this.iconClass = 'platform-content-checksentry-hover';
      },
      outShow: function(){
        this.iconClass = 'platform-content-checksentry-out';
      }
    }
  }
</script>