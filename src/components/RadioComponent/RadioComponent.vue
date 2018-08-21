<template>
  <div class="radio-component">
    <el-radio-group v-model="radioGrp.model">
      <el-radio :label="radioItem.value" v-for="(radioItem, radioKey) of radioGrp.radioItems" :key="radioKey">{{radioItem.name}}</el-radio>
    </el-radio-group>
  </div>
</template>
<style src="./radioComponent.css" type="text/css"></style>
<script>
export default {
  name: 'RadioComponent',
  props: ['radioGrp'],
  data () {
    return {
    }
  }
}
</script>
