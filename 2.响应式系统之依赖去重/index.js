import { observe } from './observer'
import Watcher from './watcher'
let show = true
const data = {
  card: 'Ford',
  run: true
}

const updateComponent = () => {
  console.log('启动', data.run ? data.card : 'not')
}

observe(data)
// 第一次渲染完成后，保留两者card/run的depsId和deps
new Watcher(updateComponent)
// 执行派发更新后，会比对新旧依赖，移除subs中的旧依赖
// 很显然这时card是依赖，被移除
data.run = false
// 再次执行派发更新，触发subs.update，此时subs中没有watcher
// 所以不会触发updateComponent
data.card = 'Cadillac'

/**
 * 输出结果
 * 启动 Ford
 * 启动 not
 */
