/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
 export const unicodeRegExp =
 /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

export function remove(arr, item) {
  if (arr.length > 0) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export const hasProto = "__proto__" in {}

const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`);
export function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  // 源码中传入的是 vm 组件实例，因为源码中会把 watch 里面的属性通过 Proxy 代理挂在 vm 实例上
  // 这里我们并没有 Vue 钩子函数，所以传入 data 代替
  return function (obj) {
    for(let i = 0; i < segments.length; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]] // 拿data中的值，触发 get 函数，收集依赖
    }
    return obj
  }
}

export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}