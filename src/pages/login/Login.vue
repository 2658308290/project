<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="8epx" class="login-box">
        <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
        </el-form-item>
        <el-form-item style="margin-top:30px;" >
          <button @clic="login">登陆</button>
        </el-form-item>

    </el-form>

        <el-dialog
          title="温馨提示"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <span>请输入账号和密码</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary">确定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单验证，需要在el-form-item元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style  scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    height: 300px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

</style>
