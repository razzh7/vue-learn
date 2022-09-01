import { observe } from './observer'
import Watcher from './watcher'
// 场景1
// const data = {
//   brand: ['Ford', 'Benz']
// };
// const updateComponent = () => {
//   // 收集brand的依赖
//   console.log('依赖', data.brand);
// };
// observe(data);
// new Watcher(updateComponent);
// data.brand.push('Cadillac')

// 场景2
const data = {
  arr: [1,2,['Ford']]
}

const updateComponent = () => {
  // 收集arr[2]的依赖
  console.log('依赖', data.arr[2])
};
observe(data);
new Watcher(updateComponent);
data.arr[2].push('Cadillac')