<template>
  <div class="server-monitor">
    <vertical-menu :navMenu="navMenu"></vertical-menu>
  </div>
</template>
<style src="./serverMonitor.css" type="text/css"></style>
<script>
import VerticalMenu from '@/components/VerticalMenu/VerticalMenu';
import { storageOperation } from "@/common/common";
export default {
  name: 'Server-Monitor',
  components: {
    VerticalMenu,
  },
  data(){
    return{
      navMenu: [{
        navTitle: '服务器监控',
        indexNumber: '1',
        navItems:[{
          routerLink: '/Home/ServerMonitor/LoginServer',
          linkName: '登录服务器',
          indexNumber: '1-1',
        },{
          routerLink: '/Home/ServerMonitor/AnalyseServer',
          linkName: '分析服务器',
          indexNumber: '1-2',
        },{
          routerLink: '/Home/ServerMonitor/CalcServer',
          linkName: '计算服务器',
          indexNumber: '1-3',
        }]
      }]
    }
  },
  created: function() {
    const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
    this.$emit("viewIn", breadNavs);
  }
}
</script>
