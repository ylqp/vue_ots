// 考试列表

import api from '../api'
import request from '../request'

export const getExamListByTypeId = data => {
    return request({
        method: 'GET',
        url: api.QueryStudentArrangementListByTypeIdAndCoursecode,
        data
    })
}