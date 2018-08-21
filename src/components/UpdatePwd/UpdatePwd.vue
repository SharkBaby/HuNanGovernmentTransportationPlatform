<template>
  <el-dialog :title="updatePwd" :visible.sync="updPwddialog" width="30%" :before-close="handleClose" class="dialog-class">
    <el-form :model="ruleForm2" :label-position="labelPosition" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="login-Form">
      <el-form-item label="旧密码: " prop="oldpass" class="labelName">
        <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码: " prop="newpass" class="labelName">
        <el-input type="password" v-model="ruleForm2.newpass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style src="./updatePwd.css" type="text/css"></style>
<script>
  import {
    storageOperation
  } from '@/common/common'
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'UpdatePwd',
    props: ['updPwddialogVisible'],
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        updatePwd: '修改密码',
        labelPosition: 'right',
        ruleForm2: {
          oldpass: '',
          newpass: '',
          checkPass: '',
        },
        rules2: {
          oldpass: [{
            validator: checkOldPass,
            trigger: 'blur'
          }],
          newpass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
        },
        postUrl: commonConfig.rootUrl + commonConfig.UserUpdatePassword,
      }
    },
    computed: {
      updPwddialog: {
        get: function(){
          return this.updPwddialogVisible
        },
        set: function(newupdPwddialog){
        }
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            const updatePwd = {
              status: 'cancel'
            }
            this.$emit('updpwdDialog', updatePwd);
          })
          .catch(_ => {});
      },
      // handle form submit event,pass the props to parent component
      submitForm() {
        const UserID = commonConfig.UpdatePwd.UserID,
          OldPassword = commonConfig.UpdatePwd.OldPassword,
          NewPassword = commonConfig.UpdatePwd.NewPassword;
        const updatePwd = {
          params: {
            UserID: storageOperation.getItem(commonConfig.UserID),
            OldPassword: this.ruleForm2.oldpass,
            NewPassword: this.ruleForm2.newpass,
          },
          postUrl: this.postUrl,
        }
        this.$emit('updpwdDialog', updatePwd);
      }
    }
  }
</script>