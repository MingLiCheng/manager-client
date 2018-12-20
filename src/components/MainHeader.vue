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
          <h1>用户名</h1>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'mainheader',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
section {
  line-height: 80px;
  .header-box {
    display: flex;
    justify-content: space-between;
    .user-container{
      text-align: right;
    }
  }
}
</style>
