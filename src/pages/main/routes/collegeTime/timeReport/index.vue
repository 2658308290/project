<template>
  <div class="timeIndex">
    <div class="top">
      <div class="top_left">
        <div class="topimg"></div>
        <div class="top_desc">
          <div
            class=""
            style="color: #191919;
 font-size: 14px;
 font-weight: 400;
 line-height: 22px;
 margin-right: 80px;
 margin-top: 10px;"
          >
            <div
              style="padding-left: 8px; display: flex; flex-direction: row; margin-bottom: 10px;"
            >
              培训组织人:
              <div
                style="padding-left: 8px; color: #5d5e5d;
 font-size: 14px;
 font-weight: 400;
 line-height: 22px;
"
              >
                刘晓东
              </div>
            </div>
            <div style="padding-left: 8px; display: flex; flex-direction: row;">
              所在校单位:
              <div
                style="padding-left: 8px; color: #5d5e5d;
 font-size: 14px;
 font-weight: 400;
 line-height: 22px;"
              >
                学工部
              </div>
            </div>
          </div>
          <div
            class=""
            style="margin-left: 18px; color: #191919;
 font-size: 14px;
 font-weight: 400;
 line-height: 22px;
 margin-right: 80px;
 margin-top: 10px;"
          >
            <div
              style="padding-left: 8px; display: flex; flex-direction: row; margin-bottom: 10px;"
            >
              工号:
              <div
                style="padding-left: 8px; color: #5d5e5d;
 font-size: 14px;
 font-weight: 400;
 line-height: 22px;"
              >
                10001
              </div>
            </div>
            <div style="padding-left: 8px; display: flex; flex-direction: row;">
              联系电话:
              <div
                style="padding-left: 8px; color: #5d5e5d;
 font-size: 14px;
 font-weight: 400;
 line-height: 22px;"
              >
                15678999009
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top_right">
        <el-button
          :style="{
            marginRight: '24px',
            border: 'none'
          }"
          type="primary"
          >导出报告</el-button
        >
      </div>
    </div>
    <div class="container">
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
  </div>
</template>

<script>
import search from '@/components/search/search'
import stable from '@/components/stable'
import lists from '@/mixin/lists'
export default {
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
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
  padding-top: 5px;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding-left: 16px;
    padding-bottom: 16px;
    .top_left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .topimg {
        width: 72px;
        height: 72px;
        margin: 16px 0px 0px 0px;
        border-radius: 5px;
        margin-right: 23px;
        background: url('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
        background-size: contain;
        background-repeat: no-repeat;
      }
      .top_desc {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .desc_left {
          display: flex;
          flex-direction: column;
          margin-right: 84px;
          .desc_up {
          }
        }
        .desc_right {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .top_right {
    }
  }

  .container {
    padding-left: 16px;
    background: #ffffff;
  }
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
/deep/.action-bar .action-bar-right {
  margin-top: 18px;
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
