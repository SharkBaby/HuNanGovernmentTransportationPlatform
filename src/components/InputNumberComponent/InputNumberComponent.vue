<template>
  <el-input-number v-model="inputNumber" controls-position="right" @change="handleChange" :min="0"></el-input-number>
</template>
<style src="./inputNumberComponent.css" type="text/css"></style>
<script>
export default {
  name: 'InputNumberComponent',
  props: ['inputNumber'],
  methods:{
    handleChange(){
      console.log('handle Change');
    }
  }
}
</script>
