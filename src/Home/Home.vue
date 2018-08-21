<template>
  <div class="home">
    <header-container :breadNavs="breadNavs"></header-container>
    <router-view v-on:viewIn = "viewIn"></router-view>
  </div>
</template>
<style src="./home.css" type="text/css"></style>
<script>
import HeaderContainer from "@/Home/container/HeaderContainer/HeaderContainer";
import { storageOperation } from "@/common/common";
export default {
  name: "Home",
  components: {
    HeaderContainer
  },
  data: function(){
    return {
      breadNavs: JSON.parse(storageOperation.getItem("breadNavs"))
    }
  },
  methods: {
    viewIn: function(msg) {
      this.breadNavs = msg;
    }
  }
};
</script>
