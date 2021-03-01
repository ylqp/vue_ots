<template>
  <div class="routerBox">
      <ul class="examList">
            <li 
                class="examLi" 
                v-for="item in examTypeList.ActivityTypes" 
                :key="item.id"
                @click="goExamList(item.id, item.takePhotoInTest)"
            >
                {{item.activityTypeName}}
            </li>
      </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getExamListByTypeId } from '@/http/modules/examList'
export default {
    data () {
        return {
            examTypeobj: {},
        }
    },
    computed: {
        ...mapState('examType', ['examTypeList'])
    },
    methods:{
        goExamList (examTypeId, needPhoto) {
            this.$router.push({
                name: 'examList',
                params: {
                  id: examTypeId,
                  takePhotoInTest: needPhoto
                }
            })
        }
    },
    mounted () {
    },
    created () {
    }
}
</script>
<style scoped>
    .routerBox{
        width: 100%;
        height: 100%;
        background-color: #fafafa;
    }
    .examList{
        display: flex;
        flex-wrap: wrap;
    }
    .examLi{
        list-style: none;
        width: 240px;
        height: 220px;
    }
</style>
