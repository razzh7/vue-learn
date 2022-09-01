import { observe } from './observer'
import Watcher from './watcher'

const data = {
  info: {
    brand: {
      name1: 'Ford',
      name2: 'Cadillac'
    },
  },
};
const updateComponent = () => {
  // 收集name1的依赖
  console.log(data.info.brand.name1);
};
observe(data);
new Watcher(updateComponent);
data.info.brand.name1 = 'Benz';
