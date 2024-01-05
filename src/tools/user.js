import store from '@/store/index'

export const getUserSn = () => {
  return store.state.user.sn
}

export const getUserRole = () => {
  return store.state.user.roleCode
}
