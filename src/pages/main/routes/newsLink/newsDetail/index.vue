<template>
  <div class="main" :style="{ height: '100%' }">
    <div class="top" :style="{ height: '100%' }">
      <div class="left">
        <el-card
          :body-style="{
            height: '750px',
            borderRadius: '0px',
            color: '#191919',
            lineHeight: '22px'
          }"
          class="courseDetail"
        >
          <div style="borderBottom: 1px solid #D9D9D9;padding-bottom: 16px;">
            <el-row class="demo-avatar demo-basic">
              <el-col :span="2" :style="{ marginRight: '23px' }">
                <el-avatar
                  shape="square"
                  :size="70"
                  :src="circleUrl"
                ></el-avatar>
              </el-col>
              <el-col :span="14">
                <el-row
                  :style="{
                    marginTop: '5px',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '22px'
                  }"
                >
                  <el-col :span="9">
                    <el-row>
                      <el-col :span="12">培训组织人:</el-col>
                      <el-col :style="{ color: '#5D5E5D' }" :span="12">{{
                        detail.name
                      }}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="5">
                    <el-row>
                      <el-col :span="12">公号:</el-col>
                      <el-col :style="{ color: '#5D5E5D' }" :span="12">{{
                        detail.num
                      }}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row
                  :style="{
                    marginTop: '10px',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '22px'
                  }"
                >
                  <el-col :span="9">
                    <el-row>
                      <el-col :span="12">所在校单位:</el-col>
                      <el-col :style="{ color: '#5D5E5D' }" :span="12">{{
                        detail.department
                      }}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="9">
                    <el-row>
                      <el-col :span="10">联系电话:</el-col>
                      <el-col :style="{ color: '#5D5E5D' }" :span="10">{{
                        detail.phone
                      }}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-row
            type="flex"
            justify="start"
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训编号：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.index
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训类型：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.type
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训学院：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.college
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">学院组织人：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.people
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训主题：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.theme
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训说明：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.themeDescription
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训时间：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }"
              >{{ detail.startTime }}至{{ detail.endTime }}</el-col
            >
          </el-row>
          <el-row
            :style="{
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">培训地点：</el-col>
            <el-col :span="10" :style="{ color: '#5D5E5D' }">{{
              detail.adress
            }}</el-col>
          </el-row>
          <el-row
            :style="{
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '22px'
            }"
          >
            <el-col :span="2.5">新闻链接地址：</el-col>
            <el-col :span="6.5"
              ><el-input
                overflow="hidden"
                resize="none"
                :rows="5"
                placeholder="请输入对课程的评价..."
                v-model="textarea"
                :style="{
                  width: '437px',

                  background: '#ffffffe6',
                  borderRadius: '3px'
                }"
              >
              </el-input>
              <el-button
                icon="el-icon-plus"
                :style="{ width: '36px', height: '36px', padding: '0px' }"
              ></el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>

      <div class="right" :style="{ height: '100%' }">
        <el-card class="container" :body-style="{ height: '750px' }">
          <div class="title">
            <div class="title_item">
              <div class="title_blue"></div>
              历史记录
            </div>
            <div class="reverse">
              <el-radio-group v-model="radio1" size="mini">
                <el-radio-button label="正序" class="zx">正序</el-radio-button>
                <el-radio-button label="反序" class="fx">反序</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="history">
            <div class="history_item">
              <div class="dot last">
                <div class="grey_dot"></div>
                <div class="line"></div>
              </div>
              <div class="card">
                <div class="card_left"></div>
                <div class="card_right">
                  <div class="p_name">王晓晨</div>
                  <div class="p_theme">
                    <div class="t_name">"A培训主题"培训</div>
                    <div class="t_index">100900</div>
                    <div class="t_time">2023-09-12 12:09:23</div>
                  </div>
                  <div class="p_status">发布培训</div>
                </div>
              </div>
            </div>
            <div class="history_item">
              <div class="dot last">
                <div class="grey_dot"></div>
                <div class="line"></div>
              </div>
              <div class="card">
                <div class="card_left"></div>
                <div class="card_right">
                  <div class="p_name">王晓晨</div>
                  <div class="p_theme">
                    <div class="t_name">"A培训主题"培训</div>
                    <div class="t_index">100900</div>
                    <div class="t_time">2023-09-12 12:09:23</div>
                  </div>
                  <div class="p_status">发起报名</div>
                </div>
              </div>
            </div>
            <div class="history_item">
              <div class="dot last">
                <div class="grey_dot"></div>
                <div class="line"></div>
              </div>
              <div class="card">
                <div class="card_left"></div>
                <div class="card_right">
                  <div class="p_name">王晓晨</div>
                  <div class="p_theme">
                    <div class="t_name">"A培训主题"培训</div>
                    <div class="t_index">100900</div>
                    <div class="t_time">2023-09-12 12:09:23</div>
                  </div>
                  <div class="p_status">同意报名</div>
                </div>
              </div>
            </div>
            <div class="history_item">
              <div class="dot last">
                <div class="grey_dot"></div>
                <div class="line"></div>
              </div>
              <div class="card">
                <div class="card_left"></div>
                <div class="card_right">
                  <div class="p_name">王晓晨</div>
                  <div class="p_theme">
                    <div class="t_name">"A培训主题"培训</div>
                    <div class="t_index">100900</div>
                    <div class="t_time">2023-09-12 12:09:23</div>
                  </div>
                  <div class="p_status">已上传培训证明材料</div>
                </div>
              </div>
            </div>
            <div class="history_item">
              <div class="dot last">
                <img
                  src="../../../../../assets/images/pages/his_btn.png"
                  alt=""
                />
              </div>
              <div class="card">
                <div class="card_left"></div>
                <div class="card_right">
                  <div class="p_name">王晓晨</div>
                  <div class="p_theme">
                    <div class="t_name">"A培训主题"培训</div>
                    <div class="t_index">100900</div>
                    <div class="t_time">2023-09-12 12:09:23</div>
                  </div>
                  <div class="p_status_last">待上传课程评价</div>
                </div>
              </div>
            </div>
            <div class="last"></div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="buttom">
      <div class="affirm" @click="submitUpload">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'provienceDetail',
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      detail: {
        name: '刘晓东',
        num: '10001',
        department: '学工部',
        phone: '15678999009',
        index: '#202304281007',
        type: '院级强基培训',
        theme: '校级赋能A类培训',
        college: '艺术学院',
        themeDescription: '校级赋能A类培训主题说明',
        startTime: '2023-09-15 9:00:00',
        endTime: ' 2023-09-15 18:00:00',
        adress: '学工部205',
        people: '林晓',
        deadline: '培训结束后一周内（2023-09-22 18:00:00）',
        signrecord: '2023-12-09 12:00:00（学工部A会议室)'
      },
      radio1: '正序',
      fileList: [],
      textarea: ''
    }
  },
  created() {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    flex-direction: row;
    .left {
      width: 1300px;
    }
    .right {
      margin-left: 16px;
      width: 700px;

      .container {
        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .title_item {
            display: flex;
            flex-direction: row;
            .title_blue {
              width: 3px;
              height: 15.77px;
              background-color: #166aff;
              margin-right: 8px;
            }
            font-weight: 500;
            font-size: 16px;
            color: #171717;
            text-align: left;
            line-height: 22px;
          }
          .reverse {
          }
        }
        .history {
          margin-top: 28px;
          .history_item {
            display: flex;
            flex-direction: row;
            height: 90px;
            .dot {
              display: flex;
              flex-direction: column;
              align-items: center;
              .line {
                width: 1px;
                background-color: #d9d9d9;
                height: 100%;
              }
            }
            .card {
              display: flex;
              flex-direction: row;
              margin-bottom: 16px;
              margin-left: 10px;
              padding-top: 8px;
              width: 800px;
              background: #ffffff;
              box-shadow: 0 1px 6px 2px #7c829224;
              border-radius: 8px;
              .card_left {
                margin-left: 16px;
                width: 32px;
                height: 32px;
                background-image: url('../../../../../assets/images/pages/his_btn.png');
                background-size: contain;
                background-repeat: no-repeat;
              }
              .card_right {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 100%;

                padding-left: 16px;
                .p_name {
                  font-weight: 700;
                  font-size: 12px;
                  color: #171717;
                }
                .p_theme {
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  padding-right: 26px;
                  font-weight: 500;
                  font-size: 12px;
                  color: #000000e6;
                  .t_name {
                  }
                  .t_index {
                  }
                  .t_time {
                  }
                }
                .p_status {
                  font-weight: 400;
                  font-size: 12px;
                  color: #7a7a7a;
                  text-align: left;
                }
                .p_status_last {
                  height: 20px;
                  font-weight: 400;
                  font-size: 12px;
                  color: #498ee5;
                  text-align: left;
                }
              }
            }
          }
          .last {
            .grey_dot {
              width: 18px;
              height: 18px;
              background: #d4d4d4;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .buttom {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    position: relative;
    left: -15px;
    width: 1873px;
    height: 82px;
    background: #ffffff;
    box-shadow: 0 1px 10px 6px #c1c8ccb3;
    .affirm {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 24px;
      width: 110px;
      height: 36px;
      background: #166aff;
      border-radius: 3px;

      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      line-height: 22px;
    }
    .affirm:hover {
      cursor: pointer;
    }
    .reject {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 8px;
      width: 110px;
      height: 36px;
      border: 1px solid #166aff;
      border-radius: 3px;

      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #166aff;
      text-align: center;
      line-height: 22px;
    }
  }
}
.upload_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 36px;
  border: 1px solid #166aff;
  border-radius: 3px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #166aff;
  text-align: center;
  line-height: 22px;
  .upload_img {
    width: 16px;
    height: 16px;
  }
  .upload_text {
    width: 63px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #166aff;
    text-align: center;
    line-height: 22px;
  }
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  width: 46px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #d1d1d2;
  border-radius: 100px 0 0 100px;
  color: #212121;
}
/deep/.el-radio-button:last-child .el-radio-button__inner {
  width: 46px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #d1d1d2;
  border-radius: 0px 100px 100px 0px;
  color: #212121;
}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  width: 46px;
  height: 26px;
  background: #e1ecff;
  border: 1px solid #166aff;
  color: #166aff;
}
/deep/ .el-card {
  border-radius: 0px;
}
/deep/.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: center !important;
}
</style>

<style>
.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: center !important;
}
.el-input__inner {
  height: 36px;
  background: #ffffffe6;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
}
.el-message-box {
  width: 600px;
  height: 303px;
  background: #ffffff;
  box-shadow: 0 5px 5px -3px #0000001a, 0 8px 10px 1px #0000000f,
    0 3px 14px 2px #0000000d;
}
.el-upload__tip {
  font-weight: 400;
  font-size: 12px;
  color: #00000066;
  line-height: 14px;
}
.el-textarea__inner {
  padding: 8px 8px;
}
</style>
