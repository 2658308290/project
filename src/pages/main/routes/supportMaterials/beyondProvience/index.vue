<template>
    <div class="beyondProvience">
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="省级及以上培训" name="provience"></el-tab-pane>
    <el-tab-pane label="校级赋能培训" name="college"></el-tab-pane>
    <el-tab-pane label="院级强基培训" name="school"></el-tab-pane>
  </el-tabs>
  <stable v-show="activeName === 'provience' " ref="table" :fields="provienceField" :data="loadData" showIndex>
</stable>

 <stable v-show="activeName === 'college' " ref="table" :fields="collegeField" :data="loadData" showIndex></stable>
<stable v-show="activeName === 'school' " ref="table" :fields="schoolField" :data="loadData" showIndex></stable>
<div class="college_notread">10</div>
  <div class="school_notread">10</div>
    </div>
</template>

<script>
import stable from '@/components/stable'
import lists from '@/mixin/lists'
export default {
  name: 'beyondProvience',
  mixins: [lists],
  data () {
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
        { label: '培训材料截至上传时间', prop: 'deadline' },
        { label: '材料上传时效状态', prop: 'deadTime' },
        { label: '操作', prop: 'operation' }
      ],
      collegeField: [
        { label: '校级培训类型', prop: 'sn' },
        { label: '培训主题', prop: 'college' },
        { label: '培训开始时间', prop: 'startTime' },
        { label: '培训结束时间', prop: 'endTime' },
        { label: '培训材料截至上传时间', prop: 'deadline' },
        { label: '材料上传时效状态', prop: 'deadTime' },
        { label: '操作', prop: 'operation' }
      ],
      schoolField: [
        { label: '院级培训类型', prop: 'sn' },
        { label: '培训主题', prop: 'college' },
        { label: '培训开始时间', prop: 'startTime' },
        { label: '培训结束时间', prop: 'endTime' },
        { label: '培训材料截至上传时间', prop: 'deadline' },
        { label: '材料上传时效状态', prop: 'deadTime' },
        { label: '操作', prop: 'operation' }
      ],
      activeName: 'provience'
    }
  },
  created () {

  },
  methods: {
    handleClick (tab, event) {
      this.activeName = tab.name
      console.log(this.activeName)
    }
  },
  components: {
    stable
  }
}
</script>

<style lang="less" scoped>
.beyondProvience{
    width: 100%;
height: 100%;
padding-left: 16px;
padding-top: 29px;
background: #FFFFFF;
    .college_notread{
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: -773px;
      left: 228px;
      z-index: 5;
      width: 24px;
height: 16px;
background: #E34D59;
border-radius: 8px;
font-weight: 400;
font-size: 12px;
color: #ffffffe6;
line-height: 20px;
    }
    .school_notread{
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: -789px;
      left: 362px;
      z-index: 5;
      width: 24px;
height: 16px;
background: #E34D59;
border-radius: 8px;
font-weight: 400;
font-size: 12px;
color: #ffffffe6;
line-height: 20px;
    }
}
</style>
<style>
.el-table th.el-table__cell{
      background-color: #F3F3F3;
    }
.el-tabs__item{
  width: 124px;
height: 32px;
font-weight: 600;
font-size: 14px;
color: #00000099;
text-align: center;
line-height: 22px;
}
.el-tabs__item.is-active{

font-weight: 700;
font-size: 14px;
color: #166AFF;
line-height: 22px;
}
.el-tabs__active-bar{
background-color: #166AFF;
}
.el-table::before{
    height: 0px;
}
</style>
