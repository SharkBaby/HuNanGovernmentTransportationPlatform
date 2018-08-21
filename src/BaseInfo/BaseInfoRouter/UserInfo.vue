<template>
  <div class="UserInfo">
    <input-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-if="searchItem.searchType === searchType.input" v-for="(searchItem, searchKey) of searchCreteria" :key="searchKey"></input-component>
    <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.select"></select-component>
    <checkbox-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.checkbox"></checkbox-component>
    <single-chkbox-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.singleChkbox"></single-chkbox-component>
    <el-row>
      <button-component :iconName="btnItem.iconName" :btnName="btnItem.btnName" v-for="(btnItem, btnKey) of btnEvents" :key="btnKey"></button-component>
    </el-row>
    <table-component :TabCtnt="tabCtntList.TabCtnt" :tabHeader="tabCtntList.tabHeader"></table-component>
  </div>
</template>
<style src="./baseInfoRouter.css" type="text/css"></style>
<script>
import InputComponent from '@/components/InputComponent/InputComponent'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import CheckboxComponent from '@/components/CheckboxComponent/CheckboxComponent'
import SingleChkboxComponent from '@/components/SingleChkboxComponent/SingleChkboxComponent'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
import TableComponent from '@/components/TableComponent/TableComponent'
export default {
  name: 'UserInfo',
  components: {
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    SingleChkboxComponent,
    ButtonComponent,
    TableComponent,
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
          iconName: 'el-icon-search',
          btnName: '查询'
        },{
          iconName: 'el-icon-circle-plus-outline',
          btnName: '增加'
        },{
          iconName: 'el-icon-edit',
          btnName: '修改'
        },{
          iconName: 'el-icon-remove-outline',
          btnName: '删除'
        },{
          iconName: '',
          btnName: '初始化密码'
        },{
          iconName: 'el-icon-setting',
          btnName: '角色配置'
        },{
          iconName: 'el-icon-more-outline',
          btnName: '区域配置'
        },{
          iconName: 'el-icon-download',
          btnName: '导出数据'
        },{
          iconName: 'el-icon-view',
          btnName: '车辆关注'
      }],
      searchCreteria: [{
        searchType: 'input',
        labelName: '用户名:',
        compVal: '',
        },{
          searchType: 'singleChkbox',
          labelName: '昵称',
          compVal: '',
        },{
          searchType: 'input',
          labelName: '运管机构:',
          compVal: '',
        }],
      tabCtntList: {
        tabHeader: {
          LoginCode: '用户名',
          NickName: '昵称',
          UnitName: '运管机构',
          Tel: '电话',
          Fax: '传真',
          Email: '邮件',
          Notes: '备注'
        },
        TabCtnt:[{
          LoginCode: 'first-1',
          NickName: 'first-1',
          UnitName: 'first-1',
          Tel: 'first-1',
          Fax: 'first-1',
          Email: 'first-1',
          Notes: 'first-1'
        }]
      }
    }
  }
}
</script>
