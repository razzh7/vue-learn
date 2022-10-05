import { observe } from './observer'
import { initComputed } from './state'
import Watcher from './watcher';

const options = {
  data: {
    category: 'car',
    brand: 'Ford'
  },
  computed: {
    carBrand() {
      console.log('我执行啦');
      return this.category + '--' + this.brand
    }
  }
}
observe(options.data)
initComputed(options.data, options.computed)
// 触发 getter 执行 carBrand 函数
const updateComponent = () => {
  document.getElementById('app').innerText = options.data.carBrand
}
new Watcher(options.data, updateComponent)
// 1s后再次触发 carBrand 函数
setTimeout(() => {
  options.data.brand = 'Benz'
}, 1000)