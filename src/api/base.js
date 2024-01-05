import http from '@/tools/http/http'
let isPro = process.env.NODE_ENV === 'production'
let isProInfo = isPro ? '/information-center' : ''

const Service = {
  // 切换岗位
  _switchJob: (jobId) => {
    return http.GET(`./api/base/switchJob/${jobId}`)
  },
  // 查询所有学院
  _findAllCollege: () => {
    return http.GET('./api/base/college/list')
  },
  // 查询所有年级list
  _findAllGrade: () => {
    return http.GET('./api/base/findAllGrade')
  },
  // 查询学院下年级列表
  _findGradeByCollegeSn: (collegeSn) => {
    return http.GET(`./api/base/findGradeByCollegeSn/${collegeSn}`)
  },
  // 根据学院查询专业
  _findMajorByCollegeSn: (collegeSn) => {
    return http.GET(`./api/base/findMajorByCollegeSn/${collegeSn}`)
  },
  // 跟sn查询学生
  _findStudent: (sn) => {
    return http.GET(`./api/base/findStudent/${sn}`)
  },
  // 登出
  _logOut: () => {
    return http.GET(`/logout`)
  },
  // 登陆
  _login: () => {
    return http.GET(`./api/base/login`)
  },
  // todo 测试登录
  _loginTest: (data) => {
    return http.POST(`./api/base/loginTest`, data)
  },
  _getSysTemInfoUsingGET: (data) => {
    return http.GET(`${isProInfo}/xd/config/system/getInfo`)
  }
}
export default Service
