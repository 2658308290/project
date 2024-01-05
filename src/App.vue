<template>
  <div id="app">

    <!-- <keep-alive :include="keepAliveComponents">
      <router-view />
    </keep-alive> -->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      keepAliveComponents: (state) => state.routecache.keepAliveComponents
    })
  }
}
</script>
