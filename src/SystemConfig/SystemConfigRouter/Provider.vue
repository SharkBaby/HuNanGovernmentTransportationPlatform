<template>
  <div class="Provider">
    <div class="provider-config-zone">
      <label>搜索所在地区：</label>
      <span>湖南省</span>
      <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-for="(searchItem,searchKey) of searchCreteria" :key="searchKey"></select-component>
    </div>
    <div class="provider-config-show">
      <div class="provider-config-operate">
        <label>已添加服务商: </label>
        <span title="删除服务商" class="delete-icon delete_provider_btn"></span>
      </div>
      <div class="provider-config-reveal">
        <ul class="provider-config-table" id="provider_config_table_delete"></ul>
      </div>
    </div>
    <div class="provider-config-add">
      <div class="provider-config-operate">
        <label>未添加服务商: </label>
        <single-chkbox-component :labelName="toBeAdded.labelName" :compVal="toBeAdded.compVal" class="provider-config-select-all"></single-chkbox-component>
        <span title="添加服务商" class="delete-icon add_provider_btn"></span>
      </div>
      <div class="provider-config-reveal">
        <ul class="provider-config-table" id="provider_config_table_delete">
          <li v-for="(provider,proKey) of toBeAdded.providers" :key="proKey"><single-chkbox-component :labelName="provider.labelName" :compVal="provider.compVal"></single-chkbox-component></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style src="./systemConfigRouter.css" type="text/css"></style>
<script>
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import SingleChkboxComponent from '@/components/SingleChkboxComponent/SingleChkboxComponent'
export default {
  name: 'Provider',
  components: {
    SelectComponent,
    SingleChkboxComponent
  },
  data(){
    return{
      searchType: {
        input: 'input',
        select: 'select',
        checkbox: 'checkbox',
        singleChkbox: 'singleChkbox'
      },
      searchCreteria: [{
          searchType: 'select',
          labelName: '',
          compVal: '',
          options: [{
              value: '-1',
              label: '长沙市',
            }, {
              value: '0',
              label: '株洲市',
            }, {
              value: '1',
              label: '湘潭市',
          }],
        },{
          searchType: 'select',
          labelName: '',
          compVal: '',
          options: [{
              value: '-1',
              label: '市辖区',
            }, {
              value: '1',
              label: '芙蓉区',
            }, {
              value: '0',
              label: '天心区',
          }],
      }],
      toBeAdded: {
        labelName: '全选',
        compVal: '',
        providers: [{
          labelName: '北京维亚泰克网络技术有限公司',
          compVal: '',
        },{
          labelName: '广州亿程交通信息有限公司',
          compVal: '',
        },{
          labelName: '上海创程车联网络科技有限公司',
          compVal: '',
        },{
          labelName: '中国石油天然气运输公司',
          compVal: '',
        }]
      }
    }
  }
}
</script>
