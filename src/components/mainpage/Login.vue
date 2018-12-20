<template>
  <el-form
    :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm"
    label-width="80px"
    class="loginForm"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="loginForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
      <el-button @click="test">测试</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      this.$http({
        method: 'get',
        url: '/api/users/' + this.loginForm.email
      }).then(
        result => {
          console.log(result.data.msg)

          if (result.data.msg === 0) {
            callback(new Error('用户名不存在'))
          } else {
            callback()
          }
        }
      )
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: ''

      },
      rules: {
        email: [
          { required: true, message: '这是一个必需的项目' },
          { type: 'email', message: '这不是一个邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/users/login', this.loginForm).then(result => {
            // console.log(result)
            if (result.data.success) {
              // 成功操作 token
              const { token } = result.data
              localStorage.setItem('eleToken', token)
              this.$message.success('登陆成功')
              // 解析token
              // const decode = jwt_decode(token);

              // // 存储数据
              // this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
              // this.$store.dispatch("setUser", decode);

              // 成功 跳转
              this.$router.push('/index')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    test() {
      // alert('1')
    }
  }
}
</script>

<style>
.el-form-item__label {
  text-align: center;
}
</style>
