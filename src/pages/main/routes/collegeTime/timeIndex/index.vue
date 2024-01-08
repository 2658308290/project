<template>
  <div class="timeIndex">
    <div class="my-search-box">
      <search
        :base-api="baseApi"
        :fields="fields"
        @search="search"
        @reset="reset"
      >
        <template v-slot:search>
          <div class="title">
            全校各学院平均
            <div class="blue">6</div>
            个学时
          </div>
          <el-input
            v-model="queryParam.key"
            placeholder="请输入学生姓名/工号查询"
            size="small"
            :style="{ width: '300px' }"
          ></el-input>
        </template>
      </search>
    </div>
    <stable ref="table" :fields="provienceField" :data="loadData" showIndex>
    </stable>
  </div>
</template>

<script>
import search from '@/components/search/search'
import stable from '@/components/stable'
import lists from '@/mixin/lists'
export default {
  name: 'timeIndex',
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
        { label: '培训类型', prop: 'sn' },
        { label: '培训主题', prop: 'college' },
        { label: '培训开始时间', prop: 'startTime' },
        { label: '培训结束时间', prop: 'endTime' },
        { label: '培训材料截至上传时间', prop: 'deadline' }
      ],
      activeName: 'provience'
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
.timeIndex {
  padding-left: 16px;
  padding-top: 5px;
  background: #ffffff;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #000000e6;
  font-size: 16px;
  font-weight: 600;
  margin-right: 1200px;
  .blue {
    color: #006dff;
    font-size: 16px;
    font-weight: 500;
  }
}
/deep/.action-bar .action-bar-right {
  justify-content: left;
  width: 100%;
}
/deep/ .action-bar .el-button--small {
  padding: 10px 20px;
  border: 1px solid #1975cb;
}

/deep/.action-bar .action-bar-left {
  margin-right: 0px;
}
</style>

<style>
.el-table th.el-table__cell {
  background-color: #f3f3f3;
  font-weight: 400;
  font-size: 14px;
  color: #00000099;
  line-height: 22px;
}
.el-tabs__item {
  width: 124px;
  height: 32px;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  text-align: center;
  line-height: 22px;
}
.el-tabs__item.is-active {
  font-weight: 700;
  font-size: 14px;
  color: #2769db;
  line-height: 22px;
}
.el-tabs__active-bar {
  background-color: #2769db;
}
.el-table::before {
  height: 0px;
}
.action-bar {
  justify-content: flex-start;
}
</style>
