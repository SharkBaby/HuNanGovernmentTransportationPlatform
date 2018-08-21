<template>
  <div class="home-content">
    <el-row class="home-main">
      <el-col class="content-left" :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <main-display-items :mainDisItems="mainDisItems"></main-display-items>
        <el-col class="left-top" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-col class="home-industry-regulation" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <industry-regulation></industry-regulation>
          </el-col>
          <el-col class="home-accessPlatform-regulation" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <access-platform-regulation></access-platform-regulation>
          </el-col>
        </el-col>
        <el-col class="left-bottom" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <vehicle-distribution-dashboard></vehicle-distribution-dashboard>
        </el-col>
      </el-col>
      <el-col class="content-right" :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
        <home-security-right></home-security-right>
      </el-col>
    </el-row>
    <footer-container></footer-container>
  </div>
</template>

<style src="./bodycontent-container.css" type="text/css">
  
</style>

<script>
  import MainDisplayItems from '@/components/MainDisplayItems/MainDisplayItems';
  import IndustryRegulation from '@/components/IndustryRegulation/IndustryRegulation';
  import AccessPlatformRegulation from '@/components/AccessPlatformRegulation/AccessPlatformRegulation';
  import VehicleDistributionDashboard from '@/components/VehicleDistributionDashboard/VehicleDistributionDashboard';
  import HomeSecurityRight from '@/components/HomeSecurityRight/HomeSecurityRight';
  import FooterContainer from '@/Home/container/FooterContainer/FooterContainer';
  export default {
    name: 'BodyContent-Container',
    components: {
      MainDisplayItems,
      IndustryRegulation,
      AccessPlatformRegulation,
      VehicleDistributionDashboard,
      HomeSecurityRight,
      FooterContainer
    },
    data() {
      return {
        mainDisItems: [{
          href: "/Home/CheckManage/ZoneCheckRank",
          spanClass: 'ban6',
          spanText: '考核通报 >>'
        }, {
          href: "/Home/DataShared",
          spanClass: 'share',
          spanText: '数据共享 >>'
        }, {
          href: "/Home/Report/VehicleInstall",
          spanClass: 'report',
          spanText: '统计分析 >>'
        }, {
          href: "/Home/CompanySupervise",
          spanClass: 'companySupervise',
          spanText: '企业监管 >>'
        }]
      }
    },
    created: function(){
      const breadNavs = [];
      this.$emit('viewIn', breadNavs);
    }
  }
</script>
