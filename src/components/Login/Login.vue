<template>
  <div class="login-part">
    <h1>
      <el-row class="loginheader-logo"></el-row>
      <el-row class="loginheader">{{ firHeaderTle }}<br>{{secHeaderTle}}</el-row>
    </h1>
    <el-form :model="ruleForm2" :label-position="labelPosition" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="login-Form">
      <el-form-item label="用户名: " prop="usrname" class="labelName">
        <el-input v-model="ruleForm2.usrname"></el-input>
      </el-form-item>
      <el-form-item label="密码: " prop="pass" class="labelName">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style src="./login.css" type="text/css">
  
</style>

<script>
  // 引入axios HTTP module to submit login form
  import {
    isNull,
    axiosRequest,
    storageOperation
  } from '@/common/common'
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'Login',
    data() {
      var validateUsrName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else callback();
      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else callback();
      };
      return {
        postUrl: commonConfig.rootUrl + commonConfig.UserLogin,
        firHeaderTle: '重点营运车辆动态信息',
        secHeaderTle: '公共监管与服务平台',
        labelPosition: 'right',
        ruleForm2: {
          usrname: '',
          pass: '',
        },
        rules2: {
          usrname: [{
            validator: validateUsrName,
            trigger: 'blur'
          }],
          pass: [{
            validator: checkPass,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const LoginID = commonConfig.LoginID,
                  Password = commonConfig.Password;
            const postObj = {
              params: {
                LoginID: this.ruleForm2.usrname,
                Password: this.ruleForm2.pass
              },
              postUrl: this.postUrl,
            }
            axiosRequest.axiosPost(postObj)
              .then(function(response) {
                if (!isNull(response.data)) {
                  storageOperation.setItem(commonConfig.Token, response.data.Token);
                  storageOperation.setItem(commonConfig.UserID, response.data.UserID);
                  storageOperation.setItem(commonConfig.LoginID, self.ruleForm2.usrname);
                  self.$router.push(commonConfig.DashboardRouter);
                }
              })
              .catch(function(error) {});
          } else {
            alert('Failed!');
            return false;
          }
        });
      }
    }
  }
</script>
