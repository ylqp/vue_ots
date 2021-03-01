import api from '../api'
import request from '../request'

export const startExam = data => {
    return request({
        method: 'POST',
        url: api.StartAnswerPaper,
        data
    })
}
