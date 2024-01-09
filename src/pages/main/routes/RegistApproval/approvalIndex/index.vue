<template>
  <div class="beyondProvience">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="省级及以上培训" name="provience"></el-tab-pane>
      <el-tab-pane label="校级赋能培训" name="college"></el-tab-pane>
      <el-tab-pane label="院级强基培训" name="school"></el-tab-pane>
    </el-tabs>

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
    <el-button type="primarry" @click="open">培训审批测试按钮</el-button>
    <stable
      v-show="activeName === 'provience'"
      ref="table"
      :fields="provienceField"
      :data="loadData"
      showIndex
    >
    </stable>

    <stable
      v-show="activeName === 'college'"
      ref="table"
      :fields="collegeField"
      :data="loadData"
      showIndex
    ></stable>
    <stable
      v-show="activeName === 'school'"
      ref="table"
      :fields="schoolField"
      :data="loadData"
      showIndex
    ></stable>
    <div class="college_notread">10</div>
    <div class="school_notread">10</div>
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
      activeName: 'provience'
    }
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
      console.log(this.activeName)
    },
    open() {
      this.$confirm('请选择是否同意？', '培训审批', {
        confirmButtonText: '同意报名',
        cancelButtonText: '不同意报名'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '报名成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '不同意报名'
          })
          this.open2()
        })
    },
    open2() {
      const h = this.$createElement
      this.$msgbox({
        title: '不同意报名理由',
        message: h(
          'div',
          {
            attrs: {
              class: 'el-textarea'
            }
          },
          [
            h('textarea', {
              attrs: {
                placeholder: '请输入不同意报名理由',
                class: 'el-textarea__inner',
                autocomplete: 'off',
                rows: 5,
                id: 'commentContent'
              },
              value: this.commentContent,
              on: { input: this.onCommentInputChange }
            }),
            h('div', {
              attrs: {
                placeholder: '请输入不同意报名理由',
                class: 'el-subtitle',
                autocomplete: 'off',
                rows: 1,
                id: 'subtitleContent',
                style: 'resize: none'
              },
              style: 'resize: none',
              value: this.commentContent,
              on: { input: this.onCommentInputChange }
            }),
            h('i', { style: 'color: teal' }, '不同意报名理由')
          ]
        ),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            // 点击确定 要做的事情
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'message'
        })
      })
    },
    // 监听输入框值
    onCommentInputChange() {
      this.commentContent = document.getElementById('commentContent').value
    }
  },
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
  padding-top: 29px;
  background: #ffffff;
  .college_notread {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 132px;
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
    top: 132px;
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
