/* global describe, it */

import React from 'react'
import ReactDOM from 'react-dom'
import FuzzFooter from './FuzzFooter'

describe('<FuzzFooter />', () => {
  it('renders FuzzFooter component without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FuzzFooter />, div)
  })
})
