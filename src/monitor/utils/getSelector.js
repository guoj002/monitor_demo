
const getSelector = path => (
    path
    .reverse()
    .filter(element => element !== document && element !== window)
    .map(element => {
        let selector = ''
        console.log('element: ', element, element.nodeName, element.id, element.className)
        if (element.id) {
            selector = `${element.nodeName.toLowerCase()}#${element.id}`
        } else if (element.className && typeof element.className === 'string') {
            // className 应该只会是string, 多个class 例如 class="container list", 则 classname = 'container list'
            selector = `${element.nodeName.toLowerCase()}.${element.className}`
        } else {
            selector = element.nodeName.toLowerCase()
        }
        return selector
    })
    .join(' -> ')
)

export default pathOrTarget => {
    if (Array.isArray(pathOrTarget)) { // 是一个数组
        return getSelector(pathOrTarget)
    } else { // 可能是一个对象
        let path = []
        while(pathOrTarget) {
            path.push(pathOrTarget)
            pathOrTarget = pathOrTarget.parentNode
        }
        return getSelector(path)
    }
}