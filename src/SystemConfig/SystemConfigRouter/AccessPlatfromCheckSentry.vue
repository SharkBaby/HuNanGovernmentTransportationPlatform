<template>
  <div class="AccessPlatfromCheckSentry">
    <bread-crumb-component :breadNavs="breadNavs"></bread-crumb-component>
    <hr>
    <div class="config-content">
      <div class="config-check">
        <label class="label-name">{{radioGrp.radioLabel}}</label>
        <radio-component :radioGrp="radioGrp"></radio-component>
      </div>
      <div class="check-time-setting">
        <label class="label-name">{{searchCreteria.labelName}}</label>
        <select-component :options="searchCreteria.options" labelName="" :compVal="searchCreteria.compVal"></select-component>
        <div class="time-picker">
          <time-picker-component :compVal="timePickerItem.compVal" v-for="(timePickerItem, timePickerKey) of timePickerVal" :key="timePickerKey"></time-picker-component>
        </div>
      </div>
      <div class="config-button">
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
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
import TimePickerComponent from '@/components/TimePickerComponent/TimePickerComponent'
export default {
  name: 'AccessPlatfromCheckSentry',
  components: {
    BreadCrumbComponent,
    RadioComponent,
    SelectComponent,
    ButtonComponent,
    TimePickerComponent,
  },
  data(){
    return{
      searchType: {
        input: 'input',
        select: 'select',
        checkbox: 'checkbox',
        singleChkbox: 'singleChkbox'
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
        toNav: { path: '/Home/SystemConfig/AccessPlateformAutoCheck' },
        toName: '接入平台查岗配置'
      }],
      radioGrp: {
        radioLabel: '查岗开关',
        model: '',
        radioItems: [{
          value: 'open',
          name: '打开'
        },{
          value: 'close',
          name: '关闭'
        }]
      },
      searchCreteria: {
        labelName: '每日查岗时间',
        compVal: '',
        options: [{
            value: '0',
            label: '固定',
          }, {
            value: '1',
            label: '随机',
        }],
      },
      timePickerVal: [{
        compVal: new Date(2016, 9, 10, 8, 0),
        },{
        compVal: new Date(2016, 9, 10, 9, 0),
        },{
        compVal: new Date(2016, 9, 10, 9, 0),
        },{
        compVal: new Date(2016, 9, 10, 9, 0),
        },{
        compVal: new Date(2016, 9, 10, 9, 0),
      }]
    }
  }
}
</script>
