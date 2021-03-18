<template>
  <div class="quetionContent">
    <SingleSelection v-if="answerMode === 'SingleSelection'" :question="question"/>
    <MultiSelection v-if="answerMode === 'MultiSelection'" :question="question"/>
    <Judgement v-if="answerMode === 'Judgement'" :question="question"/>
    <JudgementCorrectsMistakes
      v-if="answerMode === 'JudgementCorrectsMistakes'"
      :question="question"
    />
    <BlankFilling v-if="answerMode === 'BlankFilling'" :question="question" />
    <EssayQuestion v-if="answerMode === 'EssayQuestion'" />
  </div>
</template>
<script>
import SingleSelection from "./quetions/SingleSelection.vue";
import MultiSelection from "./quetions/MultiSelection.vue";
import Judgement from "./quetions/Judgement.vue";
import JudgementCorrectsMistakes from "./quetions/JudgementCorrectsMistakes.vue";
import BlankFilling from "./quetions/BlankFilling.vue";
import EssayQuestion from "./quetions/EssayQuestion";
export default {
  name: "QuetionContent",
  components: {
    SingleSelection,
    MultiSelection,
    Judgement,
    JudgementCorrectsMistakes,
    BlankFilling,
    EssayQuestion,
  },
  props: ['question'],
  data () {
    return {
      answerMode: this.question.answerMode
    }
  },
  methods: {

  }
};
</script>
<style scoped>
</style>