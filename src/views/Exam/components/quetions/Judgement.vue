<template>
  <div class="judge-content">
      <div 
        v-for="item in optionList" 
        :key="item.id"
        class="judgeOption"
        :class="answer == item.id ? 'chosen' : ''"
        @click="chooseOption(item.id)"
      >
        {{item.webContent}}
      </div>
  </div>
</template>
<script>
export default {
  name: 'Judgement',
  props: ['question'],
  data () {
    return {
      answer: this.question.webData.answer,
      optionList: []
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
      this.question.webData.answer = id
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