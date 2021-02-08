/**
 *  用户请求相关模块
 */
import request from '@/http/request'

// 获取验证码
export const getCheckCode = () => {
    return request({
        method: 'POST',
        url: '/api/checkCode'
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