<template>
    <div class="tika">
        <div class="topline"></div>
        <div class="content">
            <el-scrollbar style="height:100%">
                <div v-for="(item,index) in questionBack" :key="item.id">
                    <h4>{{item.sequencenumber + '、' + item.name}}</h4>
                    <div v-for="(queItem, queIndex) in item.paperQuestionList"
                        :key="queItem.questionId"
                        class="queItem"
                        :class="queItem.webData.isAnswer ? 'answered' : ''"
                         @click="to(index,queIndex)"
                        >
                        {{queIndex + 1}}
                    </div>
                </div>
            </el-scrollbar>

        </div>
        <div class="btnBox">
            <el-button type="primary" @click="$emit('dealSubmit', 1)">保存</el-button>
            <el-button type="primary" @click="$emit('dealSubmit', 0)">交卷</el-button>
            <!-- <el-button type="primary" @click="toUp">去头部</el-button> -->
        </div>
        <div class="helpLinkBox">
            <router-link class="helpLink" to="home" >考试遇到问题？</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tika',
    props: ['questionBack'],
    methods: {
        dealSubmit () {
            this.$emit('dealSubmit')
        },
        toUp () {

        },
        scrool () {
            this.$nextTick(() => {
                this.firstOffsetTop = this.$refs[this.currentKey][0].offsetTop
                document.addEventListener('scroll', this.onScroll)
                this.list.forEach((val) => {
                    this.itemOffsetTop.push({
                        key: val.key,
                        num: this.$refs[val.key][0].offsetTop - this.firstOffsetTop,
                        height: this.$refs[val.key][0].clientHeight
                    })
                })
            })
        },
      to (i,qi) {
        document.getElementById(`${i+1}-${qi}`).scrollIntoView(true);
      }
    }
}
</script>
<style scoped>
.tika{
    width: 320px;
    padding-bottom: 30px;
    margin-top: 30px;
    /* position: fixed;
    top: 70px;
    right: 30px; */
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 8px 0px 30px rgb(0 68 187 / 16%);
    border-radius: 4px;
}
.topline {
    /* width: 100%; */
    height: 53px;
    border-bottom: 1px solid rgba(238, 240, 246, 1);
}
.content {
    height: 360px;
    padding: 10px 30px;
}
.btnBox {
    display: flex;
    justify-content: space-around;
}
.helpLinkBox {
    margin-top: 15px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: #8D97A3;
    text-shadow: 0px 6px 36px rgb(51 136 255 / 15%);
    /* text-decoration: underline; */
}
.helpLinkBox a {
    color: #8d97a3;
}
.el-button{
    padding: 12px 40px;
}
.queItem {
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 24px;
    font-size: 12px;
    border:1px solid #ccc;
    border-radius: 2px;
    text-align: center;
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}
.queItem.answered {
    color: #fff;
    background: #66aaff;
    border: 1px solid #66aaff;
}
/* .el-scrollbar .el-scrollbar__wrap{
    overflow-x: hidden !important;
} */
</style>
