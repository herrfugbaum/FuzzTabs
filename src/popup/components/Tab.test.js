/* global describe, it, expect */

import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { List } from 'semantic-ui-react'

import Tab from './Tab'

describe('<Tab />', () => {
  it('renders Tab component without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Tab />, div)
  })

  it('simulates click events', () => {
    const onTabClick = sinon.spy()
    const wrapper = shallow(<Tab onClick={onTabClick} tabId={1} />)
    wrapper.find(List.Item).simulate('click')
    expect(onTabClick.calledOnce).toBe(true)
    expect(onTabClick.args[0][0]).toBe(1)
  })

  it('simulates keydown events', () => {
    const onTabKeyDown = sinon.spy()
    const wrapper = shallow(<Tab onKeyDown={onTabKeyDown} tabId={1} />)
    wrapper.find(List.Item).simulate('keyDown', {key: 'Enter'})
    expect(onTabKeyDown.calledOnce).toBe(true)
    expect(onTabKeyDown.args[0][1]).toBe(1)
  })
})
