import ability from './ability'

const whiteList = ['/', 'notFound', 'login', 'forbidden', 'badGateway']

export const canNavigate = to => to.matched.some(route => {
  return whiteList.includes(route.name) || whiteList.includes(route.path) ||
      (to.path === route.path && (route.meta.action === undefined && route.meta.resource === undefined)) ||
      (route.meta.resource !== undefined && ability.can(route.meta.action || 'menu', route.meta.resource)) ||
      (route.meta.resourceGroup && route.meta.resourceGroup.some(resource => ability.can(route.meta.action || 'menu', resource)))
})

export const isInWhiteList = to => to.matched.some(route => whiteList.includes(route.name) || whiteList.includes(route.path))

export const _ = undefined
