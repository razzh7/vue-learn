import { remove } from './utils'

let uid = 0
export default class Dep {
  static target // watcher实例
  subs // 依赖函数收集
  uid
  constructor() {
    this.subs = []
    this.id = uid++
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      this.subs[i].update()
    }
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }
}

Dep.target = null // 触发依赖收集的标记
const targetStack = [] // watcher栈

export function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget(target) {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
