<template>
  <div class="LabelInputNumber">
    <ul class="platform_check_sentry_zonelist">
      <li>
        <el-row>
          <el-col :span="8"><label>{{cities.cityHeader.column1}}</label></el-col>
          <el-col :span="8"><label>{{cities.cityHeader.column2}}</label></el-col>
        </el-row>
      </li>
      <li v-for="(cityItem, cityKey) of cities.cityCtnt" :key="cityKey" class="city-row">
        <el-row>
          <el-col :span="8" class="city-label"><label>{{cityItem.labelName}}</label></el-col>
          <el-col :span="8"><label><input-number-component :inputNumber="cityItem.inputNumber"></input-number-component></label></el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>
<style src="./labelInputNumber.css" type="text/css"></style>
<script>
import InputNumberComponent from '@/components/InputNumberComponent/InputNumberComponent'
  export default {
    name: 'LabelInputNumber',
    components: {
      InputNumberComponent
    },
    props:['cities'],
    data() {
      return {
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>