<template>
  <el-menu
    :default-active="$route.path"
    :router="true"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#3388ff"
    text-color="#FFF"
    active-text-color="#fff"
    hover-text-color="#fff"
  >
    <!-- <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">考试</template>
      <el-menu-item index="2-1">模拟考试</el-menu-item>
      <el-menu-item index="2-2">期中考试</el-menu-item>
      <el-menu-item index="2-3">期末考试</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">
      我的
    </el-menu-item> -->
    <el-menu-item
        v-for="item in menuList"
        :key="item.path"
        :index="item.path"
    >{{item.meta.title}}</el-menu-item>
  </el-menu>
</template>
<script>
export default {
    name: "Menu",
    data() {
        return {
            menuList : [],
            activeIndex2: '2-1'
        };
    },
    created () {

        this.menuList = this.$router.options.routes.filter(item => item.name === 'Home')[0].children
        console.log(this.menuList)
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
