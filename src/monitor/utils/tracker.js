const userAgent = require('user-agent')

const endpoint = 'cn-beijing.log.aliyuncs.com'
const project = 'gj-monitor-demo'
const logstoreName = 'gj-monitor-demo-store'

const getExtraData = () => ({
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name,
    // 用户ID、 token...
})

class SendTracker {
    constructor() {
        this.url = `http://${project}.${endpoint}/logstores/${logstoreName}/track` // 上报路径
        this.xhr = new XMLHttpRequest
    }
    send(data = {}){
        const extraData = getExtraData()
        const log = { ...extraData, ...data }
        // 阿里云 规定：对象的值不能是数字
        for (let key in log) {
            if (typeof log[key] === 'number') {
                log[key] = `${log[key]}`
            }
        }
        console.log('send: ', data, log)
        this.xhr.open('POST', this.url, true)
        const body = JSON.stringify({
            __logs__: [log]
        })
        this.xhr.setRequestHeader('Content-Type', 'application/json') // 请求体类型
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0') // 版本号
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length) // 请求体大小
        this.xhr.onload = () => {
            console.log('tracking success!')
        }
        this.xhr.onerror = (err) => {
            console.log('tracking fail: ', err)
        }
        this.xhr.send(body)
    }
}

export default new SendTracker()