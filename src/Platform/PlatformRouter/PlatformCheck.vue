<template>
  <el-row class="superviseCheckSentry">
    <el-tabs v-model="chkInfoName" class="supervise-tabs">
      <el-tab-pane label="查岗" name="first" class="supervise-tabs-pane">
        <el-row class="supervise-top">
          <el-tabs v-model="modelName">
            <el-tab-pane label="服务商列表" name="serverList">
              <el-row class="check-search">
                <el-checkbox :indeterminate="platformCheck.checkisIndeterminate" v-model="platformCheck.checkServerListCheckAllFlag" @change="handleCheckAllCheckChange" class="platform-check-check">全选</el-checkbox>
              </el-row>
              <el-row class="check-content">
                <el-checkbox-group v-model="platformCheck.checkServerListChecked" class="platform-check-check">
                  <el-col :span="6" v-for="(checkItem, checkKey) of platformCheck.checkServerList" :key="checkKey" class="check-content-col">
                    <el-checkbox :label="checkItem.nameReal">{{checkItem.nameReal}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
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
            <el-tab-pane label="服务商列表" name="serverList">
              <el-row class="check-search">
                <el-checkbox :indeterminate="platformCheck.sendMsgisIndeterminate" v-model="platformCheck.checkServerListCheckAllFlag" @change="handleCheckAllSendMsgChange" class="platform-check-sendmsg">全选</el-checkbox>
              </el-row>
              <el-row class="check-content">
                <el-checkbox-group v-model="platformCheck.sendMsgServerListChecked" class="platform-check-sendmsg">
                  <el-col :span="6" v-for="(sendMsgItem, sendMsgKey) of platformCheck.sendMsgServerList" :key="sendMsgKey" class="check-content-col">
                    <el-checkbox :label="sendMsgItem.nameReal">{{sendMsgItem.nameReal}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
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

<style type="text/css" src="./platformRouter.css">
  
</style>

<script>
  import InputComponent from "@/components/InputComponent/InputComponent";
  import SelectComponent from "@/components/SelectComponent/SelectComponent";
  import CheckboxComponent from "@/components/CheckboxComponent/CheckboxComponent";
  import SingleChkboxComponent from "@/components/SingleChkboxComponent/SingleChkboxComponent";
  import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
  import {
    storageOperation
  } from "@/common/common";
  import {
    commonConfig
  } from "@/config/commonConfig";
  export default {
    name: "PlatformCheck",
    components: {
      InputComponent,
      SelectComponent,
      CheckboxComponent,
      SingleChkboxComponent,
      ButtonComponent
    },
    data() {
      return {
        chkInfoName: "first",
        modelName: "serverList",
        companychecksentry_question: "",
        companychecksentry_answer: "",
        companychecksentry_info_content: "",
        platformCheck: {
          checkServerList: [],
          checkServerListChecked: [],
          checkServerListCheckAllFlag: false,
          checkServerListCheckAll: [],
          checkisIndeterminate: true,
          sendMsgServerList: [],
          sendMsgServerListChecked: [],
          sendMsgServerListCheckAllFlag: false,
          sendMsgServerListCheckAll: [],
          sendMsgisIndeterminate: true
        }
        // accurateCompanyRslt: [{
        //   labelName: '株洲市万畅旅游客运有限公司',
        //   compVal: ''
        // }, {
        //   labelName: '株洲长乐旅游运输有限责任公司',
        //   compVal: ''
        // }, {
        //   labelName: '湘运集团有限责任公司',
        //   compVal: ''
        // }, {
        //   labelName: '株洲县汽车客运公司',
        //   compVal: ''
        // }, {
        //   labelName: '株洲市一汽运有限责任公司',
        //   compVal: ''
        // }, {
        //   labelName: '沅江市金鹰道路运输有限责任公司',
        //   compVal: ''
        // }, {
        //   labelName: '湖南高速运输股份有限公司',
        //   compVal: ''
        // }, {
        //   labelName: '株洲宾利旅游客运有限责任公司',
        //   compVal: ''
        // }]
      };
    },
    mounted: function() {
      const initPlatForm = this.initplatformData();
      this.platformCheck.checkServerList = initPlatForm.initData;
      this.platformCheck.sendMsgServerList = initPlatForm.initData;
      this.platformCheck.checkServerListCheckAll = initPlatForm.nameArr;
      this.platformCheck.sendMsgServerListCheckAll = initPlatForm.nameArr;
    },
    methods: {
      initplatformData: function() {
        const initData = JSON.parse(
          storageOperation.getItem(commonConfig.SessionPlatformLocation)
        );
        const nameArr = [];
        for (let nameItem of initData) {
          nameArr.push(nameItem.nameReal);
        }
        return {
          initData,
          nameArr
        };
      },
      handleCheckAllCheckChange: function(val) {
        this.platformCheck.checkisIndeterminate = false;
        this.platformCheck.checkServerListChecked = val ?
          this.platformCheck.checkServerListCheckAll :
          [];
      },
      handleCheckAllSendMsgChange: function(val) {
        this.platformCheck.sendMsgisIndeterminate = false;
        this.platformCheck.sendMsgServerListChecked = val ?
          this.platformCheck.sendMsgServerListCheckAll :
          [];
      }
    },
    created: function() {
      //原数组
      const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
      // 因为使用vue-router,这个页面和他的上级页面使用的同一个router-view,所以这里需要单独处理
      /*ES6的写法*/
      //要插入的数组
      const platformRouter = {
        toName: "接入平台监管",
        toNav: {
          path: "/Home/Platform"
        }
      };
      //要插入的位置
      const i = 1;
      //插入
      breadNavs.splice(i, 0, platformRouter);
      /*ES5的写法*/
      this.$emit("viewIn", breadNavs);
    }
  };
</script>