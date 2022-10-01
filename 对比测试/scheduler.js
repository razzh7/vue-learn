import { nextTick } from './next-tick'

const queue = [] // 保存 watcher 的队列
let has = {} // 去重 watcher
let waiting = false // 开关锁
let index = 0

function flushSchedulerQueue() {
  let watcher, id
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.run()
  }
  // 清空watcher队列
  resetSchedulerState()
}
/************ 新增 ********** */
function resetSchedulerState() {
  index = queue.length = 0
  has = {}
  waiting = false
}
/************ 新增 ********** */
export function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)
    // 确保全局只有一个定时器执行并在数据都修改完后执行
    if (!waiting) {
      waiting = true
      /************ 新增 ********** */
      nextTick(flushSchedulerQueue)
      /************ 新增 ********** */
    }
  }
}
