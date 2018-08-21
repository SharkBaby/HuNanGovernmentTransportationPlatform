<template>
  <div class="header-container">
    <Header ></Header>
    <Weather :breadNavs="breadNavs"></Weather>
  </div>
</template>
<style src="./headerContainer.css" type="text/css"></style>
<script>
import Header from '@/components/Header/Header'
import Weather from '@/components/Weather/Weather'
export default {
  name: 'Header-Container',
  props: ['breadNavs'],
  components: {
    Header,
    Weather
  }
}
</script>
