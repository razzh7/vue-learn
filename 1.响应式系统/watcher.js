import Dep from './dep'

export default class Watcher {
  constructor(Fn) {
    this.getter = Fn
    this.get()
  }
  get() {
    Dep.target = this
    let value
    try {
      value = this.getter()
    } catch (e) {
      throw e
    }
    return value
  }

  addDep(dep) {
    dep.addSub(this)
  }

  run() {
    this.get()
  }

  update() {
    this.run()
  }
}
