<template>
    <div class="examList">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="statuTabs">
        <el-tab-pane label="进行中" name="first"></el-tab-pane>
        <el-tab-pane label="未开始" name="second"></el-tab-pane>
        <el-tab-pane label="已结束" name="third"></el-tab-pane>
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
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { getExamListByTypeId } from '@/http/modules/examList'
  export default {
    name: "ExamList",
    data () {
      return {
        activeName: '',
        input21: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
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
      },
      handleClick () {
        console.log(this.activeName)
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
  width: 100%;
  min-height: 100%;
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
