<template>
  <div class="questionStem">
      <div v-html="stem"></div>
  </div>
</template>
<script>
export default {
  name: 'QuestionStem',
  props: ['stem']
}
</script>
<style scoped>
</style>