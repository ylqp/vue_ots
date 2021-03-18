import api from '../api'
import request from '../request'

export const startExam = (data, takePhoto) => {
    return request({
        method: 'POST',
        url: takePhoto ? api.StartAnswerPaperWithPhoto : api.StartAnswerPaper,
        data
    })
}

export const getExamInfo = arrangementId => {
    return request({
        method: 'POST',
        url: api.QueryTestActivityArrangementInfo,
        data:{arrangementId: arrangementId}
    })
}

export const submitExam = data => {
    return request({
        method: 'POST',
        url: api.SubmitAnswerPaper,
        data
    })
}
