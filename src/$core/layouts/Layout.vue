<template>
  <div :class="['app-wrapper', {'hideSidebar': collapse}]">
    <x-sidebar
        class="sidebar-container"
        :collapse="collapse"
        :logo="logo"
        :theme="theme"
        :sidebar-list="sidebarList"
        :background-color="sidebarBackgroundColor"
        :text-color="sidebarTextColor"
        :active-text-color="sidebarActiveTextColor">
    </x-sidebar>
    <x-header :collapse-trigger="collapseTrigger"
              :collapse="collapse"
              :logout="logout"
              :userName="userName"
              :roleName="roleName"
              :roleList="roleList">
    </x-header>

    <div class="main-container">

      <breadcrumb class="breadcrumb-container" />
      <div class="layout-content">
        <div>
          <transition name="fade-transverse">
            <router-view></router-view>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Sidebar from './sidebar/Sidebar'
import {mapGetters, mapState} from 'vuex'
import breadcrumb from '@/components/breadcrumb'

export default {
  name: 'xd-layout',
  props: {
    theme: String,
    sidebarList: Array,
    logo: Object,
    logout: Function
  },
  data () {
    return {
      collapse: false
    }
  },
  watch: {
    '$route': function () {
      this.setScrollTop(0)
    }
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      userName: 'user/getUserName',
      getRoleName: 'role/getRoleName',
      getSidebarTheme: 'sidebar/getSidebarTheme'
    }),
    ...mapState({
      roleList: state => state.user.roleList,
      roleName: state => state.user.roleName
    }),
    sidebarBackgroundColor () {
      return this.getSidebarTheme(this.theme).background
    },
    sidebarTextColor () {
      return this.getSidebarTheme(this.theme).text
    },
    sidebarActiveTextColor () {
      return this.getSidebarTheme(this.theme).activeText
    }
  },
  methods: {
    collapseTrigger: function () {
      this.collapse = !this.collapse
    },
    setScrollTop (top) {
      let ref = this.$vuebar.getState(this.$refs['scroll_div'])
      ref.el2.scrollTop = top
    }
  },
  created () {
  },
  components: {
    'x-header': Header,
    'x-sidebar': Sidebar,
    breadcrumb
  }
}

</script>
<style lang="less" scoped>
  @import "../../assets/styles/var";

  .app-wrapper {
    position: relative;
    width: 100%;
    background-color: #f3f5f9;
  }

  .layout-content {
    height: auto;
    padding: 16px;
  }

  .breadcrumb-container {
    padding: 16px 0 0 16px;
  }

</style>
