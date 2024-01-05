export const resolveNavMenuItemComponent = item => {
  if (item.children && item.children.length) return 'nav-menu-group'
  return 'nav-menu-link'
}
