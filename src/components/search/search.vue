<template>
  <div class="action-bar">
    <template v-if="!changePosition">

      <div class="action-bar-left">
        <el-button
          v-if="isNew"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="create"
        >
          创建标签
        </el-button>

        <el-button
          size="small"
          v-if="isColumnSelector"
          @click="$refs.columnSelector.open()"
          >列目显示</el-button
        >

        <el-button v-if="isSearch" size="small"
          >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-button v-if="isBatchDelete" size="small" @click="batchRemove"
          >批量删除</el-button
        >
        <!--                <export-excel :exportUrl="`${baseApi}${exportApi ? exportApi : '/excel/export'}`" :tableHeadUrl="`${baseApi}${tableHeadApi ? tableHeadApi : '/excel/tableHead'}`"/>-->
        <column-selector
          ref="columnSelector"
          :fields="fields"
          @select="handleColumnChanged"
        ></column-selector>
      </div>

      <div class="action-bar-right">
        <el-input
          v-if="isSummary"
          v-model="query.summary"
          placeholder="请输入摘要"
          size="small"
          clearable
        ></el-input>
        <el-input
          v-if="isTitle"
          v-model="query.title"
          placeholder="请输入标题"
          size="small"
          clearable
        ></el-input>
        <el-input
          v-if="isSource"
          v-model="query.source"
          placeholder="请输入来源"
          size="small"
          clearable
        ></el-input>

        <slot name="search" />
        <el-button size="small" type="primary" @click="search(resetValue)"
          >查询</el-button
        >
        <el-button size="small" @click="reset(resetValue)">重置</el-button>
      </div>
      </template
    >
    <template v-else>
      <div class="action-bar-right">
        <slot name="search" />
        <el-button
          size="mini"
          type="primary"
          @click="search(resetValue)"
          :style="{ width: '90px' }"
          >查询</el-button
        >
        <el-button
          size="mini"
          plain
          @click="reset(resetValue)"
          :style="{ width: '90px' }"
          >重置</el-button
        >
      </div>
      <div class="action-bar-left">
        <el-button
          v-if="isNew"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="create"
        >
          创建标签
        </el-button>
        <el-button
          size="small"
          v-if="isColumnSelector"
          @click="$refs.columnSelector.open()"
          >列目显示</el-button
        >
        <el-button v-if="isSearch" size="small"
          >高级搜索<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-button v-if="isBatchDelete" size="small" @click="batchRemove"
          >批量删除</el-button
        >
        <!--                <export-excel :exportUrl="`${baseApi}${exportApi ? exportApi : '/excel/export'}`" :tableHeadUrl="`${baseApi}${tableHeadApi ? tableHeadApi : '/excel/tableHead'}`"/>-->
        <column-selector
          ref="columnSelector"
          :fields="fields"
          @select="handleColumnChanged"
        ></column-selector>
      </div>
    </template>
  </div>
</template>

<script>
import ColumnSelector from '@/components/stable/ColumnSelector.vue'
import ExportExcel from '@/components/excel/ExportExcel.vue'

export default {
  name: 'search',
  components: {
    ColumnSelector,
    ExportExcel
  },
  props: {
    baseApi: {
      type: String,
      default: ''
    },
    isColumnSelector: {
      type: Boolean,
      default: false
    },
    exportApi: {
      type: String,
      default: '/excel/export'
    },
    tableHeadApi: {
      type: String,
      default: '/excel/tableHead'
    },
    isSummary: {
      type: Boolean,
      default: false
    },
    isTitle: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: false
    },
    isBatchDelete: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    isSource: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array
    },
    resetValue: {
      type: String,
      default: ''
    },
    changePosition: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: {

      }
    }
  },
  methods: {
    handleColumnChanged (fields) {
      this.$emit('handleColumnChanged', fields)
    },
    create () {
      this.$emit('create', this.resetValue)
    },
    batchRemove () {
      this.$emit('batchRemove')
    },
    search () {
      this.$emit('search', this.query)
    },
    reset (val) {
      this.query = {}
      this.$emit('reset', this.query)
    }
  }
}
</script>

<style scoped></style>
