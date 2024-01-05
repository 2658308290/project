<template>
  <div>
    <el-table
      ref="table"
      v-loading="localLoading"
      v-bind="$props"
      :data="localDataSource"
      @select="selectItem"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @sort-change="appendSorterParam"
      v-el-height-adaptive-table="{ bottomOffset: bottomOffset }"
    >
      <template slot="empty">
        <el-empty
          :image="require('@/assets/images/pages/no_message_fs.png')"
          :image-size="200"
          description="暂无数据"
        ></el-empty>
      </template>
      <slot name="expand"></slot>
      <el-table-column type="selection" reserve-selection v-if="showSelect" />
      <el-table-column type="index" label="序号" width="75" v-if="showIndex" />
      <template v-for="(field, index) in tableFields">
        <VNodes :vnodes="[field.vnode]" v-bind:key="index" v-if="field.vnode" />
        <el-table-column
          :label="field.label"
          tooltip="true"
          v-bind:key="index"
          :fixed="field.fixed"
          :width="field.width"
          :prop="field.prop"
          show-overflow-tooltip
          :sortable="field.sortable ? 'custom' : null"
          :render-header="renderTooltipHeader"
          v-else
        >
          <template slot-scope="scope">
            {{ scope.row[field.prop] ? scope.row[field.prop] : "-" }}
          </template>
        </el-table-column>
      </template>
    </el-table>
    <s-pagination
      v-show="localPagination.total > 0"
      :total="localPagination.total"
      :page.sync="localPagination.current"
      :limit.sync="localPagination.pageSize"
      :style="{ textAlign: 'right' }"
      :page-sizes="localPagination.pageSizeOptions"
      @pagination="handlePaginationChanged"
      :layout="layout"
    />
  </div>
</template>

<script>
import SPagination from '@/components/pagination'
import { renderTooltipHeader } from './table'

export default {
  name: 'index',
  data () {
    return {
      localDataSource: [],
      localPagination: { ...this.pagination },
      orderBy: null,
      nodes: [],
      allTableFields: [],
      tableFields: [],
      columnVNodeLabelMap: {},
      columnVNodePropMap: {},
      localLoading: false,
      selectedRowKeys: [],
      selectedRows: [],
      isShowTooltip: false
    }
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    SPagination
  },
  props: {
    // EL-Table default parameter
    size: String,
    width: [String, Number],
    height: {
      type: [String, Number],
      default: '600px'
    },
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: Boolean,
    rowKey: {
      type: [String, Function],
      default: ''
    },
    context: {},
    showHeader: {
      type: Boolean,
      default: true
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 16
    },
    lazy: Boolean,
    load: Function,

    // Custom properties
    fields: {
      type: Array,
      required: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    data: {
      type: Function,
      required: true
    },
    rowSelection: {
      type: Object,
      default: null
    },
    pagination: {
      type: Object,
      required: false,
      default: () => ({
        pageSize: 20,
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: [20, 30, 50, 100]
      })
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    bottomOffset: {
      type: Number,
      default: 100
    }
  },
  created () {
    // eslint-disable-next-line no-mixed-operators
    this.localPagination =
      (this.showPagination && {
        ...this.localPagination,
        current: this.pageIndex,
        pageSize: this.pageSize
        // eslint-disable-next-line no-mixed-operators
      }) ||
      false

    this.buildColumnVNodeMap()
    this.tableFields = this.fillFieldsVNode(this.fields)
    console.log(this.tableFields)
    this.allTableFields = [...this.tableFields]
  },
  mounted () {
    this.loadData()
  },
  methods: {
    renderTooltipHeader,
    refresh (bool = false) {
      bool && (this.localPagination = { current: 1, pageSize: this.pageSize })
      this.loadData()
    },
    loadData (pagination, filters, sorter) {
      this.localLoading = true
      const parameter = {
        // eslint-disable-next-line no-mixed-operators
        pageIndex:
          (pagination && pagination.current) ||
          (this.showPagination && this.localPagination.current) ||
          this.pageIndex,
        // eslint-disable-next-line no-mixed-operators
        pageSize:
          (pagination && pagination.pageSize) ||
          (this.showPagination && this.localPagination.pageSize) ||
          this.pageSize,
        ...((sorter && sorter.field && { sortField: sorter.field }) || {}),
        ...((sorter && sorter.order && { sortOrder: sorter.order }) || {}),
        ...filters,
        ...(this.orderBy && { orderBy: this.orderBy })
      }
      const result = this.data(parameter)
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result
          .then((r) => {
            if (r.code === 0) {
              // eslint-disable-next-line no-mixed-operators
              this.localPagination =
                (this.showPagination && {
                  ...this.localPagination,
                  current: r.page.pageIndex,
                  total: parseInt(r.page.totalCount),
                  showSizeChanger: this.showSizeChanger,
                  pageSize:
                    (pagination && pagination.pageSize) ||
                    this.localPagination.pageSize
                  // eslint-disable-next-line no-mixed-operators
                }) ||
                false

              if (
                r.data.length === 0 &&
                this.showPagination &&
                this.localPagination.current > 1
              ) {
                // eslint-disable-next-line no-plusplus
                this.localPagination.current--
                this.loadData()
                return
              }

              this.localDataSource = r.data // 返回结果中的数组数据
              this.localLoading = false
            } else if (r.code !== 9999) {
              this.localLoading = false
              this.$notify.error({
                title: '获取列表数据失败',
                message: r.msg
              })
            }
          })
          .catch((err) => {
            this.localLoading = false
            this.$notify.error({
              title: '获取列表数据失败',
              message: err
            })
          })
      }
    },
    selectItem (list, row) {
      this.onRowSelected(list)
    },
    selectAll (selection) {
      if (selection.length === 0) {
        const rowKeys = this.localDataSource.map((i) => i[this.rowKey])
        for (var i = 0; i < this.selectedRows.length; i++) {
          if (rowKeys.indexOf(this.selectedRows[i][this.rowKey]) > -1) {
            this.selectedRows.splice(i, 1)
            i--
          }
        }
      }
      const arr = [...selection, ...this.selectedRows]
      const selectedRows = Array.from(new Set(arr))
      this.onRowSelected(selectedRows)
    },
    selectionChange (val) {
      this.$emit('selection-change', val)
    },
    clearSelect () {
      this.$ref.table.clearSelection()
      this.onRowSelected([], [])
    },
    onRowSelected (selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = Array.from(
        new Set(selectedRows.map((item) => item[this.rowKey]))
      )
      if (this.rowSelection) {
        this.rowSelection.onChange(this.selectedRows, this.selectedRowKeys)
      }
    },
    handlePaginationChanged () {
      this.loadData()
    },
    isSlotElColumn (slot) {
      return (
        slot.componentOptions && slot.componentOptions.tag === 'el-table-column'
      )
    },
    buildColumnVNodeMap () {
      if (this.$slots.default) {
        const columnSlots = this.$slots.default.filter((slot) =>
          this.isSlotElColumn(slot)
        )
        columnSlots.forEach((slot) => {
          if (slot.componentOptions && slot.componentOptions.propsData) {
            const label = slot.componentOptions.propsData.label
            const prop = slot.componentOptions.propsData.prop

            if (label) this.columnVNodeLabelMap[label] = slot
            if (prop) this.columnVNodePropMap[prop] = slot
          }
        })
      }
    },
    fillFieldsVNode (fields) {
      const tableFields = []

      if (fields) {
        fields.forEach((field) => {
          let vnode =
            field.label && this.columnVNodeLabelMap[field.label]
              ? this.columnVNodeLabelMap[field.label]
              : null
          if (vnode == null) {
            vnode =
              field.prop && this.columnVNodePropMap[field.prop]
                ? this.columnVNodePropMap[field.prop]
                : null
          }
          tableFields.push({ ...field, vnode })
        })
      }

      return tableFields
    },
    handleColumnChanged (fields) {
      this.tableFields = this.allTableFields.filter(
        (tableField) => fields.indexOf(tableField.prop) >= 0
      )
      this.refresh()
    },
    appendSorterParam ({ column, prop, order }) {
      if (prop != null && order != null) {
        this.orderBy = `${prop}:${order === 'ascending' ? 'ASC' : 'DESC'}`
      } else {
        this.orderBy = undefined
      }
      this.refresh()
    }
  }
}
</script>

<style scoped></style>
