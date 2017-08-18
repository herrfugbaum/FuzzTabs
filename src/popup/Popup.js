/* global chrome */

import React, { Component } from 'react'
import Fuse from 'fuse.js'
import { Container, Header, Grid, List, Image } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import chromeFavicon from '../assets/chromeFavicon.png'

import './Popup.css'

export default class Popup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: [],
      search: {
        isLoading: false,
        value: '',
        results: []
      }
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getChromeTabs = this.getChromeTabs.bind(this)
  }
  componentDidMount () {
    this.refs.searchInput.focus()
    this.getChromeTabs()
  }
  resetComponent () {
    this.setState({
      search: {
        isLoading: false,
        value: '',
        results: []
      }
    })
    this.getChromeTabs()
  }
  getChromeTabs () {
    chrome.tabs.query({currentWindow: true}, tabs => {
      this.setState({
        tabs: tabs
      })
    })
  }
  handleSearchChange (e) {
    const fuse = new Fuse(this.state.tabs, {keys: ['title', 'url']})
    const searchTerm = e.target.value

    this.setState({
      search: {
        value: searchTerm,
        isLoading: true
      }
    })
    window.setTimeout(() => {
      if (this.state.search.value.length < 1) { // Pretty sure this produces the initial search typing bug
        this.resetComponent()
      }
      const searchResults = fuse.search(searchTerm)
      this.setState({search: {isLoading: false, results: searchResults}})
    }, 500)
  }
  render () {
    const tabs = this.state.tabs.map(tab => {
      console.log(tab)
      //const favicon = tab.favIconUrl.startsWith('chrome://') ? '' : tab.favIconUrl
      return (
        <List.Item key={tab.id}>
          <Image avatar src={tab.favIconUrl} />
          <List.Content>
            <List.Header>{tab.title}</List.Header>
          </List.Content>
        </List.Item>
      )
    })
    const searchResults = this.state.search.results.map(tab => {
      //const favicon = tab.favIconUrl.startsWith('chrome://') ? '' : tab.favIconUrl
      return (
        <List.Item key={tab.id}>
          <Image avatar src={tab.favIconUrl} />
          <List.Content>
            <List.Header>{tab.title}</List.Header>
          </List.Content>
        </List.Item>
      )
    })
    const initialOrSearchResults = this.state.search.results.length > 0 ? searchResults : tabs
    return (
      <Container>
        <Header as='h1' >
          <Image inline src={logo} />
          <Header.Content>
            FuzzTabs
            <Header.Subheader>Fuzzy Search your tabs.</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Column width={16}>
            <div className='ui search'>
              <div className='ui icon input fullwidth-input'>
                <input
                  type='search'
                  onChange={this.handleSearchChange}
                  value={this.state.search.value}
                  placeholder='Beginn typing a title or an URL...'
                  ref='searchInput'
                />
                <i className='search icon' />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={16}>
            <List selection divided relaxed verticalAlign='middle'>
              {initialOrSearchResults}
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
