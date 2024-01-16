<template>
  <div class="beyondProvience">
    <search
      :base-api="baseApi"
      :fields="fields"
      @search="search"
      @reset="reset"
    >
      <template v-slot:search>
        <el-input
          v-model="input"
          placeholder="请输入姓名或工号关键字查询"
          :style="{ width: '224px' }"
        ></el-input>
      </template>
    </search>
    <el-button class="controlBtn" type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >

    <el-dialog title="培训审批" :visible.sync="dialogVisible" width="30%">
      <el-dialog
        width="30%"
        title="不同意报名理由"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div>
          <div
            style="color: #000000e6;
   font-size: 14px;
   font-weight: 600;
   line-height: 22px;
   margin-bottom: 8px;"
          >
            <span style="color: red;">*</span>不同意报名理由
          </div>
          <el-input
            type="textarea"
            rows="6"
            placeholder="请说明不同意报名理由"
          ></el-input>
        </div>
        <span slot="footer" class="innercancel">
          <el-button
            type="primary"
            @click=";(innerVisible = false), (dialogVisible = false)"
            >提交</el-button
          >
          <el-button @click="innerVisible = false">取消</el-button>
        </span>
      </el-dialog>
      <span>请选择是否同意</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >同意报名</el-button
        >
        <el-button @click="innerVisible = true">不同意报名</el-button>
      </span>
    </el-dialog>

    <stable ref="table" :fields="provienceField" :data="loadData" showIndex>
    </stable>
  </div>
</template>
<script>
import search from '@/components/search/search'
import stable from '@/components/stable'
import lists from '@/mixin/lists'
export default {
  name: 'beyondProvience',
  mixins: [lists],
  data() {
    return {
      baseApi: '',
      listApi: './api/subsidize-record/list',
      queryParam: {
        fundingType: this.fundingType,
        schoolYear: '',
        college: '',
        grade: '',
        major: '',
        key: ''
      },
      provienceField: [
        { label: '姓名', prop: 'sn' },
        { label: '工号', prop: 'college' },
        { label: '培训主题', prop: 'startTime' },
        { label: '申请时间', prop: 'endTime' },
        { label: '操作', prop: 'deadline' }
      ],
      collegeField: [
        { label: '姓名', prop: 'sn' },
        { label: '工号', prop: 'college' },
        { label: '培训主题', prop: 'startTime' },
        { label: '申请时间', prop: 'endTime' },
        { label: '操作', prop: 'deadline' }
      ],
      schoolField: [
        { label: '姓名', prop: 'sn' },
        { label: '工号', prop: 'college' },
        { label: '培训主题', prop: 'startTime' },
        { label: '申请时间', prop: 'endTime' },
        { label: '操作', prop: 'deadline' }
      ],

      dialogVisible: false,
      innerVisible: false
    }
  },
  created() {},
  methods: {},
  components: {
    stable,
    search
  }
}
</script>

<style lang="less" scoped>
.beyondProvience {
  width: 100%;
  height: 100%;
  padding-left: 16px;
  padding-top: 2px;
  background: #ffffff;
  .college_notread {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 147px;
    left: 515px;
    z-index: 5;
    width: 24px;
    height: 16px;
    background: #e34d59;
    border-radius: 8px;
    font-weight: 400;
    font-size: 12px;
    color: #ffffffe6;
    line-height: 20px;
  }
  .school_notread {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 147px;
    left: 650px;
    z-index: 5;
    width: 24px;
    height: 16px;
    background: #e34d59;
    border-radius: 8px;
    font-weight: 400;
    font-size: 12px;
    color: #ffffffe6;
    line-height: 20px;
  }
}
/deep/ .action-bar .action-bar-right {
  margin-right: 16px;
  flex-wrap: nowrap;
}
/deep/ .action-bar .el-button--small,
.action-bar .el-button--small.is-round {
  padding: 10px 22px;
}
/deep/.el-dialog__footer {
  text-align: center;
  padding: 20px 20px 20px;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #e7e7e7;
  padding: 15px 20px 10px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 16px;
  color: #000000e6;
  line-height: 24px;
}
/deep/ .el-dialog__body {
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  border-bottom: 1px solid #e7e7e7;
}
/deep/.el-textarea__inner {
  resize: none;
}
/deep/ .innercancel > .el-button + .el-button {
  color: #000000e6;
  background-color: #e7e7e7;
}
</style>
<style>
.el-table th.el-table__cell {
  background-color: #f3f3f3;
}
.el-tabs__item {
  width: 124px;
  height: 32px;
  font-weight: 600;
  font-size: 14px;
  color: #00000099;
  text-align: center;
  line-height: 22px;
}
.el-tabs__item.is-active {
  font-weight: 700;
  font-size: 14px;
  color: #166aff;
  line-height: 22px;
}
.el-tabs__active-bar {
  background-color: #166aff;
}
.el-table::before {
  height: 0px;
}
</style>
