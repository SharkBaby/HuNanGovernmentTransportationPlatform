<template>
  <div class="bread-crumb-component">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="breadNav.toNav" v-for="(breadNav, breadKey) of breadNavs" :key="breadKey">{{breadNav.toName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style src="./breadCrumbComponent.css" type="text/css"></style>
<script>
export default {
  name: 'BreadCrumbComponent',
  props: ['breadNavs'],
  data () {
    return {
      
    }
  }
}
</script>
