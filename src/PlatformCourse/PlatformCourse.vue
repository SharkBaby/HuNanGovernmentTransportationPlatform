<template>
  <!-- div containner strat -->
  <div class="platform-course-containner">
    <!-- div content strat -->
    <div class="platform-course-img">
      <img src="../assets/ServerMonitor/gradient.png" />
      <div class="platform-course-content">
        <!-- content colls1 strat -->
        <div class="platform-course-content-colls coll1">
          <!-- content colls detail  -->
          <div class="platform-course-content-colls-detail">
            <div class="platform-course-content-colls-detail-left"></div>
            <div class="platform-course-content-colls-detail-word">2004年，响应省政府“科技兴安”口号建立省监控中心，对全省“两客一危”车辆进行监控管理。</div>
          </div>
          <!-- content colls dotted line  -->
          <div class="platform-course-content-colls-dotted dotted1"> </div>
          <!-- content colls circular  -->
          <div class="platform-course-content-colls-circular"></div>
          <!-- content colls year -->
          <div class="platform-course-content-colls-year">2004 </div>
        </div>
        <!-- content colls1 end -->
        <!-- content colls2 strat -->
        <div class="platform-course-content-colls coll2">
          <!-- content colls detail  -->
          <div class="platform-course-content-colls-detail">
            <div class="platform-course-content-colls-detail-left"></div>
            <div class="platform-course-content-colls-detail-word">2004年厅组织科研院校专家和网阔技术人员对系统功能提出了进一步的技术要求。</div>
          </div>
          <!-- content colls dotted line  -->
          <div class="platform-course-content-colls-dotted dotted2"> </div>
          <!-- content colls circular  -->
          <div class="platform-course-content-colls-circular"></div>
          <!-- content colls year -->
          <div class="platform-course-content-colls-year">2004 </div>
        </div>
        <!-- content colls2 end -->
        <!-- content colls3 strat -->
        <div class="platform-course-content-colls coll3">
          <!-- content colls detail  -->
          <div class="platform-course-content-colls-detail">
            <div class="platform-course-content-colls-detail-left"></div>
            <div class="platform-course-content-colls-detail-word">2005年，局组织并互通30多家GPS运营公司的监控系统接入省监控平台。</div>
          </div>
          <!-- content colls dotted line  -->
          <div class="platform-course-content-colls-dotted dotted3"> </div>
          <!-- content colls circular  -->
          <div class="platform-course-content-colls-circular"></div>
          <!-- content colls year -->
          <div class="platform-course-content-colls-year">2005 </div>
        </div>
        <!-- content colls3 end -->
        <!-- content colls4 strat -->
        <div class="platform-course-content-colls coll4">
          <!-- content colls detail  -->
          <div class="platform-course-content-colls-detail">
            <div class="platform-course-content-colls-detail-left"></div>
            <div class="platform-course-content-colls-detail-word">2011年，交通运输部将GPS监控平台分为管理部门用的“政府监管平台”和道路运输企业用的“企业监控平台”，并都要通过交通运输部的审查标准。</div>
          </div>
          <!-- content colls dotted line  -->
          <div class="platform-course-content-colls-dotted dotted4"> </div>
          <!-- content colls circular  -->
          <div class="platform-course-content-colls-circular"></div>
          <!-- content colls year -->
          <div class="platform-course-content-colls-year">2011 </div>
        </div>
        <!-- content colls4 end -->
        <!-- content colls5 strat -->
        <div class="platform-course-content-colls coll5">
          <!-- content colls detail  -->
          <div class="platform-course-content-colls-detail">
            <div class="platform-course-content-colls-detail-left"></div>
            <div class="platform-course-content-colls-detail-word">2012年2月，局“政府监管平台”第一批通过交通运输部组织的“政府监管平台”标准符合性审查。</div>
          </div>
          <!-- content colls dotted line  -->
          <div class="platform-course-content-colls-dotted dotted5"> </div>
          <!-- content colls circular  -->
          <div class="platform-course-content-colls-circular"></div>
          <!-- content colls year -->
          <div class="platform-course-content-colls-year">2012 </div>
        </div>
        <!-- content colls5 end -->
        <!-- content colls6 strat -->
        <div class="platform-course-content-colls coll6">
          <!-- content colls year -->
          <div class="platform-course-content-colls-year">2015 </div>
          <!-- content colls circular  -->
          <div class="platform-course-content-colls-circular"></div>
          <!-- content colls dotted line  -->
          <div class="platform-course-content-colls-dotted dotted6"> </div>
          <!-- content colls detail  -->
          <div class="platform-course-content-colls-detail">
            <div class="platform-course-content-colls-detail-left"></div>
            <div class="platform-course-content-colls-detail-word">2015年，为了满足监管平台使用人员的要求，有针对性的对系统进行优化,我们进行的改版；主要为功能和系统界面体验的优化；</div>
          </div>
        </div>
        <!-- content colls6 end -->
      </div>
    </div>
    <!--div content end -->
  </div>
  <!--div containner end-->
</template>

<style src="./platformCourse.css" type="text/css">
</style>

<script>
import { storageOperation } from "@/common/common";
export default {
  name: "Platform-Course",
  components: {},
  created: function() {
    const breadNavs = JSON.parse(storageOperation.getItem("breadNavs"));
    this.$emit("viewIn", breadNavs);
  }
};
</script>
