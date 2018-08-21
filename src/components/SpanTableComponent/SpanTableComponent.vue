<template>
<div class="spanTableComponent">
  <h3 class="span-table-name">{{tabName}}</h3>
  <el-table :data="TabCtnt" :span-method="objectSpanMethod" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column :prop="tabHeaderKey" :label="tabHeaderItem" sortable v-for="(tabHeaderItem,tabHeaderKey) in tabHeader" :key="tabHeaderKey">
    </el-table-column>
  </el-table>
</div>
</template>

<style src="./spanTableComponent.css" type="text/css">
  
</style>

<script>
  export default {
    name: 'SpanTableComponent',
    props: ['tabName', 'TabCtnt', 'tabHeader'],
    data() {
      return {}
    },
    methods: {
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex === 9) {
          if (columnIndex === 1) {
            return [1,6];
          } else {
            return [0, 0];
          }
        }
        else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 4 || columnIndex === 5) {
          if (rowIndex === 0) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if ((rowIndex - 1) % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        else if (columnIndex === 0) {
          if (rowIndex % 9 === 0) {
            return {
              rowspan: 10,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        else if (columnIndex === 6) {
          if (rowIndex % 9 === 0) {
            return {
              rowspan: 9,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  }
</script>