<template>
  <div class="baiduMap">
    <div id="divContainer" class="monitor-container"></div>
    <!--top left -->
    <div class="monitor-top-left">
      <div :class="monitorTpLft.monitorClass" :title="monitorTpLft.monitorTitle" v-for="(monitorTpLft,monitorTpLftKey) of baiduMap.monitor_top_left" :key="monitorTpLftKey"></div>
    </div>
    <!--bottom right -->
    <div class="monitor-bottom-right">
      <div :class="monitorBtmRgt.monitorDivClass" v-for="(monitorBtmRgt,monitorBtmRgtKey) of baiduMap.monitor_bottom_right" :key="monitorBtmRgtKey">
        <a href="#" :class="monitorBtmRgt.monitorAClass" :title="monitorBtmRgt.monitorTitle"></a>
      </div>
      <div class="vehicle-map-control">
        <a href="#" class="mapControl-icon"></a>
      </div>
    </div>
    <!--right bottom -->
    <div class="monitor-right-bottom">
      <div :class="monitorRgtBtm.monitorDivClass" v-for="(monitorRgtBtm,monitorRgtBtmKey) of baiduMap.monitor_right_bottom" :key="monitorRgtBtmKey">
        <a href="#" :class="monitorRgtBtm.monitorAClass" :title="monitorRgtBtm.monitorTitle"></a>
      </div>
    </div>
  </div>
</template>
<style src="./baiduMap.css" type="text/css"></style>
<script>
export default {
  name: 'BaiduMap',
  props: ['baiduMap'],
  data () {
    return {
    }
  },
  mounted(){
    this.displayNormalMap();
  },
  methods:{
    displayNormalMap: function(){
      // 百度地图API功能
      var map = new BMap.Map("divContainer");    // 创建Map实例
      map.centerAndZoom(new BMap.Point(112.982279,28.19409), 11);  // 初始化地图,设置中心点坐标(长沙经纬度坐标（112.982279,28.19409）)和地图级别(11)
      //添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes:[
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]}));
      map.setCurrentCity("长沙");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
  }
}
</script>
