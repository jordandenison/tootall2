import test from 'ava'

import index from '../../src/index'

test('index without main div present', t => {
  t.truthy(index)
})

test('index with main div present', t => {
  document.body.innerHTML = ''
  const main = document.createElement('div')
  main.id = 'main'
  document.body.appendChild(main)
  window.onload()

  t.truthy(index)
})
