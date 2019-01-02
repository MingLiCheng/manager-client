<template>
  <el-container class="header-container">
    <el-header height="80px">
      <main-header></main-header>
      <!-- <window-header></window-header> -->
    </el-header>
    <el-container class="content-container">
      <el-aside width="202px">
        <main-aside></main-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainHeader from './MainHeader'
import MainAside from './MainAside'

// import Register from './mainpage/Register'

export default {
  data() {
    return {
      activeName: 'login'
    }
  },
  components: { MainHeader, MainAside }

}

</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .el-header {
    width: 100%;
    height: 80px;
    padding: 0px;
    background-color: #545c64;
  }
}
.content-container {
  flex: 1;
  .el-aside {
    overflow: hidden;
    border-top: 1px solid #c7c5c5;
    background-color: #545c64;
  }
  .el-main {
    border: 1px solid #f7f5f5;
    // background-color: #462483;
  }
}
</style>
