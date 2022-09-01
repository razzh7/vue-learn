import Dep from './dep'
import { isObject, def, hasProto } from './utils'
import { arrayMethods, arrayProto } from './array'

const arraryKeys = Object.getOwnPropertyDescriptors(arrayMethods)
export function observe(value) {
  // 不是对象/数组直接返回
  if (!isObject(value)) {
    return
  }
  const ob = new Observe(value)
  return ob
}

export class Observe {
  constructor(value) {
    /************* 新增 ***************** */
    // 收集对象/数组依赖的箱子📦
    this.dep = new Dep()
    this.value = value
    /**
     * __ob__作用
     * 1、数组拦截器需要调用observeArray
     * 2、在defineReactive中收集数组依赖
     * 3、作为响应式标识，便于后续的$delete和$set调用dep.notify
     */
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        // 有__proto__:在value的原型上加上拦截数组
        protoAugment(value, arrayProto)
      } else {
        // 没有__proto__:直接重写value上原型上的7种方法
        copyProto(value, arrayProto, arraryKeys)
      }
      // 检测数组中的元素是否存在对象/数组，让它们转换成响应式数据
      this.observeArray(value)
    } else {
      this.walk(value)
    }
    /************* 新增 ***************** */
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  /************* 新增 ***************** */
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
    }
  }
  /************* 新增 ***************** */
}

export function defineReactive(obj, key, val, shallow) {
  const property = Object.getOwnPropertyDescriptor(obj)
  const getter = property && property.get
  const setter = property && property.set

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  // 为对象的每个key的依赖收集准备的箱子📦
  const dep = new Dep()
  // 递归，检查是否存在嵌套对象/数组，并它们为准备依赖收集的箱子
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      let value = getter ? getter.call(obj) : val
      // 收集依赖
      if (Dep.target) {
        dep.depend()
        // 代表是对象或数组，主要用于收集数组依赖
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      if (setter) {
        setter.call(obj)
      } else {
        val = newVal
      }
      // 新设置值的时候，如果新值时对象，那么也需要转换成响应式数据
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
/************* 新增 ***************** */
function protoAugment(target, src) {
  target.__proto__ = src
}

function copyProto(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

function dependArray(value) {
  for (let i = 0, l = value.length; i < l; i++) {
    let e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
/************* 新增 ***************** */
