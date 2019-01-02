<template>
  <div class="logFund">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" width="40%" center:true>
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px auto;width:420px;"
        >
          <el-form-item prop="id" label="id:">
            <el-input type="id" v-model="form.id" disabled></el-input>
          </el-form-item>

          <el-form-item prop="email" label="邮箱:">
            <el-input type="email" v-model="form.email" disabled></el-input>
          </el-form-item>

          <el-form-item prop="name" label="用户名:">
            <el-input type="name" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码:">
            <el-input type="password" v-model="form.password" placeholder="请直接输入新密码"></el-input>
          </el-form-item>

          <!-- <el-form-item prop="identity" label="权限">
            <el-input type="identity" v-model="form.identity" placeholder="请直接输入新密码"></el-input>
          </el-form-item> -->
          <el-form-item label="权限:">
            <el-select v-model="form.identity" placeholder="权限类型">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="普通员工" value="ordinary"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogsection",
  props: {
    dialog: Object,
    form: Object,
    getProfiles: Function
  },
  data() {
    return {
      form_rules: {
        password: [
          { required: true, message: "这是一个必须项", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url = this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$http.post(`/api/users/${url}`, this.form).then(result => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            })
            this.dialog.show = false
            this.getProfiles()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

