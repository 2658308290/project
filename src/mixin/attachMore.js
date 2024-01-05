import xhr from '@/tools/http/http'

export default {
  data () {
    return {
      getMore: false,
      attachMoreList: [],
      attachMoreLoader: {},
      attachMoreLoading: false,
      more: {},
      control: {}
    }
  },
  methods: {
    async attachMore () {
      const reqList = []
      // 个性化接口
      this.getMore === true && reqList.push(xhr.GET(`./api/attachMore`))
      // 通用获取当前对象关联的数据的接口
      this.attachMoreList.length > 0 && reqList.push(xhr.POST('./api/common/attachMore', this.attachMoreList))
      if (reqList.length > 0) {
        const resList = await Promise.all(reqList)
        resList.forEach(res => res.ok
          ? Object.keys(res.data).forEach(key => this.$set(this.more, key, res.data[key]))
          : this.$notify.error({
            title: '获取选项数据失败',
            message: res.msg
          }))
      }
    },
    async attachMoreFilter (value, loader) {
      if (value == null || (value = value.trim()).length === 0) {
        this.$set(this.more, `${loader}Options`, [])
        return
      }
      this.attachMoreLoading = true
      const moreLoader = this.attachMoreLoader[loader]
      moreLoader.keyword = value
      this.$set(this.more, `${loader}Options`, await this.loadAttachMore(moreLoader))
      this.attachMoreLoading = false
    },
    async loadAttachMore (moreLoader, node = {}) {
      if (moreLoader.disabled) {
        return
      }
      const build = item => item ? `/${item}` : ''
      const res = await xhr.POST('./api/common/attachMoreFilter' + build(node.type) + build(node.value), moreLoader)
      if (res.ok) {
        return res.data
      } else {
        this.$notify.error({
          title: '获取选项数据失败',
          message: res.msg
        })
      }
    },
    async lazyLoadMore (node, loader, resolve) {
      const moreLoader = this.attachMoreLoader[loader]
      const dataLsit = await this.loadAttachMore(moreLoader, node.data) || []
      dataLsit.length === 0 && moreLoader.next != null && this.$set(node.data, 'disabled', true)
      resolve(dataLsit)
    },
    controlRelationOptions (value, control, resetValue = true) {
      const controlItem = this.control[control]
      const isNull = value == null || value.length === 0
      const execute = async ({ name, loader, condition, lazy }) => {
        const moreLoader = this.attachMoreLoader[loader]
        moreLoader.disabled = isNull
        moreLoader.condition == null && (moreLoader.condition = {})
        moreLoader.condition[condition] = value
        resetValue && this.$set(this.form, name, undefined)
        this.$set(this.more, `${loader}Options`, isNull || lazy ? [] : await this.loadAttachMore(moreLoader))
      }
      controlItem instanceof Array ? controlItem.forEach(item => execute(item)) : execute(controlItem || {})
    }
  }
}
