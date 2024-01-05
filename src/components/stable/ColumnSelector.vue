<template>
  <el-dialog :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false">
      <span slot="title">
        选择显示列
        <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            style="margin-left: 25px;"
            @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
      </span>
    <el-checkbox-group v-model="checkedFields" @change="handleCheckedFieldChange">
      <el-table :data="dataList" width="100%">
        <el-table-column
            v-for="(column, index) in fields"
            :key="index"
            :prop="column.prop"
            :label="column.label"
            min-width="80"
            :formatter="formatter"
        >
          <el-table-column
              v-for="(item, index) in column.children"
              :key="index"
              :column="item"
              :show-overflow-tooltip="true"
              :formatter="formatter"
          />
        </el-table-column>
      </el-table>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'index',
  props: {
    fields: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: '200'
    }
  },
  data () {
    return {
      dataList: [{}],
      dialogVisible: false,
      checkedFields: [],
      tempFields: [],
      isIndeterminate: false,
      checkAll: true
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    handleCheckAllChange (val) {
      this.checkedFields = val ? this.tempFields : []
      this.checkAll = val
      this.isIndeterminate = false
    },
    handleCheckedFieldChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.tempFields.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.fields.length
    },
    formatter (row, column, cellValue, index) {
      const property = column.property
      if (!this.tempFields.includes(property)) {
        this.tempFields.push(property)
        this.checkedFields.push(property)
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
    confirm () {
      this.dialogVisible = false
      this.$emit('select', this.checkedFields)
    }
  }
}
</script>

<style scoped>

</style>
