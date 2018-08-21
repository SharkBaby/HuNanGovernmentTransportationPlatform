<template>
  <el-row class="orgOnlineComponent">
    <p class="level-title-font">{{orgOnline.title}}</p>
    <el-row class="regulation-content-online">
      <ul>
        <li v-for="(orgOnlineItem, orgOnlineKey) of orgOnline.items" :key="orgOnlineKey">
          <label class="regulation-content-online-id">{{orgOnlineItem.cityName}}</label>
          <span class="level-Supervise-deal-div"><span class="regulation-inner" :style="{width: orgOnlineItem.width}"></span></span>
          <label class="regulation-content-online-score">{{orgOnlineItem.score}}</label>
        </li>
      </ul>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./orgOnlineComponent.css">
  
</style>

<script>
  export default {
    name: 'orgOnlineComponent',
    props: ['orgOnline']
  }
</script>