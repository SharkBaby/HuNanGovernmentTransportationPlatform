const commonConfig = {
  rootUrl: 'http://10.50.75.111:9888',
  UserLogin: '/api/User/Login',
  UserLoginOut: '/api/User/LoginOut',
  UserUpdatePassword: '/api/User/UpdatePassword',
  GetIndustryRegulation: '/api/Home/GetIndustryRegulation', //运营机构监管
  // 运营机构监管子页面
  GetLevelPlatDataDetail: '/api/Home/GetLevelPlatDataDetail',
  GetLevelPlatDataDetailParams: {
    zoneID: ''
  },
  // 通用接口 - 获取当前用户地区树
  GetZoneToUserID: '/api/Common/GetZoneToUserID',
  GetAccessPlatformRegulation: '/api/Home/GetAccessPlatformRegulation', //接入平台监管
  // 接入平台监管子页面 - 接入平台链接情况->左部分数据
  GetPlatformList: '/api/Home/GetPlatformList',
  // 接入平台监管子页面 - 接入平台链接情况->右部分数据
  GetPlatformLinkTotal: '/api/Home/GetPlatformLinkTotal',
  // 接入平台监管子页面 - 接入平台报警与定位
  GetPlatformAlarmLinePie: '/api/Home/GetPlatformAlarmLinePie',
  // 接入平台监管子页面 - 接入平台基本信息
  GetPlatformBaseInfo: '/api/Home/GetPlatformBaseInfo',
  // 接入平台监管子页面 - 接入平台定位数据
  GetPlatformLocation: '/api/Home/GetPlatformLocation',
  SessionPlatformLocation: 'platformLocation',
  // 接入平台监管子页面 - 接入平台数据传输质量
  GetPlatformTransfer: '/api/Home/GetPlatformTransfer',
  GetCarOnLine: '/api/Home/GetCarOnLine', //车辆入网
  //车辆分布 - 左边地图和对应的元饼图
  GetVehicleSpreadData: '/api/Home/GetVehicleSpreadData',
  //车辆分布 - 右边重点车辆
  GetVehicleList: '/api/Home/GetVehicleList',
  GetVehicleDetail: '/api/Home/GetVehicleDetail',

  GetCurrentOnlineData: '/api/Home/GetCurrentOnlineData', //车辆实时在线情况
  GetVehicleBreakData: '/api/Home/GetVehicleBreakData', //车辆违章情况
  GetSecurityAlarmPoint: '/api/Home/GetSecurityAlarmPoint', //安全监管报警热点
  // 通用接口 - 预搜索
  GetAutoDataList: '/api/Common/GetAutoDataList', // type:(1:地区，2：企业，3：车辆，4：接入平台),text,zoneId,queryType
  // 考核通报 - 地区考核排名
  GetCheckManageByZone: '/api/CheckManage/GetCheckManageData',
  // 考核通报 - 获取地区考核明细
  GetProviderCheckDetailData: '/api/CheckManage/GetProviderCheckDetailData',
  // 考核通报 - 导出考核排名
  ExportCheckManageData: '/api/CheckManage/ExportCheckManageData',
  // 考核通报 - 导出考核明细
  ExportProviderCheckDetailData: '/api/CheckManage/ExportProviderCheckDetailData',
  // 统计分析下面所有后端接口
  StatisticConst: {
    GetVehicleInstallData: '/api/Statistics/GetVehicleInstallData', //车辆入网数
    ExportVehicleInstallData: '/api/Statistics/ExportVehicleInstallData', //导出车辆入网数
    GetVehicleUplineData: '/api/Statistics/GetVehicleUplineData', //车辆上线统计
    ExportVehicleUplineData: '/api/Statistics/ExportVehicleUplineData', //导出车辆上线统计
    GetVehicleSpotCheckData: '/api/Statistics/GetVehicleSpotCheckData', //车辆抽查统计
    ExportVehicleSpotCheckData: '/api/Statistics/ExportVehicleSpotCheckData', //导出车辆抽查统计
    GetChangeDetailData: '/api/Statistics/GetChangeDetailData', //变更明细统计
    ExportChangeDetailData: '/api/Statistics/ExportChangeDetailData', //变更明细统计
    GetVehicleVedioData: '/api/Statistics/GetVehicleVedioData', //车辆视频
    
  },
  // 按钮事件的区分
  btnEventsId: {
    search: 'search',
    export_data: 'export_data',
    print: 'print' //打印页面需要使用
  },
  GetSecurityAlarmPointParams: {
    beginDate: '',
    endDate: '',
    alarmType: '',
  },
  UserID: 'UserID', //存储到sessionStorage的key
  Token: 'Token', //存储到sessionStorage的key
  LoginID: 'LoginID', //存储到sessionStorage的key,
  OrgOnCheckInterval: 'OrgOnCheckInterval', //关于运管机构监管清楚动画的定时器,存储到sessionStorage的key,
  token: 'token',
  Password: 'Password',
  // Logout 字段
  UpdatePwd: {
    UserID: 'UserID',
    OldPassword: 'OldPassword',
    NewPassword: 'NewPassword',
  },
  DashboardRouter: '/Home/Dashboard',
  LoginRouter: '/Login',
  // 路由常量定义
  routerConst: {
    ProviderCheckDetail: '/Home/CheckManage/ProviderCheckDetail'
  }
};
// 注释人：向浩
// 注释时间：2018-06-13
// 注释原因：车辆类型的种类太多，将这些参数抽象出来，通过模块导入的方式进行使用
const carTypeOptions = [{
  id: "1",
  label: "所有车辆",
  children: [{
      id: "1-1",
      label: "重点营运车辆",
      children: [{
          id: "1-1-1",
          label: "两客一危",
          children: [{
              id: "1-1-1-1",
              label: "三类以上班线客运",
              children: [{
                  id: "1-1-1-1-1",
                  value: 0x1000,
                  label: "高速客车"
                },
                {
                  id: "1-1-1-1-2",
                  value: 0x0002,
                  label: "超长客车"
                },
                {
                  id: "1-1-1-1-3",
                  value: 0x0001,
                  label: "三类以上班线客运（除高速，超长）"
                }
              ]
            },
            {
              id: "1-1-1-2",
              label: "旅游包车",
              children: [{
                  id: "1-1-1-2-1",
                  value: 0x0004,
                  label: "旅游客车"
                },
                {
                  id: "1-1-1-2-2",
                  value: 0x100000,
                  label: "包车客车"
                },
                {
                  id: "1-1-1-1-3",
                  value: 0x0001,
                  label: "三类以上班线客运（除高速，超长）"
                }
              ]
            },
            {
              id: "1-1-1-3",
              value: 0x0080,
              label: "危险品运输车"
            }
          ]
        },
        {
          id: "1-1-2",
          label: "重货车辆",
          children: [{
              id: "1-1-2-1",
              value: 0x0010,
              label: "重型货物运输车"
            },
            {
              id: "1-1-2-2",
              value: 0x0020,
              label: "半挂牵引车"
            }
          ]
        }
      ]
    },
    {
      id: "1-2",
      label: "非重点营运车辆",
      children: [{
          id: "1-2-1",
          value: 0x8000,
          label: "普通货运"
        },
        {
          id: "1-2-2",
          value: 0x2000,
          label: "农村客运"
        },
        {
          id: "1-2-3",
          value: 0x10000,
          label: "驾培车"
        },
        {
          id: "1-2-4",
          value: 0x4000,
          label: "出租车"
        },
        {
          id: "1-2-5",
          value: 0x20000,
          label: "公交车"
        },
        {
          id: "1-2-6",
          value: 2097152,
          label: "租赁客车"
        },
        {
          id: "1-2-7",
          value: 0x40000,
          label: "校园车辆"
        },
        {
          id: "1-2-8",
          value: 0x80000,
          label: "其他车"
        }
      ]
    }
  ]
}];
// 注释人：向浩
// 注释时间：2018-06-15
// 注释原因：将所有报表涉及的类型统一管理，这样就可以在后面的模块里面统一处理
const reportLabelId = {
  ZoneId: 'ZoneId', //地区
  PlatformId: 'PlatformId', //接入平台
  fromTodatePicker: 'fromTodatePicker', //时间起 - 时间至
  CarType: 'CarType', //车辆类型
  UnitId: 'UnitId', //运输企业
  IsIncludeLower: 'IsIncludeLower', //是否包含下级
  VehicleId: 'VehicleId', //车牌号
  AlarmType: 'AlarmType', //报警类型
  InstallID: 'InstallID',
  UpLineFlag: 'UpLineFlag',
  CheckUnitID: 'CheckUnitID',
  CheckType: 'CheckType',
  IsOnGuard: 'IsOnGuard',
  TargetUserId: 'TargetUserId',
  DeviceID: 'DeviceID',
  GPSInstalled: 'GPSInstalled',
  ChangeSourceType: 'ChangeSourceType', //变更来源类型
  OperationType: 'OperationType', //操作类型
  PlateColor: 'PlateColor', //车牌颜色
  Area: 'Area', //区域
  UnitName: 'UnitName', //单位名称
}
//ES6 语法声明一个模块
export {
  commonConfig,
  carTypeOptions,
  reportLabelId
};
