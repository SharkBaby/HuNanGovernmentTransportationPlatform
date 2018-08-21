<template>
  <div class="VehicleRandomInspection">
    <div class="random-item" v-for="(vhcleRandomItem, vhcleRandomKey) of vhcleRandoms" :key="vhcleRandomKey">
      <label class="item-title">{{vhcleRandomItem.itemTitle}}</label>
      <label-input-number v-if="vhcleRandomItem.searchType === searchType.labelInputNumber" :cities="vhcleRandomItem.cities" class="vhcleRandom-label-input"></label-input-number>
      <checkbox-component :options="vhcleRandomItem.options" :labelName="vhcleRandomItem.labelName" v-else-if="vhcleRandomItem.searchType === searchType.checkbox" class="vhcleRandom-checkbox"></checkbox-component>
      <el-date-picker
      v-else-if="vhcleRandomItem.searchType === searchType.datePicker"
      v-model="vhcleRandomItem.compVal"
      type="date"
      placeholder="请输入抽查时间">
      </el-date-picker>
    </div>
    <!-- Button Event -->
    <el-row class="vhcleRandom-button">
      <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of btnEvents" :key="btnKey"></button-component>
    </el-row>
  </div>
</template>
<style src="./systemConfigRouter.css" type="text/css"></style>
<script>
import LabelInputNumber from '@/components/LabelInputNumber/LabelInputNumber'
import CheckboxComponent from '@/components/CheckboxComponent/CheckboxComponent'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
export default {
  name: 'VehicleRandomInspection',
  components: {
    LabelInputNumber,
    CheckboxComponent,
    ButtonComponent
  },
  data(){
    return{
      searchType: {
        labelInputNumber: 'labelInputNumber',
        checkbox: 'checkbox',
        datePicker: 'datePicker',
      },
      vhcleRandoms: [{
        searchType: 'labelInputNumber',
        itemTitle: '地区比例配置',
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
        searchType: 'checkbox',
        itemTitle: '车辆类型：',
        labelName: '',
        compVal: '',
        options: [{
              value: '0x0001',
              label: '三类以上班线客车',
              checked: false
            }, {
              value: '0x0004',
              label: '旅游客车',
              checked: false
            }, {
              value: '0x100000',
              label: '包车客车',
              checked: false
            }, {
              value: '0x100001', // this value is customized by Perry,not securate
              label: '危险品运输车',
              checked: false
            }, {
              value: '0x100002',// this value is customized by Perry,not securate
              label: '全选',
              checked: false
          }]
        },{
        searchType: 'datePicker',
        itemTitle: '抽查时间：',
        compVal: '',
      }],
      btnEvents: [{
          iconName: 'el-icon-search',
          btnName: '一件抽查'
      }],
    }
  }
}
</script>
