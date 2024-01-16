<template>
  <div v-if="alertBox === '1'" class="alert_box" @click="hidden">
    <div @click.stop="" class="contentBox">
      <div class="title">
        <div>培训审批</div>
        <div @click="changeAlertBox">×</div>
      </div>
      <div class="text">请选择是否同意</div>
      <div class="btn">
        <el-button type="primary">同意报名</el-button>
        <el-button type="primary" plain>不同意报名</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: { alertBox: { type: String, default: '0' } },
  methods: {
    hidden() {
      this.alertBox = '0'
    },
    changeAlertBox() {
      if (this.alertBox === '0') {
        this.alertBox = '1'
        this.$emit('alertBox', this.alertBox)
      } else {
        this.alertBox = '0'
        this.$emit('alertBox', this.alertBox)
      }
      console.log('子组件中的', this.alertBox)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.alert_box {
  position: fixed;
  z-index: 2002;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .contentBox {
    width: 600px;
    height: 200px;
    background: #ffffff;
    box-shadow: 0 5px 5px -3px #0000001a, 0 8px 10px 1px #0000000f,
      0 3px 14px 2px #0000000d;
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      height: 56px;
      background: #ffffff;
      padding: 0px 14px;
      font-weight: 600;
      font-size: 16px;
      color: #000000e6;
      line-height: 24px;
      border-bottom: 1px solid #e7e7e7;
    }
    .text {
      display: flex;
      flex-direction: row;
      padding: 0px 15px;
      align-items: center;
      height: 86px;
      font-weight: 400;
      font-size: 16px;
      color: #000000e6;
      border-bottom: 1px solid #e7e7e7;
    }
    .btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 600px;
      height: 56px;
    }
  }
}
</style>
