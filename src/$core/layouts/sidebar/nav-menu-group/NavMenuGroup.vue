<template>
  <x-submenu :popper-append-to-body="false" :index="item.group" :key="item.group" v-if="canViewNavMenuGroup(item)">
    <template slot="title">
      <x-icon v-if="item.icon" :icon="item.icon" />
      <span v-if="item.title" slot="title">{{item.title}}</span>
    </template>
    <component
        :is="resolveNavMenuItemComponent(child)"
        v-for="child in item.children"
        :key="child.header || child.title"
        :item="child"
    />
  </x-submenu>
</template>

<script>
import NavMenuLink from '../nav-menu-link/NavMenuLink'
import NavMenuGroup from '../nav-menu-group/NavMenuGroup'
import {resolveNavMenuItemComponent} from '@/$core/layouts/utils'
import { useUtils as useAclUtils } from '@/$core/acl'
import Icon from '@/components/Icon'
import { MenuItem } from 'element-ui'

export default {
  name: 'NavMenuGroup',
  components: {
    NavMenuLink,
    NavMenuGroup,
    'x-icon': Icon,
    'x-menu-item': MenuItem
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { canViewNavMenuGroup } = useAclUtils()

    return {
      resolveNavMenuItemComponent,
      // ACL
      canViewNavMenuGroup
    }
  }
}
</script>

<style scoped>

</style>
