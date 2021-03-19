<template>
  <div class="blank-content">
      <div v-for="(el, index) in inputAreaList" :key="el.id">
        <el-input v-model="el.content" v-if='!isEditor'>
          <i slot="prefix" class="inputNum">{{index+1}}</i>
        </el-input>
        <!-- <Editor :isBlank='isEditor' :contentObj="el" v-else/> -->
        <vue-ueditor-wrap v-model="el.content" :config="editorConfig" v-else></vue-ueditor-wrap>
      </div>
  </div>
</template>
<script>
import getEditorConfig from '@/utils/Editor/editorConfig'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'BlankFilling',
  props: ['question'],
  components: {
    VueUeditorWrap,
  },
  data () {
    return {
      editorConfig: {},
      isEditor: true,
      inputAreaList: []
    }
  },
  created () {
    if (this.isEditor) {
      // 编辑器设置
      this.editorConfig = getEditorConfig('BlankFilling')
    }
    this.initialAnswer()
  },
  computed: {
    
  },
  watch: {
    // 如果 `inputAreaList` 发生改变，这个函数就会运行
    inputAreaList: {
      handler (newContent, oldContent) {
        // console.log(newContent)
        // 可以在这儿处理答案
        let answerList = []
        let doneList = this.inputAreaList.filter(item => item.content)
        if (doneList.length) {
            doneList.forEach(item => {
            answerList.push({
              id: item.id,
              content: item.content
            })
          })
          this.question.webData.answer = answerList
          this.question.webData.isAnswer = true
        } else {
          this.question.webData.answer = answerList
          this.question.webData.isAnswer = false
        }
      },
      // 对象需要深度监听
      deep: true
    },
  },
  methods: {
    initialAnswer () {
      let answers = this.question.webData.answer ? this.question.webData.answer : [] // 此时为数组
      let tempInputList = JSON.parse(JSON.stringify(this.question.answerArea.inputAreaList)) 
      if (answers.length) {
        answers.forEach(answerItem => {
          tempInputList.forEach(item => {
            if (answerItem.id === item.id) {
              item.content = answerItem.content
            }
          })
        })
      }
      this.inputAreaList = tempInputList
    }
  }
}
</script>
<style scoped>
.inputNum {
  /* vertical-align: mi; */
}
</style>