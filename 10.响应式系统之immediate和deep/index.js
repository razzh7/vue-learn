import { observe } from './observer'
import { initWatch } from './state'
import Watcher from './watcher'

const options = {
  data:{
    car: {
      brand: {
        name1: 'Ford',
        name2: 'Audi'
      }
    }
  },
  watch: {
    'car.brand': {
      handler(newValue, oldValue) {
        console.log('收到变化')
        console.log('新值', newValue)
        console.log('旧值', oldValue)
      },
      deep: true
    }
  }
}
observe(options.data)
initWatch(options.data, options.watch)
options.data.car.brand.name1 = 'Masariti' 