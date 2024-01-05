import { canNavigate } from '@/libs/acl/routeProtection'

export default (to, next) => {
  if (canNavigate(to)) {
    return next()
  } else {
    return next({ name: 'forbidden' })
  }
}
