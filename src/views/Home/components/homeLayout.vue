<template>
  <el-container>
    <el-header>
      <!-- 菜单 -->
      <Nav></Nav>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <OtsFooter></OtsFooter>
    </el-footer>
  </el-container>
</template>
<script>

import OtsFooter from '@/components/footer.vue'
import Nav from './nav.vue'

import { mapActions } from 'vuex'

export default {
  name: 'HomeLayout',
  components: {
    OtsFooter,
    Nav
  },
  methods: {
    ...mapActions('examType', ['geExamTypeList']),
  },
  async created () {
    await this.geExamTypeList()
  }
}
</script>
<style scoped>
.el-container {
  min-height: 100vh;
}
.el-header {
  background-color: #3388ff;
}
.el-footer {
  height: 40px !important;
}
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
