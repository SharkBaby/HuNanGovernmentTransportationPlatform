<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style scope>
div#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #34495e;
}
</style>
<script>
export default {
  name: "App"
};
</script>