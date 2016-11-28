import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

const Foo = ({children}) =>
  <div className="Foo">
    <span className="bar">bar</span>
    {children}
    <span className="bar">bar</span>
  </div>

Foo.propTypes = {
  children: React.PropTypes.any
}

test('has a .Foo class name', t => {
  const wrapper = shallow(<Foo />)
  t.true(wrapper.hasClass('Foo'))
})

test('renders two `.Bar`', t => {
  const wrapper = shallow(<Foo />)
  t.is(wrapper.find('.bar').length, 2)
})

test('renders children when passed in', t => {
  const wrapper = shallow(
    <Foo>
      <div className="unique" />
    </Foo>
  )
  t.true(wrapper.contains(<div className="unique" />))
})
