### 1. 为什么要做前端监控

* 更快发现问题和解决问题
* 做产品的决策依据
* 提升前端工程师的技术深度和广度，打造简历两点
* 为业务扩展提供了更多可能性

---

### 2. 前端监控目标

#### 2.1 稳定性（stability）


错误名称 | 备注
---|---
JS错误 | JS执行错误或者promise异常
资源异常 | script、link等资源加载异常
接口错误 | ajax或fetch请求接口异常
白屏 | 页面空白

#### 2.2 用户体验（experience）

错误名称 | 备注
---|---
加载时间 | 各个阶段的加载时间
TTFB(time to first byte)(首字节时间) | 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间
FP(First Paint)(首次绘制) | 首次绘制包括了任何用户自定义的背景绘制，他是将第一个像素点绘制到屏幕的时刻
FCP(First Content Paint)(首次内容绘制) | 首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间
FMP(First Meaningful Paint)(首次有意义绘制) | 首次有意义绘制是页面可用性的量度标准
FID(First Input Delay)(首次输入延迟) | 用户首次和页面交互到页面响应交互的时间
卡顿 | 超过50ms的长任务

#### 2.3 业务（business）

错误名称 | 备注
---|---
PV | page view 即页面浏览量或点击量
UV | 指访问某个站点的不同IP地址的人数
页面的停留时间 | 用户在每一个页面的停留时间

---

### 3、 前端监控流程

* 前端埋点
* 数据上报
* 分析和计算 将采集到的数据进行加工汇总
* 可视化展示 将数据按各种维度进行展示
* 监控报警 发现问题后按一定的条件触发报警


埋点 -> 数据采集 -> 数据建模存储 -> 数据传输（实时/批量）-> 数据统计（分析/挖掘）-> 数据可视化（反馈）| 报告和报警

#### 3.1 常见的埋点方案

##### 3.1.1 代码埋点

* 代码埋点， 就是以嵌入代码的形式进行埋点， 比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给服务器端
* 优点事可以在任意时刻，精确的发送或保存所需要的数据信息
* 缺点是工作量较大

##### 3.1.2 可视化埋点

* 通过可视化交互的手段，代替代码埋点
* 将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等， 最后输出的代码耦合了业务代码和埋点代码
* 可视化埋点其实是用系统来代替手工插入埋点代码

##### 3.1.3 无痕埋点

* 前端的任意一个时间都被绑定一个标识，所有的时间都被记录下来
* 通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析
* 优点是采集全量数据，不会出现漏埋和误埋等现象
* 缺点是给数据传输和服务器增加压力， 也无法灵活定制数据结构

---

### 编写监控采集脚本

#### 4.1 开通日志服务

* [日志服务](https://www.aliyun.com/)（Log Service, 简称SLS）是针对日志类数据一站式服务，用户无需开发就能快捷完成数据采集、消费、投递以及查询分析等功能，帮助提升运维、  DT时代海量日志处理能力
* 500Mb 免费
* [日志服务帮助文档](https://help.aliyun.com/document_detail/29015.html?spm=a2c4g.11186623.3.4.6f96778fyYsAV8)
* Web Tracking

#### 4.2 监控错误

##### 4.2.1 错误分类

* JS错误
    * JS错误
    * Promise 异常

* 资源异常
    * 监听error

##### 4.2.2 数据结构设计

1. jsError

```
{
    "title": "前端监控系统", // 页面标题
    "url": "http://loccalhost:8080/", // 页面URL
    "timestamp": "1590334242323423423", // 访问时间戳
    "userAgent": "Chrome", // 用户浏览器类型
    "kind": "stability", // 大类
    "errorType": "JSERROR", // 错误类型
    "message": "", // 类型详情
    "filename": "", // 访问的文件名
    "position": "0:0", // 行列信息
    "stack": "", // 堆栈信息
    "selector": "" // 选择器
}
```

2. promiseError

```
{
    "title": "前端监控系统", // 页面标题
    "url": "http://loccalhost:8080/", // 页面URL
    "timestamp": "1590334242323423423", // 访问时间戳
    "userAgent": "Chrome", // 用户浏览器类型
    "kind": "stability", // 大类
    "errorType": "JSERROR", // 错误类型
    "message": "", // 类型详情
    "filename": "", // 访问的文件名
    "position": "0:0", // 行列信息
    "stack": "", // 堆栈信息
    "selector": "" // 选择器
}
```

3. resourceError

```
{
    "kind": 'stability', // 监控指标大类
    "type": 'error', // 小类型 这是一个错误
    "errorType": 'resourceError', // JS执行错误
    "filename": "", // 哪个文件报错了
    "tagName": "", // Script
    "selector": "" // 代表最后一个操作的元素
}
```

##### 4.2.3 报表


##### 4.2.4 实现

1. webpack.config.js
2. index.html
3. src/index.js
4. monitor/index.js
5. jsError.js
6. formatTime.js
7. getLastEvent.js
8. getSelector.js
9. tracker.js

> src/monitor/utils/tracker.js

* [PutWebtracking](https://help.aliyun.com/document_detail/120218.html)

```
const userAgent = require('user-agent')

const endpoint = 'cn-beijing.log.aliyuncs.com'
const project = 'gj-monitor-demo'
const logstoreName = 'gj-monitor-demo-store'

const getExtraData = () => ({
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent),
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
```

4.3 接口异常采集脚本

4.3.1 数据设计

4.3.2 实现

1. src/index.html
2. monitor/index.js
3. webpack.config.js
4. xhr.js

4.4 白屏

4.4.1 数据设计

4.4.2 实现

1. src/index.html
2. monitor/index.js
3. onload.js
4. blankScreen.js

4.5 加载时间

4.5.1 阶段含义

4.5.2 阶段计算

4.5.3 数据结构

4.5.4 实现

1. src/inndex.html
2. monitor/index.js
3. timing.js

4.6 性能指标

4.6.1 数据结构设计

1. paint
2. firstInputDelay

4.6.2 实现

1. src/index.html
2. timing.js

4.7 卡顿

4.7.1 数据设计

4.7.2 实现

1. src/index.html
2. monitor/index.js
3. logTask.js

4.8 pv

4.8.1 数据结构

4.8.2 实现

1. src/index.html
2. src/moitor/index.html
3. pv.js

---

### 5. 查询报表

#### 5.1 监控项分布
#### 5.2 浏览器分布
#### 5.3 页面分辨率分布

---

### 6. 参考

#### 6.1 第三方

##### 6.1.1 商业产品
##### 6.1.2 开源产品

#### 6.2 defer 和 async