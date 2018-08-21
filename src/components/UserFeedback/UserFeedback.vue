<template>
  <el-dialog
  :title="updatePwd"
  :visible.sync="usrFedbkdialog"
  width="25%"
  :before-close="handleClose"
  class="dialog-class">
    <el-form :model="ruleForm2" status-icon label-width="80px">
      <el-form-item label="功能模块: ">
        <el-select v-model="ruleForm2.newpass" placeholder="下拉选择">
          <el-option label="首页" value="shanghai"></el-option>
          <el-option label="报表" value="beijing"></el-option>
          <el-option label="六严禁" value="beijing"></el-option>
          <el-option label="车辆监控" value="beijing"></el-option>
          <el-option label="运管机构监管" value="beijing"></el-option>
          <el-option label="车辆分布" value="shanghai"></el-option>
          <el-option label="接入平台监管" value="beijing"></el-option>
          <el-option label="基本信息" value="beijing"></el-option>
          <el-option label="其他" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题类型: ">
        <el-select v-model="ruleForm2.newpass" placeholder="下拉选择">
          <el-option label="数据问题" value="shanghai"></el-option>
          <el-option label="功能问题" value="beijing"></el-option>
          <el-option label="体验问题" value="beijing"></el-option>
          <el-option label="其他" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话: " prop="oldpass">
        <el-input v-model="ruleForm2.oldpass" auto-complete="off" placeholder="请输入您的电话号码" style="max-width: 217px;"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容: " prop="oldpass">
        <el-input type="textarea" v-model="ruleForm2.oldpass" auto-complete="off" placeholder="请输入您的反馈内容" style="max-width: 217px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm2')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style src="./userFeedback.css" type="text/css">
</style>
<script>
export default {
  name: 'UpdatePwd',
  props: ['usrFedbkdialogVisible'],
  data () {
    var checkOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
    };
    return {
      updatePwd: '用户反馈',
      labelPosition: 'right',
      ruleForm2: {
        oldpass: '',
        newpass: '',
        checkPass: '',
      },
      rules2: {
        oldpass: [
            { validator: checkOldPass, trigger: 'blur'}
        ],
      },
    }
  },
  computed: {
    usrFedbkdialog: {
      get: function(){
        return this.usrFedbkdialogVisible
      },
      set: function(newusrFedbkdialog){
      }
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$emit('usrFedbkDialog', false);
        })
        .catch(_ => {});
    },
    // handle form submit event,pass the props to parent component
    submitForm(argument){
        this.$emit('usrFedbkDialog', false);
    }
  }
}
</script>
