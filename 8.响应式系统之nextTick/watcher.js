import Dep, { pushTarget, popTarget } from './dep'
import { queueWatcher } from './scheduler'

/************** 新增 ********** */
let uid = 0
/************** 新增 ********** */
export default class Watcher {
  constructor(Fn, options) {
    this.getter = Fn
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.id = ++uid // uid for batching
    if (options) {
      this.sync = !!options.sync
    }
    this.get()
  }

  get() {
    // 入栈出栈，存在组件嵌套关系时
    // 确保getter执行的渲染watcher是正确的
    pushTarget(this)
    let value
    try {
      value = this.getter()
    } catch (e) {
      throw e
    }
    popTarget()
    this.cleanupDeps()
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
    this.get()
  }

  update() {
    if (this.sync) {
      this.run()
    } else {
      /************** 新增 ********** */
      queueWatcher(this)
      /************** 新增 ********** */
    }
  }
}
