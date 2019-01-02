<template>
  <section>
    <el-row class="header-box">
      <el-col :span="12">
        <div class="app-name">
          <h1>XXX管理系统</h1>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="user-container">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="welcome">
              <img :src="getUser.avatar" class="avatar" alt>
              <span class="name comename">欢迎</span>
              <span class="name avatarname">{{ getUser.name }}</span>
              <span><i class="el-icon-arrow-down el-icon--right"></i></span>
            </div>
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
      padding: 20px 0px 20px 80%;
      color: black;
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 30px;
      }
      .welcome {
        display: flex;
        width: 200px;
        height: 40px;
        line-height: 40px;
      }
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
