<template>
  <div class="industry-regulation-part">
    <router-link :to="routerLink">
      <a>
        <p class="industry-regulation-head">{{ indRegTitle }}</p>
        <div class="regulation-detail-part">
          <!-- 历史累计上线数 -->
          <div class="regulation-detail-div">
            <label>{{hisAmoOnlTitle}}</label>
            <led-number :displayNumber="displayEmployedPlatNumber"></led-number>
          </div>
          <!-- 今日累计上线数 -->
          <div class="regulation-detail-div">
            <label>{{todAmoOnlTitle}}</label>
            <led-number :displayNumber="displayOnlinePlatNumber"></led-number>
          </div>
          <div class="platform-total">
            <span class="platform-total-number">{{platTotalNmber}}</span>
            <label>{{totalText}}</label>
          </div>
        </div>
      </a>
    </router-link>
  </div>
</template>

<style type="text/css" src="./industryRegulation.css">
  
</style>

<script>
  import LedNumber from "./LedNumber/LedNumber";
  import {
    axiosRequest,
    setRegulationFormat,
    getDigitsCss,
    storageOperation
  } from "@/common/common";
  import {
    commonConfig
  } from "@/config/commonConfig";
  export default {
    name: "IndustryRegulation",
    components: {
      LedNumber
    },
    data() {
      return {
        routerLink: "/Home/Regulation",
        indRegTitle: "运营机构监管",
        hisAmoOnlTitle: "历史累计上线数: ",
        todAmoOnlTitle: "今日累计上线数: ",
        platTotalNmber: 0,
        totalText: "单位总数",
        getUrl: commonConfig.rootUrl + commonConfig.GetIndustryRegulation,
        displayOnlinePlatNumber: {
          hundred: "zero",
          ten: "zero",
          one: "zero"
        },
        displayEmployedPlatNumber: {
          hundred: "zero",
          ten: "zero",
          one: "zero"
        }
      };
    },
    mounted: function() {
      this.GetIndustryRegulation();
    },
    methods: {
      GetIndustryRegulation: function() {
        const self = this;
        axiosRequest
          .axiosGet(this.getUrl)
          .then(function(response) {
            const regulation = {
              onlinePlat: setRegulationFormat(response.data.OnlinePlat),
              employedPlat: setRegulationFormat(response.data.EmployedPlat),
              industryPlatTotal: response.data.IndustryPlatTotal
            };
            // 展示今日累计上线数
            for (let item in regulation.onlinePlat) {
              switch (item) {
                case "0":
                  self.displayOnlinePlatNumber.hundred = getDigitsCss(
                    regulation.onlinePlat.substr(item, 1)
                  );
                  break;
                case "1":
                  self.displayOnlinePlatNumber.ten = getDigitsCss(
                    regulation.onlinePlat.substr(item, 1)
                  );
                  break;
                case "2":
                  self.displayOnlinePlatNumber.one = getDigitsCss(
                    regulation.onlinePlat.substr(item, 1)
                  );
                  break;
                default:
                  break;
              }
            }
            for (let item in regulation.employedPlat) {
              switch (item) {
                case "0":
                  self.displayEmployedPlatNumber.hundred = getDigitsCss(
                    regulation.employedPlat.substr(item, 1)
                  );
                  break;
                case "1":
                  self.displayEmployedPlatNumber.ten = getDigitsCss(
                    regulation.employedPlat.substr(item, 1)
                  );
                  break;
                case "2":
                  self.displayEmployedPlatNumber.one = getDigitsCss(
                    regulation.employedPlat.substr(item, 1)
                  );
                  break;
                default:
                  break;
              }
            }
            self.platTotalNmber = response.data.IndustryPlatTotal;
          })
          .catch(function(error) {});
      }
    },
  };
</script>
