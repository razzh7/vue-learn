import { observe } from './observer'
import Watcher from './watcher'

const data = {
  brand: 'Ford',
  displacement: '2t'
}
const updateComponent = () => {
  console.log('品牌', data.brand)
  console.log('排量', data.displacement)
}
observe(data)
new Watcher(updateComponent)
data.brand = 'Benz'
data.brand = 'Cadillac'
data.brand = 'Audi'
data.displacement = '1.5t'
data.displacement = '3.5t'

/**
 * 打印结果
 * Ford
 * 2t
 * Audi
 * 3.5t
 */
