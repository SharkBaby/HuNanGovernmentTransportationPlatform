<template>
  <div class="base-info">
    <vertical-menu :navMenu="navMenu"></vertical-menu>
  </div>
</template>
<style src="./baseInfo.css" type="text/css"></style>
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
        navTitle: '车辆管理',
        indexNumber: '1',
        navItems:[{
          routerLink: '/Home/BaseInfo/Vehicle',
          linkName: '车辆基本信息',
          indexNumber: '1-1',
        },{
          routerLink: '/Home/BaseInfo/PassengerLine',
          linkName: '客运线路信息',
          indexNumber: '1-2',
        },{
          routerLink: '/Home/BaseInfo/DangerousGoodsLine',
          linkName: '危险品线路信息',
          indexNumber: '1-3',
        },{
          routerLink: '/Home/BaseInfo/DangerousGoods',
          linkName: '危险品货种信息',
          indexNumber: '1-4',
        },{
          routerLink: '/Home/BaseInfo/OfflineVehicle',
          linkName: '凌晨禁行审核',
          indexNumber: '1-5',
        },{
          routerLink: '/Home/BaseInfo/FatigueVehicleVerify',
          linkName: '疲劳驾驶车辆审核',
          indexNumber: '1-6',
        }]
      },{
        navTitle: '运输企业管理',
        indexNumber: '2',
        routerLink: '/Home/BaseInfo/Company',
        navItems:[]
      },{
        navTitle: '用户管理',
        indexNumber: '3',
        routerLink: '/Home/BaseInfo/UserInfo',
        navItems:[]
      },{
        navTitle: '服务商管理',
        indexNumber: '4',
        routerLink: '/Home/BaseInfo/ServiceProvider',
        navItems:[]
      },{
        navTitle: '接入平台管理',
        indexNumber: '5',
        navItems:[{
          routerLink: '/Home/BaseInfo/AccessPlatformInfo',
          linkName: '接入平台基本信息',
          indexNumber: '5-1',
        },{
          routerLink: '/Home/BaseInfo/AccessPlatform',
          linkName: '接入平台参数配置',
          indexNumber: '5-2',
        }]
      },{
        navTitle: '角色管理',
        indexNumber: '6',
        routerLink: '/Home/BaseInfo/Role',
        navItems:[]
      },{
        navTitle: '车辆配置',
        indexNumber: '7',
        routerLink: '/Home/BaseInfo/VehicleConfig',
        navItems:[]
      },{
        navTitle: '从业人员信息',
        indexNumber: '8',
        routerLink: '/Home/BaseInfo/Driver',
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
