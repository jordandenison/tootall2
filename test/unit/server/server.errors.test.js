import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

const sendStub = sinon.stub()
const statusStub = sinon.stub().returns({ send: sendStub })
const getStub = sinon.stub()

const express = function () {}
express.prototype.get = getStub
express.prototype.disable = express.prototype.use = () => {}

const Server = function () {}
const ServerListenStub = sinon.stub()
Server.prototype.listen = ServerListenStub

const consoleError = console.error
const consoleErrorStub = sinon.stub()
const matchStub = sinon.stub()

test.before(() => {
  proxyquire('../../../src/server', {
    express,
    http: {
      Server
    },
    'react-router': {
      match: matchStub
    }
  })
  console.error = consoleErrorStub
})

test.after(() => {
  proxyquire.preserveCache()
  console.error = consoleError
})

test.beforeEach(() => [consoleErrorStub, matchStub, statusStub, sendStub].forEach(stub => stub.reset()))

test('Listen error', t => {
  t.plan(2)

  t.is(consoleErrorStub.callCount, 0, 'does not log before error')
  ServerListenStub.args[0][1]('error')
  t.is(consoleErrorStub.callCount, 1, 'logs after error')
})

test('Listen error', t => {
  t.plan(2)

  t.is(consoleErrorStub.callCount, 0, 'does not log before error')
  ServerListenStub.args[0][1]()
  t.is(consoleErrorStub.callCount, 0, 'does not log after no error')
})

test('Router error', t => {
  t.plan(2)

  getStub.args[0][1]({}, { status: statusStub })
  const message = 'router error'
  matchStub.args[0][1]({ message })

  t.is(statusStub.args[0][0], 500, 'returns 500 status')
  t.is(sendStub.args[0][0], message, 'returns error message')
})
