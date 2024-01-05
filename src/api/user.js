import http from '@http/http'

export const _getUserInfo = (errMsg) =>
  http.GET('./api/auth/getLoginUser', {}, errMsg)
export const mockLogin = (query) => http.POST('/api/auth/mock-login', query)
// 角色切换
export const changeCurrentRole = (arg) =>
  http.GET(`./api/auth/role/switch/` + arg, {})
