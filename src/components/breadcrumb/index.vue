<template>
  <div class="breadcrumb-box">
    <div
      class="arrow-back-box"
      @click="$router.go(-1)"
      v-if="showBack"
    >
      <el-image
        class="arrow-back"
        :src="require('@/assets/images/pages/arrow_back.png')"
      />
    </div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="item.path"
          >
            <span
              v-if="
                item.redirect === 'noRedirect' || index == levelList.length - 1
              "
              class="no-redirect"
              >{{ item.meta.title }}</span
            >
            <a v-else @click.prevent="handleLink(item)">{{
              item.meta.title
            }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]

      if (!this.isDashboard(first)) {
        // matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      let levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
      // if (levelList.length > 1) {
      //   levelList.shift()
      // }
      this.levelList = levelList
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      )
    },
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  },
  computed: {
    showBack () {
      const levelList = this.levelList
      if (!levelList.length) {
        return false
      }
      if (levelList.length > 1) {
        return true
      }
      const showBack = levelList[levelList.length - 1].meta.showBack || false
      return showBack
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
  .no-redirect {
    color: #808080;
    cursor: text;
  }
}
.breadcrumb-box {
  display: flex;
  align-items: center;
  padding-left: 16px;
}
.arrow-back-box {
  height: 15px;
  padding-right: 12px;
  margin-right: 12px;
  border-right: 1px solid #979797;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.arrow-back {
  width: 24px;
  height: 24px;
}
</style>
