<template>
<span>
  <span class="chgThemeText">换肤</span>
  <el-color-picker v-model="crntColor" show-alpha size="medium" @change="changeTheme">换肤</el-color-picker>
</span>
</template>
<script>
import {chgElemtColor} from '@/Base/Package.js';
export default{
  name: 'ChangeTheme',
  data(){
    return{
      crntColor: '#34495e',
    }
  },
  methods:{
    changeTheme(crntColor){
      chgElemtColor('app', crntColor);
    }
  }
}
</script>