import test from 'ava'
import request from 'supertest-as-promised'
import server from '../../src/server'

test('base route', async t => {
  const res = await request(server).get('/')

  t.is(res.status, 200)
})

test('equipment route', async t => {
  const res = await request(server).get('/equipment/')

  t.not(res.text.indexOf('equipment'), -1)
})

test('gallery route', async t => {
  const res = await request(server).get('/gallery/')

  t.not(res.text.indexOf('gallery'), -1)
})

test('contact route', async t => {
  const res = await request(server).get('/contact/')

  t.not(res.text.indexOf('contact'), -1)
})

test('404 route', async t => {
  t.plan(2)

  const res = await request(server).get('/404')
  t.is(res.status, 200)
  t.not(res.text.indexOf('Page not found'), -1)
})
