<template>
  <div class="blank-content">
      <div v-for="(el, index) in inputAreaList" :key="el.id">
        <el-input v-model="el.content">
          <i slot="prefix" class="inputNum">{{index+1}}</i>
        </el-input>
      </div>
  </div>
</template>
<script>
export default {
  name: 'BlankFilling',
  props: ['question'],
  data () {
    return {
      aa:'1',
      inputAreaList: this.question.answerArea.inputAreaList
    }
  },
  created () {
    // console.log(this.question)
  },
  computed: {
    
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
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

  }
}
</script>
<style scoped>
.inputNum {
  /* vertical-align: mi; */
}
</style>