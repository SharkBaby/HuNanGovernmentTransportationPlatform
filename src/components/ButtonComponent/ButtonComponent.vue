<template>
    <el-button type="primary" :icon="iconName" class="btn-com">{{btnName}}</el-button>
</template>
<style src="./buttonComponent.css" type="text/css"></style>
<script>
export default {
  name: 'ButtonComponent',
  props: ['iconName', 'btnName'],
  data(){
      return{
      }
  },
}
</script>

