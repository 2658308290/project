<template>
  <div class="tBox">
    <span class="box-in">
      <i class="el-icon-date box-in-date-icon"></i>
    </span>
    <span class="box-in-date-type" v-if="dateTypeName != null">
      {{ dateTypeName }} |
    </span>
    <el-date-picker ref="datePicker"
                    size="small"
                    v-model="value"
                    @change="handleDateChanged"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',
  data () {
    return {
      dateTypeName: null,
      value: [],
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            picker.$emit('pick', [start, end, '0 day', '今天'])
          }
        },
        {
          text: '昨日',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end, '1 day', '昨天'])
          }
        },
        {
          text: '本周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            const nows = start.getDay() || 7
            start.setTime(start.getTime() - 3600 * 1000 * 24 * ((nows - 1)))

            picker.$emit('pick', [start, end, '0 week', '本周'])
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
            picker.$emit('pick', [start, end, '1 week', '上周'])
          }
        },
        {
          text: '本月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(1)
            picker.$emit('pick', [start, end, '0 month', '本月'])
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
            picker.$emit('pick', [start, end, '1 month', '上月'])
          }
        }, {
          text: '本年',
          onClick (picker) {
            const end = new Date()
            const start = new Date().getFullYear()
            const startYear = new Date(start, 0, 1)
            picker.$emit('pick', [startYear, end, '0 year', '本年'])
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
            picker.$emit('pick', [start, end, '1 year', '本年'])
          }
        }, {
          text: '过去7天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end, '7 day', '过去7天'])
          }
        }, {
          text: '过去30天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end, '30 day', '过去30天'])
          }
        }, {
          text: '过去90天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end, '90 day', '过去90天'])
          }
        }]
      }
    }
  },
  props: {
    dataTimeFunction: {
      type: String,
      required: true
    },
    params: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      if (this.dataTimeFunction === 'absolute_time' && this.params) {
        this.value = this.params
      } else if (this.dataTimeFunction === 'relative_time' && this.params) {
        this.value = this.params[0]
      }
    },
    handleDateChanged (dates) {
      // Reset selected date type.
      this.dateTypeName = null
      if (dates && dates.length >= 2) {
        const start = moment(dates[0]).format('YYYY-MM-DD')
        const end = moment(dates[1]).format('YYYY-MM-DD')
        if (dates.length === 2) {
          this.value = [start, end]
          this.$emit('input', {timeFunction: 'absolute_time', timeParams: [start, end]})
        }
        if (dates.length === 4) {
          this.value = [start, end]
          this.dateTypeName = dates[3]
          this.$emit('input', {timeFunction: 'relative_time', timeParams: [dates[2]]})
        }
      } else {
        this.$emit('input', {timeFunction: null, timeParams: []})
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .tBox {
    display: flex;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    width: 240px;
  }

  .box-in {
    height: 30px;
    border: none;
    line-height: 30px;
    padding: 0 5px;
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    width: 40px;

    &-date-icon {
      width: 20px;
    }
  }

  .box-in-date-type {
    width: fit-content;
    white-space: nowrap;
    font-size: 12px;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }

  /deep/ .el-date-editor .el-input__icon:nth-child(1) {
    display: none;
  }

  /deep/ .el-input__inner {
    border: none;
    height: 30px;
    padding: 0px;
    line-height: 30px;
  }
</style>
