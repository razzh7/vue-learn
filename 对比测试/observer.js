import Dep from './dep'

export function observe(value) {
  const ob = new Observe(value)
  return ob
}

export class Observe {
  constructor(value) {
    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

export function defineReactive(obj, key, val) {
  const property = Object.getOwnPropertyDescriptor(obj)
  const getter = property && property.get
  const setter = property && property.set

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  const dep = new Dep()
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      let value = getter ? getter.call(obj) : val
      // 收集依赖
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      if (setter) {
        setter.call(obj)
      } else {
        val = newVal
      }
      dep.notify()
    }
  })
}
