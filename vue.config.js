module.exports = {
    devServer: {
        open: true,
        port: 3241,
        proxy: {
            '/api': {
                target: 'http://172.16.6.130:8080/oxer',//https://otstest.chinaedu.net:8443/
                // https: true,
                // target: 'https://otstest.chinaedu.net:8443/mini',//https://otstest.chinaedu.net:8443
                // target: 'https://api.github.com',
                pathRewrite: {'^/api' : ''},
                ws: true,
                changeOrigin: true,     // target是域名的话，需要这个参数，
                secure: false
            }
        },
        // proxy: 'https://otstest.chinaedu.net:8443/mini'

    }
}
