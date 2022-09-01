import { observe, set } from './observer'
import Watcher from './watcher'
// 场景1 数组索引添加
const data1 = {
  arr: ['Ford', 'Benz']
}
const updateComponent1 = () => {
  console.log('收集依赖', data1.arr)
}
observe(data1)
new Watcher(updateComponent1)
// data1.arr.push('Cadillac') // 无效
set(data1.arr, 1, 'Cadillac')
console.log('------------分隔符------------')

// 场景2 直接修改对象
const data2 = {
  obj: {
    brand: 'Ford'
  }
}
const updateComponent2 = () => {
  console.log('收集依赖', data2.obj.brand)
}
observe(data2)
new Watcher(updateComponent2)
// data.obj.brand = 'Benz' // 无效
set(data2.obj, 'brand', 'Benz')
console.log('------------分隔符------------')

// 场景3 新增对象属性
const data3 = {
  obj: {
    brand: 'Ford'
  }
}

const updateComponent3 = () => {
  console.log('收集依赖', data3.obj)
}
observe(data3)
new Watcher(updateComponent3)
// data3.obj.displacement = '2t' // 无效
set(data3.obj, 'displacement', '2t')