<template>
  <div class="zoneCheckSpanTableComponent">
    <h3 class="zone-check-span-table-name">{{tabName}}</h3>
    <el-table :data="TabCtnt" :span-method="objectSpanMethod" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column :prop="tabHeaderKey" :label="tabHeaderItem" sortable v-for="(tabHeaderItem,tabHeaderKey) in tabHeader" :key="tabHeaderKey">
      </el-table-column>
    </el-table>
  </div>
</template>

<style src="./zoneCheckSpanTableComponent.css" type="text/css">
  
</style>

<script>
  export default {
    name: 'zoneCheckSpanTableComponent',
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
        // 画最后的备注栏
        if (rowIndex === 9) {
          if (columnIndex === 1) {
            return [1, 6];
          } else {
            return [0, 0];
          }
        }
        // 画1，2,4，5列的合并栏
        else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 4 || columnIndex === 5) {
          // 画第2行的单个单元格
          if (rowIndex === 2) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if ((rowIndex < 2) && (rowIndex % 2 === 0)) { // 画第1，2行的合并单元格
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if ((rowIndex > 2 && rowIndex < 8) && ((rowIndex - 1) % 2 === 0)) { // 画第4，5行,6，7行，8,9行的合并单元格
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
        } else if (columnIndex === 0) { // 画第1列的纵向合并栏
          if (rowIndex === 0) {
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
        } else if (columnIndex === 6) { // 画第7列的纵向合并栏
          if (rowIndex === 0) {
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