import attachMore from './attachMore'
import xhr from '@/tools/http/http'
import _ from 'lodash'
import {downloadFileFromRes} from '@/tools/fileUtil'
import moment from 'moment'

export default {
  mixins: [attachMore],
  data () {
    return {
      queryParam: {}, // 查询参数
      dateRangeParams: {}, // 日期区间查询参数，会自动在查询字段后添加Begin/end两个区间参数
      loadData: parameter => {
        const requestParameters = {...parameter, ...this.queryParam, ...this.buildRangeQueryParams(this.dateRangeParams)}
        return xhr.GET(this.listApi ? this.listApi : `${this.baseApi}/list`, requestParameters)
      },
      rowKey: 'id', // 主键id
      selectedRowKeys: [], // 选中的列主键
      selectedRows: [], // 选中的列数据
      tableRef: 'table', // 表格Ref名称
      cancelDelMessage: null, // 取消删除message，用于关闭

      listApi: '', // 列表数据接口
      deleteApi: '', // 删除数据接口
      batchDeleteApi: '', // 批量删除接口
      cancelDeleteApi: '', // 取消删除接口
      batchCancelDeleteApi: '', // 批量取消删除接口

      allowCanceledDelete: true, // 是否允许撤回删除
      advanced: false, // 高级搜索
      loadingData: false, // 是否加载中
      exportLoadingData: false, // 是否导出中
      pagination: {
        pageSize: 20,
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100']
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleColumnChanged (fields) {
      this.$refs.table.handleColumnChanged(fields)
    },
    onSelectChange (selectedRows, selectedRowKeys) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    refresh () {
      this.$refs[this.tableRef].refresh()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    buildRangeQueryParams (dateRangeParams) {
      const dateParams = {}
      _.forEach(dateRangeParams, (v, k) => {
        if (k && v && v.length === 2) {
          dateParams[`${k}Begin`] = v[0]
          dateParams[`${k}End`] = v[1]
        }
      })
      return dateParams
    },
    menuCommand (command, row) {
      if (command === 'update') {
        this.$refs.form.open(row[this.rowKey])
      } else if (command === 'delete') {
        this.remove(row[this.rowKey])
      } else {
        this[command](row)
      }
    },
    buildQueryParam () {
      this.dateRange2queryParam()
      this.transformMoment(this.queryParam)
      let tempQueryParam = {}
      _.merge(tempQueryParam, this.customQueryParam)
      _.merge(tempQueryParam, this.queryParam)
      tempQueryParam = this.rebuildQuery(tempQueryParam)
      return tempQueryParam
    },
    dateRange2queryParam () {
      _.forEach(this.dateRangeQuery, (v, k) => {
        if (k && v && v.length === 2) {
          this.queryParam[`${k}Begin`] = v[0]
          this.queryParam[`${k}End`] = v[1]
        }
      })
    },
    transformMoment (content, transform = {}) {
      if (content) {
        for (const key in content) {
          const value = content[key]
          const format = transform[key] || 'YYYY-MM-DD'
          if (value instanceof Array) {
            if (value && value[0] instanceof moment) {
              const transformTime = []
              for (let i = 0; i < value.length; i++) {
                transformTime[i] = value[i].format(format)
              }
              content[key] = transformTime
            }
          } else if (value instanceof moment) {
            content[key] = value.format(format)
          }
        }
      }
      return content
    },
    rebuildQuery (query) {
      return query
    },
    filterListData (list) {
      if (!this.listFormatter) {
        return list
      }
      if (list && list.length > 0) {
        list.forEach(item => {
          if (item.children != null) {
            item._children = item.children
            item.hasChildren = true
            delete item.children
          }
        })
      }
      return list
    },
    exportData () {
      if (this.exportLoadingData) return
      this.exportLoadingData = true
      const exportApi = this.exportApi ? this.exportApi : '/excel/export'
      xhr.EXPORT(`${this.baseApi}${exportApi}`, this.buildQueryParam()).then(res => {
        if (res.ok === 200) {
          if (res.headers.filename) {
            downloadFileFromRes(res)
          } else {
            const decoder = new TextDecoder('utf-8')
            const result = JSON.parse(decoder.decode(new Uint8Array(res.data)))
            this.$message.error(result.msg)
          }
        } else {
          this.$notify.error({
            title: '下载失败',
            message: '网络错误，下载文件失败，请稍后重试'
          })
        }
        this.exportLoadingData = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        console.log(err)
        this.exportLoadingData = false
      })
    },
    downloadFile (res) {

    },
    selectItem (list, row) {
      console.log(this.checkIds)
      this.checkList = list
      this.checkIds = list.map(item => item[this.rowKey])
    },
    selectAll (selection) {
      if (selection.length === 0) {
        const ids = this.dataList.map((i) => {
          return i.id
        })
        for (var i = 0; i < this.checkList.length; i++) {
          if (ids.indexOf(this.checkList[i].id) > -1) {
            this.checkList.splice(i, 1)
            i--
          }
        }
      }
      const arr = [...selection, ...this.checkList]
      this.checkList = Array.from(new Set(arr))
      this.checkIds = Array.from(new Set(this.checkList.map(item => item[this.rowKey])))
    },
    clearSelect () {
      this.$ref.table.clearSelection()
      this.checkList = []
      this.checkIds = []
    },
    reset (val) {
      this.query = val
      this.refresh()
    },
    search (query) {
      this.query.summary = query.summary
      this.query.title = query.title
      this.query.source = query.source
      this.query.categoryCode = query.categoryCode
      this.refresh()
    },
    async remove (id) {
      return new Promise((resolve, reject) => {
        const _this = this
        this.$confirm('确定删除该数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const deleteApi = _this.deleteApi ? _this.deleteApi : ''
          xhr.DELETE(`${_this.baseApi}${deleteApi}/${id}`).then(async (res) => {
            if (res.code === 0) {
              if (_this.allowCanceledDelete) {
                const h = this.$createElement
                _this.cancelDelMessage = this.$message({
                  message: h('p', null, [
                    h('span', {
                      style: 'color: #666'
                    }, '当前数据删除成功 '),
                    h('el-button', {
                      props: {
                        type: 'text'
                      },
                      on: {
                        click: event => {
                          _this.canceledDelete(id)
                        }
                      }
                    }, '撤回')
                  ]),
                  type: 'success',
                  duration: 8000 // 8秒后消失
                })
              } else {
                _this.$message.success('当前数据删除成功')
              }
              await this.refresh()
              resolve(res.data)
            } else {
              this.$notify.error({
                title: '删除失败',
                message: res.msg
              })
              reject(res.msg)
            }
          }).catch(err => {
            this.$notify.error({
              title: '删除失败',
              message: err
            })
            reject(err.msg)
          })
        })
      })
    },
    async batchRemove () {
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        return new Promise((resolve, reject) => {
          const _this = this
          this.$confirm(`确定删除这${this.selectedRowKeys.length}条数据吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const batchDeleteApi = _this.batchDeleteApi ? _this.batchDeleteApi : '/batchDelete'
            xhr.POST(`${_this.baseApi}${batchDeleteApi}`, {ids: this.selectedRowKeys}).then(async (res) => {
              if (res.code === 0) {
                if (_this.allowCanceledDelete) {
                  const h = this.$createElement
                  _this.cancelDelMessage = this.$message({
                    message: h('p', null, [
                      h('span', {
                        style: 'color: #666'
                      }, '当前数据删除成功 '),
                      h('el-button', {
                        props: {
                          type: 'text'
                        },
                        on: {
                          click: event => {
                            _this.batchCanceledDelete(this.selectedRowKeys)
                          }
                        }
                      }, '撤回全部数据')
                    ]),
                    type: 'success',
                    duration: 8000 // 8秒后消失
                  })
                } else {
                  _this.$message.success('当前数据删除成功')
                }
                await this.refresh()
                resolve(res.data)
              } else {
                this.$notify.error({
                  title: '删除失败',
                  message: res.msg
                })
                reject(res.msg)
              }
            }).catch(err => {
              this.$notify.error({
                title: '删除失败',
                message: err
              })
              reject(err.msg)
            })
          })
        })
      } else {
        this.$notify.warning({
          title: '提醒',
          message: '请至少选择一条记录'
        })
      }
    },
    async batchCanceledDelete (ids) {
      const batchCancelDeleted = this.batchCancelDeleteApi ? this.batchCancelDeleteApi : `/batchCancelDeleted`
      const res = await xhr.POST(`${this.baseApi}${batchCancelDeleted}`, {ids: this.selectedRowKeys})
      if (res.code === 0) {
        this.$message.success('撤回成功')
        this.refresh()
        if (this.cancelDelMessage) {
          this.cancelDelMessage.close()
          this.cancelDelMessage = null
        }
      } else {
        this.$message.error('撤回失败')
      }
    },
    async canceledDelete (id) {
      const cancelDeleteApi = this.cancelDeleteApi ? this.cancelDeleteApi : `/cancelDeleted`
      const res = await xhr.POST(`${this.baseApi}${cancelDeleteApi}/${id}`)
      if (res.code === 0) {
        this.$message.success('撤回成功')
        this.refresh()
        if (this.cancelDelMessage) {
          this.cancelDelMessage.close()
          this.cancelDelMessage = null
        }
      } else {
        this.$message.error('撤回失败')
      }
    }
  }
}
