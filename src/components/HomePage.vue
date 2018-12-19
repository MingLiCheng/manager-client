<template>
  <section>
    <h1>这是主页</h1>
    <el-tabs type="border-card">
      <el-tab-pane label="登陆">
        <login></login>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <register></register>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import Login from './mainpage/Login'
import Register from './mainpage/Register'
export default {
  components: {Login, Register}

}

</script>

<style scoped>
section {
  width: 400px;
  margin: 0 auto;
}
</style>
