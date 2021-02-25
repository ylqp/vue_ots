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
const getExamType = () => {
  return request({
    method: 'GET',
    url : api.QueryActivityTypeListByStudentIdAndCourseCode
  })
}

export default {
  getExamType,
  getUserFPSettings
}
