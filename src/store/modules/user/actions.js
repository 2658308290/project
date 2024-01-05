import {_getUserInfo, mockLogin} from '@api/user'
import types from './types'
import Vue from 'vue'

export default {
  async fetchUserInfo ({ commit }) {
    let res = await _getUserInfo()
    if (!res.data) {
      const login = {
        sn: '09903',
        name: '测试',
        roleCode: '002',
        roleName: '学校用户',
        roleList: [
          {id: 89,
            name: '思政专项辅导员',
            roleCode: 'a0jy',
            permissions: [
              {pid: 1, subject: 'common', action: 'common'}
            ]
          },
          {id: 6,
            name: '学校用户',
            roleCode: '002',
            permissions: [
              {pid: 1, subject: 'common', action: 'common'}
            ]
          },
          {id: 4,
            name: '辅导员',
            roleCode: 'fdy1',
            permissions: [
              {pid: 1, subject: 'common', action: 'common'}
            ]
          },
          {id: 11719,
            name: '阅卷评委',
            roleCode: 'PmGo',
            permissions: [
              {pid: 1, subject: 'common', action: 'common'}
            ]
          },
          {id: 3,
            name: '院系管理员',
            roleCode: 'yx01',
            permissions: [
              {pid: 1, subject: 'common', action: 'common'}
            ]
          }
        ],
        permissions: [
        ]
      }
      await mockLogin(login)
      res = await _getUserInfo()
    }

    if (res.ok && res.data) {
      const data = res.data
      commit(types.SET_USER_NAME, data.name)
      commit(types.SET_USER_SN, data.sn)
      commit(types.SET_USER_TYPE, 1)
      commit(types.SET_ROLE_NAME, data.roleName)
      commit(types.SET_ROLE_LIST, data.roleList)
      commit(types.SET_ROLE_CODE, data.roleCode)

      const validAbility = [

      ]

      validAbility.push(...res.data.permissions)

      Vue.prototype.$ability.update(validAbility)
    }
    return res
  }
}
