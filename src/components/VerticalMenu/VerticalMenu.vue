<template>
<el-row class="vertical-menu">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3" class="noprint left-navigation-menu">
    <el-menu
      default-active="2"
      class=""
      background-color="#34495e"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="navMenuItem.indexNumber" v-if="navMenuItem.navItems.length > 0" v-for="(navMenuItem, navMenuKey) in navMenu" :key="navMenuKey">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{navMenuItem.navTitle}}</span>
        </template>
        <el-menu-item-group>
          <router-link :to="navItem.routerLink" class="router-link" v-for="(navItem, navItemKey) in navMenuItem.navItems" :key="navItemKey"><el-menu-item :index="navItem.indexNumber">{{navItem.linkName}}</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link :to="navMenuItem.routerLink" class="router-link" v-else-if="navMenuItem.navItems.length == 0">
      <el-menu-item :index="navMenuItem.indexNumber" >
        <i class="el-icon-menu"></i>
        <span slot="title">{{navMenuItem.navTitle}}</span>
      </el-menu-item>
      </router-link>
    </el-menu>
  </el-col>
  <el-col :xs="16" :sm="18" :md="20" :lg="21" :xl="21">
    <router-view></router-view>
  </el-col>
</el-row>
</template>
<style src="./verticalMenu.css" type="text/css"></style>
<script>
export default {
  name: "VerticalMenu",
  props: ["navMenu"]
};
</script>