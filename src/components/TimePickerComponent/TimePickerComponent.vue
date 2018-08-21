<template>
    <el-time-picker
    v-model="timerSelected"
    placeholder="请输入时间">
    </el-time-picker>
</template>
<style src="./timePickerComponent.css" type="text/css"></style>
<script>
export default {
  name: 'TimerPickerComponent',
  props: ['compVal'],
  data(){
      return{
          timerSelected: this.compVal
      }
  }
}
</script>

