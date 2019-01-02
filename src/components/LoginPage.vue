<template>
  <section>
    <h1>这是登陆界面</h1>
    <el-tabs type="border-card" :value="getLoginActiveName">
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {

    }
  },
  components: {Login, Register},
  computed: {
    ...mapGetters(['getLoginActiveName'])
  }

}

</script>

<style lang="scss" scoped>
section {
  h1{
    text-align: center;
    padding: 40px 20px 20px 20px;
  }
  /* text-align: center; */
  width: 400px;
  margin: 0 auto;
}
</style>
