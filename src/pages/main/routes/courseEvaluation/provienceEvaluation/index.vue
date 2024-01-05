<template>
    <div class="provienceEvaluation">
      <el-tabs v-model="activeName">
    <el-tab-pane label="省级及以上培训" name="provience"></el-tab-pane>

  </el-tabs>
  <stable ref="table" :fields="provienceField" :data="loadData" showIndex>
</stable>
    </div>
</template>

<script>
import stable from '@/components/stable'
import lists from '@/mixin/lists'
export default {
  name: 'provienceEvaluation',
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
      activeName: 'provience'
    }
  },
  created () {

  },
  methods: {
  },
  components: {
    stable
  }
}
</script>

<style lang="less" scoped>
.provienceEvaluation{
    width: 100%;
height: 100%;
padding-left: 16px;
padding-top: 29px;
background: #FFFFFF;

}
</style>
<style>
.el-table th.el-table__cell{
      background-color: #F3F3F3;
font-weight: 400;
font-size: 14px;
color: #00000099;
line-height: 22px;
    }
.el-tabs__item{
  width: 124px;
height: 32px;
font-weight: 600;
font-size: 14px;
color: #000000;
text-align: center;
line-height: 22px;
}
.el-tabs__item.is-active{

font-weight: 700;
font-size: 14px;
color: #2769DB;
line-height: 22px;
}
.el-tabs__active-bar{
background-color: #2769DB;
}
.el-table::before{
    height: 0px;
}
</style>
