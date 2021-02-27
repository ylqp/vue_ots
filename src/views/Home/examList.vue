<template>
    <div class="examList">
      <el-tabs v-model="djjj" @tab-click="handleClick" class="statuTabs">
        <el-tab-pane label="进行中" name="3"></el-tab-pane>
        <el-tab-pane label="未开始" name="2"></el-tab-pane>
        <el-tab-pane label="已结束" name="4"></el-tab-pane>
      </el-tabs>
      <div class="serachBox">
          <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input21">
        </el-input>
      </div>
      <div class="examList-content">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="testactivityarrangementname"
            label="考试名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="starttime"
            label="考试时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="needcnt"
            label="考试机会"
            width="180">
            <template slot-scope="scope">
              <span class="col_red">{{scope.row.currentcnt}}</span>
              <span>{{'/' + scope.row.needcnt}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="coursename"
            label="所属课程">
          </el-table-column>
          <el-table-column
            prop="finalscore"
            label="考试成绩"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <el-button type="primary">开始考试</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt20"
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import { getExamListByTypeId } from '@/http/modules/examList'
  export default {
    name: "ExamList",
    data () {
      return {
        djjj:'',
        input21: '',
        tableData: [],
        examListParams: {
          status: 3,
          activitytypeid: this.$route.params.id
        }
      }
    },
    mounted () {
      // this.getData()
    },
    methods : {
      async getData () {
        // console.log(this.$route.params.id)
        const { data } = await getExamListByTypeId(this.examListParams)
        console.log(data)
        this.tableData = data.ActivityArrangements
      },
      handleClick () {
        this.getData()
      }
    },
    watch : {
      $route:{
        handler:'getData',
        immediate: true
      }
    }
  }
</script>

<style scoped>
.examList{
  position: relative;
}
.statuTabs{
  width: 100%;
  height: 100%;
}
.serachBox{
  width: 200px;
  position:absolute;
  top: -8px;
  right: 0px;
}
</style>
