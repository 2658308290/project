<template>
  <div class="gradient-blue-btn" @click="clickAction">
    <i class="el-icon-plus" v-if="iconShow"></i>
    <span :style="{marginLeft:'5px'}">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'gradientBlueBtn',
  props: {
    text: {
      type: String,
      default: ''
    },
    iconShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    clickAction () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.gradient-blue-btn {
  font-size: 14px;
  color: #ffffff;
  width: 120px;
  height: 36px;
  border-radius: 5px;
  background: linear-gradient(130.33deg, #31efed 0%, #236cff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
