<template>
    <div class="multi-content">
        <div  v-for="(el, index) in optionList" 
              :key="el.id" 
              class="option"
              :class="el.chosen ? 'chosen' : ''"
              @click="chooseOption(el)"
        >
            <div>{{options[index]}}</div>
            <div v-html="el.content"></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'MultiSelection',
    props: ['question'],
    data () {
        return {
            optionList: []
        }
    },
    created () {
        this.initialOption()
    },
    computed: {
        ...mapState(['options'])
    },
    methods: {
        initialOption () {
            let options = this.question.answerArea.optionList
            let answers = this.question.webData.answer ? this.question.webData.answer : [] // 此时为数组
            options.forEach(item => {
                item.chosen = false
            }) 
            if (answers.length) {
                answers.forEach(id => {
                    options.forEach(item => {
                        if (id == item.id) {
                            item.chosen = true
                        }
                    }) 
                })
            }
            this.optionList = options
        },
        chooseOption (el) {
            // console.log(el.chosen)
            el.chosen = !el.chosen
            // 数据更改 试图强制更新
            this.$forceUpdate()
            // 处理答案
            let answer = []
            const chosenList = this.optionList.filter(item => item.chosen)
            if (chosenList.length) {
                chosenList.forEach(item => {
                    answer.push(item.id)
                })
                this.question.webData.answer = answer
                this.question.webData.isAnswer = true
            } else {
                this.question.webData.answer = ''
                this.question.webData.isAnswer = false
            } 
        }
    }
}
</script>
<style scoped>
    .option {
        line-height: 28px;
        margin-bottom: 12px;
        display: flex;
    }
    .chosen {
        background: #4499ff;
        color: #fff;
    }
</style>