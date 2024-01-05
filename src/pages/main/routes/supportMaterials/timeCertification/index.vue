<template>
  <div class="main">
    <div class="top">
  <div class="left">
    <el-card
    :body-style="{height: '630px', borderRadius: '0px',color: '#191919' , lineHeight: '22px'}"
    class="courseDetail">

    <div style="borderBottom: 1px solid #D9D9D9;padding-bottom: 16px;">
      <el-row
class="demo-avatar demo-basic">
    <el-col :span="2" :style="{ marginRight: '23px' }">
     <el-avatar shape="square" :size="70" :src="circleUrl"></el-avatar>
    </el-col>
    <el-col :span="14"
    >
      <el-row
 :style="{ marginTop: '8px'}"
  >
  <el-col :span="8">
    <el-row>
      <el-col :span="12">培训组织人:</el-col>
      <el-col :style="{color: '#5D5E5D'}" :span="12">{{detail.name}}</el-col>
    </el-row>
   </el-col>
   <el-col :span="5">
    <el-row>
      <el-col :span="12">公号:</el-col>
      <el-col :style="{color: '#5D5E5D'}" :span="12">{{detail.num}}</el-col>
    </el-row>
   </el-col>
    </el-row>
    <el-row
 :style="{ marginTop: '15px'}"
  >
  <el-col :span="8">
    <el-row>
      <el-col :span="12">所在校单位:</el-col>
      <el-col :style="{color: '#5D5E5D'}" :span="12">{{detail.department}}</el-col>
    </el-row>
   </el-col>
   <el-col :span="7">
    <el-row>
      <el-col :span="12">联系电话:</el-col>
      <el-col :style="{color: '#5D5E5D'}" :span="12">{{detail.phone}}</el-col>
    </el-row>
   </el-col>
    </el-row>

    </el-col>

  </el-row>

    </div>

    <el-row type="flex" justify="start"
    :style="{ marginTop: '15px' }">
      <el-col :span="2.5">培训编号：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.index }}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="2.5">培训类型：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.type}}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="2.5">培训主题：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.theme }}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="2.5">培训时间：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.startTime }}至{{ detail.endTime }}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="2.5">培训地点：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.adress }}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="2.5">主讲人：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.people }}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="6.5">培训证明&课程评价截止上传时间：</el-col>
      <el-col :span="10" :style="{color: '#5D5E5D'}">{{detail.deadline }}</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="0.5" :style="{ color: '#FD2626' }">*</el-col>
      <el-col :span="6.5">培训证明上传:</el-col>
    </el-row>
    <el-row :style="{ marginTop: '16px' }">
      <el-col :span="6.5"><el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  ref="upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  accept=".rar, .zip, .doc, .docx, .pdf, .jpg"
  :auto-upload="false"
  multiple
  :limit="10"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <div class="upload_icon">
    <img class="upload_img" src="../../../../../assets/images/pages/upload_icon.png" alt="">
    <div class="upload_text">上传文件</div>
  </div>
  <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
<div slot="tip" class="el-upload__tip">
限制上传10个文件，单个文件大小不超过50M</div>
</el-upload>

</el-col>
    </el-row>
  </el-card>

  </div>

  <div class="right">
    <el-card class="container" :body-style="{height: '630px'}">
    <div class="title">
      <div class="title_item"><div class="title_blue"></div>历史记录</div>
      <div class="reverse">
    <el-radio-group v-model="radio1" size="mini">
      <el-radio-button label="正序" class="zx">正序</el-radio-button>
      <el-radio-button label="反序" class="fx">反序</el-radio-button>

    </el-radio-group>
      </div>
    </div>
    <div class="history">
      <div class="history_item">
      <div class="dot">
        <img src="../../../../../assets/images/pages/his_btn.png" alt="">
        <div class="line"></div>
      </div>
      <div class="card">
        <div class="card_left">
        </div>
        <div class="card_right">
          <div class="p_name">王晓晨</div>
          <div class="p_theme">
            <div class="t_name">"A培训主题"培训</div>
            <div class="t_index">100900 </div>
            <div class="t_time">2023-09-12 12:09:23</div>
          </div>
          <div class="p_status">发起报名</div>
        </div>
      </div>
    </div>
    <div class="history_item">
      <div class="dot">
        <img src="../../../../../assets/images/pages/his_btn.png" alt="">
        <div class="line"></div>
      </div>
      <div class="card">
        <div class="card_left">
        </div>
        <div class="card_right">
          <div class="p_name">王晓晨</div>
          <div class="p_theme">
            <div class="t_name">"A培训主题"培训</div>
            <div class="t_index">100900 </div>
            <div class="t_time">2023-09-12 12:09:23</div>
          </div>
          <div class="p_status">发起报名</div>
        </div>
      </div>
    </div>
    <div class="history_item">
      <div class="dot">
        <img src="../../../../../assets/images/pages/his_btn.png" alt="">
        <div class="line"></div>
      </div>
      <div class="card">
        <div class="card_left">
        </div>
        <div class="card_right">
          <div class="p_name">王晓晨</div>
          <div class="p_theme">
            <div class="t_name">"A培训主题"培训</div>
            <div class="t_index">100900 </div>
            <div class="t_time">2023-09-12 12:09:23</div>
          </div>
          <div class="p_status">发起报名</div>
        </div>
      </div>
    </div>
    <div class="history_item">
      <div class="dot">
        <img src="../../../../../assets/images/pages/his_btn.png" alt="">
        <div class="line"></div>
      </div>
      <div class="card">
        <div class="card_left">
        </div>
        <div class="card_right">
          <div class="p_name">王晓晨</div>
          <div class="p_theme">
            <div class="t_name">"A培训主题"培训</div>
            <div class="t_index">100900 </div>
            <div class="t_time">2023-09-12 12:09:23</div>
          </div>
          <div class="p_status_last">待上传证明材料</div>
        </div>
      </div>
    </div>
      <div class="last">
        <div class="grey_dot"></div>
      </div>

    </div>
    </el-card>
  </div>
</div>
  <div class="buttom">
    <div class="affirm" @click="submitUpload">提交材料</div>
  </div>
</div>

</template>

<script>
export default {
  name: 'workbench',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      detail: {
        name: '刘晓东',
        num: '10001',
        department: '学工部',
        phone: '15678999009',
        index: '#202304281007',
        type: '省级以上培训',
        theme: '校级赋能A类培训',
        startTime: '2023-09-15 9:00:00',
        endTime: ' 2023-09-15 18:00:00',
        adress: '学工部205',
        people: '林晓',
        deadline: '培训结束后一周内（2023-09-22 18:00:00）'
      },
      radio1: '正序',
      fileList: []

    }
  },
  created () {

  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  display: flex;
  flex-direction: column;
  .top{
    display: flex;
  flex-direction: row;
  .left{
    width: 1300px;
  }
  .right{
    margin-left: 16px;
    width: 35%;

    .container{
      .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .title_item{
          display: flex;
          flex-direction: row;
          .title_blue{
          width: 3px;
height: 15.77px;
background-color: #166AFF;
margin-right: 8px;
        }
font-weight: 500;
font-size: 16px;
color: #171717;
text-align: left;
line-height: 22px;
        }
        .reverse{

        }
      }
      .history{margin-top: 28px;
        .history_item{
          display: flex;
          flex-direction: row;
          .dot{
            display: flex;
            flex-direction: column;
            align-items: center;
            .line{
              width: 1px;
              background-color: #D9D9D9;
              height: 90px;
            }
          }
          .card{
            display: flex;
            flex-direction: row;
            margin-left: 10px;
            padding-top: 13px;
            width: 800px;
height: 90px;
background: #FFFFFF;
box-shadow: 0 1px 6px 2px #7c829224;
border-radius: 8px;
            .card_left{
              margin-left: 16px;
              width: 32px;
height: 32px;
            background-image: url("../../../../../assets/images/pages/his_btn.png");
              background-size: contain;
              background-repeat: no-repeat;
          }
            .card_right{
              display: flex;
              flex-direction: column;
              justify-content: space-around;
width: 100%;
height: 90px;
padding-left: 16px;
              .p_name{width: 42px;
height: 20px;

font-weight: 700;
font-size: 14px;
color: #171717;}
              .p_theme{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 95%;
height: 20px;
font-weight: 500;
font-size: 14px;
color: #000000e6;
                .t_name{}
                .t_index{}
                .t_time{}
              }
              .p_status{
height: 20px;
font-weight: 400;
font-size: 14px;
color: #7A7A7A;
text-align: left;
}
.p_status_last{
height: 20px;
font-weight: 400;
font-size: 14px;
color: #498EE5;
text-align: left;
}
            }
          }
        }
        .last{
          .grey_dot{
            width: 18px;
height: 18px;
background: #D4D4D4;
border-radius: 50%;
          }
        }
      }
    }
  }
}
  .buttom{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    width: 100%;
height: 82px;
background: #FFFFFF;
box-shadow: 0 1px 10px 6px #c1c8ccb3;
.affirm{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  width: 110px;
height: 36px;
background: #166AFF;
border-radius: 3px;

font-weight: 400;
font-size: 14px;
color: #FFFFFF;
text-align: center;
line-height: 22px;
}
.affirm:hover{
cursor:pointer
}
.reject{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  width: 110px;
height: 36px;
border: 1px solid #166AFF;
border-radius: 3px;

font-family: PingFangSC-Regular;
font-weight: 400;
font-size: 14px;
color: #166AFF;
text-align: center;
line-height: 22px;
}
  }
}
.upload_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
height: 36px;
border: 1px solid #166AFF;
border-radius: 3px;
font-family: PingFangSC-Regular;
font-weight: 400;
font-size: 14px;
color: #166AFF;
text-align: center;
line-height: 22px;
.upload_img{
  width: 16px;
height: 16px;
}
.upload_text{
  width: 63px;
height: 22px;
font-family: PingFangSC-Regular;
font-weight: 400;
font-size: 14px;
color: #166AFF;
text-align: center;
line-height: 22px;
}
}
/deep/ .el-radio-button:first-child .el-radio-button__inner{
  width: 46px;
height: 26px;
background: #FFFFFF;
border: 1px solid #D1D1D2;
border-radius: 100px 0 0 100px;
color: #212121;
}
/deep/.el-radio-button:last-child .el-radio-button__inner{
  width: 46px;
height: 26px;
background: #FFFFFF;
border: 1px solid #D1D1D2;
border-radius: 0px 100px 100px 0px;
color: #212121;
}
/deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  width: 46px;
height: 26px;
background: #E1ECFF;
border: 1px solid #166AFF;
color: #166AFF;
}
/deep/ .el-card{
  border-radius: 0px;
}
/deep/.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: center !important;
}
</style>

<style>.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: center !important;
}
.el-input__inner{
  width: 552px;
height: 120px;
background: #ffffffe6;
border: 1px solid #DCDCDC;
border-radius: 3px;
}
.el-message-box{
  width: 600px;
height: 303px;
background: #FFFFFF;
box-shadow: 0 5px 5px -3px #0000001a, 0 8px 10px 1px #0000000f, 0 3px 14px 2px #0000000d;
}
.el-upload__tip{
font-weight: 400;
font-size: 12px;
color: #00000066;
line-height: 14px;
}
</style>
