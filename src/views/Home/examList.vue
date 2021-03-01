<template>
    <div class="examList">
      <el-tabs v-model="status" @tab-click="handleClick" class="statuTabs">
        <el-tab-pane label="进行中" name="3"></el-tab-pane>
        <el-tab-pane label="未开始" name="2"></el-tab-pane>
        <el-tab-pane label="已结束" name="4"></el-tab-pane>
      </el-tabs>
      <div class="serachBox">
        <el-input
          clearable
          prefix-icon="el-icon-search"
          placeholder="请输入内容  回车搜索"
          v-model="examListParams.fulltext">
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
            <template slot-scope="scope">
              <el-button 
                type="primary" 
                @click="$router.push({
                  name: 'exam',
                  params: {
                    id: scope.row.testactivityarrangementid
                  }
                })"
              >开始考试</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :page-size.sync="page.pageSize"
          :current-page.sync="page.pageNo"
          class="mt20"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
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
        status: "2",
        tableData: [],
        total:0,
        examListParams: {
          status: "3",
          fulltext: '',
          activitytypeid: this.$route.params.id
        },
        page: {
          pageSize: 10,
          pageNo: 1
        }
      }
    },
    mounted () {
      // this.getData()
      document.onkeydown = e => {

        let _key = window.event.keyCode
        if (_key === 13) {
          this.getData()
        }
      }
    },
    methods : {
      async getData () {
        this.examListParams.activitytypeid = this.$route.params.id
        let params = Object.assign(this.examListParams, this.page)
        const { data } = await getExamListByTypeId(params)
        console.log(data)
        this.tableData = data.ActivityArrangements
        this.total = data.total
      },
      handleClick () {
        this.examListParams.status = this.status
        this.page.pageNo = 1
        this.getData()
      },
      handleCurrentChange (val) {
        this.getData()
      },
      handleSizeChange (val) {
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
