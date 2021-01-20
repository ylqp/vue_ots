<template>
  <div class="home">
    <Menu />
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
  import Menu from '@/components/Menu.vue'
  export default {
    name : 'home',
    components: {
      Menu,
      // HelloWorld
    },
  }
</script>
