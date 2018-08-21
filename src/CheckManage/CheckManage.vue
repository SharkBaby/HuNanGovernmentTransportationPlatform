<template>
  <div class="check-manage">
    <vertical-menu :navMenu="navMenu"></vertical-menu>
  </div>
</template>
<style src="./checkManage.css" type="text/css"></style>
<script>
import VerticalMenu from "@/components/VerticalMenu/VerticalMenu";
import { storageOperation } from "@/common/common";
export default {
  name: "CheckManage",
  components: {
    VerticalMenu
  },
  data() {
    return {
      navMenu: [
        {
          navTitle: "地区考核",
          indexNumber: "1",
          navItems: [
            {
              routerLink: "/Home/CheckManage/ZoneCheckRank",
              linkName: "地区考核排名",
              indexNumber: "1-1"
            },
            {
              routerLink: "/Home/CheckManage/ZoneCheckPrint",
              linkName: "地区考核表打印",
              indexNumber: "1-2"
            }
          ]
        },
        {
          navTitle: "企业考核",
          indexNumber: "2",
          navItems: [
            {
              routerLink: "/Home/CheckManage/CompanyCheckRank",
              linkName: "企业考核排名",
              indexNumber: "2-1"
            },
            {
              routerLink: "/Home/CheckManage/CompanyCheckPrint",
              linkName: "企业考核表打印",
              indexNumber: "2-2"
            }
          ]
        },
        {
          navTitle: "服务商考核",
          indexNumber: "3",
          navItems: [
            {
              routerLink: "/Home/CheckManage/ProviderCheckRank",
              linkName: "服务商考核排名",
              indexNumber: "3-1"
            },
            {
              routerLink: "/Home/CheckManage/ProviderCheckPrint",
              linkName: "服务商考核表打印",
              indexNumber: "3-2"
            }
          ]
        },
        {
          navTitle: "考核明细",
          indexNumber: "4",
          navItems: [
            {
              routerLink: "/Home/CheckManage/ProviderCheckDetail",
              linkName: "考核明细",
              indexNumber: "4-1"
            }
          ]
        },
        {
          navTitle: "交通厅隐患清零通报",
          indexNumber: "5",
          navItems: [
            {
              routerLink: "/Home/CheckManage/TransportCheckRank",
              linkName: "交通厅隐患清零",
              indexNumber: "5-1"
            }
          ]
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
