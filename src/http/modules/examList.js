// 考试列表

import api from '../api'
import request from '../request'

export const getExamListByTypeId = (data) => {
    return request({
        method: 'POST',
        url: api.QueryStudentArrangementListByTypeIdAndCoursecode,
        data
    })
}