import { def } from './utils'

export const arrayProto = Object.create(Array.prototype)
export const arrayMethods = [
  'push', 
  'pop', 
  'unshift', 
  'shift', 
  'splice', 
  'sort', 
  'reverse'
]

arrayMethods.forEach(function (method) {
  const original = Array.prototype[method]
  def(arrayProto, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
      case 'splice':
        inserted = args.slice(2)
    }
    if (inserted) ob.observeArray(inserted)
    ob.dep.notify()
    return result
  })
})
