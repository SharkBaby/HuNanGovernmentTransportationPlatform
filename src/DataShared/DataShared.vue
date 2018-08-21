<template>
  <el-row class="data-shared">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="data-shared-left">
      <div class="dataShared-left-position-left">
        <div class="networked-control"><label>重点营运车辆<br />联网联控平台</label></div>
        <div class="provincial-police"><label>省公安平台</label></div>
      </div>
      <div class="dataShared-left-position-center">
        <div class="supervise-to-networkedControl"></div>
        <div class="supervise-to-freightTransport freightPlateformBlue"></div>
        <div class="supervise"><label>监管平台</label></div>
        <div class="transportation-information"><label>三级协同平台</label></div>
        <div class="supervise-to-provincialPolice"></div>
        <div class="supervise-to-tourism tourismPlateformRed"></div>
        <div class="supervise-to-ttransportationInformation"></div>
      </div>
      <div class="dataShared-left-position-right">
        <div class="freight-transport"><label>全国货运平台</label></div>
        <div class="tourism"><label>省旅游平台</label></div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="data-shared-right">
      <el-row>
        <h3>数据传输情况</h3>
        <el-col :span="12" v-for="(gaugeItem, gaugeKey) of gaugeItems" :key="gaugeKey">
          <h4>{{gaugeItem.title}}</h4>
          <gauge-component :idPName="gaugeItem.idPName" :value="gaugeItem.value" class="data-shared-gauge"></gauge-component>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style type="text/css" src="./dataShared.css">
</style>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import "echarts/map/js/province/hunan.js";
import GaugeComponent from "@/components/GaugeComponent/GaugeComponent";
import { storageOperation } from "@/common/common";
export default {
  name: "dataShared",
  components: {
    GaugeComponent
  },
  data() {
    return {
      gaugeItems: [
        {
          title: "全国重点营运车辆",
          idPName: "operate_vehicle_echarts",
          value: 50
        },
        {
          title: "全国货运",
          idPName: "freight_vehicle_echarts",
          value: 60
        },
        {
          title: "省公安平台",
          idPName: "police_platefrom_echarts",
          value: 70
        },
        {
          title: "省旅游平台",
          idPName: "tourism_platefrom_echarts",
          value: 80
        }
      ]
    };
  },
  created: function() {
    const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
    this.$emit("viewIn", breadNavs);
  }
};
</script>
