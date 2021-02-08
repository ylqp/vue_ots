import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
// 默认带cookie
axios.defaults.withCredentials = true
const request = axios.create({
    
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // 请求前统一处理
    console.log(config)
    config.data = qs.stringify(config.data)
    // 最后返回
    return config
})

request.interceptors.response.use((response) => {
    console.log(response.headers)
    return response
}, async (error) => {
    // 错误处理
    if (error.response) { // 请求收到响应，状态码超出了2XX
        Message.error('请求失败')
        
    } else if (error.request) { // 请求发出去了但是没有收到响应，一般为请求超时
        Message.error('请求超时')
    } else {
        Message.error(`请求未知错误：${error.message}`)
    }

    // 最后把请求失败的错误对象抛出， 扔给上一个调用者
    return Promise.reject(error)
})

export default request