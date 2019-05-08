import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // 主页面 --- 单页面
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true,
      access: [100]
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: '_shouye'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 店铺详情页 -- 单页面
  {
    path: '/kitchenDataShopDetail',
    name: '_kitchenDataShopDetail',
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: '/kitchenDataShopDetail',
        name: 'kitchenDataShopDetail',
        meta: {
          icon: '_dianpu-xianxing',
          hideInMenu: true,
          title: route => `{{ 店铺详情 }}-${route.query.id}`,
          notCache: true,
        },
        component: () => import('@/view/shop-page/kitchenShopDetail/main.vue')
      }
    ]
  },
  // 用户设置 -- 单页面
  {
    path: '/user_setting',
    name: '_user_setting',
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: '/user_setting',
        name: 'user_setting',
        meta: {
          icon: '_shezhi',
          title: '修改用户设置',
          notCache: true
        },
        component: () => import('@/view/single-page/setting/main.vue')
      }
    ]
  },
  // 厨房数据
  {
    path: '/kitchen_data',
    name: 'kitchen_data',
    meta: {
      icon: '_tiaoxingtu-xianxing',
      title: '厨房数据',
      access: [200]
    },
    component: Main,
    children: [
      {
        path: '/kitchen_data_kitchen_list',
        name: 'kitchen_data_kitchen_list',
        meta: {
          icon: '_bingtu',
          title: '厨房列表',
          access: [201]
        },
        component: () => import('@/view/kitchen-data/kitchen_list/main.vue')
      },
      {
        path: '/kitchen_data_store_list',
        name: 'kitchen_data_store_list',
        meta: {
          hideInMenu: true,
          notCache: true,
          icon: '_bingtu',
          title: route => `{{ 商户列表 }}-${route.query.tabValue}`,
          access: [202]
        },
        component: () => import('@/view/kitchen-data/store_list/main.vue')
      },
      {
        path: '/kitchen_data_kitchen_detail',
        name: 'kitchen_data_kitchen_detail',
        meta: {
          icon: '_kucun-xianxing',
          hideInMenu: true,
          title: route => `{{ 厨房详情 }}-${route.query.id}`,
          notCache: true,
          access: [203]
        },
        component: () => import('@/view/kitchen-data/kitchen_detail/main.vue')
      },
      // {
      //   path: '/kitchen_data_store_sale',
      //   name: 'kitchen_data_store_sale',
      //   meta: {
      //     icon: '_zitigui',
      //     title: '销控分析',
      //     // access: [204]
      //   },
      //   component: () => import('@/view/kitchen-data/store_sale/main.vue')
      // },
    ]
  },
  // 商户管理
  {
    path: '/kitchen',
    name: 'kitchen',
    meta: {
      icon: '_shouye-xianxing',
      title: '商户管理',
      access: [300]
    },
    component: Main,
    children: [
      {
        path: '/kitchen_store_list',
        name: 'kitchen_store_list',
        meta: {
          icon: '_kucun-xianxing',
          title: '商户列表',
          access: [301],
        },
        component: () => import('@/view/kitchen/store_list/main.vue')
      },
      {
        path: '/kitchenShopEdit',
        name: 'kitchenShopEdit',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `商户编辑: ${route.query.id}`,
          access: [302]
        },
        component: () => import('@/view/shop-page/kitchenShopEdit/main.vue')
      },
      {
        path: '/kitchenShopEdit2',
        name: 'kitchenShopEdit2',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `商户编辑: ${route.query.id}`,
          access: [303]
        },
        component: () => import('@/view/shop-page/kitchenShopEdit2/main.vue')
      },
      {
        path: '/kitchenShopHandle',
        name: 'kitchenShopHandle',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `商户操作: ${route.query.id}`,
          access: [304]
        },
        component: () => import('@/view/shop-page/kitchenShophandle/main.vue')
      },
      {
        path: '/kitchenShopHandle2',
        name: 'kitchenShopHandle2',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `商户操作: ${route.query.id}`,
          access: [305]
        },
        component: () => import('@/view/shop-page/kitchenShophandle2/main.vue')
      },
      {
        path: '/kitchen_store_eliminate',
        name: 'kitchen_store_eliminate',
        meta: {
          hideInMenu: true,
          icon: '_zhongzhuanzhan',
          title: '退租页面',
          access: [306]
        },
        component: () => import('@/view/kitchen/eliminate/main.vue')
      },
      {
        path: '/kitchen_total_inspect_list',
        name: 'kitchen_total_inspect_list',
        meta: {
          icon: '_renwu',
          title: '日检列表',
          access: [307]
        },
        component: () => import('@/view/kitchen/inspect_list/main.vue')
      },
      {
        path: '/kitchen_total_inspect',
        name: 'kitchen_total_inspect',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `日检报告 : ${route.query.id}`,
          access: [308]
        },
        component: () => import('@/view/kitchen/inspect/main.vue')
      },
      {
        path: '/kitchen_store_fine',
        name: 'kitchen_store_fine',
        meta: {
          icon: '_weichuqin',
          title: '罚款登记',
          access: [311]
        },
        component: () => import('@/view/kitchen/store_fine/main.vue')
      },
      {
        path: '/kitchen_record',
        name: 'kitchen_record',
        meta: {
          icon: '_leidatance ',
          title: '抄表',
          access: [313]
        },
        component: () => import('@/view/kitchen/record/main.vue')
      },
      {
        path: '/kitchen_bill',
        name: 'kitchen_bill',
        meta: {
          icon: '_jisuanqilishuai-xianxing-xi',
          title: '商户缴费',
          access: [314]
        },
        component: () => import('@/view/kitchen/bill/main.vue')
      }
    ]
  },
  //招商管理
  {
    path: '/canvass',
    name: 'canvass',
    meta: {
      icon: '_jiaosequnti',
      title: '招商管理',
      access: [400]
    },
    component: Main,
    children: [
      // 商户列表
      {
        path: '/canvass_store_list',
        name: 'canvass_store_list',
        meta: {
          icon: '_kucun-xianxing',
          title: '招商管理',
          access: [401]
        },
        component: () => import('@/view/canvass/store_list/main.vue')
      },
      {
        path: '/canvassShopEdit',
        name: 'canvassShopEdit',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `商务操作: ${route.query.id}`,
          access: [402]
        },
        component: () => import('@/view/shop-page/canvassShopEdit/main.vue')
      },
      {
        path: '/canvass_store_view',
        name: 'canvass_store_view',
        meta: {
          icon: '_kuaidiyuan',
          title: '带看管理',
          access: [403]
        },
        component: () => import('@/view/canvass/store_view/main.vue')
      },
      {
        path: '/view_analysis_body',
        name: 'view_analysis_body',
        meta: {
          icon: '_bingtu',
          title: '带看分析',
          access: [404]
        },
        component: () => import('@/view/canvass/view_analysis_body/main.vue')
      },
      {
        path: '/canvass_web_book',
        name: 'canvass_web_book',
        meta: {
          icon: '_kucun-xianxing',
          title: '网站预约',
          access: [405]
        },
        component: () => import('@/view/canvass/web_book/main.vue')
      },
      // {
      //   path: '/canvass_sign_analysis',
      //   name: 'canvass_sign_analysis',
      //   meta: {
      //     icon: '_yingyongchengxu-xianxing',
      //     title: '签约分析',
      //     // access: [406]
      //   },
      //   component: () => import('@/view/canvass/sign_analysis/main.vue')
      // },
    ]
  },
  // 财务管理
  {
    path: '/finance',
    name: 'finance',
    meta: {
      icon: '_caiwu',
      title: '财务管理',
      access: [500]
    },
    component: Main,
    children: [
      {
        path: '/finance_data_store_list',
        name: 'finance_data_store_list',
        meta: {
          icon: '_kucun-xianxing',
          title: '商户列表',
          access: [501]
        },
        component: () => import('@/view/finance/kitchenStoreList/main.vue')
      },
      {
        path: '/finance_build',
        name: 'finance_build',
        meta: {
          hideInMenu: true,
          icon: '_dianpu',
          title: '新建店铺',
          access: [502]
        },
        component: () => import('@/view/finance/build/main.vue')
      },
      {
        // 退租详情页面
        path: '/financeShopEdit',
        name: 'financeShopEdit',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `财务编辑: ${route.query.id}`,
          access: [503]
        },
        component: () => import('@/view/shop-page/financeShopEdit/main.vue')
      },
      {
        // 退租详情页面
        path: '/financeShopEdit2',
        name: 'financeShopEdit2',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `财务编辑: ${route.query.id}`,
          access: [504]
        },
        component: () => import('@/view/shop-page/financeShopEdit2/main.vue')
      },
      {
        // 退租详情页面
        path: '/financeShophandle',
        name: 'financeShophandle',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `财务操作: ${route.query.id}`,
          access: [505]
        },
        component: () => import('@/view/shop-page/financeShophandle/main.vue')
      },
      {
        // 退租详情页面
        path: '/financeShophandle2',
        name: 'financeShophandle2',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `财务操作: ${route.query.id}`,
          access: [506]
        },
        component: () => import('@/view/shop-page/financeShophandle2/main.vue')
      },
      // 等待修改
      {
        path: '/finance_kitchen_expend',
        name: 'finance_kitchen_expend',
        meta: {
          icon: '_huankuan-xianxing ',
          title: '厨房支出',
          access: [507]
        },
        component: () => import('@/view/finance/kitchen-expend/main.vue')
      },
      {
        path: '/finance_kitchen_expend_item',
        name: 'finance_kitchen_expend_item',
        meta: {
          hideInMenu: true,
          icon: '_dianpu',
          title: '新建支出',
          access: [508]
        },
        component: () => import('@/view/finance/expend_item/main.vue')
      },
      {
        path: '/finance_kitchen_expend_item_edit',
        name: 'finance_kitchen_expend_item_edit',
        meta: {
          hideInMenu: true,
          icon: 'md-flower',
          notCache: true,
          title: route => `编辑支出 : ${route.query.id}`,
          access: [509]
        },
        component: () => import('@/view/finance/expend_item_edit/main.vue')
      },
      {
        path: '/finance_wages',
        name: 'finance_wages',
        meta: {
          icon: '_youhuijuan',
          title: '厨房员工工资表',
          access: [510]
        },
        component: () => import('@/view/finance/finance-wages/main.vue')
      },
      {
        path: '/finance_kitchen_bill',
        name: 'finance_kitchen_bill',
        meta: {
          icon: '_jisuanqilishuai-xianxing-xi',
          title: '厨房账单',
          access: [511]
        },
        component: () => import('@/view/finance/kitchen_bill/main.vue')
      },
      // {
      //   path: '/finance_print',
      //   name: 'finance_print',
      //   meta: {
      //     icon: '_jisuanqilishuai-xianxing-xi',
      //     title: '打印',
      //   },
      //   component: () => import('@/view/finance/finance_print/main.vue')
      // }
    ]
  },
  // 配置
  {
    path: '/permission',
    name: 'permission',
    meta: {
      icon: '_yonghuziliao',
      title: '权限操作',
      access: [600]
    },
    component: Main,
    children: [
      {
        path: '/member_list',
        name: 'member_list',
        meta: {
          icon: '_jiaosequnti',
          title: '人员列表',
          access: [601]
        },
        component: () => import('@/view/permission/member_list/main.vue')
      },
      {
        path: '/add_member',
        name: 'add_member',
        meta: {
          icon: '_zhucetianjiahaoyou',
          title: '添加人员',
          access: [602]
        },
        component: () => import('@/view/permission/add_member/main.vue')
      },
      {
        path: '/edit_member',
        name: 'edit_member',
        meta: {
          icon: '_zhucetianjiahaoyou',
          hideInMenu: true,
          title: route => `编辑信息 : ${route.query.id}`,
          access: [603]
        },
        component: () => import('@/view/permission/edit_member/main.vue')
      },
      {
        path: '/permission_list',
        name: 'permission_list',
        meta: {
          icon: '_liebiaoshitucaidan',
          title: '权限列表',
          access: [604]
        },
        component: () => import('@/view/permission/permission_list/main.vue')
      },
      {
        path: '/add_permission',
        name: 'add_permission',
        meta: {
          icon: '_yonghuziliao-xianxing',
          title: '添加权限组',
          access: [605]
        },
        component: () => import('@/view/permission/add_permission/main.vue')
      },
      {
        path: '/edit_permission',
        name: 'edit_permission',
        meta: {
          hideInMenu: true,
          icon: '_qianshoushenpitongguo',
          notCache: true,
          title: route => `编辑权限 : ${route.query.id}`,
          access: [606]
        },
        component: () => import('@/view/permission/edit_permission/main.vue')
      },
      {
        path: '/order_config',
        name: 'order_config',
        meta: {
          icon: '_ziyuan',
          title: '工单配置',
          access: [607]
        },
        component: () => import('@/view/permission/order_config/main.vue')
      },
    ]
  },
  // 401
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  // 500
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  // 404
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
