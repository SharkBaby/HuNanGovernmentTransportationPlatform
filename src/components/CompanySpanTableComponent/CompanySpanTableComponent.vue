<template>
  <div class="companySpanTableComponent">
    <h3 class="span-table-name">{{tabName}}</h3>
    <el-table :data="TabCtnt" :span-method="objectSpanMethod" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column :prop="tabHeaderKey" :label="tabHeaderItem" sortable v-for="(tabHeaderItem,tabHeaderKey) in tabHeader" :key="tabHeaderKey">
      </el-table-column>
    </el-table>
  </div>
</template>

<style src="./companySpanTableComponent.css" type="text/css">
  
</style>

<script>
  export default {
    name: 'CompanySpanTableComponent',
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
        if (rowIndex === 16) {
          if (columnIndex === 1) {
            return [1,6];
          } else {
            return [0, 0];
          }
        }
        // 画1，2,4，5列的合并栏
        else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 4 || columnIndex === 5) {
          // 画第2，15行的单个单元格
          if (rowIndex === 2 || rowIndex === 15) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if ((rowIndex < 2) && (rowIndex % 2 === 0)) {// 画第1，2行的合并单元格
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if ((rowIndex > 2 && rowIndex < 9) && ((rowIndex -1 ) % 2 === 0)) {// 画第4，5行,6，7行，8,9行的合并单元格
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 9 || rowIndex === 12) { //画第9，10,11行,12，13,14行的合并单元格
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        } else if (columnIndex === 0) {// 画第1列的纵向合并栏
          if (rowIndex === 0) {
            return {
              rowspan: 17,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        } else if (columnIndex === 6) {// 画第7列的纵向合并栏
          if (rowIndex === 0) {
            return {
              rowspan: 16,
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