import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home/Home'
import MsgCount from '@/MsgCount/MsgCountPage'
import Login from '@/Login/LoginPage'
import BodyContent from '@/Home/container/BodyContent/BodyContent'
import ServerMonitor from '@/ServerMonitor/ServerMonitor'
import LoginServer from '@/ServerMonitor/ServerMonitorRouter/LoginServer'
import AnalyseServer from '@/ServerMonitor/ServerMonitorRouter/AnalyseServer'
import CalcServer from '@/ServerMonitor/ServerMonitorRouter/CalcServer'
import PlatformCourse from '@/PlatformCourse/PlatformCourse'
import BaseInfo from '@/BaseInfo/BaseInfo'
import Vehicle from '@/BaseInfo/BaseInfoRouter/Vehicle'
import PassengerLine from '@/BaseInfo/BaseInfoRouter/PassengerLine'
import DangerousGoodsLine from '@/BaseInfo/BaseInfoRouter/DangerousGoodsLine'
import DangerousGoods from '@/BaseInfo/BaseInfoRouter/DangerousGoods'
import OfflineVehicle from '@/BaseInfo/BaseInfoRouter/OfflineVehicle'
import FatigueVehicleVerify from '@/BaseInfo/BaseInfoRouter/FatigueVehicleVerify'
import Company from '@/BaseInfo/BaseInfoRouter/Company'
import UserInfo from '@/BaseInfo/BaseInfoRouter/UserInfo'
import ServiceProvider from '@/BaseInfo/BaseInfoRouter/ServiceProvider'
import AccessPlatformInfo from '@/BaseInfo/BaseInfoRouter/AccessPlatformInfo'
import AccessPlatform from '@/BaseInfo/BaseInfoRouter/AccessPlatform'
import Role from '@/BaseInfo/BaseInfoRouter/Role'
import VehicleConfig from '@/BaseInfo/BaseInfoRouter/VehicleConfig'
import Driver from '@/BaseInfo/BaseInfoRouter/Driver'
// SystemConfig
import SystemConfig from '@/SystemConfig/SystemConfig'
import Provider from '@/SystemConfig/SystemConfigRouter/Provider'
import ProviderOutage from '@/SystemConfig/SystemConfigRouter/ProviderOutage'
import VehicleFeeder from '@/SystemConfig/SystemConfigRouter/VehicleFeeder'
import VehicleOutage from '@/SystemConfig/SystemConfigRouter/VehicleOutage'
import AccessPlateformAutoCheck from '@/SystemConfig/SystemConfigRouter/AccessPlateformAutoCheck'
import PlatfromCheckSentry from '@/SystemConfig/SystemConfigRouter/PlatfromCheckSentry'
import IndustryCheckSentry from '@/SystemConfig/SystemConfigRouter/IndustryCheckSentry'
import AccessPlatfromCheckSentry from '@/SystemConfig/SystemConfigRouter/AccessPlatfromCheckSentry'
import VehicleRandomInspection from '@/SystemConfig/SystemConfigRouter/VehicleRandomInspection'
import CheckConfig from '@/SystemConfig/SystemConfigRouter/CheckConfig'
// Monitor
import Monitor from '@/Monitor/Monitor'

// 考核通报
import CheckManage from '@/CheckManage/CheckManage'
import ZoneCheckRank from '@/CheckManage/CheckManageRouter/ZoneCheckRank'
import ZoneCheckPrint from '@/CheckManage/CheckManageRouter/ZoneCheckPrint'
import CompanyCheckRank from '@/CheckManage/CheckManageRouter/CompanyCheckRank'
import CompanyCheckPrint from '@/CheckManage/CheckManageRouter/CompanyCheckPrint'
import ProviderCheckRank from '@/CheckManage/CheckManageRouter/ProviderCheckRank'
import ProviderCheckPrint from '@/CheckManage/CheckManageRouter/ProviderCheckPrint'
import ProviderCheckDetail from '@/CheckManage/CheckManageRouter/ProviderCheckDetail'
import TransportCheckRank from '@/CheckManage/CheckManageRouter/TransportCheckRank'

// 数据共享
import DataShared from '@/DataShared/DataShared'

// 统计分析
import Report from '@/Report/Report'
import VehicleInstall from '@/Report/ReportRouter/VehicleInstall'
import VehicleOnline from '@/Report/ReportRouter/VehicleOnline'
import VehicleUplineRate from '@/Report/ReportRouter/VehicleUplineRate'
import VehicleSpotCheck from '@/Report/ReportRouter/VehicleSpotCheck'
import ChangeDetail from '@/Report/ReportRouter/ChangeDetail'
import VehicleVedio from '@/Report/ReportRouter/VehicleVedio'
import MultiDevice from '@/Report/ReportRouter/MultiDevice'
import OffsiteOperations from '@/Report/ReportRouter/OffsiteOperations'
import VerifyVehicle from '@/Report/ReportRouter/VerifyVehicle'
import VehicleBreakRule from '@/Report/ReportRouter/VehicleBreakRule'
import ErorrData from '@/Report/ReportRouter/ErorrData'
import CurrentOnline from '@/Report/ReportRouter/CurrentOnline'
import CheckSentry from '@/Report/ReportRouter/CheckSentry'
import OnlineLength from '@/Report/ReportRouter/OnlineLength'
import InfoPublish from '@/Report/ReportRouter/InfoPublish'
import SaveLogs from '@/Report/ReportRouter/SaveLogs'
import ServiceProviderCheck from '@/Report/ReportRouter/ServiceProviderCheck'
import PlatformLocation from '@/Report/ReportRouter/PlatformLocation'
import PlatformQuality from '@/Report/ReportRouter/PlatformQuality'
import PlatformRunLog from '@/Report/ReportRouter/PlatformRunLog'
import PlatformInspecteLog from '@/Report/ReportRouter/PlatformInspecteLog'
import PlatformCheckPostStatistics from '@/Report/ReportRouter/PlatformCheckPostStatistics'
import CompanyCheckSentry from '@/Report/ReportRouter/CompanyCheckSentry'
// 企业监管
import CompanySupervise from '@/CompanySupervise/CompanySupervise'
import SuperviseCheckSentry from '@/CompanySupervise/CompanySuperviseRouter/SuperviseCheckSentry'
// 运管机构监管
import Regulation from '@/Industry/Regulation'
// 接入平台监管
import Platform from '@/Platform/Index'
import PlatformCheck from '@/Platform/PlatformRouter/PlatformCheck'
// 车辆分布
import VehicleDistribution from '@/VehicleDistribution/VehicleDistributionIndex'

import {
  storageOperation,
  isNullUndefEmpty
} from '@/common/common';
import {
  commonConfig
}
from '@/config/commonConfig'
Vue.use(Router)
const routes = [{
  path: '/Home',
  component: Home,
  name: '返回首页', //作为面包屑导航显示的路径名
  redirect: '/Home/Dashboard', //作为默认首页
  children: [{
    path: 'Dashboard',
    component: BodyContent,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    }
  }, {
    path: 'Regulation',
    component: Regulation,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '运管机构监管', //作为面包屑导航显示的路径名
  }, {
    path: 'Platform',
    component: Platform,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '接入平台监管', //作为面包屑导航显示的路径名
  }, {
    path: 'VehicleDistribution',
    component: VehicleDistribution,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '车辆分布', //作为面包屑导航显示的路径名
  }, {
    path: 'ServerMonitor',
    component: ServerMonitor,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '服务器监控', //作为面包屑导航显示的路径名
    children: [{
      path: 'LoginServer',
      component: LoginServer,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'AnalyseServer',
      component: AnalyseServer,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CalcServer',
      component: CalcServer,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }]
  }, {
    path: 'PlatformCourse',
    component: PlatformCourse,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '平台历程', //作为面包屑导航显示的路径名
  }, {
    path: 'BaseInfo',
    component: BaseInfo,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '基本信息', //作为面包屑导航显示的路径名
    children: [{
      path: 'Vehicle',
      component: Vehicle,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PassengerLine',
      component: PassengerLine,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'DangerousGoodsLine',
      component: DangerousGoodsLine,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'DangerousGoods',
      component: DangerousGoods,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'OfflineVehicle',
      component: OfflineVehicle,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'FatigueVehicleVerify',
      component: FatigueVehicleVerify,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'Company',
      component: Company,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'UserInfo',
      component: UserInfo,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ServiceProvider',
      component: ServiceProvider,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'AccessPlatformInfo',
      component: AccessPlatformInfo,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'AccessPlatform',
      component: AccessPlatform,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'Role',
      component: Role,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleConfig',
      component: VehicleConfig,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'Driver',
      component: Driver,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }]
  }, {
    path: 'SystemConfig',
    component: SystemConfig,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '系统配置', //作为面包屑导航显示的路径名
    children: [{
      path: 'Provider',
      component: Provider,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ProviderOutage',
      component: ProviderOutage,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleFeeder',
      component: VehicleFeeder,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleOutage',
      component: VehicleOutage,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleOutage',
      component: VehicleOutage,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'AccessPlateformAutoCheck',
      component: AccessPlateformAutoCheck,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PlatfromCheckSentry',
      component: PlatfromCheckSentry,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'IndustryCheckSentry',
      component: IndustryCheckSentry,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'AccessPlatfromCheckSentry',
      component: AccessPlatfromCheckSentry,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleRandomInspection',
      component: VehicleRandomInspection,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CheckConfig',
      component: CheckConfig,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }]
  }, {
    path: 'Monitor',
    component: Monitor,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '车辆监管', //作为面包屑导航显示的路径名
  }, {
    path: 'CheckManage',
    component: CheckManage,
    name: '考核通报', //作为面包屑导航显示的路径名
    redirect: '/Home/CheckManage/ZoneCheckRank', //作为默认页面
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    children: [{
      path: 'ZoneCheckRank',
      component: ZoneCheckRank,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ZoneCheckPrint',
      component: ZoneCheckPrint,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CompanyCheckRank',
      component: CompanyCheckRank,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CompanyCheckPrint',
      component: CompanyCheckPrint,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ProviderCheckRank',
      component: ProviderCheckRank,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ProviderCheckPrint',
      component: ProviderCheckPrint,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ProviderCheckDetail',
      component: ProviderCheckDetail,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'TransportCheckRank',
      component: TransportCheckRank,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }]
  }, {
    path: 'DataShared',
    component: DataShared,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '数据共享', //作为面包屑导航显示的路径名
  }, {
    path: 'Report',
    component: Report,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '统计分析', //作为面包屑导航显示的路径名
    children: [{
      path: 'VehicleInstall',
      component: VehicleInstall,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleOnline',
      component: VehicleOnline,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleUplineRate',
      component: VehicleUplineRate,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleSpotCheck',
      component: VehicleSpotCheck,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ChangeDetail',
      component: ChangeDetail,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleVedio',
      component: VehicleVedio,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'MultiDevice',
      component: MultiDevice,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'OffsiteOperations',
      component: OffsiteOperations,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VerifyVehicle',
      component: VerifyVehicle,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'VehicleBreakRule',
      component: VehicleBreakRule,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ErorrData',
      component: ErorrData,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CurrentOnline',
      component: CurrentOnline,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CheckSentry',
      component: CheckSentry,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'OnlineLength',
      component: OnlineLength,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'InfoPublish',
      component: InfoPublish,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'SaveLogs',
      component: SaveLogs,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'ServiceProviderCheck',
      component: ServiceProviderCheck,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PlatformLocation',
      component: PlatformLocation,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PlatformQuality',
      component: PlatformQuality,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PlatformRunLog',
      component: PlatformRunLog,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PlatformInspecteLog',
      component: PlatformInspecteLog,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'PlatformCheckPostStatistics',
      component: PlatformCheckPostStatistics,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }, {
      path: 'CompanyCheckSentry',
      component: CompanyCheckSentry,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
      }

    }]
  }, {
    path: 'CompanySupervise',
    component: CompanySupervise,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    },
    name: '企业监管', //作为面包屑导航显示的路径名
  }, {
    path: 'SuperviseCheckSentry',
    component: SuperviseCheckSentry,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    }

  }, {
    path: 'PlatformCheck',
    component: PlatformCheck,
    name: '服务商查岗', //作为面包屑导航显示的路径名
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的  
    }

  }]
}, {
  path: '/Login',
  name: 'Login',
  component: Login
}, {
  path: '*',
  redirect: '/Login'
}];
const router = new Router({
  mode: 'history',
  routes
})

// 2018-06-01实现Vue-router的导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (!isNullUndefEmpty(storageOperation.getItem(commonConfig.Token))) { // 通过vuex state获取当前的token是否存在
      next();
      // 注释人：向浩
      // 注释时间：2018-06-19
      // 注释原因：由于导航栏是在最顶层，切换路由不会刷新导航栏，所以在切换路由的时候把地址存放在sessionStorage
      const breadNavs = [];
      for (let matchItem of to.matched) {
        breadNavs.push({
          toName: matchItem.name,
          toNav: {
            path: matchItem.path
          }
        })
      }
      storageOperation.setItem('breadNavs', JSON.stringify(breadNavs));
    } else {
      next({
        path: commonConfig.LoginRouter
      })
    }
  } else {
    next();
  }
})
export default router;
