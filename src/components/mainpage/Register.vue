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
    <el-form-item label="昵称" prop="name">
      <el-input type="email" v-model="registerForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPassword">
      <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
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
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email: "",
        name: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            trigger: "blur",
            message: "请填写邮箱"
          }
        ],
        pass: [{ validator: validatePass, required: true, trigger: "blur" }],
        checkPass: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          this.$http
            .post("/api/users/register", this.registerForm)
            .then(result => {
              if (result.data) {
                this.$message({
                  message: "注册成功！",
                  type: "success",
                  duration: 1000
                });
              }
              this.$store.dispatch('setLoginActiveName', 'login')
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
