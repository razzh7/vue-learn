import Watcher from "./watcher"

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

function createWatcher(data, expOrFn, handler) {
  return $watch(data, expOrFn, handler)
}

export function $watch(data, expOrFn, handler) {
  new Watcher(data, expOrFn, handler)
}