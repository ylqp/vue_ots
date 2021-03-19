<template>
    <div class="examPage">
        <template v-if="isShowExam">
        <div class="left">
            <div class="paperTitle">
                <span class="f22 fb">{{arrangementName}}</span>
            </div>
            <div class="answerArea">
                <div v-for="item in questionBack" :key="item.id">
                    <div class="mb20">
                        <span>{{item.sequencenumber + '.'}}</span><span>{{item.name}}</span>
                    </div>
                    
                    <div v-for="queItem in item.paperQuestionList" :key="queItem.questionId">
                        <template v-if="queItem.answerMode !== 'Composite'">
                        <!-- <template> -->
                            <div class="queStemBox mb20">
                                <question-stem :stem='queItem.stem'/>
                            </div>
                            <div class="queContentBox mb20">
                                <QuestionContent :question="queItem" />
                            </div>
                        </template>
                        <!-- 复合题 -->
                        <template v-else>
                            <div v-for="subItem in queItem.subqustionList" :key="subItem.questionId">
                                <div class="queStemBox mb20">
                                    <question-stem :stem='subItem.stem'/>
                                </div>
                                <div class="queContentBox mb20">
                                    <QuestionContent :question="subItem" />
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <Camera/>
            <Tika :questionBack="questionBack" v-on:dealSubmit="dealSubmit"/>
        </div>
        </template>
        <template v-else>
            <div>不能考试</div>
        </template>
    </div>
</template>
<script>
// arrangementId
import { startExam, getExamInfo, submitExam } from "@/http/modules/exam";
import { getExamFlag, dealQueItemAnswer, mountQueItemAnswer } from "@/utils/Exam";
import Tika from './components/tika.vue'
import Camera from './components/camera.vue'
import QuestionStem from './components/questionStem.vue'
import QuestionContent from './components/quetionContent.vue'
export default {
    name: "Exam",
    components: {
        Tika,
        Camera,
        QuestionStem,
        QuestionContent
    },
    data() {
        return {
            // 是否可以展示考试页
            isShowExam: false,
            // 活动名称
            arrangementName: '',
            // 试题包
            questionBack: [],
            // 从开始接口获取到 ===> 需要传回submit的参数
            initialParam: {},
        };
    },
    methods: {
        async dealStartExam() {
            // 人脸识别 OR 不需要人脸识别
            const { data: examInfo } = await getExamInfo(this.$route.params.id)
            // 开始考试接口调用
            const { data } = await startExam({arrangementId: this.$route.params.id}, examInfo.takePhotoInTest)
            
            // 验证是否可以正常考试
            const examFlag = getExamFlag(data.answerPaperFlag);
            
            if (!examFlag.isAnswer) { // 提示信息
                this.$message.error(examFlag.msg)
                this.isShowExam = false
            } else { // 验证通过
                /**
                 * 考试基本信息=> 页面需要
                 */
                let { arrangementName } = data
                this.arrangementName = arrangementName
                /**
                 * 考试基本信息=> 提交参数
                 */
                let { arrangementId, answerPaperRecordId, studentTestActivityScoreId, tempSaveAnswerExpire } = data
                this.initialParam = {
                    // 活动id
                    arrangementId,
                    // 作答记录id
                    answerPaperRecordId,
                    // 学生考试活动成绩id
                    studentTestActivityScoreId,
                    // 临时保存信息
                    tempSaveAnswerExpire
                }
                // console.log(this.initialParam)
                /**
                 * 题目处理
                 */
                let questionBack = data.paper.psOutputDto ? data.paper.psOutputDto : []
                questionBack = questionBack.filter(item => item.paperQuestionList)
                
                questionBack.forEach(item => {// 大题结构
                    item.paperQuestionList.forEach((questionItem) => { // 单题
                        if (questionItem.answerMode !== 'Composite') {
                            questionItem.webData = {}
                            questionItem.webData.answer = ''
                            questionItem.webData.isAnswer = false

                        } else {
                            if (questionItem.subqustionList) {
                                questionItem.subqustionList.forEach((subQueItem) => {
                                    subQueItem.webData = {}
                                    subQueItem.webData.answer = ''
                                    subQueItem.webData.isAnswer = false
                                })
                            }
                            questionItem.webData = {}
                            questionItem.webData.answer = ''
                            questionItem.webData.isAnswer = false
                        }
                        questionItem = mountQueItemAnswer(questionItem)
                    })
                });

                // 赋值给
                this.questionBack = questionBack
            }
        },
        dealBrowser () {
            // 判断浏览器 (火狐 谷歌)
            const browser = this.$tools.getBrowser();
            if (browser !== "Chrome" && browser !== "FF") {
            // if (browser === "Chrome") {
                this.$alert("这是一段内容", "标题名称", {
                    confirmButtonText: "确定",
                    callback: () => {
                        window.open("https://www.google.cn/intl/zh-CN/chrome/");
                    },
                });
                return false
            } else {
                // this.isShowExam = true;
                return true
            }
        },
        /**
         * temp 1:保存 0：提交
         */
        async dealSubmit (temp) {
            const params = this.getSubmitParams(temp)

            console.log(params)
            const { data } = await submitExam(params)
            // console.log(data)
        },
        /**
         * 获取考试答案
         */
        getSubmitParams (temp) {
            let questionAnswerList = []
            // 获取试题答案列表
            this.questionBack.forEach(item => {
                item.paperQuestionList.forEach(item => {
                    const answerItem = dealQueItemAnswer(item)
                    questionAnswerList.push(answerItem)
                })
            })
            
            questionAnswerList = questionAnswerList.filter(item => item && JSON.stringify(item) !== '{}')

            let paperAnswerResult = {
                answerPaperRecordId: this.initialParam.answerPaperRecordId,
                questionAnswerList: questionAnswerList
            }
            let params = {
                // 从start接口获取的参数
                ...this.initialParam, 
                // 保存还是提交
                temp,
                // 试题答案
                paperAnswerResult: JSON.stringify(paperAnswerResult)
            }
            return params
        }
    },
    created() {

        const isBrowserOk = this.dealBrowser()
        this.isShowExam = isBrowserOk
        if (this.isShowExam) {
            this.dealStartExam()
        }
    },
    async mounted() {
        // if (this.isShowExam) {
        //     // 进入考试
        //     const { data } = await startExam({arrangementId: this.$route.params.id})
        //     const examFlag = getExamFlag(data.answerPaperFlag);
        //     if (!examFlag.isAnswer) {
        //         this.$message.error(examFlag.msg)
        //     } else {
        //         // 处理数据

        //     }
        // }
    },
};
</script>
<style scoped>
    .examPage {
        background: #F9FBFE;
        min-height: 100vh;
        display: flex;
        min-width: 1080px;
    }
    .left {
        margin-left: 90px;
        min-height: 100vh;
        width: calc(100% - 480px);
        min-width: 600px;
        background: #fafafa;
        flex-shrink: 0;
    }
    .right {
        width: 390px;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        padding: 30px 0;
        position: fixed;
        right: 0;
    }
    .paperTitle {
        width: 80%;
        margin: 0 auto;
        height: 80px;
        border-bottom: 1px solid #eef0f6;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .queStemBox {
        margin-bottom: 20px;
    }
</style>