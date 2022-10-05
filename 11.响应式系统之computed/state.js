import Watcher from "./watcher"
import { isPlainObject } from './utils'
import { noop } from "./utils";
import Dep from "./dep";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function initWatch(data, watch) {
  for(let key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for(let i = 0; i < handler.length; i++) {
        createWatcher(data, key, handler[i])
      }
    } else {
      createWatcher(data, key, handler)
    }
  }
}

function createWatcher(data, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  return $watch(data, expOrFn, handler, options)
}

export function $watch(data, expOrFn, handler, options) {
  const watcher = new Watcher(data, expOrFn, handler, options)
  if (options.immediate) {
    handler.call(data, watcher.value)
  }
}

const computedWatcherOptions = { lazy: true }

/**
 * 1. 收集依赖
 * 2. 成为响应式数据
 */
export function initComputed(data, computed) {
  const watchers = data.__computedWatchers = Object.create(null)

  for(let key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' 
      ? userDef 
      : userDef.get // 如果computed key 是 function，直接取值，否则拿对象的get
    // 订阅 computed watcher
    watchers[key] = new Watcher(
      data,
      getter || noop,
      noop,
      computedWatcherOptions
    )
    
    defineComputed(data, key, userDef)
  }
}

function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = userDef
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get 
      ? createComputedGetter(key)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// 调用 evaluate
/**
 * 1. 调用 evaluate
 * 2. 将计算 watcher 装入到渲染 watcher 中
 */
function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
    }

    return watcher.value
  }
}