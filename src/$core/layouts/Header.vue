<template>
  <div class="header">
    <div class="header-right">
      <div class="header-name-avatar" v-if="avatarName">
        {{ avatarName }}
      </div>
      <div class="header-name" v-if="userName">
        {{ userName }}({{ roleName }})
      </div>
      <el-dropdown @command="handleUserDropMenuCommand">
        <div>
          <div class="swap"><i class="el-icon-sort"></i>切换</div>
          <el-dropdown-menu slot="dropdown" class="drop-item">
            <el-dropdown-item
              v-for="(item, index) in roleList"
              :key="index"
              :command="item.roleCode"
              >{{ userName }}({{ item.name }})</el-dropdown-item
            >
          </el-dropdown-menu>
        </div>
      </el-dropdown>
    </div>
    <div class="header-left" @click="goHome">
      <div class="back">
        返回门户
        <div class="arrow-box">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { Tooltip } from 'element-ui'
import avatarUrl from '@/assets/images/logo.png'
import { changeCurrentRole } from '@/api/user.js'

export default {
  name: 'xd-header',
  props: {
    collapseTrigger: Function,
    collapse: Boolean,
    logout: Function,
    userName: String,
    roleName: String,
    roleList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      avatarUrl
    }
  },
  created () {},
  computed: {
    avatarName () {
      return (this.userName && this.userName.length) > 1
        ? this.userName.substring(0, 1)
        : null
    }
  },
  components: {
    'xd-icon': Icon,
    'xd-tooltip': Tooltip
  },
  methods: {
    handleUserDropMenuCommand (command) {
      changeCurrentRole(command).then((res) => {
        if (res.ok) {
          this.$message({
            message: '角色切换成功！',
            type: 'success'
          })
          const name = this.roleList.find((item, index) => {
            return item.roleCode === command
          }).name
          this.$store.commit('user/SET_ROLE_NAME', name)
          this.$router.replace({ path: '/' })
          setTimeout(() => {
            this.$router.go(0)
          }, 300)
        } else {
          this.$message.warning('系统繁忙，请稍后再试!')
        }
      })
    },
    goHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/var";

.back {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 77px;
  height: 22px;
  border-radius: 11px;
  background: #fff;
  border: 0.5px solid #05237b;
  color: #05237b;
  font-size: 12px;

  .arrow-box {
    width: 12px;
    height: 12px;
    border: 1px solid #05237b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;

    i {
      font-size: 12px;
      color: #05237b;
      font-weight: bold;
      transform: scale(0.7);
    }
  }
}

.swap {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 18px;
  border-radius: 9px;
  background: #fff;
  border: 0.5px solid #05237b;
  color: #05237b;
  font-weight: 400;
  font-size: 12px;

  i {
    font-size: 10px;
    color: #05237b;
    transform: rotate(90deg);
    margin-right: 3px;
  }
}

.header {
  /* center the image */
  background: #ffffff;
  background-size: cover;
  /* cover the entire window */
  height: 84px !important;
  padding: 0 36px 0 25px;
  line-height: 59px;
  box-sizing: border-box;
  border-bottom: 1px solid @borderBottomColor;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: calc(~"100% -" @sidebarWidth-lg);
  z-index: 2000;
  right: 0;
  > span {
    vertical-align: middle;
  }

  .header-avatar {
  }

  .header-title {
    margin-left: 10px;
    font-weight: 500;
    font-size: 28px;
    color: #ffffff;
  }

  &-logo {
    width: 40px;
    height: 40px;
  }

  &-left {
    display: flex;
    align-items: center;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }
}

.header-right {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon {
  font-size: 22px;
  color: inherit;
  outline: none;
  display: inline-block;
  text-decoration: none;
  vertical-align: top;

  &:hover {
    color: @dch;
  }
}

.header-logout {
  .header-icon;
  .text-center;
  font-size: 14px;
  margin-left: 10px;
  line-height: normal;

  &:hover {
    color: red;
  }
}

.text-center {
  vertical-align: middle;
}

.drop-img {
  border: 2px solid transparent;

  :hover {
    border: #2c66e7 solid 2px;
    cursor: pointer;
  }
}

.header-name {
  font-weight: 400;
  font-size: 16px;
  color: #1a1a1a;
  margin-right: 10px;
}

.header-name-avatar {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  margin-right: 7px;
  background-color: #3e6ae3;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
