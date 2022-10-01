import { observe } from './observer'
import { initWatch } from './state'

const options = {
  data:{
    car: {
      brand: 'Ford'
    }
  },
  watch: {
    'car.brand': function(newValue, oldValue) { // key值为字符串
      console.log('新值', newValue)
      console.log('旧值', oldValue)
    }
  }
}
observe(options.data)
// debugger
initWatch(options.data, options.watch)

options.data.car.brand = 'Benz'