<template>
  <div class="CheckConfig">
    <div class="check-config-page">
      <el-row>
        <el-col :span="8" v-for="(chkConfigItem,chkConfigKey) of chkConfig" :key="chkConfigKey">
          <div class="chkconfig-title"><label>{{chkConfigItem.title}}</label></div>
          <label-input-number :cities="chkConfigItem.cities" class="chkconfig-label-input"></label-input-number>
        </el-col>
      </el-row>
      <el-row class="chkconfig-button">
        <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of btnEvents" :key="btnKey"></button-component>
      </el-row>
      <div class="tips">
        <p v-for="(tipItem,tipKey) of tips" :key="tipKey">{{tipItem.tipVal}}</p>
      </div>
    </div>
  </div>
</template>
<style src="./systemConfigRouter.css" type="text/css"></style>
<script>
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
import LabelInputNumber from '@/components/LabelInputNumber/LabelInputNumber'
export default {
  name: 'CheckConfig',
  components: {
    ButtonComponent,
    LabelInputNumber
  },
  data(){
    return{
      chkConfig: [{
        title: '地区',
        cities:{
            cityHeader:{
              column1: '地区',
              column2: '每次随机抽查企业数: ',
            },
            cityCtnt:[{
              labelName: '入网率',
              inputNumber: 10
            },{
              labelName: '上线率',
              inputNumber: 20
            },{
              labelName: '卫星漂移率',
              inputNumber: 30
            },{
              labelName: '轨迹完整率',
              inputNumber: 20
            },{
              labelName: '数据合格率',
              inputNumber: 0
            },{
              labelName: '平均超速次数',
              inputNumber: 0
            },{
              labelName: '平均疲驾时长',
              inputNumber: 0
            }]
          }
        },{
        title: '企业',
        cities:{
            cityHeader:{
              column1: '地区',
              column2: '每次随机抽查企业数: ',
            },
            cityCtnt:[{
              labelName: '入网率',
              inputNumber: 0
            },{
              labelName: '上线率',
              inputNumber: 0
            },{
              labelName: '卫星漂移率',
              inputNumber: 0
            },{
              labelName: '轨迹完整率',
              inputNumber: 0
            },{
              labelName: '数据合格率',
              inputNumber: 0
            },{
              labelName: '平均超速次数',
              inputNumber: 0
            },{
              labelName: '平均疲驾时长',
              inputNumber: 0
            },{
              labelName: '平台查岗响应率',
              inputNumber: 0
            }]
          }
        },{
        title: '服务商',
        cities:{
            cityHeader:{
              column1: '地区',
              column2: '每次随机抽查企业数: ',
            },
            cityCtnt:[{
              labelName: '上线率',
              inputNumber: 0
            },{
              labelName: '卫星漂移率',
              inputNumber: 0
            },{
              labelName: '轨迹完整率',
              inputNumber: 0
            },{
              labelName: '数据合格率',
              inputNumber: 0
            },{
              labelName: '平均超速次数',
              inputNumber: 0
            },{
              labelName: '平均疲驾时长',
              inputNumber: 0
            },{
              labelName: '平台连通率',
              inputNumber: 0
            }]
          }
      }],
      btnEvents: [{
          iconName: '',
          btnName: '保存'
      }],
      tips: [{
        tipVal: '备注：1.选择开启和关闭按钮开控制是否启用配置。'
        },{
        tipVal: '2.需勾选考核指标并填写分数，考核总分为100分。'
        },{
        tipVal: '3.当日修改配置，明日计算当日数据时生效。'
      }]
    }
  }
}
</script>
