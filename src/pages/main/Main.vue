<template>
  <xd-layout
    theme="dark"
    :logo="logo"
    :sidebar-list="sidebarList"
    :logout="logout"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import Layout from '@/$core/layouts/Layout'
import logo from '@/assets/images/logo-header.png'

export default {
  name: 'Main',
  data() {
    return {
      logo: {
        src: logo,
        alt: '上程数据',
        firstDes: '辅导员培训',
        secondDes: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getSidebarList: 'sidebar/getSidebarList'
    }),
    sidebarList() {
      return this.getSidebarList().main
    }
  },
  methods: {
    logout() {}
  },
  components: {
    'xd-layout': Layout
  }
}
</script>
