import api from '../api'
import request from '../request'

// 获取用户信息
const getUserFPSettings = () => {
  return request({
    method: 'GET',
    url: api.UserFPSettings
  })
}
// 获取考试类型
const getExamType = (data) => {
  return request({
    method: 'POST',
    url : api.QueryActivityTypeListByStudentIdAndCourseCode,
    data
  })
}

export default {
  getExamType,
  getUserFPSettings
}
