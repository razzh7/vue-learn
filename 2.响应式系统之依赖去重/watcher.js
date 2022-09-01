import Dep, { pushTarget, popTarget } from './dep'

export default class Watcher {
  constructor(Fn) {
    this.getter = Fn
    /***************************新增*************************** */
    this.deps = [] // 存储旧依赖
    this.newDeps = [] // 存储最新依赖
    this.depIds = new Set() // 避免在派发更新时再次收集重复依赖
    this.newDepIds = new Set() // 避免在一次求值的过程中收集重复的依赖
    /***************************新增*************************** */
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
  /***************************新增*************************** */
  cleanupDeps() {
    // 避免出现对无关依赖进行操作后再次执行渲染方法
    // https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html#%E8%BF%87%E7%A8%8B%E5%88%86%E6%9E%90
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
  /***************************新增*************************** */
  addDep(dep) {
    const id = dep.id
    // 避免在一次求值的过程中收集重复的依赖
    // 例如模版中存在: <div>{{name}}{{name}}</div>
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      // 避免在数据修改的时候，render时要重新收集依赖
      // 但dep中已有初次渲染的id，避免重复收集初次渲染的dep
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  run() {
    this.get()
  }

  update() {
    this.run()
  }
}
