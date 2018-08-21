<template>
  <el-row class="companyIndexInnerctnt">
    <p class="companyindex-header">车辆入网上线率
      <a href="#"></a>
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <el-row class="companyindex-inner-content">
      <div class="companyindex-inner-item" v-for="(innerCtntItem, innerCtntKey) of innerCtnt" :key="innerCtntKey">
        <div class="companyindex-inner-item-inner" :style="{height: innerCtntItem.height1}"></div>
        <div class="companyindex-inner-item-up" :style="{height: innerCtntItem.height2}"></div>
      </div>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./companyIndexInnerctnt.css">
  
</style>


<script>
  export default {
    name: 'CompanyIndexOverspeed',
    props: [],
    data() {
      return {
        innerCtnt: [{
          height1: '10%',
          height2: '20%'
        }, {
          height1: '30%',
          height2: '40%'
        }, {
          height1: '50%',
          height2: '33%'
        }, {
          height1: '2%',
          height2: '43%'
        }, {
          height1: '34%',
          height2: '33%'
        }, {
          height1: '50%',
          height2: '33%'
        }, {
          height1: '2%',
          height2: '43%'
        }, {
          height1: '34%',
          height2: '33%'
        }]
      }
    }
  
  }
</script>

