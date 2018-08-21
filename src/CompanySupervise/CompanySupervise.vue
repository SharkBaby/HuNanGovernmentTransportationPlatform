<template>
  <el-row class="companySupervise-part">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <el-row>
        <el-col :span="8" class="company-index">
          <div class="companyindex-number-avg">
            <div class="companyindex-number-outer">
              <div class="companyindex-number-inner">
                <label id="companyindex_company_avg0">85</label>
              </div>
            </div>
            <div class="companyindex-number-detail">
              <p><label class="companyindex_company_pass">达标：364 家</label></p>
              <p><label class="companyindex_company_notpass">未达标：269 家</label></p>
              <p>企业平均得分：<label class="companyindex_company_avg1">85</label></p>
            </div>
          </div>
        </el-col>
        <el-col :span="4" v-for="(cCategoryItem, cCategoryKey) of companyCategory" :key="cCategoryKey" class="company-col">
          <div class="companyindex-number-item">
            <p :class="cCategoryItem.pClass">
              <span :class="['companyindex-icon',cCategoryItem.logoClass]"></span>
              <label class="companyindex_company_heji">{{cCategoryItem.companyCount}}</label>家
            </p>
            <p class="companyindex-number-head">{{cCategoryItem.companyName}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row class="settings-row">
        <i class="el-icon-location-outline"></i>
        <select-component :options="citySelect.options" labelName="" :compVal="citySelect.compVal"></select-component>
        <div class="companyindex-search-btn">
          <router-link :to="settingItem.href" class="companyindex-link-item" v-for="(settingItem,settingKey) of settings" :key="settingKey">
            <span :class="['companyindex-icon', settingItem.settingClass]"></span>
          </router-link>
        </div>
        <el-input :placeholder="searchCreteria.placeholder" v-model="searchCreteria.value" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
      <el-row class="companyindex-top-left-rank">
        <combine-rank></combine-rank>
      </el-row>
      <el-row>
        <el-col :span="8">
          <company-index-drift></company-index-drift>
        </el-col>
        <el-col :span="8">
          <company-index-overspeed></company-index-overspeed>
        </el-col>
        <el-col :span="8">
          <company-index-fatigue></company-index-fatigue>
        </el-col>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="company-right">
      <company-index-innerctnt></company-index-innerctnt>
      <company-index-circlemap :circleMap="dataPass"></company-index-circlemap>
      <company-index-circlemap :circleMap="trajectory"></company-index-circlemap>
      <company-index-check></company-index-check>
    </el-col>
  </el-row>
</template>

<style type="text/css" src="./companySupervise.css">
  
</style>

<script>
  import SelectComponent from '@/components/SelectComponent/SelectComponent'
  import CombineRank from '@/components/CombineRank/CombineRank'
  import CompanyIndexDrift from '@/components/CompanyIndexDrift/CompanyIndexDrift'
  import CompanyIndexOverspeed from '@/components/CompanyIndexOverspeed/CompanyIndexOverspeed'
  import CompanyIndexFatigue from '@/components/CompanyIndexFatigue/CompanyIndexFatigue'
  import CompanyIndexInnerctnt from '@/components/CompanyIndexInnerctnt/CompanyIndexInnerctnt'
  import CompanyIndexCheck from '@/components/CompanyIndexCheck/CompanyIndexCheck'
  import CompanyIndexCirclemap from '@/components/CompanyIndexCirclemap/CompanyIndexCirclemap'
  import { storageOperation } from "@/common/common";
  export default {
    name: 'companySupervise',
    components: {
      SelectComponent,
      CombineRank,
      CompanyIndexDrift,
      CompanyIndexOverspeed,
      CompanyIndexFatigue,
      CompanyIndexInnerctnt,
      CompanyIndexCheck,
      CompanyIndexCirclemap
    },
    data() {
      return {
        companyCategory: [{
          pClass: 'companyindex-number-all-color',
          logoClass: 'companyindex-number-all ',
          companyCount: 633,
          companyName: '全部企业'
        }, {
          pClass: 'companyindex-number-bus-color',
          logoClass: 'companyindex-number-bus',
          companyCount: 355,
          companyName: '客运企业'
        }, {
          pClass: 'companyindex-number-danger-color',
          logoClass: 'companyindex-number-danger',
          companyCount: 278,
          companyName: '危险品企业'
        }, {
          pClass: 'companyindex-number-all-color',
          logoClass: 'companyindex-number-heavy',
          companyCount: 0,
          companyName: '重货企业-车辆数大于50'
        }],
        citySelect: {
          labelName: ':',
          compVal: '',
          options: [{
            value: '0',
            label: '湖南省',
          }, {
            value: '1',
            label: '长沙市',
          }, {
            value: '2',
            label: '株洲市',
          }, {
            value: '3',
            label: '湘潭市',
          }, {
            value: '4',
            label: '衡阳市',
          }],
        },
        settings: [{
          href: '/Home/SuperviseCheckSentry',
          settingClass: 'companyindex-check-btn'
        }, {
          href: '/Home/SuperviseCheckSentry',
          settingClass: 'companyindex-info-btn'
        }],
        searchCreteria: {
          placeholder: '请输入你先查询的企业名称',
          value: ''
        },
        dataPass: {
          title: '数据合格率',
          mapItems: [{
            itemClass: 'companyindex-circlemap-item-0',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-1',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-2',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-3',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-4',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-5',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-6',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-7',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-8',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-9',
            itemVal: 100
          }]
        },
        trajectory: {
          title: '轨迹完整率',
          mapItems: [{
            itemClass: 'companyindex-circlemap-item-0',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-1',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-2',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-3',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-4',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-5',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-6',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-7',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-8',
            itemVal: 100
          }, {
            itemClass: 'companyindex-circlemap-item-9',
            itemVal: 100
          }]
        }
      }
    },
    created: function() {
      const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
      this.$emit("viewIn", breadNavs);
    }
  }
</script>

