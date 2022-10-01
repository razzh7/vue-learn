import Watcher from "./watcher"
import { isPlainObject } from './utils'

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