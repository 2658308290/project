<template>
    <div class="workbench">
       <el-card
       :style="{ borderRadius: '0', marginBottom: '12px' }"
       >
        <stable ref="table" :fields="fields" :data="loadData" showIndex>
        <el-table-column label="姓名">

        </el-table-column>
      </stable>
       </el-card>
    </div>
</template>

<script>
import stable from '@/components/stable'
import lists from '@/mixin/lists'
export default {
  name: 'workbench',
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
      fields: [
        { label: '培训类型', prop: 'sn' },
        { label: '培训主题', prop: 'college' },
        { label: '培训开始时间', prop: 'grade' },
        { label: '培训结束时间', prop: 'major' },
        { label: '培训地点', prop: 'schoolYear' },
        { label: '培训状态', prop: 'getTime' },
        { label: '操作', prop: 'money' }
      ]
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
    /deep/ .el-table th.el-table__cell{
      background-color: #F3F3F3;
    }
</style>
