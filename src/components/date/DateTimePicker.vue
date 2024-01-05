<template>
 <div class="tBox">
  <span class="box-in">{{ inputValue }}</span>
  <el-date-picker class="datetime-picker"
                  style="width: 100%"
                  size="small"
                  v-model="value"
                  @change="handleDateTimeChanged()"
                  :type="type"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd ">
  </el-date-picker>
 </div>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    value: {
      required: true
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      inputValue: '',
      type: 'daterange',
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '昨日',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '本周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            const nows = start.getDay() || 7
            start.setTime(start.getTime() - 3600 * 1000 * 24 * ((nows - 1)))

            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '上周',
          onClick (picker) {
            const dataValue = new Date()
            const year = dataValue.getFullYear()
            const month = dataValue.getMonth() + 1
            const day = dataValue.getDate()
            var thisWeekStart // 本周周一的时间
            if (dataValue.getDay() === 0) {
              // 周天的情况；
              thisWeekStart =
                    new Date(year + '/' + month + '/' + day).getTime() -
                    (dataValue.getDay() + 6) * 86400000
            } else {
              thisWeekStart =
                    new Date(year + '/' + month + '/' + day).getTime() -
                    (dataValue.getDay() - 1) * 86400000
            }
            const prevWeekStart = thisWeekStart - 7 * 86400000 // 上周周一的时间
            const prevWeekEnd = thisWeekStart - 1 * 86400000 // 上周周日的时间
            const start = new Date(prevWeekStart) // 开始时间
            const end = new Date(prevWeekEnd) // 结束时间
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '本月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(1)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '上月',
          onClick (picker) {
            const start = new Date()
            const end = new Date(start)
            end.setMonth(start.getMonth())
            start.setMonth(start.getMonth() - 1)
            end.setDate(0)
            start.setDate(1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本年',
          onClick (picker) {
            const end = new Date()
            const start = new Date().getFullYear()
            const startYear = new Date(start, 0, 1)
            picker.$emit('pick', [startYear, end])
          }
        },
        {
          text: '去年',
          onClick (picker) {
            // 获取当前时间
            let currentDate = new Date()
            // 获得当前年份4位年
            let currentYear = currentDate.getFullYear() - 1

            // 本年第一天
            const start = new Date(currentYear, 0, 1)
            // 本年最后一天
            const end = new Date(currentYear, 11, 31)
            // end.setHours(23, 59, 59, 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '过去7天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '过去30天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '过去90天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    handleDateTimeChanged (dates) {
      this.$emit('input', this.index, this.value)
      var date = new Date()
      var nowMonth = date.getMonth() + 1
      var strDate = date.getDate()
      var seperator = ''
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = '0' + nowMonth
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate
      let a = Number(this.value[0].split('-').join(''))
      let d = Number(this.value[1].split('-').join(''))
      let b = Number(nowDate)
      let c = b - a
      let e = b - d
      let f = d - a
      if (c === 0 && e === 0) {
        this.inputValue = '今天'
      } else if (c === 1 && e === 0) {
        this.inputValue = '昨天'
      } else if (c > 7 && c <= 14) {
        this.inputValue = '上周'
      } else if (c < 7) {
        this.inputValue = '本周'
      } else if (c === 100 && e === 0) {
        this.inputValue = '过去30天'
      } else if (c === 7 && e === 0) {
        this.inputValue = '过去七天'
      } else if (c === f && c <= 31) {
        this.inputValue = '本月'
      } else if (c <= 300 && e === 0) {
        this.inputValue = '过去90天'
      } else if (e > 30 && e <= 100) {
        this.inputValue = '上月'
      } else if (c <= 1130 && c > 300) {
        this.inputValue = '本年'
      } else if (e >= 9997) {
        this.inputValue = '去年'
      } else {
        this.inputValue = '今年'
      }
    }
  }
}
</script>

<style scoped>
 .tBox{
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
 }
 .box-in{
 min-width: 40px;
  height: 28px;
  border: none;
  font-size: 12px;
border-right:  1px solid #dcdfe6;
  text-align: center;
  line-height: 28px;
  padding-left:5px;
  padding-right:5px;
display: block;
overflow: hidden;
box-sizing: border-box;
 }
 /deep/ .el-date-editor .el-input__icon:nth-child(1){
  display: none;
 }
 /deep/ .el-input__inner {
  border: none;
  height: 28px;
  padding: 0px;
  line-height: 28px;
 }
 /deep/ .el-range-separator{
  line-height: 28px;
 }
</style>
