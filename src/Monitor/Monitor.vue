<template>
  <div class="monitor">
    <el-row class="monitor-show">
      <el-col :xs="10" :sm="5" :md="5" :lg="4" :xl="3" class="monitor-left">
        <el-input placeholder="请输入内容" v-model="inputCtnt" class="monitor-blank">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="monitor-tree">
          <ul class="monitor-car-set">
            <li class="monitor_car_list" v-for="(monitorCarItem, monitorKey) of monitor_car_lists" :key="monitorKey">
              <span class="car-title">
                <span class="car-name">{{monitorCarItem.carName}}</span>
                <a href="javascript:void(0)" title="离线" :class="monitorCarItem.carStatus"></a>
              </span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="13" :sm="19" :md="19" :lg="20" :xl="21" class="monitor-right">
        <baidu-map :baiduMap="baiduMap"></baidu-map>
      </el-col>
    </el-row>
  </div>
</template>
<style src="./monitor.css" type="text/css"></style>
<script>
import BaiduMap from '@/components/BaiduMap/BaiduMap'
import { storageOperation } from "@/common/common";
export default {
  name: 'Monitor',
  components:{
    BaiduMap,
  },
  data(){
    return {
      inputCtnt: '',
      baiduMap: {
        monitor_top_left: [{
          monitorClass: 'monitor-topleft-basic-icon icon-open',
          monitorTitle: '历史轨迹'
          },{
          monitorClass: 'monitor-topleft-basic-icon monitor-send-message-open',
          monitorTitle: '短信'
          },{
          monitorClass: 'monitor-topleft-basic-icon monitor-voice-open',
          monitorTitle: '监听'
          },{
          monitorClass: 'monitor-topleft-basic-icon monitor-photos-open',
          monitorTitle: '拍照'
          },{
          monitorClass: 'monitor-topleft-basic-icon  monitor-video-open',
          monitorTitle: '视频'
          },{
          monitorClass: 'monitor-topleft-basic-icon monitor-recorder-open',
          monitorTitle: '行驶记录仪'
          },{
          monitorClass: 'monitor-topleft-basic-icon monitor-track-open',
          monitorTitle: '跟踪'
        }],
        monitor_bottom_right: [{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon map-a',
          monitorTitle: '全图'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon roam-a',
          monitorTitle: '漫游'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon ranging-a',
          monitorTitle: '测距'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon enclosure-a',
          monitorTitle: '电子围栏'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon route-a',
          monitorTitle: '路径分析'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon geography-a',
          monitorTitle: '地理信息'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon line-a',
          monitorTitle: '行驶路线'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon zone-a',
          monitorTitle: '行驶区域'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon enlarge-a',
          monitorTitle: '放大'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon narrow-a',
          monitorTitle: '缩小'
          },{
          monitorDivClass: 'vehicle-map-controls-icons-button',
          monitorAClass: 'monitor-bottomright-basic-icon sign-a',
          monitorTitle: '标记'
        }],
        monitor_right_bottom: [{
          monitorDivClass: 'vehicle-map-control-right-bottom',
          monitorAClass: 'monitor-rightbottom-basic-icon vehicle-crossZone-icon',
          monitorTitle: '跨入跨出车辆'
          },{
          monitorDivClass: 'vehicle-map-control-right-bottom',
          monitorAClass: 'monitor-rightbottom-basic-icon vehicle-areaalarm-icon',
          monitorTitle: '区域报警车辆'
          },{
          monitorDivClass: 'vehicle-map-control-right-bottom',
          monitorAClass: 'monitor-rightbottom-basic-icon show9HLines-icon',
          monitorTitle: '显示九黄线'
        }]
      },
      monitor_car_lists:[{
        carName: '湘A24909黄',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A31878黄',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A34537黄',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A42871黄',
        carStatus: 'offline',
        statusName: '离线'
        },{
        carName: '湘A47553黄',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A811TP蓝',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A823TR蓝',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A831TV蓝',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A842TU蓝',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A85F31蓝',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A8C035黄',
        carStatus: 'online',
        statusName: '在线'
        },{
        carName: '湘A8C079黄',
        carStatus: 'offline',
        statusName: '离线'
      }]
    }
  },
  created: function() {
    const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
    this.$emit("viewIn", breadNavs);
  }
}
</script>
