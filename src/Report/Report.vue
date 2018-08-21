<template>
  <div class="report">
    <vertical-menu :navMenu="navMenu"></vertical-menu>
  </div>
</template>

<style src="./Report.css" type="text/css">
</style>

<script>
import VerticalMenu from "@/components/VerticalMenu/VerticalMenu";
import { storageOperation } from "@/common/common";
export default {
  name: "Report",
  components: {
    VerticalMenu
  },
  data() {
    return {
      navMenu: [
        {
          navTitle: "车辆统计",
          indexNumber: "1",
          navItems: [
            {
              routerLink: "/Home/Report/VehicleInstall",
              linkName: "车辆入网数",
              indexNumber: "1-1"
            },
            {
              routerLink: "/Home/Report/VehicleOnline",
              linkName: "车辆在线率",
              indexNumber: "1-2"
            },
            {
              routerLink: "/Home/Report/VehicleUplineRate",
              linkName: "车辆上线统计",
              indexNumber: "1-3"
            },
            {
              routerLink: "/Home/Report/VehicleSpotCheck",
              linkName: "车辆抽查统计",
              indexNumber: "1-4"
            },
            {
              routerLink: "/Home/Report/ChangeDetail",
              linkName: "变更明细统计",
              indexNumber: "1-5"
            },
            {
              routerLink: "/Home/Report/VehicleVedio",
              linkName: "车辆视频",
              indexNumber: "1-6"
            },
            {
              routerLink: "/Home/Report/MultiDevice",
              linkName: "一车多平台统计",
              indexNumber: "1-7"
            },
            {
              routerLink: "/Home/Report/OffsiteOperations",
              linkName: "异地经营统计",
              indexNumber: "1-8"
            },
            {
              routerLink: "/Home/Report/VerifyVehicle",
              linkName: "通过禁行审核车辆",
              indexNumber: "1-9"
            }
          ]
        },
        {
          navTitle: "违章统计",
          indexNumber: "2",
          navItems: [
            {
              routerLink: "/Home/Report/VehicleBreakRule",
              linkName: "车辆违章统计",
              indexNumber: "2-1"
            },
            {
              routerLink: "/Home/Report/ErorrData",
              linkName: "异常数据统计",
              indexNumber: "2-2"
            }
          ]
        },
        {
          navTitle: "特殊统计",
          indexNumber: "3",
          navItems: [
            {
              routerLink: "/Home/Report/CurrentOnline",
              linkName: "车辆实时在线情况",
              indexNumber: "3-1"
            }
          ]
        },
        {
          navTitle: "管理机构统计",
          indexNumber: "4",
          navItems: [
            {
              routerLink: "/Home/Report/CheckSentry",
              linkName: "运管机构查岗统计",
              indexNumber: "4-1"
            },
            {
              routerLink: "/Home/Report/OnlineLength",
              linkName: "单位用户在线时长",
              indexNumber: "4-2"
            },
            {
              routerLink: "/Home/Report/InfoPublish",
              linkName: "信息发布",
              indexNumber: "4-3"
            },
            {
              routerLink: "/Home/Report/SaveLogs",
              linkName: "用户操作日志",
              indexNumber: "4-4"
            }
          ]
        },
        {
          navTitle: "接入平台统计",
          indexNumber: "5",
          navItems: [
            {
              routerLink: "/Home/Report/ServiceProviderCheck",
              linkName: "服务商考核统计",
              indexNumber: "5-1"
            },
            {
              routerLink: "/Home/Report/PlatformLocation",
              linkName: "定位数据统计",
              indexNumber: "5-2"
            },
            {
              routerLink: "/Home/Report/PlatformQuality",
              linkName: "数据质量统计",
              indexNumber: "5-3"
            },
            {
              routerLink: "/Home/Report/PlatformRunLog",
              linkName: "接入平台运行日志",
              indexNumber: "5-4"
            },
            {
              routerLink: "/Home/Report/PlatformInspecteLog",
              linkName: "接入平台巡检日志",
              indexNumber: "5-5"
            },
            {
              routerLink: "/Home/Report/PlatformCheckPostStatistics",
              linkName: "接入平台查岗统计",
              indexNumber: "5-6"
            }
          ]
        },
        {
          navTitle: "企业统计",
          indexNumber: "6",
          navItems: [
            {
              routerLink: "/Home/Report/CompanyCheckSentry",
              linkName: "企业查岗统计",
              indexNumber: "6-1"
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
