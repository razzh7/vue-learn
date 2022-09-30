import Dep, { pushTarget, popTarget } from './dep'
import { queueWatcher } from './scheduler'
import { parsePath } from './utils'

let uid = 0
export default class Watcher {
  constructor(data, expOrFn, cb, options) {
    this.data = data
    this.cb = cb // watch的回调函数
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.id = ++uid // uid for batching
    if (options) {
      this.sync = !!options.sync
    }
    this.dirty = this.lazy
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      // debugger
      this.getter = parsePath(expOrFn)
    }
    this.value = this.get()
  }

  get() {
    // 入栈出栈，存在组件嵌套关系时
    // 确保getter执行的渲染watcher是正确的
    pushTarget(this)
    let value
    try {
      value = this.getter.call(this.data, this.data)
    } catch (e) {
      throw e
    } finally {
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    // 交换引用
    // 缓存newDepIds、newDeps
    let temp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = temp
    this.newDepIds.clear()
    temp = this.deps
    this.deps = this.newDeps
    this.newDeps = temp
    this.newDeps.length = 0
  }

  addDep(dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  run() {
    let value = this.get()
    // 新值value 和旧值 this.value 不一样时，触发 watch 回调
    if (value !== this.value) {
      // 设置新值
      const oldValue = this.value
      this.value = value
      this.cb.call(this.data, value, oldValue)
    }
  }

  update() {
    if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
}
