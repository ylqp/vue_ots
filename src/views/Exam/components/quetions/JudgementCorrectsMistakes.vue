<template>
  <div>
      <div class="judgeCorrect-content">
        <div 
          v-for="item in optionList" 
          :key="item.id"
          class="judgeOption"
          :class="answer === item.id ? 'chosen' : ''"
          @click="chooseOption(item.id)"
        >
          {{item.webContent}}
        </div>
        <div class="correctBox" v-show="isCorrect">
          <el-input v-model="correctContent" @change="dealJCAnswer"></el-input>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'JudgementCorrectsMistakes',
  props: ['question'],
  data () {
    return {
      answer: '',
      // 改错内容
      correctContent: '222',
      optionList: []
    }
  },
  computed: {
    /**
     * 是否需要改错
     */
    isCorrect () {
      let option = this.optionList.filter(item => item.id === this.answer)
      if (option.length && option[0].webContent === '错误') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.initialOption()
  },
  methods: {
    initialOption () {
      let options = this.question.answerArea.optionList
      options.forEach(item => {
        if (item.content === '对' || item.content === '正确' || item.content === 'T') {
          item.webContent = '正确'
        }
        if (item.content === '错' || item.content === '错误' || item.content === 'F') {
          item.webContent = '错误'
        }
      })
      this.optionList = options
    },
    chooseOption (id) {
      this.answer = id
      this.dealJCAnswer()
    },
    /**
     * 处理多选题答案
     * 多选题答案格式 {id: 1, content: '改错内容'}
     */
    dealJCAnswer () {
      let answerData = {}
      answerData.id = this.answer
      if (this.isCorrect) { // 不需要改错
        answerData.content = this.correctContent
      }
      this.question.webData.answer = answerData
      this.question.webData.isAnswer = true
    }
  }
}
</script>
<style scoped>
.judgeOption {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 25px;
  margin-right: 30px;
  cursor: pointer;
}
.chosen {
  background: #4499ff;
  color: #fff;
}
</style>