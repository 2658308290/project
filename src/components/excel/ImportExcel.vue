<template>
  <el-card class="import-card content">
    <div slot="header" class="clearfix">
      <span>数据上传</span>
      <el-button
          style="float: right; padding: 3px 0"
          type="text"
          :icon="exportLoadingData ? 'el-icon-loading' : 'el-icon-download'"
          @click="handleDownloadExample"
      >
        下载示例文件
      </el-button>
    </div>
    <div class="clearfix upload-wrapper">
      <el-row :gutter="16">
        <el-col :md="6">
          <el-upload
              action=""
              :auto-upload="false"
              :file-list="fileList"
              :on-remove="handleRemove"
              :on-change="handleChange"
              class="upload-list-inline"
          >
            <el-button icon="el-icon-upload">
              选择文件
            </el-button>
          </el-upload>
        </el-col>
        <el-col :md="8">
          <el-input v-model="description" placeholder="备注信息" />
        </el-col>
        <el-col :md="10">
          <el-button
              type="primary"
              :disabled="previewDisabled"
              icon="el-icon-view"
              @click="handlePreview"
          >
            预览数据
          </el-button>
          <el-button
              :disabled="uploadDisabled"
              type="default"
              icon="el-icon-upload"
              @click="handleUpload"
          >
            上传数据
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="errMsg">
        <el-col :span="24">
          <br>
          <el-alert type="error">
            <div>
              <b>请检查Excel文件，错误信息: </b><br>
              {{ errMsg }}
            </div>
          </el-alert>
        </el-col>
      </el-row>
    </div>
    <div v-if="data">
      <el-divider />
      <div class="alert alert-info">
        Excel文件解析成功，共有 <strong>{{ data.totalCount }}</strong> 条数据
        <span v-if="data.errorCount > 0">；<strong>{{ data.totalCount - data.errorCount }}</strong> 条数据</span>
        可上传。
      </div>
      <el-collapse v-if="data.errorCount > 0" value="1">
        <el-collapse-item style="background-color: antiquewhite;" name="1">
          <template slot="title">
            <span style="color: red;zoom: 1.2">{{ `共有 ${data.errorCount} 条数据异常` }}</span>
            （上传数据后可
            <el-button
                type="text"
                icon="el-icon-download"
                :class="data.errorUrl ? '' :'shake'"
                :disabled="data.errorUrl == null"
                @click.stop="__download(data.errorUrl);__resetData()"
            >
              导出错误数据
            </el-button>
            ）
          </template>
          <div v-for="error in data.errorMsgs" :key="error">
            {{ error }}
          </div>
          <span v-if="data.errorCount > 20">...</span>
        </el-collapse-item>
      </el-collapse>
      <el-table v-if="data.dataList" style="width: 100%" :data="data.dataList" border>
        <table-column v-for="(column, index) in data.tableHead" :key="index" :column="column" show-overflow-tooltip />
      </el-table>
    </div>
  </el-card>
</template>

<script>
import xhr from '@/tools/http/http'
import TableColumn from './TableColumn'
import { downloadFileFromRes } from '@/tools/fileUtil'

export default {
  name: 'ExcelImport',
  components: {
    TableColumn
  },
  props: {
    /**
     * 示例文件url
     */
    exampleUrl: {
      type: String,
      required: true
    },
    /**
     * 上传url
     */
    uploadUrl: {
      type: String,
      required: true
    },
    /**
     * 预览url
     */
    previewUrl: {
      type: String,
      required: true
    },
    /**
     * 预览保存URL
     */
    previewSaveUrl: {
      type: String,
      required: true
    },
    /**
     * 提交时候必须的参数
     */
    fieldsRequired: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      /**
       * 上传的文件
       */
      fileList: [],
      /**
       * 文件备注
       */
      description: '',
      /**
       * 是否禁用预览
       */
      previewDisabled: true,
      /**
       * 是否禁用上传
       */
      uploadDisabled: true,
      /**
       * 错误信息提示
       */
      errMsg: '',
      /**
       * 请求返回数据
       */
      data: null,
      exportLoadingData: false // 下载中
    }
  },
  methods: {
    __download (url) {
      this.exportLoadingData = true
      xhr.EXPORT(url)
        .then(res => {
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
          this.exportLoadingData = false
          console.log(err)
        })
    },
    handleDownloadExample () {
      this.__download(this.exampleUrl)
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList.length = 0
      this.fileList.push(...newFileList)
      this.previewDisabled = this.fileList.length === 0
      this.uploadDisabled = this.fileList.length === 0
      this.errMsg = ''
      this.data = null
    },
    handleChange (file) {
      this.fileList = [file]
      this.previewDisabled = this.fileList.length === 0
      this.uploadDisabled = this.fileList.length === 0
      this.errMsg = ''
      this.data = null
      return true
    },
    handlePreview () {
      const { previewUrl } = this
      const fileForm = this.__buildFileForm()
      if (Object.keys(this.fieldsRequired).length > 0) {
        for (const key in this.fieldsRequired) {
          fileForm.append(key, this.fieldsRequired[key])
        }
      }
      // 上传文件请求
      xhr.UPLOAD(previewUrl, fileForm)
        .then(res => {
          if (res.code === 0) {
            this.data = res.data
            this.errMsg = ''
            this.uploadDisabled = false
          } else {
            this.errMsg = res.msg
            this.uploadDisabled = true
          }
        })
    },
    handleUpload () {
      const { uploadUrl, previewSaveUrl } = this
      this.previewDisabled = true
      this.uploadDisabled = true
      if (this.data && this.data.uuid) {
        const formData = new FormData()
        formData.append('uuid', this.data.uuid)
        formData.append('description', this.description)
        this.__sendUploadRequest(previewSaveUrl, formData)
      } else {
        const fileForm = this.__buildFileForm()
        this.__sendUploadRequest(uploadUrl, fileForm)
      }
    },
    __sendUploadRequest (url, formData) {
      if (Object.keys(this.fieldsRequired).length > 0) {
        for (const key in this.fieldsRequired) {
          formData.append(key, this.fieldsRequired[key])
        }
      }
      xhr.UPLOAD(url, formData)
        .then(res => {
          if (res.code === 0) {
            this.$message.success({
              message: '上传数据成功',
              description: res.msg
            })
            this.errMsg = ''
            if (Object.keys(res.data || {}).length === 0) {
              this.__resetData()
            } else {
              this.data = res.data
            }
            if (res.data.errorCount === 0) {
              this.$emit('finishedUpload')
            }
          } else {
            this.errMsg = res.msg
          }
          this.previewDisabled = false
          this.uploadDisabled = false
        })
        .catch(err => {
          this.previewDisabled = false
          this.uploadDisabled = false
          this.errMsg = '上传异常，请稍后重试！'
          console.log('upload err: ', err)
        })
    },
    /**
     * 构建form表单数据
     * @returns {FormData}
     * @private
     */
    __buildFileForm () {
      const { fileList } = this
      const formData = new FormData()
      formData.append('description', this.description)
      formData.append('file', fileList[0].raw)
      return formData
    },
    /**
     * 重置数据
     * @private
     */
    __resetData () {
      this.$emit('finishedUpload')
      this.fileList = []
      this.description = ''
      this.previewDisabled = true
      this.uploadDisabled = true
      this.data = null
    }
  }
}
</script>

<style scoped lang="less">
  .import-card {
    webkit-box-shadow: unset !important;
    box-shadow: unset !important;
  }

  .import-card > .el-card__header {
    border: unset;
  }

  .alert {
    border-radius: 3px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    color: #fff;
  }

  .alert-info {
    background-color: #00c0ef;
  }

  .shake:hover {
    animation: shake 800ms ease-in-out;
  }

  @keyframes shake { /* 水平抖动，核心代码 */
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(+2px, 0, 0);
    }
    30%, 70% {
      transform: translate3d(-3px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(+3px, 0, 0);
    }
    50% {
      transform: translate3d(-3px, 0, 0);
    }
  }
</style>
