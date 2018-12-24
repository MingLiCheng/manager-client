<template>
  <section>
    <h1>这是登陆界面</h1>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="登陆" name="login">
        <login></login>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <register></register>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import Login from './mainpage/Login'
import Register from './mainpage/Register'
export default {
  data() {
    return {
      activeName: 'login'
    }
  },
  components: {Login, Register}

}

</script>

<style lang="scss" scoped>
section {
  h1{
    text-align: center;
  }
  /* text-align: center; */
  width: 400px;
  margin: 0 auto;
}
</style>
