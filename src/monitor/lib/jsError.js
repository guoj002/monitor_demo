import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'

export function injectJsError() {
    console.log('injectJsError')
    // 获取格式化的栈信息
    const getStack = stack => stack.split('\n').splice(1).map(item => item.replace(/^\s+at\s+/g, "")).join('^')
    // 监听全局未捕获的错误
    window.addEventListener('error', (event) => {
        console.log('event: ', event)
        let lastEvent = getLastEvent() // 最后一个交互事件
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({
                kind: 'stability', // 监控指标大类
                type: 'error', // 小类型 这是一个错误
                errorType: 'resourceError', // JS执行错误
                filename: event.target.src || event.target.href, // 哪个文件报错了
                tagName: event.target.tagName, // Script
                selector: getSelector(event.target) // 代表最后一个操作的元素
            })
        } else {
            tracker.send({
                kind: 'stability', // 监控指标大类
                type: 'error', // 小类型 这是一个错误
                errorType: 'jsError', // JS执行错误
                // url: '', // 访问哪个路径 报错了
                message: event.message, // 报错信息
                filename: event.filename, // 哪个文件报错了
                position: `${event.lineno}:${event.colno}`, // 
                stack: getStack(event.error.stack),
                selector: lastEvent ? getSelector(lastEvent.path) : '' // 代表最后一个操作的元素
            })
        }
    }, true)

    // 监听全局异步（promise）未捕获的错误
    window.addEventListener('unhandledrejection', (event) => {
        console.log('event: ', event)
        let lastEvent = getLastEvent() // 最后一个交互事件
        let message
        let filename
        let lineno = 0
        let colno = 0
        let stack = ''
        let reason = event.reason
        if (typeof reason === 'string') {
            message = reason
        } else if (typeof reason === 'object') {
            message = reason.message
            stack = getStack(reason.stack)
            if (reason.stack) {
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
                filename = matchResult[1];
                lineno = matchResult[2];
                colno = matchResult[3];
            }
        }
        tracker.send({
            kind: 'stability', // 监控指标大类
            type: 'error', // 小类型 这是一个错误
            errorType: 'jsError', // JS执行错误
            message, // 报错信息
            filename, // 哪个文件报错了
            position: `${lineno}:${colno}`, // 
            stack,
            selector: lastEvent ? getSelector(lastEvent.path) : '' // 代表最后一个操作的元素
        })
    }, true)
}