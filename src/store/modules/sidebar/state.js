export default {
  sidebarMap: {
    main: [
      // {
      //   path: '/main/courseRegist',
      //   title: '培训课程报名',
      //   icon: 'icon-face',
      //   action: 'menu',
      //   resource: 'subsidizeRecord'
      // },
      // {
      //   path: '/main/supportMaterials',
      //   title: '省级培训证明材料',
      //   icon: 'icon-face',
      //   action: 'menu',
      //   resource: 'subsidizeRecord'
      // },
      // {
      //   path: '/main/courseEvaluation',
      //   title: '培训课程评价',
      //   icon: 'icon-face',
      //   action: 'menu',
      //   resource: 'subsidizeRecord'
      // },
      // {
      //   path: '/main/signRecord',
      //   title: '校级培训签到记录',
      //   icon: 'icon-face',
      //   action: 'menu',
      //   resource: 'subsidizeRecord'
      // },
      // {
      //   path: '/main/timeStatistics',
      //   title: '培训学时统计',
      //   icon: 'icon-face',
      //   action: 'menu',
      //   resource: 'subsidizeRecord'
      // }
      // pc学院角色
      {
        path: '/main/planUp',
        title: '院级计划报送',
        icon: 'icon-face',
        action: 'menu',
        resource: 'subsidizeRecord'
      },
      {
        path: '/main/newsLink',
        title: '院级培训新闻链接',
        icon: 'icon-face',
        action: 'menu',
        resource: 'subsidizeRecord'
      },
      {
        path: '/main/collegeTime',
        title: '本院培训学时统计',
        icon: 'icon-face',
        action: 'menu',
        resource: 'subsidizeRecord'
      }

    ]
  },
  sidebarTheme: {
    dark: {
      background: 'transparent',
      text: 'rgba(255,255,255,0.85)',
      activeText: 'rgba(255, 255, 255, 1)'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
