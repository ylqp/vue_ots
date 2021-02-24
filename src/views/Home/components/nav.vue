<template>
  <div class="nav">
      <div class="nav-content">
          <div class="logo">
              <img src="@/assets/images/logo.png" alt="">
          </div>
          <template v-if="isPC">
              <div class="nav-list">
                  <div 
                    class="nav-item"
                    v-for="item in examTypeList.ActivityTypes"
                    :key="item.activityTypeName"
                  >
                      {{item.activityTypeName}}
                  </div>
              </div>
          </template>
          <template v-else>
              <div></div>
          </template>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Nav',
  data () {
      return {
          isPC: true
      }
  },
  computed: {
      ...mapState('examType', ['examTypeList']),
      getRoutePath () {
          return this.$route.path
      }
  },
  methods: {
  },
  created () {

  }
}
</script>
<style scoped>
  .nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .nav-content {
    position: relative;
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: start;
  }
  .nav-list {
    margin-left: 30px;
    display: flex;
  }
  .nav-item {
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #fff;
  }
</style>