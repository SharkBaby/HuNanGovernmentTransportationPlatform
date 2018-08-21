<template>
  <ul class="left-ico-list">
    <li v-for="(mainDisItem, mainDisItemKey) of mainDisItems" :key="mainDisItemKey">
      <router-link :to="mainDisItem.href" class="page-load">
        <span :class="mainDisItem.spanClass"></span>
        {{mainDisItem.spanText}}
      </router-link>
    </li>
  </ul>
</template>
<style src="./maindisplayitems.css" type="text/css"></style>
<script>
export default {
  name: 'mainDisplayItems',
  props: ['mainDisItems'],
  data () {
    return {
    }
  }
}
</script>
