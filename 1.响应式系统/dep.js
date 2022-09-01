export default class Dep {
  static target // watcher实例
  subs // 依赖函数收集
  constructor() {
    this.subs = []
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
    for (let i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].update()
    }
  }
}

Dep.target = null // 触发依赖收集的标记
