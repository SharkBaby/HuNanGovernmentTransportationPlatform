<template>
  <el-row class="companyIndexFatigue">
    <p class="companyindex-header">平均疲劳驾驶时长
      <a href="#"></a>
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <el-row class="companyindex-fatigue-right">
      <ul>
        <li class="companyindex-fatigue-li" v-for="(fatigueItem, fatigueKey) of fatigueItems" :key="fatigueKey">
          <span class="companyindex-fatigue-total"><span class="companyindex-fatigue-inner" :style="{width: fatigueItem.width}"></span></span>
        </li>
      </ul>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./companyIndexFatigue.css">
  
</style>

<script>
  export default {
    name: 'companyIndexFatigue',
    props: [],
    data() {
      return {
        fatigueItems: [{
          width: '90%',
        }, {
          width: '80%',
        }, {
          width: '70%',
        }, {
          width: '60%',
        }, {
          width: '50%',
        }, {
          width: '40%',
        }, {
          width: '30%',
        }, {
          width: '20%',
        }]
      }
    }
  
  }
</script>

