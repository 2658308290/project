import types from './types'
export default {
  [types.SET_USER_ID] (state, id) {
    state.id = id
  },
  [types.SET_USER_NAME] (state, name) {
    state.name = name
  },
  [types.SET_USER_TYPE] (state, type) {
    state.type = type
  },
  [types.SET_USER_SN] (state, sn) {
    state.sn = sn
  },
  [types.SET_ROLE_LIST] (state, roleList) {
    state.roleList = roleList
  },
  [types.SET_ROLE_NAME] (state, roleName) {
    state.roleName = roleName
  },
  [types.SET_ROLE_CODE] (state, roleCode) {
    state.roleCode = roleCode
  }
}
