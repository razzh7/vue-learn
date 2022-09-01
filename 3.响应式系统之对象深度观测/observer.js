import Dep from './dep'
import { isObject } from './utils'

export function observe(value) {
  /************** 新增 ************** */
  // 不是对象直接return
  if (!isObject(value)) {
    return
  }
  /************** 新增 ************** */
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

export function defineReactive(obj, key, val, shallow) {
  const property = Object.getOwnPropertyDescriptor(obj)
  const getter = property && property.get
  const setter = property && property.set

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  const dep = new Dep()
  /************** 新增 ************** */
  // 深度观测内嵌对象
  let childOb = !shallow && observe(val)
  /************** 新增 ************** */
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
      /************** 新增 ************** */
      // 新设置值的时候，如果新值时对象，那么也需要转换成响应式数据
      childOb = !shallow && observe(newVal)
      /************** 新增 ************** */
      dep.notify()
    }
  })
}
