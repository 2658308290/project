<template>
  <span style="margin: 0 10px;">
    <el-dropdown split-button type="default" @click="exportData" @command="handleCommand">
      <i :class="exportLoadingData ? 'el-icon-loading' : 'el-icon-download'" /> 导出
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="select">选择列导出</el-dropdown-item>
        <el-dropdown-item v-for="(item, index) in options" :key="index" :divided="index === 0" :command="item.columns">
          {{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false">
      <span slot="title">
        选择导出列
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          style="margin-left: 25px;"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
      </span>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-table border :data="dataList" style="width: 100%">
          <table-column v-for="(column, index) in tableHead" :key="index" :column="column" :formatter="formatter" />
        </el-table>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import TableColumn from '@/components/excel/TableColumn.vue'
import { downloadFileFromRes } from '@/tools/fileUtil'
import xhr from '@/tools/http/http'

export default {
  name: 'Export',
  components: {
    TableColumn
  },
  props: {
    exportUrl: {
      type: String,
      required: true
    },
    tableHeadUrl: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true,
      default: () => {}
    },
    /**
     * 示例：[{title:'导出用户联系方式',columns:['realname','userNum','mobilePhone']}]
     */
    options: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '50%'
    }
  },
  data () {
    return {
      exportLoadingData: false,
      dialogVisible: false,
      tableLoading: false,
      tableHead: [],
      dataList: [{}],
      // 选择
      checkedCities: [],
      cities: [],
      checkAll: true,
      isIndeterminate: false
    }
  },
  methods: {
    confirm () {
      this.handleCommand(this.checkedCities)
      this.dialogVisible = false
    },
    formatter (row, column, cellValue, index) {
      const property = column.property
      if (!this.cities.includes(property)) {
        this.cities.push(property)
        this.checkedCities.push(property)
      }
      return this.$createElement('el-checkbox', {
        props: {
          label: property
        },
        style: {
          width: '100%',
          height: '100%'
        }
      }, '')
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    exportData () {
      this.__download(this.exportUrl)
    },
    handleCommand (columns) {
      if (columns instanceof Array) {
        this.__download(this.exportUrl, { ...this.params, columns })
      } else {
        this.dialogVisible = true
        if (this.tableHead.length === 0) {
          this.tableLoading = true
          xhr.GET(this.tableHeadUrl)
            .then(res => {
              this.tableHead = res.data
              this.tableLoading = false
            })
            .catch(res => {
              this.$message.error(res.msg)
            })
        }
      }
    },
    __download (url, params = this.params) {
      if (this.exportLoadingData) return
      this.exportLoadingData = true
      xhr.EXPORT(url, {...params}).then(res => {
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
      }).catch(err => {
        console.log(err)
        this.exportLoadingData = false
      })
    }
  }
}
</script>
