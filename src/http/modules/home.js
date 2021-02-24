import api from '../api'
import request from '../request'

// 获取考试类型
const getExamType = data => {
  return request({
    url : api.QueryActivityTypeListByStudentIdAndCourseCode,
    method: 'post',
    data
  })
}

export default {
  getExamType
}
