import React from 'react'

import { Header, Image } from 'semantic-ui-react'

const FuzzHeader = (props) => {
  return (
    <Header as={props.headingLevel} >
      <Image inline src={props.logo} />
      <Header.Content>
        <span className='FuzzHeader'>{props.title}</span>
        <Header.Subheader>{props.subtitle}</Header.Subheader>
      </Header.Content>
    </Header>
  )
}

export default FuzzHeader
