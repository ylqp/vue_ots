<template>
  <div class="routerBox">
      <ul class="examList">
          <li class="examLi" v-for="examItem in examTypeobj.ActivityTypes" :key="examItem.id">{{examItem.activityTypeName}}</li>
      </ul>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    data () {
        return {
            examTypeobj: {},
        }
    },
    methods:{
        ...mapActions('user', ['getUserFPSettings']),
        // ...mapMutations('user', ['getUserFPSettings'])
        // 获取考试类型
        getExamType () {
            this.$http({
                url: this.OTSAPI.QueryActivityTypeListByStudentIdAndCourseCode,
                // url: '/api/checkCode',
                method: 'post'
            }).then(data => {
                let cdata = data.data
                this.examTypeobj = cdata
                console.log(cdata)
            })
        },
    },
    mounted () {
        this.getExamType()
        
    },
    created () {
        this.getUserFPSettings()
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
