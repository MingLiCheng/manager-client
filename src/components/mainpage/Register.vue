<template>
  <el-form
    :model="registerForm"
    status-icon
    :rules="rules"
    ref="registerForm"
    label-width="80px"
    class="registerForm"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="registerForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nick">
      <el-input type="email" v-model="registerForm.nick" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
      <el-button @click="resetForm('registerForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        email: '',
        name: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [{ type: 'email', required: true, trigger: 'blur', message: '你是傻逼嘛，这是个邮箱！？' }],
        pass: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
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
