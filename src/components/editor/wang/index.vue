<template>
  <div :style="{width: containerWidth, border: '1px solid rgba(0, 0, 0, 0.1)'}">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
    />
    <Editor
        :style="{height: height, 'overflow-y': 'hidden'}"
        :defaultConfig="editorConfig"
        v-model="value"
        @onChange="onChange"
        @onCreated="onCreated"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'RichEditor',
  components: { Editor, Toolbar },
  data () {
    return {
      editor: null,
      html: '<p>请输入内容</p>',
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            server: '/uploadFile/upload',
            fieldName: 'file',
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
            meta: {
              token: 'xxx'
            },
            customInsert (res, insertFn) {
              if (res.ok) {
                const {accessUrl, fileName} = res.data
                insertFn(accessUrl, fileName, accessUrl)
              } else {
                console.log('上传失败')
              }
            }
          },
          uploadVideo: {
            server: '/uploadFile/upload',
            fieldName: 'file',
            maxNumberOfFiles: 1,
            allowedFileTypes: ['video/*'],
            maxFileSize: 100 * 1024 * 1024,
            meta: {
              token: 'xxx'
            },
            customInsert (res, insertFn) {
              if (res.ok) {
                const {accessUrl, fileName} = res.data
                insertFn(accessUrl, fileName, accessUrl)
              } else {
                console.log('上传失败')
              }
            }
          }
        }
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 480
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    relObjType: {
      type: String,
      required: true
    },
    relObjId: {
      type: [Number, String],
      required: false,
      default: ''
    }
  },
  created () {

  },
  mounted () {
    console.info(this.value)
    this.html = this.value
  },
  computed: {
    containerWidth () {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // If it is pure digit
        return `${width}px`
      }
      return width
    }
  },
  methods: {
    onCreated (editor) {
      console.log(this.height)
      this.editor = Object.seal(editor)
    },
    onChange (editor) {
      this.$emit('input', editor.getHtml())
    },
    beforeDestroy () {
      const editor = this.editor
      if (editor == null) return
      editor.destroy()
    }
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>

</style>
