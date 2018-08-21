<template>
  <el-row class="companyIndexCheck">
    <p class="companyindex-header">平台查岗响应率
      <a href="#"></a>
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <el-row class="companyindex-check-content">
      <div class="companyindex-check-item" v-for="(overSpeedItem, overSpeedKey) of overSpeed" :key="overSpeedKey">
        <div class="companyindex-check-item-outer">
          <div class="companyindex-check-item-inner" :style="{height: overSpeedItem.height}"></div>
        </div>
      </div>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./companyIndexCheck.css">
  
</style>


<script>
  export default {
    name: 'companyIndexCheck',
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

