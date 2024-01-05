const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]

const mainPage = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    meta: {
      title: ''
    },
    children: [
      {
        path: '',
        redirect: 'courseRegist'
      },
      {
        path: 'courseRegist',
        name: 'courseRegist',
        component: () =>
            import(
              '../pages/main/routes/courseRegist'
            ),
        meta: {
          title: '培训课程报名',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [
          {
            path: '',
            redirect: 'registIndex'
          },
          {
            path: 'registIndex',
            name: 'registIndex',
            component: () =>
              import('../pages/main/routes/courseRegist/registIndex'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },
          {
            path: 'registIndex',
            name: 'registIndex',
            component: () =>
              import('../pages/main/routes/courseRegist/registIndex'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },

          {
            path: 'courseDetail',
            name: 'courseDetail',
            component: () =>
              import('../pages/main/routes/courseRegist/courseDetail'),
            meta: {
              title: '省级以上培训计划详情',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          }

        ]
      },
      {
        path: 'supportMaterials',
        name: 'supportMaterials',
        component: () =>
            import(
              '../pages/main/routes/supportMaterials'
            ),
        meta: {
          title: '省级以上培训证明材料',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [
          {
            path: '',
            redirect: 'beyondProvience'
          },
          {
            path: 'beyondProvience',
            name: 'beyondProvience',
            component: () =>
              import('../pages/main/routes/supportMaterials/beyondProvience'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },
          {
            path: 'timeCertification',
            name: 'timeCertification',
            component: () =>
              import('../pages/main/routes/supportMaterials/timeCertification'),
            meta: {
              title: '校级赋能培训计划详情',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          }

        ]
      },
      {
        path: 'courseEvaluation',
        name: 'courseEvaluation',
        component: () =>
            import(
              '../pages/main/routes/courseEvaluation'
            ),
        meta: {
          title: '培训课程评价',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [
          {
            path: '',
            redirect: 'provienceEvaluation'
          },
          {
            path: 'provienceEvaluation',
            name: 'provienceEvaluation',
            component: () =>
              import('../pages/main/routes/courseEvaluation/provienceEvaluation'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },
          {
            path: 'provienceDetail',
            name: 'provienceDetail',
            component: () =>
              import('../pages/main/routes/courseEvaluation/provienceDetail'),
            meta: {
              title: '省级及以上培训计划详情',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },
          {
            path: 'collegeDetail',
            name: 'collegeDetail',
            component: () =>
              import('../pages/main/routes/courseEvaluation/collegeDetail'),
            meta: {
              title: '校级及以上培训计划详情',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },
          {
            path: 'schoolDetail',
            name: 'schoolDetail',
            component: () =>
              import('../pages/main/routes/courseEvaluation/schoolDetail'),
            meta: {
              title: '院级及以上培训计划详情',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          }

        ]
      },
      {
        path: 'signRecord',
        name: 'signRecord',
        component: () =>
            import(
              '../pages/main/routes/signRecord'
            ),
        meta: {
          title: '校级培训签到记录',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [
          {
            path: '',
            redirect: 'recordIndex'
          },
          {
            path: 'recordIndex',
            name: 'recordIndex',
            component: () =>
              import('../pages/main/routes/signRecord/recordIndex'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          }
        ]
      },
      {
        path: 'timeStatistics',
        name: 'timeStatistics',
        component: () =>
            import(
              '../pages/main/routes/timeStatistics'
            ),
        meta: {
          title: '培训学时统计',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [
          {
            path: '',
            redirect: 'timeIndex'
          },
          {
            path: 'timeIndex',
            name: 'timeIndex',
            component: () =>
              import('../pages/main/routes/timeStatistics/timeIndex'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          }
        ]
      },
      {
        path: 'planUp',
        name: 'planUp',
        component: () =>
            import(
              '../pages/main/routes/planUp'
            ),
        meta: {
          title: '院级培训计划报送',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [
          {
            path: '',
            redirect: 'upIndex'
          },
          {
            path: 'upIndex',
            name: 'upIndex',
            component: () =>
              import('../pages/main/routes/planUp/upIndex'),
            meta: {
              title: '',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          },
          {
            path: 'upDetail',
            name: 'upDetail',
            component: () =>
              import('../pages/main/routes/planUp/upDetail'),
            meta: {
              title: '上报信息',
              resource: 'dataSearch',
              action: 'menu',
              keepAlive: false
            }
          }

        ]
      },
      {
        path: 'newsLink',
        name: 'newsLink',
        component: () =>
            import('../pages/main/routes/newsLink'),
        meta: {
          title: '',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        },
        children: [

        ]
      },
      {
        path: 'collegeTime',
        name: 'collegeTime',
        component: () =>
              import('../pages/main/routes/collegeTime'),
        meta: {
          title: '上报信息',
          resource: 'dataSearch',
          action: 'menu',
          keepAlive: false
        }
      }

    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]
export default [...loginPage, ...mainPage, ...errorPage]
