<template>
  <div class="upDetail">
    <div class="top">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="top_right">
        <div class="text">已为您实时保存数据</div>

        <el-button
          type="primary"
          class=""
          :style="{ width: '84px', height: '36px', marginRight: '8px' }"
          >确认发布</el-button
        >
        <el-button
          type="primary"
          class=""
          :style="{ width: '84px', height: '36px' }"
          plain
          >保存草稿</el-button
        >
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
        <div class="title" style="margin-top: 3px;">培训类型</div>
        <div class="chooseBox">
          <div class="up">
            <el-radio v-model="btn_choose" label="provience"
              >省级及以上培训</el-radio
            >
            <el-radio v-model="btn_choose" label="college"
              >校级赋能培训</el-radio
            >
            <el-radio v-model="btn_choose" label="school"
              >院级强基培训</el-radio
            >
          </div>
          <!-- <div class="btm">
            <el-input
              placeholder="请输入校内培训地点"
              :style="{ width: '510px' }"
            >
            </el-input>
          </div> -->
        </div>
      </div>
      <div v-if="btn_choose === 'school'" class="theme row">
        <div class="title">课程内容</div>
        <el-input
          v-model="input1"
          type="textarea"
          rows="5"
          placeholder="请简述主题说明"
          :style="{ width: '510px' }"
        />
      </div>
      <div class="trianTime row">
        <div class="title" style="margin-top: 3px;">培训时间</div>
        <div class="box">
          <div class="up">
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
              <el-select
                v-model="endTimeValue"
                placeholder="请选择培训开始时间"
              >
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
          <div v-if="btn_choose === 'provience'" class="down">
            <div style="color: #FD2626;">*</div>
            系统默认站内信通知指定辅导员
          </div>
          <div v-if="btn_choose === 'college'" class="down">
            <div style="color: #FD2626;">*</div>
            系统默认培训开始前一天站内信通知确认参加本次培训的辅导员。
          </div>
        </div>
      </div>
      <div v-if="btn_choose != 'school'" class="trianAdress row">
        <div class="title" style="margin-top: 5px;">
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
      <div v-if="btn_choose === 'college'" class="theme row">
        <div class="title">课程内容</div>
        <el-input
          v-model="input1"
          type="textarea"
          rows="5"
          placeholder="请简述课程内容"
          :style="{ width: '510px' }"
        />
      </div>

      <div v-if="btn_choose != 'school'" class="theme row">
        <div class="title">主讲人</div>
        <el-input
          v-model="input1"
          placeholder="请输入主讲人姓名"
          :style="{ width: '510px' }"
        />
      </div>
      <div class="addTeacher row">
        <div class="title">
          <div v-if="btn_choose != 'school'">添加辅导员</div>
          <div v-else>添加学院学生工作负责人</div>
        </div>
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
                  <el-table-column label="姓名" width="120">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column prop="num" label="工号" width="120">
                  </el-table-column>
                  <el-table-column
                    prop="gender"
                    label="性别"
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
                  <el-table-column label="姓名" width="120">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column prop="num" label="工号" width="120">
                  </el-table-column>
                  <el-table-column
                    prop="gender"
                    label="性别"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="btn">
              <div class="btn_box">
                <el-button icon="el-icon-arrow-left"></el-button>
                <el-button icon="el-icon-arrow-right"></el-button>
              </div>
            </div>
            <div class="teacherAdded teacherBox">
              <div class="title_box title paddingSet">
                <div class="">辅导员名单</div>
                <div class="clear">清空</div>
              </div>

              <div class="teacherAddedBox paddingSet">
                请从左侧添加辅导员
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="btn_choose === 'provience'" class="row">
        <div class="title">
          培训证明&课程评价截止上传时间
        </div>
        <div class="adressBox">
          <div class="up">
            <el-radio v-model="add2" label="勾选添加"></el-radio>
            <el-radio v-model="add2" label="导入模板添加"></el-radio>
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
      add2: '勾选添加',
      btn_choose: 'provience',

      tableData: [
        {
          num: '10009',
          name: '王小虎',
          gender: '男'
        },
        {
          num: '10009',
          name: '王小虎',
          gender: '男'
        },
        {
          num: '10009',
          name: '王小虎',
          gender: '男'
        }
      ],
      tableData2: [
        {
          num: '10009',
          name: '王小虎',
          gender: '男'
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
      width: 250px;
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
      display: flex;
      flex-direction: row;
      align-items: start;
      .title {
      }
    }
    .upDepartment {
      display: flex;
      flex-direction: row;
      align-items: start;
      .title {
      }
      .chooseBox {
        display: flex;
        flex-direction: column;
      }
    }
    .trianTime {
      display: flex;
      flex-direction: row;
      align-items: start;
      .title {
      }
      .box {
        .up {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 510px;
          .last {
            font-weight: 500;
            font-size: 14px;
            color: #000000e6;
            line-height: 22px;
          }
        }
        .down {
          margin-top: 8px;
          display: flex;
          flex-direction: row;
          color: #7a7a7a;
          font-size: 12px;
          font-weight: 400;
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
          display: flex;
          flex-direction: column;
          width: 56px;
          align-items: center;
          justify-content: center;
          .btn_box {
          }
        }
        .teacherAdded {
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
          .title_box {
            display: flex;
            justify-content: space-between;
            .clear {
              color: #1696ffdc;
              cursor: pointer;
            }
          }
          .teacherAddedBox {
            display: flex;
            justify-content: center;
            height: 100%;
            padding-top: 40%;
          }
        }
      }
    }
  }
}
/deep/.el-textarea__inner {
  padding: 5px 10px;
  resize: none;
}
/deep/ .top_right .el-button {
  padding: 0px 0px;
}
/deep/.el-table th.is-leaf {
  background-color: #f3f3f3;
}
/deep/ .el-table .el-table__cell {
  padding: 8px 0px;
}

/deep/ .btn .el-button {
  width: 26px;
  height: 26px;
  padding: 10px;
  border-radius: 3px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0px;
}
/deep/ .btn .el-button:focus,
.el-button:hover {
  border: 1px solid #166aff;
}
/deep/.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
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
