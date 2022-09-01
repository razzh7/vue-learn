import { observe } from './observer'
import Watcher from './watcher'

const data = {
  card: 'Ford',
}

const updateComponent = () => {
  console.log(data.card)
}

observe(data)
new Watcher(updateComponent)
data.card = 'Cadillac'
