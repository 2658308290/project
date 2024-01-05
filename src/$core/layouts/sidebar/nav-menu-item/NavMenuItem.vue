<template>
  <div>
    <component
        :is="resolveNavMenuItemComponent(item)"
        v-for="item in items"
        :key="item.header || item.title"
        :item="item"
    />
  </div>
</template>

<script>
import NavMenuLink from '../nav-menu-link/NavMenuLink'
import NavMenuGroup from '../nav-menu-group/NavMenuGroup'
import {resolveNavMenuItemComponent} from '@/$core/layouts/utils'

export default {
  name: 'NavMenuItem',
  components: {
    NavMenuLink,
    NavMenuGroup
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    return {
      resolveNavMenuItemComponent
    }
  }
}
</script>

<style scoped>

</style>
