<template>
  <el-col>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <router-link to="/index">
        <el-menu-item index="0">
          <i class="fa fa-margin fa-server"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      <template v-for="item in asidenavs">
        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="'fa fa-margin '+item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
            <el-menu-item :index="citem.path">
              <span slot="title">{{citem.name}}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      asidenavs: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          children: [{ path: "foundlist", name: "资金流水" }]
        },
        {
          icon: "fa-asterisk",
          name: "用户管理",
          path: "info",
          children: [{ path: "userslist", name: "用户列表" }]
        },
        {
          icon: "fa-asterisk",
          name: "菜单管理",
          path: "foods",
          children: [{ path: "foodslist", name: "菜单列表" }]
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  border: 0px;
  overflow: hidden;
}
.el-menu {
  overflow: hidden;
}
</style>
