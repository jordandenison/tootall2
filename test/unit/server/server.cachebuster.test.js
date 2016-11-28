import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import cacheBuster from '../../../cacheBuster'

const nodeEnv = process.env.NODE_ENV

const sendStub = sinon.stub()
const statusStub = sinon.stub().returns({ send: sendStub })
const getStub = sinon.stub()

const express = function () {}
express.prototype.get = getStub
express.prototype.disable = express.prototype.use = () => {}

const Server = function () {}
const ServerListenStub = sinon.stub()
Server.prototype.listen = ServerListenStub

const matchStub = sinon.stub()

test.before(() => {
  process.env.NODE_ENV = 'production'
  proxyquire('../../../src/server', {
    express,
    http: {
      Server
    },
    'react-router': {
      match: matchStub
    }
  })
})

test.after(() => {
  process.env.NODE_ENV = nodeEnv
  proxyquire.preserveCache()
})

test.beforeEach(() => [matchStub, sendStub, statusStub].forEach(stub => stub.reset()))

test('Router error', t => {
  t.plan(2)

  getStub.args[0][1]({}, { status: statusStub })
  matchStub.args[0][1]()

  t.is(statusStub.args[0][0], 200, 'returns 200 status')
  t.not(sendStub.args[0][0].indexOf(`dist${cacheBuster}.js`), -1, 'returns error message')
})
