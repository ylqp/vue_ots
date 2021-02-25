/**
 */
import request from '../request'

// 获取验证码
export const getCheckCode = () => {
    return request({
        method: 'POST',
        url: '/api/checkCode',
        responseType: 'arraybuffer'
    })
}
// 登录
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/api/auth/ots',
        data
    })
}