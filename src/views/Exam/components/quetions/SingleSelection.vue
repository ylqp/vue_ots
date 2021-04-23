<template>
    <div class="single-content">
        <div  v-for="(el, index) in answerArea.optionList" 
              :key="el.id" 
              class="choiceOption"
              :class="answer==el.id? 'choiced' : ''"
              @click="choiceOption(el)"
        >
            <div class="option">{{options[index]}}</div>
            <div v-html="el.content"></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'SingleSelection',
    props: ['question'],
    data () {
        return {
            answerArea: this.question.answerArea,
            answer: this.question.webData.answer
        }
    },
    computed: {
        ...mapState(['options'])
    },
    methods: {
        choiceOption (el) {
            this.answer = el.id
            this.question.webData.answer = el.id
            this.question.webData.isAnswer = true
        }
    },
    mounted () {
        
    }
}
</script>
<style scoped>
    .choiceOption {
        line-height: 28px;
        margin-bottom: 12px;
        display: flex;
    }
    .choiced {
        background: #4499ff;
        color: #fff;
    }
</style>