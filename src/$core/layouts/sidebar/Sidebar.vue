<template>
  <div class="po">
    <div id="sidebar-logo" class="sidebar-logo" :style="{backgroundColor: theme === 'light' ? '#ffffff' : ''}">
      <div class="sidebar-logo-png">
        <img :src="logo.src" :alt="logo.alt"/>
      </div>
      <transition name="fade" :duration="300">
        <div v-if="!collapse" class="sidebar-logo-title">
          {{logo.firstDes}}
        </div>
      </transition>
      <transition name="fade" :duration="300">
        <div v-if="logo.secondDes" class="sidebar-logo-version">
          {{logo.secondDes}}
        </div>
      </transition>
    </div>
    <vue-perfect-scrollbar :settings="perfectScrollbarSettings" tagname="ul" class="main-menu-content scroll-area">
      <xd-menu mode="vertical"
               :default-active="defaultActive"
               :collapse="collapse"
               :background-color="backgroundColor"
               :text-color="textColor"
               :active-text-color="activeTextColor"
               @select="handleMenuSelect">
        <nav-menu-item :items="sidebarList"/>
       <xd-sidebar-item :sidebar-list="sidebarList"/>
      </xd-menu>

    </vue-perfect-scrollbar>

  </div>

</template>
<script>
import {Menu} from 'element-ui'
import {_isArrayFn} from '@/tools/utils'
import SideBarScroll from './SideBarScroll'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import NavMenuItem from './nav-menu-item/NavMenuItem'

export default {
  name: 'xd-navbar',
  props: {
    sidebarList: Array,
    logo: Object,
    collapse: Boolean,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    theme: String
  },
  components: {
    'xd-menu': Menu,
    'xd-side-bar-scroll': SideBarScroll,
    VuePerfectScrollbar,
    NavMenuItem
  },
  setup (props) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false
    }

    return {
      perfectScrollbarSettings
    }
  },
  computed: {
    defaultActive () {
      let pathList = this.getRoutesList()
      let Route = this.$route
      let active = ''
      let urlMap = {}
      Route.matched.forEach(item => {
        urlMap[item.path] = true
      })
      let found = pathList.find(item => urlMap[item])
      if (found) {
        active = found
        return active
      }
      pathList.some(item => {
        if (Route.path.indexOf(item) === 0) {
          active = item
          return true
        }
        return false
      })
      return active
    }
  },
  methods: {
    getRoutesList () {
      let pathList = []
      this.findAllPath(this.sidebarList, pathList)
      return pathList
    },
    findAllPath (arr, list) {
      arr.forEach(item => {
        if (_isArrayFn(item.children)) {
          this.findAllPath(item.children, list)
        } else {
          list.push(item.path)
        }
      })
    },
    handleMenuSelect (route) {
      if (route.indexOf('http://') > -1 || route.indexOf('https://') > -1) {
        window.open(route)
      } else {
        this.$router.push(route)
      }
    }
  }
}

</script>
<style scoped>
</style>
