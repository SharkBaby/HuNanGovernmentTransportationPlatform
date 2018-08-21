<template>
  <el-tabs @tab-click="handleClick" v-model="activeName" class="tabList-Title">
    <el-tab-pane :label="tabCtntItem.tabLabel" :name="tabCtntItem.tabName" v-for="(tabCtntItem,tabKey) in tabCtntList" :key="tabKey">
      <table-component :TabCtnt="tabCtntItem.TabCtnt" :tabHeader="tabCtntItem.tabHeader"></table-component>
    </el-tab-pane>
  </el-tabs>
</template>
<style src="./msgCount.css" type="text/css"></style>
<script>
import TableComponent from '@/components/TableComponent/TableComponent';
export default {
  name: 'MsgCount',
  props: ['activeName', 'tabCtntList'],
  data(){
    return{
    }
  },
  components:{
    TableComponent,
  },
  methods:{
    handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
