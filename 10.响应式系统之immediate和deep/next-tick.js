import { isNative } from './env'

const callbacks = [] // nextTick的回调数组
let padding = false // 锁，只能有一个异步任务执行
let timerFunc // 异步函数

// 将timerFunc注册成微任务/宏任务
if (typeof timerFunc !== undefined && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = function () {
    return p.then(flushCallBacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallBacks, 0)
  }
}

function flushCallBacks() {
  padding = false
  const copies = callbacks.slice()
  // 处理执行nextTick时再次push的callbacks不是同一个
  // （上次的callbacks已经清空）
  callbacks.length = 0
  for (let i = 0, l = copies.length; i < l; i++) {
    copies[i]()
  }
}

export function nextTick(cb, ctx) {
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        throw e
      }
    }
  })
  if (!padding) {
    padding = true
    // 注册异步任务
    timerFunc()
  }
}
