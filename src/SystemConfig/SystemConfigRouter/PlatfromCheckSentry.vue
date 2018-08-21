<template>
  <div class="PlatfromCheckSentry">
    <bread-crumb-component :breadNavs="breadNavs"></bread-crumb-component>
    <hr>
    <div class="platform-check-sentry-body">
      <div class="platform-check-sentry-toggle">
          <label class="label-name">{{radioGrp.radioLabel}}</label>
          <radio-component :radioGrp="radioGrp"></radio-component>
      </div>
      <div class="platform-check-sentry-time" v-for="(settingItem, settingKey) of settingCreteria" :key="settingKey">
        <el-radio :label="settingItem.value" v-model="settingSelected">{{settingItem.labelName}}</el-radio>
        <label class="label-name">{{settingItem.dailySpotChk.labelName}}</label>
        <input-number-component :inputNumber="settingItem.dailySpotChk.times"></input-number-component>
        <label v-if="settingItem.settingType === settingType.allCity">
          <label class="label-name">{{settingItem.dailySpotChk.labelName}}</label>
          <input-number-component :inputNumber="settingItem.dailySpotChk.times"></input-number-component>
        </label>
        <label-input-number v-else-if="settingItem.settingType === settingType.customizeCounty" :cities="settingItem.cities"></label-input-number>
      </div>
      <div class="platform-check-sentry-btn">
        <el-row>
            <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of btnEvents" :key="btnKey"></button-component>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style src="./systemConfigRouter.css" type="text/css"></style>
<script>
import BreadCrumbComponent from '@/components/BreadCrumbComponent/BreadCrumbComponent'
import RadioComponent from '@/components/RadioComponent/RadioComponent'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
import InputNumberComponent from '@/components/InputNumberComponent/InputNumberComponent'
import LabelInputNumber from '@/components/LabelInputNumber/LabelInputNumber'
export default {
  name: 'PlatfromCheckSentry',
  components: {
    BreadCrumbComponent,
    RadioComponent,
    ButtonComponent,
    InputNumberComponent,
    LabelInputNumber
  },
  data(){
    return{
      settingType: {
        allCity: 'allCity',
        customizeCounty: 'customizeCounty',
      },
      btnEvents: [{
          iconName: '',
          btnName: '保存'
        }],
      breadNavs:[{
        toNav: { path: '/Home/SystemConfig' },
        toName: '系统配置'
        },{
        toNav: { path: '/Home/SystemConfig/PlatfromCheckSentry' },
        toName: '自动查岗配置'
        },{
        toNav: { path: '/Home/SystemConfig/PlatfromCheckSentry' },
        toName: '企业查岗配置'
      }],
      radioGrp: {
        radioLabel: '自动查岗开关',
        model: '',
        radioItems: [{
          value: 'open',
          name: '打开'
        },{
          value: 'close',
          name: '关闭'
        }]
      },
      settingSelected: '',
      settingCreteria: [{
        settingType: 'allCity',
        labelName: '全市所有企业随机抽查配置',
        value: 'AllCity',
        dailySpotChk:{
          labelName: '每日随机抽查次数: ',
          times: 0,
        },
        spotChkOrg: {labelName: '每次随机抽查企业数: ',counts: 0}
        },{
          settingType: 'customizeCounty',
          labelName: '各区县自定义企业抽查配置',
          value: 'AllCounty',
          dailySpotChk:{
            labelName: '每日随机抽查次数: ',
            times: 0,
          },
          cities:{
            cityHeader:{
              column1: '地区',
              column2: '每次随机抽查企业数: ',
            },
            cityCtnt:[{
              labelName: '成都市',
              inputNumber: 0
            },{
              labelName: '执法总队',
              inputNumber: 0
            },{
              labelName: '自贡市',
              inputNumber: 0
            },{
              labelName: '攀枝花市',
              inputNumber: 0
            },{
              labelName: '泸州市',
              inputNumber: 0
            },{
              labelName: '德阳市',
              inputNumber: 0
            },{
              labelName: '绵阳市',
              inputNumber: 0
            },{
              labelName: '广元市',
              inputNumber: 0
            },{
              labelName: '遂宁市',
              inputNumber: 0
            },{
              labelName: '内江市',
              inputNumber: 0
            },{
              labelName: '乐山市',
              inputNumber: 0
            },{
              labelName: '南充市',
              inputNumber: 0
            },{
              labelName: '眉山市',
              inputNumber: 0
            },{
              labelName: '宜宾市',
              inputNumber: 0
            },{
              labelName: '广安市',
              inputNumber: 0
            },{
              labelName: '达州市',
              inputNumber: 0
            },{
              labelName: '雅安市',
              inputNumber: 0
            },{
              labelName: '巴中市',
              inputNumber: 0
            },{
              labelName: '资阳市',
              inputNumber: 0
            },{
              labelName: '阿坝藏族羌族自治州',
              inputNumber: 0
            },{
              labelName: '甘孜藏族自治州',
              inputNumber: 0
            },{
              labelName: '凉山彝族自治州',
              inputNumber: 0
            },{
              labelName: '成都出管处',
              inputNumber: 0
            },{
              labelName: '成都轨道处',
              inputNumber: 0
            },{
              labelName: '成都公交处',
              inputNumber: 0
            }]
          }
        },{
          settingType: 'allCity',
          labelName: '全市重点企业随机抽查配置',
          value: 'AllImportantOrg',
          dailySpotChk:{
            labelName: '每日随机抽查次数: ',
            times: 0,
          },
          spotChkOrg: {labelName: '每次随机抽查企业数: ',counts: 0}
      }]
    }
  }
}
</script>
