<template>
  <div class="security-content">
    <p class="home-security-head">{{ secHeadTitle }}</p>
    <security-ctnt-map :mapType="mapType" :mapItem="mapItem" class="map-class"></security-ctnt-map>
  </div>
</template>
<style type="text/css" src="./securityContent.css"></style>
<script>
import SecurityCtntMap from "./SecurityCtntMap/SecurityCtntMap";
export default {
  name: 'SecurityContent',
  props: ['mapItem'],
  data () {
    return {
      secHeadTitle: '安全监管',
      mapType: '湖南',
      // securityCtntMap: this.mapSeriesData
    }
  },
  components:{
    SecurityCtntMap
  }
}
</script>
