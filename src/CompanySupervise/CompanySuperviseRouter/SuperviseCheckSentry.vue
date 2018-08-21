<template>
  <el-row class="superviseCheckSentry">
    <el-tabs v-model="chkInfoName" class="supervise-tabs">
      <el-tab-pane label="查岗" name="first" class="supervise-tabs-pane">
        <el-row class="supervise-top">
          <el-tabs v-model="modelName">
            <el-tab-pane label="精确模式" name="accurateModel">
              <el-row class="check-search">
                <input-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-if="searchItem.searchType === searchType.input" v-for="(searchItem, searchKey) of accurateSearchCreteria" :key="searchKey"></input-component>
                <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.select"></select-component>
                <checkbox-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.checkbox"></checkbox-component>
                <single-chkbox-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.singleChkbox"></single-chkbox-component>
                <button-component :iconName="searchItem.iconName" :btnName="searchItem.btnName" v-else-if="searchItem.searchType === searchType.button"></button-component>
              </el-row>
              <el-row class="check-content">
                <el-col :span="6" v-for="(companyItem, companyKey) of accurateCompanyRslt" :key="companyKey" class="check-content-col">
                  <single-chkbox-component :labelName="companyItem.labelName" :compVal="companyItem.compVal"></single-chkbox-component>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="随机模式" name="randomModel">
              <el-row class="check-search">
                <input-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-if="searchItem.searchType === searchType.input" v-for="(searchItem, searchKey) of randomSearchCreteria" :key="searchKey"></input-component>
                <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.select"></select-component>
                <checkbox-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.checkbox"></checkbox-component>
                <single-chkbox-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.singleChkbox"></single-chkbox-component>
                <button-component :iconName="searchItem.iconName" :btnName="searchItem.btnName" v-else-if="searchItem.searchType === searchType.button"></button-component>
              </el-row>
              <el-row class="check-content">
                <el-col :span="6" v-for="(companyItem, companyKey) of randomCompanyRslt" :key="companyKey" class="check-content-col">
                  <single-chkbox-component :labelName="companyItem.labelName" :compVal="companyItem.compVal"></single-chkbox-component>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row class="supervise-bottom">
          <h5 class="companychecksentry-content-top-head">操作</h5>
          <el-row>
            <el-input type="textarea" :rows="2" placeholder="" v-model="companychecksentry_question" class="question-input">
            </el-input>
          </el-row>
          <el-row>
            <el-input type="textarea" :rows="4" placeholder="" v-model="companychecksentry_answer" class="answer-input">
            </el-input>
          </el-row>
          <el-row class="supervise-button">
            <button-component btnName="查岗"></button-component>
            <button-component btnName="问题切换"></button-component>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="发布信息" name="second" class="supervise-tabs-pane">
        <el-row class="supervise-top">
          <el-tabs v-model="modelName">
            <el-tab-pane label="企业列表" name="companyList">
              <el-row class="check-search">
                <input-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-if="searchItem.searchType === searchType.input" v-for="(searchItem, searchKey) of accurateSearchCreteria" :key="searchKey"></input-component>
                <select-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.select"></select-component>
                <checkbox-component :options="searchItem.options" :labelName="searchItem.labelName" v-else-if="searchItem.searchType === searchType.checkbox"></checkbox-component>
                <single-chkbox-component :labelName="searchItem.labelName" :compVal="searchItem.compVal" v-else-if="searchItem.searchType === searchType.singleChkbox"></single-chkbox-component>
                <button-component :iconName="searchItem.iconName" :btnName="searchItem.btnName" v-else-if="searchItem.searchType === searchType.button"></button-component>
              </el-row>
              <el-row class="check-content">
                <el-col :span="6" v-for="(companyItem, companyKey) of accurateCompanyRslt" :key="companyKey" class="check-content-col">
                  <single-chkbox-component :labelName="companyItem.labelName" :compVal="companyItem.compVal"></single-chkbox-component>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row class="supervise-bottom">
          <h5 class="companychecksentry-content-top-head">操作</h5>
          <el-input type="textarea" :rows="6" placeholder="信息内容长度不得超过1024个字符" v-model="companychecksentry_info_content" class="question-input">
          </el-input>
          <el-row class="supervise-button">
            <button-component btnName="发送"></button-component>
            <button-component btnName="重置"></button-component>
          </el-row>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<style type="text/css" src="./companySuperviseRouter.css">
  
</style>

<script>
  import InputComponent from '@/components/InputComponent/InputComponent'
  import SelectComponent from '@/components/SelectComponent/SelectComponent'
  import CheckboxComponent from '@/components/CheckboxComponent/CheckboxComponent'
  import SingleChkboxComponent from '@/components/SingleChkboxComponent/SingleChkboxComponent'
  import ButtonComponent from '@/components/ButtonComponent/ButtonComponent'
  export default {
    name: 'superviseCheckSentry',
    components: {
      InputComponent,
      SelectComponent,
      CheckboxComponent,
      SingleChkboxComponent,
      ButtonComponent
    },
    data() {
      return {
        searchType: {
          input: 'input',
          select: 'select',
          checkbox: 'checkbox',
          singleChkbox: 'singleChkbox',
          button: 'button'
        },
        chkInfoName: 'first',
        modelName: 'accurateModel',
        companychecksentry_question: '',
        companychecksentry_answer: '',
        companychecksentry_info_content: '',
        accurateSearchCreteria: [{
          searchType: 'select',
          labelName: '',
          compVal: '',
          options: [{
            value: '1052823',
            label: '所有企业',
          }, {
            value: '0x0080',
            label: '危险品企业',
          }, {
            value: '1052679',
            label: '客运企业',
          }],
        }, {
          searchType: 'input',
          labelName: '请输入企业所属地区:',
          compVal: ''
        }, {
          searchType: 'input',
          labelName: '请输入企业名称:',
          compVal: ''
        }, {
          searchType: 'button',
          iconName: 'el-icon-search',
          btnName: '查询'
        }, {
          searchType: 'singleChkbox',
          labelName: '全选',
          compVal: '',
        }],
        accurateCompanyRslt: [{
          labelName: '株洲市万畅旅游客运有限公司',
          compVal: ''
        }, {
          labelName: '株洲长乐旅游运输有限责任公司',
          compVal: ''
        }, {
          labelName: '湘运集团有限责任公司',
          compVal: ''
        }, {
          labelName: '株洲县汽车客运公司',
          compVal: ''
        }, {
          labelName: '株洲市一汽运有限责任公司',
          compVal: ''
        }, {
          labelName: '沅江市金鹰道路运输有限责任公司',
          compVal: ''
        }, {
          labelName: '湖南高速运输股份有限公司',
          compVal: ''
        }, {
          labelName: '株洲宾利旅游客运有限责任公司',
          compVal: ''
        }],
        randomSearchCreteria: [{
          searchType: 'select',
          labelName: '',
          compVal: '',
          options: [{
            value: '0',
            label: '全省所有企业随机抽查',
          }, {
            value: '1',
            label: '各市州自定义企业抽查',
          }, {
            value: '2',
            label: '全省重点企业随机抽查',
          }],
        }, {
          searchType: 'button',
          iconName: 'el-icon-search',
          btnName: '查询'
        }],
        randomCompanyRslt: [],
      }
    }
  }
</script>