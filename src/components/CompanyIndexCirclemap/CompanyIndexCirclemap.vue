<template>
  <el-row class="companyIndexCirclemap">
    <p class="companyindex-header">{{circleMap.title}}
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <el-row class="companyindex-circlemap-content">
      <div :class="['companyindex-circlemap-item', circleMapItem.itemClass]" v-for="(circleMapItem, circleMapKey) of circleMap.mapItems" :key="circleMapKey">
        <label>{{circleMapItem.itemVal}}</label>
      </div>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./companyIndexCirclemap.css">
  
</style>

<script>
  export default {
    name: 'companyIndexCirclemap',
    props: ['circleMap'],
    data() {
      return {
        
      }
    }
  
  }
</script>

