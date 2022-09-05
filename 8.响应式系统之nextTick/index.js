import { observe } from './observer'
import { nextTick } from './next-tick'
import Watcher from './watcher'

const data = {
  brand: 'Ford'
}
observe(data)
const updateComponent = () => {
  let i = 1000000000
  while (i) {
    i--
  }
  document.getElementById('app').innerText = data.brand
  console.log('第一次执行', data.brand)
}

new Watcher(updateComponent)
nextTick(() => {
  document.getElementById('app').innerText = data.brand
})
data.brand = 'Cadillac'
data.brand = 'Benz'
data.brand = 'Audi'
