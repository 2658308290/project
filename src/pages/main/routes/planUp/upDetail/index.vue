<template>
  <div class="upDetail">
    <div class="top">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="top_right">
        <div class="text">已为您实时保存数据</div>

        <button class="top_btn">提交审核</button>
      </div>
    </div>

    <div class="container">
      <div class="theme row">
        <div class="title">培训主题</div>
        <el-input
          v-model="input1"
          placeholder="请输入培训主题"
          :style="{ width: '510px' }"
        />
      </div>

      <div class="upDepartment row">
        <div class="title">培训主题</div>
        <el-select
          v-model="value"
          placeholder="请选择"
          :style="{ width: '510px' }"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="trianTime row">
        <div class="title">培训时间</div>
        <div class="box">
          <div>
            <el-select
              v-model="startTimeValue"
              placeholder="请选择培训开始时间"
            >
              <el-option
                v-for="item in startTimeOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <div class="last">至</div>
          <div>
            <el-select v-model="endTimeValue" placeholder="请选择培训开始时间">
              <el-option
                v-for="item in endTimeOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="trianAdress row">
        <div class="title">
          培训地点
        </div>

        <div class="adressBox">
          <div class="up">
            <el-radio v-model="in_out" label="校内培训"></el-radio>
            <el-radio v-model="in_out" label="校外培训"></el-radio>
          </div>
          <div class="btm">
            <el-input
              placeholder="请输入校内培训地点"
              :style="{ width: '510px' }"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="addTeacher row">
        <div class="title">添加辅导员</div>
        <div>
          <div class="up">
            <el-radio v-model="add" label="勾选添加"></el-radio>
            <el-radio v-model="add" label="导入模板添加"></el-radio>
          </div>
          <div class="btm">
            <div class="teacherList teacherBox">
              <div class="title paddingSet">辅导员名单</div>
              <div class="teacherType paddingSet">
                <el-button plain>按辅导员类型</el-button>
                <el-button plain>按辅导员学历</el-button>
                <el-button plain>按辅导员年龄</el-button>
                <el-button plain>按辅导员工作年限</el-button>
              </div>
              <div class="search">
                <el-input
                  v-model="input1"
                  placeholder="请输入辅导员姓名或工号关键词添加"
                  :style="{ width: '468px' }"
                />
              </div>
              <div class="professionalTeacher paddingSet">
                <div class="teacherTitle">专职辅导员(160)</div>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="noprofessionalTeacher">
                <div class="teacherTitle paddingSet">兼职辅导员(60)</div>

                <el-table
                  ref="multipleTable"
                  :data="tableData2"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="btn">
              <el-radio></el-radio>
              <el-radio></el-radio>
            </div>
            <div class="teacherAdded teacherBox">
              <div class="title">
                <div>已添加辅导员</div>
                <div class="clear">清空</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upDetail',
  data() {
    return {
      data: {
        title: '培训编号#202304281007'
      },
      options: [
        {
          value: '艺术学院',
          label: '艺术学院'
        },
        {
          value: '计算机学院',
          label: '计算机学院'
        }
      ],
      startTimeOption: [
        {
          value: '艺术学院',
          label: '艺术学院'
        }
      ],
      endTimeOption: [
        {
          value: '艺术学院',
          label: '艺术学院'
        }
      ],
      startTimeValue: '',
      endTimeValue: '',
      value: '',
      input1: '',
      in_out: '校内培训',
      add: '勾选添加',

      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      tableData2: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
.upDetail {
  background: #ffffff;
  padding: 0px 16px;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
    padding: 10px 0px;
    .title {
      font-weight: 600;
      font-size: 18px;
      color: #000000e6;
    }
    .top_right {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .text {
        font-weight: 400;
        font-size: 14px;
        color: #7c7b7b;
        margin-right: 24px;
      }
      .top_btn {
        padding: 0px 13px;
        background-color: #166aff;
        border-radius: 3px;
        border: 0px;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        line-height: 32px;
      }
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    padding: 15px 0px 0px 0px;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 200px;
    }
    .row {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
      font-weight: 500;
      font-size: 14px;
      color: #000000e6;
    }
    .theme {
      .title {
      }
    }
    .upDepartment {
      .title {
      }
    }
    .trianTime {
      .title {
      }
      .box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 510px;
        div {
        }

        .last {
          font-weight: 500;
          font-size: 14px;
          color: #000000e6;
          line-height: 22px;
        }
      }
    }
    .trianAdress {
      align-items: start;
      .title {
      }
      .adressBox {
        .up {
          margin-bottom: 12px;
        }
        .btm {
        }
      }
    }
    .addTeacher {
      display: flex;
      flex-direction: row;
      align-items: start;
      .title {
      }
      .up {
        padding-bottom: 10px;
      }
      .btm {
        display: flex;
        flex-direction: row;
        .teacherList {
          .paddingSet {
            padding: 0px 9px;
          }
          .title {
            width: 461px;
            font-family: PingFangSC-Regular;
            font-weight: 500;
            font-size: 14px;
            color: #212121;
            padding: 13px;
            border-bottom: 1px solid #dcdcdc;
          }
          .teacherType {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 12px 9px;
          }
          .search {
            display: flex;
            justify-content: center;
            padding: 0px 12px 9px;
          }
          .professionalTeacher {
            padding-bottom: 12px;
            .teacherTitle {
              padding-bottom: 7px;
            }
            div {
            }
          }
          .noprofessionalTeacher {
            padding-bottom: 12px;
            .teacherTitle {
              padding-bottom: 7px;
            }
            div {
            }
          }
        }
        .teacherBox {
          width: 486px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 3px;
        }
        .btn {
        }
        .teacherAdded {
          .title {
            div {
            }
            .clear {
            }
          }
        }
      }
    }
  }
}
/deep/.el-table th.is-leaf {
  background-color: #f3f3f3;
}
/deep/ .el-table .el-table__cell {
  padding: 8px 0px;
}
</style>
<style>
.upDepartment .el-input--suffix .el-input__inner {
  background-color: #f2f2f2e6;
}
.el-input__inner {
  height: 35px;
}
.up .el-radio {
  margin-right: 90px;
}
.teacherType .el-button {
  padding: 10px 7px;
}
</style>
