import { observe, del } from './observer'
import Watcher from './watcher'
// 对象删除
const data = {
  obj: {
    brand: 'Ford',
    displacement: '2t'
  }
}
const updateComponent1 = () => {
  console.log('收集依赖', data.obj)
}
observe(data)
new Watcher(updateComponent1)
del(data.obj, 'brand')