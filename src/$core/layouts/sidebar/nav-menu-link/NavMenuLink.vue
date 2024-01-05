<template>
  <x-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}" :key="item.path" v-if="canViewNavMenuLink(item)">
    <x-icon v-if="item.icon" :icon="item.icon"/>
    <span v-if="item.title" slot="title">{{item.title}}</span>
  </x-menu-item>
</template>

<script>
import {MenuItem} from 'element-ui'
import Icon from '@/components/Icon'
import { useUtils as useAclUtils } from '@/$core/acl'

export default {
  name: 'NavMenuLink',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'x-menu-item': MenuItem,
    'x-icon': Icon
  },
  setup (props) {
    const { canViewNavMenuLink } = useAclUtils()

    return {
      canViewNavMenuLink
    }
  }
}
</script>

<style scoped>

</style>
