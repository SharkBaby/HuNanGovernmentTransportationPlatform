<template>
  <div class="Company">
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
  name: 'Company',
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
          iconName: 'el-icon-refresh',
          btnName: '同步数据'
        },{
          iconName: 'el-icon-download',
          btnName: '导出数据'
      }],
      searchCreteria: [{
        searchType: 'input',
        labelName: '企业:',
        compVal: '',
        },{
          searchType: 'singleChkbox',
          labelName: '是否已删除',
          compVal: '',
        },{
          searchType: 'input',
          labelName: '经营许可证号:',
          compVal: '',
        }],
      tabCtntList: {
        tabHeader: {
          UnitName: '企业',
          OrgCA: '组织机构代码',
          ZoneName: '地区',
          UpUnitName: '上级企业',
          LogicUnitName: '运管机构',
          BsName: '行业类型',
          bs: '经营范围',
          LicenseNumber: '经营许可证号',
          Begin: '经营许可证有效期起	',
          End: '经营许可证有效期止',
          CorpHead: '单位法人',
          Tel: '联系电话',
          Address: '单位地址',
          GnssCenterName: '接入平台',
          CompanyType: '企业类型',
          PassengerQualification: '客运资质等级'
        },
        TabCtnt:[{
          UnitName: 'first-1',
          OrgCA: 'first-1',
          ZoneName: 'first-1',
          UpUnitName: 'first-1',
          LogicUnitName: 'first-1',
          BsName: 'first-1',
          bs: 'first-1',
          LicenseNumber: 'first-1',
          Begin: 'first-1',
          End: 'first-1',
          CorpHead: 'first-1',
          Tel: 'first-1',
          Address: 'first-1',
          GnssCenterName: 'first-1',
          CompanyType: 'first-1',
          PassengerQualification: 'first-1'
        }],
      }
    }
  }
}
</script>
