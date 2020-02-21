import axios from 'axios'

const servers = axios.create({
    baseURL: 'http://rap2.taobao.org:38080/app/mock/236721'
})

function request(options) {
    return servers(options)
        .then(res => {
            if(res.status === 200){
                return res.data.data
            }
        }).catch(error => {
            const { status, statusText} = error
            console.log(status+ statusText)
            return Promise.reject(error)
        })
}

export default request