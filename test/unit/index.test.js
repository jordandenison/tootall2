import test from 'ava'
const main = document.createElement('div')
main.id = 'main'
document.body.appendChild(main)
import index from '../../src/index'

test('index', t => {
  t.truthy(index)
})
