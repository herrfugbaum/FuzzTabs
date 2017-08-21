/* global describe, it */

import React from 'react'
import ReactDOM from 'react-dom'
import FuzzHeader from './FuzzHeader'

describe('<FuzzHeader />', () => {
  it('renders FuzzHeader component without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FuzzHeader />, div)
  })
})
