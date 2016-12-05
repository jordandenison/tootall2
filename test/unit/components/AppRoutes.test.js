import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import AppRoutes from '../../../src/components/AppRoutes'

test('render', t => {
  const wrapper = shallow(<AppRoutes store={{ subscribe: () => {}, dispatch: () => {}, getState: () => {} }} />)
  t.is(wrapper.find('Router').length, 1, 'Contains the router')
})
