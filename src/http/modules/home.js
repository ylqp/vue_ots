import api from '../api'
import request from '../request'
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
