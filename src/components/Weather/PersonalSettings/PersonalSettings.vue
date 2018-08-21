<template>
  <el-menu :default-active="activeIndex2" class="personal-settings-menu" mode="horizontal" background-color="#2C4257" text-color="#fff" active-text-color="#ffd04b">
    <el-submenu :index="value.indexNumber" v-if="value.TabItems.length > 0" v-for="(value, key) in personalToolArr" :key="key">
      <template slot="title">{{value.TabName}}
      </template>
    <el-menu-item :index="subValue.indexNumber" v-for="(subValue, subKey)  in value.TabItems" :key="subKey" >
        <!-- for download -->
        <a :href="subValue.actionUrl" v-if="subValue.actionCategory == actionType.download" class="actionurl-name">{{subValue.actionName}}</a>
        <!-- for dialog -->
        <span v-else-if="subValue.actionCategory == actionType.dialog" @click="handleItemClick(subValue.indexNumber)">{{subValue.actionName}}</span>
        <!-- for change theme -->
        <change-theme v-else-if="subValue.actionCategory == actionType.changeTheme">{{subValue.actionName}}</change-theme>
        <router-link v-else-if="subValue.actionCategory == actionType.routerUrl" :to="subValue.routerUrl" class="actionurl-name">{{subValue.actionName}}</router-link>
    </el-menu-item>
  </el-submenu>
  <el-menu-item :index="value.indexNumber" v-else-if="value.TabItems.length == 0">
      <router-link :to="value.routerUrl" class="router-link">{{value.TabName}}</router-link>
  </el-menu-item>
  <update-pwd :updPwddialogVisible="updPwddialogVisible" v-on:updpwdDialog="updPwdMethod"></update-pwd>
  <logout :logdialogVisible="logdialogVisible" v-on:logoutDialog="logoutMethod"></logout>
  <user-feedback :usrFedbkdialogVisible="usrFedbkdialogVisible" v-on:usrFedbkDialog="usrFedbkMethod"></user-feedback>
</el-menu>
</template>

<style src="./personalSettings.css" type="text/css">
</style>

<script>
import UpdatePwd from "@/components/UpdatePwd/UpdatePwd";
import Logout from "@/components/Logout/Logout";
import UserFeedback from "@/components/UserFeedback/UserFeedback";
import ChangeTheme from "@/components/ChangeTheme/ChangeTheme";
import { axiosRequest, storageOperation } from "@/common/common";
import { commonConfig } from "@/config/commonConfig";
export default {
  name: "PersonalSettings",
  components: {
    UpdatePwd,
    Logout,
    UserFeedback,
    ChangeTheme
  },
  data() {
    return {
      activeIndex2: "1",
      updPwddialogVisible: false,
      logdialogVisible: false,
      usrFedbkdialogVisible: false,
      actionType: {
        download: "download",
        dialog: "dialog",
        changeTheme: "changeTheme",
        routerUrl: "routerUrl"
      },
      personalToolArr: [
        {
          TabName: "tangjing",
          indexNumber: "1",
          routerUrl: "",
          TabItems: []
        },
        {
          TabName: "我的工作台",
          indexNumber: "2",
          TabItems: [
            {
              indexNumber: "2-1",
              actionCategory: "routerUrl",
              actionName: "车辆监管",
              routerUrl: "/Home/Monitor"
            },
            {
              indexNumber: "systemConfig",
              actionCategory: "routerUrl",
              actionName: "系统配置",
              routerUrl: "/Home/SystemConfig"
            },
            {
              indexNumber: "baseInfo",
              actionCategory: "routerUrl",
              actionName: "基本信息",
              routerUrl: "/Home/BaseInfo/Company"
            },
            {
              indexNumber: "platformCourse",
              actionCategory: "routerUrl",
              actionName: "平台历程",
              routerUrl: "/Home/PlatformCourse"
            },
            {
              indexNumber: "serverMonitor",
              actionCategory: "routerUrl",
              actionName: "服务器监控",
              routerUrl: "/Home/ServerMonitor"
            },
            {
              indexNumber: "changeTheme",
              actionCategory: "changeTheme",
              actionName: "换肤"
            }
          ]
        },
        {
          TabName: "个人中心",
          indexNumber: "3",
          TabItems: [
            {
              indexNumber: "updatePwd",
              actionCategory: "dialog",
              actionName: "修改密码"
            },
            {
              indexNumber: "logout",
              actionCategory: "dialog",
              actionName: "注销登录"
            },
            {
              indexNumber: "userFeedback",
              actionCategory: "dialog",
              actionName: "用户反馈"
            },
            {
              indexNumber: "3-4",
              actionCategory: "download",
              actionName: "操作手册",
              actionUrl:
                "../../../Export/Download/湖南省重点营运车辆动态信息公共监管与服务平台--操作手册.docx"
            }
          ]
        },
        {
          TabName: 0,
          indexNumber: "4",
          routerUrl: "/Home/MsgCount",
          TabItems: []
        }
      ],
      logoutUrl: commonConfig.rootUrl + commonConfig.UserLoginOut
    };
  },
  methods: {
    // item click in personal settings
    handleItemClick(subKey) {
      switch (subKey) {
        case "updatePwd":
          this.updPwddialogVisible = true;
          break;
        case "logout":
          this.logdialogVisible = true;
          break;
        case "userFeedback":
          this.usrFedbkdialogVisible = true;
          break;
      }
    },
    // Update by : Perry
    // Update Date: 2018-04-25
    // Update Reason: sychronize state in parent component when child component props is changed
    updPwdMethod(message) {
      this.updPwddialogVisible = false;
      const self = this;
      if (message.status !== "cancel") {
        axiosRequest
          .axiosPost(message)
          .then(function(response) {
            self.$router.push(commonConfig.LoginRouter);
          })
          .catch(function(error) {});
      }
    },
    logoutMethod(message) {
      this.logdialogVisible = false;
      const self = this;
      if (message == "submit") {
        storageOperation.clear();
        self.$router.push(commonConfig.LoginRouter);
      }
    },
    usrFedbkMethod(message) {
      this.usrFedbkdialogVisible = message;
    }
  }
};
</script>