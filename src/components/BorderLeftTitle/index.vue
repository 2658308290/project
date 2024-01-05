<template>
  <div class="border-left-title">
    <template v-if="iconType === 1">
      <div>
        <div />
        <div />
        <div />
      </div>
    </template>
    <template v-else-if="iconType===2">
        <img class="title-icon-img" src="@/assets/images/border_icon2@2x.png" />
    </template>
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'BorderLeftTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    iconType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.border-left-title {
  display: flex;
  align-items: center;
  padding: 12px 0;
  .title-icon-img{
    width: 25px;
    height: 17px;
  }
  > div:nth-child(1) {
    display: flex;
    align-items: flex-end;
    > div {
      & + div {
        margin-left: 4px;
      }
    }
    > div:nth-child(1) {
      width: 5px;
      height: 20px;
      border-radius: 2.5px;
      background: #256eff;
    }
    > div:nth-child(2) {
      width: 5px;
      height: 13px;
      border-radius: 2.5px;
      background: #03d1cf;
    }
    > div:nth-child(3) {
      width: 5px;
      height: 8px;
      border-radius: 2.5px;
      background: #ffa917;
    }
  }
  > div:nth-child(2) {
    font-weight: 700;
    font-size: 16px;
    color: #333;
    padding-left: 6px;
    display: flex;
    align-items: flex-end;
    line-height: normal;
  }
}
</style>
