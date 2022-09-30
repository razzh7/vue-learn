import { observe } from './observer'
import { initWatch } from './state'

let watch1 = function(newValue, oldValue) {
  console.log('w1新值', newValue)
  console.log('w1旧值', oldValue)
}
let watch2 = function(newValue, oldValue) {
  console.log('w2新值', newValue)
  console.log('w2旧值', oldValue)
}

const options = {
  data:{
    car: {
      brand: 'Ford'
    },
    category: 'Car',
    arr: '等待修改值'
  },
  watch: {
    'car.brand': function(newValue, oldValue) { // key值为字符串
      console.log('新值', newValue)
      console.log('旧值', oldValue)
    },
    category(newValue, oldValue) { // key值为函数
      console.log('新值', newValue)
      console.log('旧值', oldValue)
    },
    arr: [watch1, watch2] // key值为数组
  }
}
observe(options.data)
initWatch(options.data, options.watch)

options.data.car.brand = 'Benz'
options.data.category = 'Super Car'
options.data.arr = 'watch数组功能测试'