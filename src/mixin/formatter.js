export default {
  data () {
    return {}
  },
  methods: {
    formatterInternal (row, column, cellValue) {
      return cellValue === true ? '是' : '否'
    },
    formatterDict (row, column, cellValue) {
      return cellValue === true ? '支持' : '不支持'
    },
    formatterReport (row, column, cellValue) {
      return cellValue === true ? '有' : '无'
    },
    formatterVisible (row, column, cellValue) {
      return cellValue === true ? '可见' : '不可见'
    }
  }
}
