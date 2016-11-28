import test from 'ava'
import sinon from 'sinon'
import errors from '../../../src/services/errors'

test('serverExceptionHandler', t => {
  t.plan(3)

  const originalLog = console.log
  const logStub = sinon.stub()
  const endStub = sinon.stub()
  const statusStub = sinon.stub().returns({ end: endStub })
  console.log = logStub
  const error = 'test error message'
  errors.serverExceptionHandler(error, null, { status: statusStub })
  console.log = originalLog
  t.is(statusStub.args[0][0], 500, 'responds with 500 status code')
  t.is(endStub.args[0][0], error, 'responds with error message')
  t.true(logStub.args[0][0].indexOf(error) !== -1, 'logs error message to console')
})

test('uncaughtExceptionHandler', t => {
  t.plan(2)

  const originalExit = process.exit
  const originalLog = console.log
  const exitStub = sinon.stub()
  const logStub = sinon.stub()
  process.exit = exitStub
  console.log = logStub
  const error = 'test error message'
  errors.uncaughtExceptionHandler(error)
  process.exit = originalExit
  console.log = originalLog
  t.is(exitStub.args[0][0], 1, 'exits with code 1')
  t.true(logStub.args[0][0].indexOf(error) !== -1, 'logs error message to console')
})
