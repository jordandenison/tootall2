import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

const processPort = process.env.PORT
delete process.env.PORT

const Server = function () {}
const ServerListenStub = sinon.stub()
Server.prototype.listen = ServerListenStub

test.before(() => {
  proxyquire('../../../src/server', {
    http: {
      Server
    }
  })
})

test.after(() => {
  process.env.PORT = processPort
  proxyquire.preserveCache()
})

test('Default port', t => {
  t.is(ServerListenStub.args[0][0], 3000, 'listens on port 3000 when no env var supplied')
})

