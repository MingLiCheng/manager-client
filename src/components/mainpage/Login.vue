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
      <el-input type="email" v-model="loginForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {

    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        nick: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [
          { validator: validateEmail, type: 'email', required: true, trigger: 'blur', message: '你是傻逼嘛，这是个邮箱！？' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.el-form-item__label{
  text-align: center
}
</style>
