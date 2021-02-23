<template>
    <div>
        {{$route.meta.title}}
    </div>
</template>

<script>
  export default {
    name: "ExamList",
    mounted () {
      // console.log(123)
    },
    methods : {
      getData () {
        console.log(123)
      }
    },
    watch : {
      $route:{
        handler:'getData',
        immediate: true
      }
    }
  }
</script>

<style scoped>

</style>
