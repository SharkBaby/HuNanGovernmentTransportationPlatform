<template>
  <el-row class="companyIndexOverspeed">
    <p class="companyindex-header">平均车辆超速次数
      <a href="#"></a>
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <el-row class="companyindex-overspeed-content">
      <div class="companyindex-overspeed-item" v-for="(overSpeedItem, overSpeedKey) of overSpeed" :key="overSpeedKey">
        <div class="companyindex-overspeed-item-outer">
          <div class="companyindex-overspeed-item-inner" :style="{height: overSpeedItem.height}"></div>
        </div>
      </div>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./companyIndexOverspeed.css">
  
</style>


<script>
  export default {
    name: 'CompanyIndexOverspeed',
    props: [],
    data() {
      return{
        overSpeed:[{
          height: '10%'
        }, {
          height: '20%'
        }, {
          height: '30%'
        }, {
          height: '40%'
        }, {
          height: '50%'
        }, {
          height: '60%'
        }, {
          height: '70%'
        }, {
          height: '80%'
        }]
      }
    }
  
  }
</script>

