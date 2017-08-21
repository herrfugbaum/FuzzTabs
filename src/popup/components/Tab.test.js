/* global describe, it */

import React from 'react'
import ReactDOM from 'react-dom'
import Tab from './Tab'

describe('<Tab />', () => {
  it('renders Tab component without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Tab />, div)
  })
})
