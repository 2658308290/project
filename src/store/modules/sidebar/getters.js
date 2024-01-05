export default {
  getSidebarList: state => () => state.sidebarMap,
  getSidebarTheme: state => theme => state.sidebarTheme[theme]
}
