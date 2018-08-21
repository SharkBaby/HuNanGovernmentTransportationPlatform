<template>
  <el-row class="orgOncheckComponent">
    <p class="level-title-font">{{orgOncheck.title}}</p>
    <el-row class="regulation-plateform-online-detail-mark">
      <div class="regulation-plateform-online-detail-mark-div">
        <div class="bubbel title onGuard" style="margin-left: 5%;margin-top: 1%;"></div>
        <label>在岗</label>
      </div>
      <div class="regulation-plateform-online-detail-mark-div" style="margin-top: 4px;">
        <div class="bubbel title post" style="margin-left: 5%; margin-top: 1%"></div>
        <label>离岗</label>
      </div>
      <el-row class="org-oncheck-content" ref="orgOncheckAnimation">
        <div :class="['org-oncheck-content-item', orgOncheckItem.IsEmployed, orgOncheckItem.hoverClass]" v-for="(orgOncheckItem, orgOncheckKey) of orgOncheck.mapItems" :key="orgOncheckKey" :style="{top: orgOncheckItem.topHeight+'px', left: orgOncheckItem.leftVal}"
          @mouseover="handleItemHover(orgOncheckKey)" @mouseout="handleItemOut(orgOncheckKey)">
          <label>{{orgOncheckItem.itemVal}}</label>
        </div>
      </el-row>
    </el-row>
  </el-row>
</template>

<style type="text/css" src="./orgOncheckComponent.css">
  
</style>
  
</style>

<script>
  import {
    storageOperation
  } from '@/common/common';
  import {
    commonConfig
  } from '@/config/commonConfig'
  export default {
    name: 'orgOncheckComponent',
    props: ['orgOncheck'],
    data() {
      return {
        orgOncheckCtnt: this.orgOncheck,
        animationHeight: ''
      }
    },
    watch: {
      orgOncheck: function(val) {
        this.orgOncheckCtnt = val;
        this.animationHeight = this.$refs.orgOncheckAnimation.$el.clientHeight - 60;
        this.initAnimation(this.animationHeight);
      }
    },
    methods: {
      initAnimation: function(height) {
        // Step1: 先设置每一个元素的随机高度
        for (let onCheckItem of this.orgOncheckCtnt.mapItems) {
          onCheckItem.topHeight = Math.random() * height;
          const randomLeftVal = Math.random() * 100;
          let leftValTemp = "calc(" + randomLeftVal + "% - 50px)"
          if (randomLeftVal < 10) leftValTemp = "calc(" + randomLeftVal + "%)";
          onCheckItem.leftVal = leftValTemp; //随机生成每一个元素的横向位置
          onCheckItem.direction = 'down'; //设置初始状态为向下运动状态
        }
        // Step2: 然后改变他们的高度通过设置setInterval
        let intervalFlag = setInterval(this.runAnimation, 100);
        storageOperation.setItem(commonConfig.OrgOnCheckInterval, intervalFlag);
      },
      runAnimation: function() {
        for (let onCheckItem of this.orgOncheckCtnt.mapItems) {
          if (onCheckItem.topHeight < this.animationHeight && onCheckItem.direction == 'down') //判断往下运动并且还没有接触到底部
            onCheckItem.topHeight++; //继续往下运动
          else if (onCheckItem.topHeight >= this.animationHeight && onCheckItem.direction == 'down') { //判断往下运动接触到底部的时候
            onCheckItem.topHeight--; //开始向上运动
            onCheckItem.direction = 'up'; //开始改变方向向上运动
          } else if (onCheckItem.topHeight > 5 && onCheckItem.direction == 'up') //判断往上运动并且还没有接触到顶部
            onCheckItem.topHeight--; //继续往上运动
          else if (onCheckItem.topHeight <= 5 && onCheckItem.direction == 'up') { //判断往上运动接触到顶部的时候
            onCheckItem.topHeight++; //开始向下运动
            onCheckItem.direction = 'down'; //开始改变方向向下运动
          }
        }
      },
      handleItemHover: function(orgOncheckKey) {
        this.orgOncheckCtnt.mapItems[orgOncheckKey].hoverClass = 'oncheck-hover';
      },
      handleItemOut: function(orgOncheckKey) {
        this.orgOncheckCtnt.mapItems[orgOncheckKey].hoverClass = '';
      },
    }
  }
</script>