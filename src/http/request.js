import axios from 'axios'
import config from './config'
import Vue from 'vue'
const ev = new Vue() //element-ui的方法用到
let loadingCount = 0
// ev.$loading({lock: true,text: 'jjjj'})
// const instance = axios.create({
//     baseURL: process.env.VUE_APP_BASE_URL,
//     timeout: 10000 * 60, // 请求超时时间
//     // method: 'post', //默认为get
//     // `transformRequest` 允许在向服务器发送前，修改请求数据
//     transformRequest: [function (data) {
//       // 对 data 进行任意转换处理
//       return data;
//     }],
//     // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
//     transformResponse: [function (data) {
//       // 对 data 进行任意转换处理
//     //   alert(1);
//       return JSON.parse(data);
//     }],
//     // headers: {
//     //   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     // }
//   })
  
//   export default instance

const request = options => {
    return new Promise((resolve, reject) => {
        // 1.创建axios实例
        const instance = axios.create(config)
        //loading
        let loading
        
        loading = ev.$loading({lock: true,text: '拼命加载中...'})
        
        // 2.添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error)
        })

        // 3.添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            if (response.config.url.indexOf('/checkCode')) {
                setTimeout(function() {
                    loading.close()
                }, 1000)
            } else {
                if(response.data.status === 1){
                    setTimeout(function() {
                        
                        loading.close()
                        
                    }, 1000)
                }else {
                    ev.$message({
                        showClose: true,
                        message: response.data.error,
                        type: 'error'
                    });
                }
            }
            
            return response.data   

        }, function (error) {
            // 对响应错误处理

            return Promise.reject(error)
        })

        instance.request(options)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })

    })
}

export default request