<template>
  <div>
      考试页
  </div>
</template>
<script>
// arrangementId
import { startExam } from '@/http/modules/exam'
export default {
  name: 'Exam',
  data () {
      return {
          isShowExam: false
      }
  },
  method: {
        startExam () {
            // 人脸识别 OR 不需要人脸识别
            
        }
  },
  created () {
    // 判断浏览器 (火狐 谷歌)
    const browser = this.$tools.getBrowser()
    if (browser !== 'Chrome' && browser !== 'FF') { 
        this.$alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: () => {
                window.open('https://www.google.cn/intl/zh-CN/chrome/')
            }
        });
    } else {
        this.isShowExam = true
    }
    
  },
  mounted () {
    if (this.isShowExam) {
        console.log('ok')
        // 进入考试
        startExam({arrangementId: this.$route.params.id})
    }
  }
}
</script>
<style scoped>
</style>