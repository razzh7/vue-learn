import { observe } from './observer'
import Watcher from './watcher'

const data = {
  brand: 'Ford',
  displacement: '2t'
}
const updateComponent = () => {
  console.log('收集依赖', data.brand)
}
observe(data)
new Watcher(updateComponent)
data.brand = 'Benz'
data.brand = 'Cadillac'
data.brand = 'Audi'
