<template>
  <div class="msg-count">
    <msg-count :activeName="activeName" :tabCtntList="tabCtntList"></msg-count>
  </div>
</template>
<style src="./msgCountPage.css" type="text/css"></style>
<script>
import MsgCount from '../components/MsgCount/MsgCount';
export default {
  name: 'MsgCount-Page',
  components: {
    MsgCount,
  },
  data(){
    return{
      activeName: 'push',
      tabCtntList: {
        firCtnt: {
          tabLabel: '查岗',
          tabName: 'onlineCheck',
          tabCount: 0,
          tabHeader: {
            sortOrder: '序号',
            onlineCheckPrblem: '查岗问题',
            onlinePerson: '查岗人',
            onlineOrg: '查岗机构',
            onlineTime: '查岗时间',
            onlineRspnse: '查岗应答',
            rspnseStatus: '响应状态',
            rspnseTime: '响应状态'
          },
          TabCtnt: [{
            sortOrder: 'first-1',
            onlineCheckPrblem: 'first-1',
            onlinePerson: 'first-1',
            onlineOrg: 'first-1',
            onlineTime: 'first-1',
            onlineRspnse: 'first-1',
            rspnseStatus: 'first-1',
            rspnseTime: 'first-1'
          }, {
            sortOrder: 'first-2',
            onlineCheckPrblem: 'first-2',
            onlinePerson: 'first-2',
            onlineOrg: 'first-2',
            onlineTime: 'first-2',
            onlineRspnse: 'first-2',
            rspnseStatus: 'first-2',
            rspnseTime: 'first-2'
          }, {
            sortOrder: 'first-3',
            onlineCheckPrblem: 'first-3',
            onlinePerson: 'first-3',
            onlineOrg: 'first-3',
            onlineTime: 'first-3',
            onlineRspnse: 'first-3',
            rspnseStatus: 'first-3',
            rspnseTime: 'first-3'
          }, {
            sortOrder: 'first-4',
            onlineCheckPrblem: 'first-4',
            onlinePerson: 'first-4',
            onlineOrg: 'first-4',
            onlineTime: 'first-4',
            onlineRspnse: 'first-4',
            rspnseStatus: 'first-4',
            rspnseTime: 'first-4'
          }],
        },
        secCtnt: {
          tabLabel: '督办',
          tabName: 'push',
          tabCount: 1,
          tabHeader: {
            sortOrder: '序号',
            vehcleNumber: '车牌号',
            vehcleType: '车辆类型',
            belongArea: '所属地区',
            belongTransEntprise: '所属道路运输企业',
            breakType: '违章类型',
            breakLevel: '违章程度',
            breakStartTime: '违章开始时间',
            breakPeriod: '持续时长',
            pushPerson: '督办人',
            pushOrg: '督办机构',
            pushTime: '督办时间',
            pushRspnse: '督办响应'
          },
          TabCtnt: [{
            sortOrder: 'second-1',
            vehcleNumber: 'second-1',
            vehcleType: 'second-1',
            belongArea: 'second-1',
            belongTransEntprise: 'second-1',
            breakType: 'second-1',
            breakLevel: 'second-1',
            breakStartTime: 'second-1',
            breakPeriod: 'second-1',
            pushPerson: 'second-1',
            pushOrg: 'second-1',
            pushTime: 'second-1',
            pushRspnse: 'second-1'
          }, {
            sortOrder: '序号',
            vehcleNumber: '车牌号',
            vehcleType: '车辆类型',
            belongArea: '所属地区',
            belongTransEntprise: '所属道路运输企业',
            breakType: '违章类型',
            breakLevel: '违章程度',
            breakStartTime: '违章开始时间',
            breakPeriod: '持续时长',
            pushPerson: '督办人',
            pushOrg: '督办机构',
            pushTime: '督办时间',
            pushRspnse: '督办响应'
          }, {
            sortOrder: '序号',
            vehcleNumber: '车牌号',
            vehcleType: '车辆类型',
            belongArea: '所属地区',
            belongTransEntprise: '所属道路运输企业',
            breakType: '违章类型',
            breakLevel: '违章程度',
            breakStartTime: '违章开始时间',
            breakPeriod: '持续时长',
            pushPerson: '督办人',
            pushOrg: '督办机构',
            pushTime: '督办时间',
            pushRspnse: '督办响应'
          }, {
            sortOrder: '序号',
            vehcleNumber: '车牌号',
            vehcleType: '车辆类型',
            belongArea: '所属地区',
            belongTransEntprise: '所属道路运输企业',
            breakType: '违章类型',
            breakLevel: '违章程度',
            breakStartTime: '违章开始时间',
            breakPeriod: '持续时长',
            pushPerson: '督办人',
            pushOrg: '督办机构',
            pushTime: '督办时间',
            pushRspnse: '督办响应'
          }],
        },
        trdCtnt: {
          tabLabel: '通知',
          tabName: 'notification',
          tabCount: 2,
          tabHeader: {
            sortOrder: '序号',
            ntfyCtnt: '车牌号',
            publishPerson: '车辆类型',
            publishOrg: '所属地区',
            publishTime: '所属道路运输企业',
            response: '违章类型',
            type: '违章程度',
          },
          TabCtnt: [{
            sortOrder: 'third-1',
            ntfyCtnt: 'third-1',
            publishPerson: 'third-1',
            publishOrg: 'third-1',
            publishTime: 'third-1',
            response: 'third-1',
            type: 'third-1',
          }, {
            sortOrder: '序号',
            ntfyCtnt: '车牌号',
            publishPerson: '车辆类型',
            publishOrg: '所属地区',
            publishTime: '所属道路运输企业',
            response: '违章类型',
            type: '违章程度',
          }, {
            sortOrder: '序号',
            ntfyCtnt: '车牌号',
            publishPerson: '车辆类型',
            publishOrg: '所属地区',
            publishTime: '所属道路运输企业',
            response: '违章类型',
            type: '违章程度',
          }, {
            sortOrder: '序号',
            ntfyCtnt: '车牌号',
            publishPerson: '车辆类型',
            publishOrg: '所属地区',
            publishTime: '所属道路运输企业',
            response: '违章类型',
            type: '违章程度',
          }],
        },
      }
    }
  }
}
</script>
