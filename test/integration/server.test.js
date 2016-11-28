import test from 'ava'
import request from 'supertest-as-promised'
import server from '../../src/server'

test('base route', async t => {
  const res = await request(server).get('/')

  t.is(res.status, 200)
})

test('test route', async t => {
  const res = await request(server).get('/test/')

  t.is(res.status, 200)
})

test('404 route', async t => {
  t.plan(2)

  const res = await request(server).get('/404')
  t.is(res.status, 200)
  t.not(res.text.indexOf('Page not found'), -1)
})
