<template>
  <el-row class="home-split-line noprint">
    <el-col :xs="24" :sm="8" :md="12" :lg="12" :xl="12">
      <bread-crumb-component :breadNavs="weatherbreadNavs" class="bread-crub"></bread-crumb-component>
      <el-row class="weather">
        <span class="weather-ico"></span>
        <label class="weather-label">{{weatherdetail}}</label>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="16" :md="12" :lg="12" :xl="12" class="personal-settings">
      <personal-settings></personal-settings>
    </el-col>
  </el-row>
</template>
<style src="./weather.css" type="text/css"></style>
<script>
import PersonalSettings from "./PersonalSettings/PersonalSettings";
import BreadCrumbComponent from '@/components/BreadCrumbComponent/BreadCrumbComponent'
import {
    storageOperation
  } from '@/common/common';
export default {
  name: "Weather",
  props: ['breadNavs'],
  components: {
    PersonalSettings,
    BreadCrumbComponent
  },
  data() {
    return {
      weatherdetail: "长沙明日:雷雨大风",
      weatherbreadNavs:this.breadNavs
    };
  },
  watch: {
    breadNavs: function(val){
      this.weatherbreadNavs = val;
    }
  }
  // mounted(){
  //   this.getCurrnetPath();
  // },
  // methods: {
  //   getCurrnetPath: function(){
  //     this.breadNavs = JSON.parse(storageOperation.getItem('breadNavs'));
  //   }
  // }
};
</script>
