import React, { Component } from 'react'

import { List, Image } from 'semantic-ui-react'

export default class Tab extends Component {
  render () {
    return (
      <List.Item onClick={(e) => this.props.onClick(this.props.tabId)}>
        <Image avatar src={this.props.favicon} />
        <List.Content>
          <List.Header>{this.props.title}</List.Header>
        </List.Content>
      </List.Item>
    )
  }
}
