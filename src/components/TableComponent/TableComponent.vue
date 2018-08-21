<template>
  <el-table
    :data="TabCtnt"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column
      :prop="tabHeaderKey"
      :label="tabHeaderItem"
      sortable
      v-for="(tabHeaderItem,tabHeaderKey) in tabHeader" :key="tabHeaderKey">
    </el-table-column>
  </el-table>
</template>
<style src="./tableComponent.css" type="text/css"></style>
<script>
  export default {
    name: 'TableComponent',
    props:['TabCtnt','tabHeader'],
    data() {
      return {
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>