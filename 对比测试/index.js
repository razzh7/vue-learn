import { observe, set } from './reactive'
import Watcher from './watcher'
// 场景1 数组索引添加
// const data = {
//   arr: ['Ford', 'Benz']
// }
// const updateComponent = () => {
//   console.log('收集依赖', data.arr)
// }
// observe(data)
// new Watcher(updateComponent)
// // data.arr.push('Cadillac') // 无效
// set(data.arr, 1, 'Cadillac')


// 场景2
const data = {
  obj: {
    brand: 'Ford'
  }
}
const updateComponent = () => {
  console.log('收集依赖', data.obj)
}
observe(data)
new Watcher(updateComponent)
data.obj.brand = 'Benz'