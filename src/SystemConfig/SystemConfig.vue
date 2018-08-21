<template>
  <div class="server-monitor">
    <vertical-menu :navMenu="navMenu"></vertical-menu>
  </div>
</template>
<style src="./systemConfig.css" type="text/css"></style>
<script>
import VerticalMenu from '@/components/VerticalMenu/VerticalMenu';
import { storageOperation } from "@/common/common";
export default {
  name: 'Base-Info',
  components: {
    VerticalMenu,
  },
  data(){
    return{
      navMenu: [{
        navTitle: '服务商配置',
        indexNumber: '1',
        routerLink: '/Home/SystemConfig/Provider',
        navItems:[]
      },{
        navTitle: '服务商配置',
        indexNumber: '2',
        navItems:[{
          routerLink: '/Home/SystemConfig/Provider',
          linkName: '地区服务商配置',
          indexNumber: '2-1',
        },{
          routerLink: '/Home/SystemConfig/ProviderOutage',
          linkName: '服务商停业务配置',
          indexNumber: '2-2',
        }]
      },{
        navTitle: '车辆配置',
        indexNumber: '3',
        navItems:[{
            routerLink: '/Home/SystemConfig/VehicleFeeder',
            linkName: '接驳车辆配置',
            indexNumber: '3-1',
          },{
            routerLink: '/Home/SystemConfig/VehicleOutage',
            linkName: '停运车辆配置',
            indexNumber: '3-2',
        }]
      }, {
        navTitle: '接入平台配置',
        indexNumber: '4',
        routerLink: '/Home/SystemConfig/AccessPlateformAutoCheck',
        navItems:[]
      }, {
        navTitle: '自动查岗配置',
        indexNumber: '5',
        navItems:[{
          routerLink: '/Home/SystemConfig/PlatfromCheckSentry',
          linkName: '企业查岗配置',
          indexNumber: '5-1',
        },{
          routerLink: '/Home/SystemConfig/IndustryCheckSentry',
          linkName: '行业查岗配置',
          indexNumber: '5-2',
        },{
          routerLink: '/Home/SystemConfig/AccessPlatfromCheckSentry',
          linkName: '接入平台查岗配置',
          indexNumber: '5-3',
        }]
      }, {
        navTitle: '车辆抽查配置',
        indexNumber: '6',
        routerLink: '/Home/SystemConfig/VehicleRandomInspection',
        navItems:[]
      }, {
        navTitle: '考核配置',
        indexNumber: '7',
        routerLink: '/Home/SystemConfig/CheckConfig',
        navItems:[]
      }]
    }
  },
  created: function() {
    const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
    this.$emit("viewIn", breadNavs);
  }
}
</script>
