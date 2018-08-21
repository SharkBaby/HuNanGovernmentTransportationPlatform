<template>
  <el-dialog
  :title="logout"
  :visible.sync="logdialog"
  width="30%"
  :before-close="handleClose"
  class="dialog-class">
    <span>您确定要退出系统吗 ？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="submitForm('cancel')">取 消</el-button>
      <el-button type="primary" @click="submitForm('submit')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'Logout',
  props: ['logdialogVisible'],
  data () {
    return {
      logout: '信息',
    }
  },
  computed: {
    logdialog: {
      get: function(){
        return this.logdialogVisible
      },
      set: function(newlogdialog){
      }
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$emit('logoutDialog', 'cancel');
        })
        .catch(_ => {});
    },
    // handle form submit event,pass the props to parent component
    submitForm(argument){
      let status = 'cancel';
      switch(argument){
        case 'cancel':
          status = 'cancel';
          break;
        case 'submit':
          status = 'submit';
          break;
      }
        this.$emit('logoutDialog', status);
    }
  }
}
</script>
