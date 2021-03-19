<template>
  <div>
      <vue-ueditor-wrap v-model="content" :config="editorConfig"></vue-ueditor-wrap>
  </div>
</template>
<script>
import getEditorConfig from '@/utils/Editor/editorConfig'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'EssayQuestion',
  props: ['question'],
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      content: '',
      editorConfig: {}
    }
  },
  created () {
    this.editorConfig = getEditorConfig('EssayQuestion')
  },
  watch: {
    content: {
      handler (newContent, oldContent) {
        this.question.webData.answer = newContent
        if (newContent) {
          this.question.webData.isAnswer = true
        } else {
          this.question.webData.isAnswer = false
        }
      }
    }
  }
}
</script>
<style scoped>
</style>