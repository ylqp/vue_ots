import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '@/router'
// 默认带cookie
axios.defaults.withCredentials = true
const request = axios.create({
    
})

function redirectLogin () {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

// 请求拦截器
request.interceptors.request.use((config) => {
    // 请求前统一处理
    // console.log(config)
    config.data = qs.stringify(config.data)
    // 最后返回
    return config
})

request.interceptors.response.use((response) => {
    if (response.config.url.includes('checkCode')) {
        return response
    }
    // 响应回来统一处理  data error status==> 0 失败  ==> 1 成功
    if (response.data.status === 1) {
        return response.data
    } else {
        Message.error(response.data.error || '接口请求错误')
    }
}, async (error) => {
    // 错误处理
    if (error.response) { // 请求收到响应，状态码超出了2XX
        const { status } = error.response
        if (status === 400) {
            Message.error('请求参数错误')
        } else if (status === 401) {
            Message.error('登录超时，请重新登录')
            redirectLogin()
        } else {
            Message.error('请求失败')
        }
    } else if (error.request) { // 请求发出去了但是没有收到响应，一般为请求超时

        Message.error('请求超时')

    } else {

        Message.error(`请求未知错误：${error.message}`)
        
    }

    // 最后把请求失败的错误对象抛出， 扔给上一个调用者
    return Promise.reject(error)
})

export default request