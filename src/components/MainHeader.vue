<template>
  <section>
    <el-row class="header-box">
      <el-col :span="12">
        <div class="app-name">
          <h1>系统名</h1>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="user-container">
          <el-dropdown trigger="click" @command="handleCommand">
            <span>
              {{ getUser.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'mainheader',
  data() {
    return {

    }
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      switch (command) {
        case 'personInfo':
          this.showPersonInfo()
          break
        case 'logOut':
          this.logOut()
          break

        default:
          break
      }

    },
    showPersonInfo() {
      console.log('展示个人信息页面');

    },
    logOut() {
      // 登出
      // 删除本地的token
      localStorage.removeItem('eleToken')
      // 设置 vuex的状态 -> 清除 user的信息，关掉 授权
      this.$store.dispatch("setUser", null)
      this.$store.dispatch("setIsAuthenticated", false) // !this.isEmpty(decode)
      // 跳转到登路页面
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
}
</script>

<style lang="scss" scoped>
section {
  line-height: 80px;
  .header-box {
    display: flex;
    justify-content: space-between;
    .user-container {
      color: black;
      text-align: right;
      .el-dropdown {
        color: black;
        span {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
