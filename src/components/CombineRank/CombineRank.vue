<template>
  <el-row class="combineRank">
    <p class="companyindex-header">综合排名
      <a href="#"></a>
      <a href="#"></a>
      <a href="#" class="companyindex-header-down"></a>
    </p>
    <div class="companyindex-rank-content">
      <div class="companyindex-rank-left">
        <el-row class="companyindex-row">
          <el-col :span="16" class="companyindex-col">
            <div :class="['companyindex-rank-item', rankItem.rankClass]" v-for="(rankItem,rankKey) of combineRank08" :key="rankKey">
              <div class="companyindex-item">
                <p>{{rankItem.rankNumber}}</p>
              </div>
              <div class="companyindex-rank-mark">
                <div :class="rankItem.markClass">
                  <p>{{rankItem.score}}</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="companyindex-rank-right">
            <ul>
              <li class="companyindex-rank-li" v-for="(rankItem920, rankItem920Key) of combineRank920" :key="rankItem920Key">
                <label class="companyindex-rank-right-id">{{rankItem920.rankNumber}}</label>
                <span class="companyindex-rank-total"><span class="companyindex-rank-inner" :style="{width: rankItem920.width}"></span></span>
                <i :class="['companyindex-rank-icon', rankItem920.companyindexClass]"></i>
                <label>{{rankItem920.score}}</label>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>
</template>

<style type="text/css" src="./combineRank.css">
  
</style>

<script>
  export default {
    name: 'combineRank',
    props: [],
    data() {
      return {
        combineRank08: [{
          rankClass: 'companyindex-rank-8',
          rankNumber: 8,
          score: 100,
          markClass: ''
        }, {
          rankClass: 'companyindex-rank-6',
          rankNumber: 6,
          score: 100,
          markClass: ''
        }, {
          rankClass: 'companyindex-rank-4',
          rankNumber: 4,
          score: 100,
          markClass: ''
        }, {
          rankClass: 'companyindex-rank-2',
          rankNumber: 2,
          score: 100,
          markClass: 'companyindex-rank-mark-2'
        }, {
          rankClass: 'companyindex-rank-1',
          rankNumber: 1,
          score: 100,
          markClass: 'companyindex-rank-mark-1'
        }, {
          rankClass: 'companyindex-rank-3',
          rankNumber: 3,
          score: 100,
          markClass: 'companyindex-rank-mark-3'
        }, {
          rankClass: 'companyindex-rank-5',
          rankNumber: 5,
          score: 100,
          markClass: ''
        }, {
          rankClass: 'companyindex-rank-7',
          rankNumber: 7,
          score: 100,
          markClass: ''
        }],
        combineRank920: [{
          rankNumber: 9,
          width: '90%',
          companyindexClass: 'companyindex-middle',
          score: 7.2
        }, {
          rankNumber: 10,
          width: '80%',
          companyindexClass: 'companyindex-down',
          score: 10
        }, {
          rankNumber: 11,
          width: '70%',
          companyindexClass: 'companyindex-down',
          score: 10
        }, {
          rankNumber: 12,
          width: '60%',
          companyindexClass: 'companyindex-down',
          score: 6
        }, {
          rankNumber: 13,
          width: '50%',
          companyindexClass: 'companyindex-down',
          score: 8
        }, {
          rankNumber: 14,
          width: '40%',
          companyindexClass: 'companyindex-down',
          score: 9
        }, {
          rankNumber: 15,
          width: '100%',
          companyindexClass: 'companyindex-down',
          score: 23
        }, {
          rankNumber: 16,
          width: '100%',
          companyindexClass: 'companyindex-down',
          score: 11
        }, {
          rankNumber: 17,
          width: '100%',
          companyindexClass: 'companyindex-down',
          score: 10
        }, {
          rankNumber: 18,
          width: '100%',
          companyindexClass: 'companyindex-down',
          score: 3
        }, {
          rankNumber: 19,
          width: '100%',
          companyindexClass: 'companyindex-down',
          score: 5
        }, {
          rankNumber: 20,
          width: '50%',
          companyindexClass: 'companyindex-up',
          score: 27.2
        }]
      }
    }
  
  }
</script>

