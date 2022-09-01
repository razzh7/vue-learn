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
