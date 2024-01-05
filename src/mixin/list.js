import attachMore from './attachMore'
import xhr from '@/tools/http/http'
import moment from 'moment'
import _ from 'lodash'
import { downloadFileFromRes } from '@/tools/fileUtil'
import Pagination from '@/components/pagination'
import {Message} from 'element-ui'

export default {
  mixins: [attachMore],
  components: { Pagination },
  data () {
    return {
      primaryKey: 'id',
      queryParam: {},
      advanced: false, // 高级搜索
      loadingData: false, // 是否加载中
      listApi: '', // 列表数据接口
      dateRangeQuery: {}, // 日期区间查询
      customQueryParam: {}, // 自定义参数
      listFormatter: true,
      deleteApiPrefix: '',
      exportLoadingData: false, // 是否导出中
      checkIds: [],
      checkList: [],
      pagination: {
        pageSize: 20,
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50', '100']
      }
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSearch () {
      this.pagination.current = 1
      this.handlePaginationChanged()
    },
    handlePaginationChanged () {
      this.queryParam.pageIndex = this.pagination.current
      this.queryParam.pageSize = 1
      this.getList()
    },
    getList () {
      return new Promise((resolve, reject) => {
        this.loadingData = true
        xhr.GET(this.listApi ? this.listApi : `${this.baseApi}/list`, this.buildQueryParam()).then(res => {
          this.loadingData = false
          if (res.code === 0) {
            this.list = this.filterListData(res.data)
            this.afterLoadList(this.list)
            if (res.page) {
              this.pagination.pageSize = res.page.pageSize
              this.pagination.current = res.page.pageIndex
              this.pagination.total = res.page.totalCount ? Number(res.page.totalCount) : 0
            }
            resolve(this.list)
          } else if (res.code !== 9999) {
            this.localLoading = false
            this.$notify.error({
              title: '获取列表数据失败',
              message: res.msg
            })
          }
        }).catch(err => {
          this.loadingData = false
          this.$notify.error({
            title: '获取列表数据失败',
            message: err
          })
          reject(err)
        })
      })
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
    afterLoadList (list) {

    },
    setVisible (visible) {
      const targetVisible = visible === '1' ? '可见' : '不可见'
      this.$confirm('确定将所需的属性全部设置为' + targetVisible + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        xhr.POST(`${this.baseApi}/batch/set-visible/` + visible, this.checkIds).then(res => {
          if (res.ok) {
            Message.success('操作成功!')
            this.getList()
          }
        })
      })
    },
    reset () {
      this.queryParam = {}
      this.dateRangeQuery = {}
      this.getList()
    },
    appendSorterParam ({ column, prop, order }) {
      if (prop != null && order != null) {
        this.queryParam.orderBy = `${prop}:${order === 'ascending' ? 'ASC' : 'DESC'}`
      } else {
        this.queryParam.orderBy = undefined
      }
    },
    menuCommand (command, row) {
      if (command === 'update') {
        this.$refs.form.open(row[this.primaryKey])
      } else if (command === 'delete') {
        this.remove(row[this.primaryKey])
      } else {
        this[command](row)
      }
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
        this.exportLoadingData = false
      })
    },
    downloadFile (res) {

    },
    selectItem (list, row) {
      this.checkList = list
      this.checkIds = list.map(item => item[this.primaryKey])
    },
    selectAll (selection) {
      if (selection.length === 0) {
        this.checkIds = []
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
      this.checkIds = Array.from(new Set(this.checkList.map(item => item[this.primaryKey])))
    },
    clearSelect () {
      this.$ref.table.clearSelection()
      this.checkList = []
      this.checkIds = []
    },
    async remove (id) {
      return new Promise((resolve, reject) => {
        const _this = this
        this.$confirm('确定删除该数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const deleteApiPrefix = _this.deleteApiPrefix ? _this.deleteApiPrefix : ''
          xhr.DELETE(`${_this.baseApi}${deleteApiPrefix}/${id}`).then(async (res) => {
            if (res.code === 0) {
              if (_this.allowCanceledDelete) {
                const h = this.$createElement
                this.$message({
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
                  type: 'success'
                })
              } else {
                _this.$message.success('当前数据删除成功')
              }
              await _this.getList()
              resolve(res.data)
            } else {
              // this.$notify.error({
              //   title: '删除失败',
              //   message: res.msg
              // })
              reject(res.msg)
            }
          }).catch(err => {
            // this.$notify.error({
            //   title: '删除失败',
            //   message: err
            // })
            reject(err.msg)
          })
        })
      })
    }
  }
}
