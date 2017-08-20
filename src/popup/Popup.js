/* global chrome */

import React, { Component } from 'react'
import Fuse from 'fuse.js'
import { Container, Grid, List } from 'semantic-ui-react'

import logo from '../assets/logo.png'
import chromeFavicon from '../assets/chromeFavicon.png'

import FuzzHeader from './components/FuzzHeader'
import Tab from './components/Tab'

import './Popup.css'

export default class Popup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: [],
      search: {
        isLoading: false,
        results: []
      },
      searchTerm: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getChromeTabs = this.getChromeTabs.bind(this)
    this.prepareTabs = this.prepareTabs.bind(this)
  }

  componentDidMount () {
    this.refs.searchInput.focus()
    this.getChromeTabs()
  }

  resetComponent () {
    this.setState({
      search: {
        isLoading: false,
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
        isLoading: true
      },
      searchTerm: searchTerm
    })
    if (this.state.searchTerm.length < 1) {
      this.resetComponent()
    }
    const searchResults = fuse.search(searchTerm)
    this.setState({search: {isLoading: false, results: searchResults}})
  }

  handleTabClick (tabId) {
    var updateProperties = {'active': true}
    chrome.tabs.update(tabId, updateProperties)
  }

  prepareTabs (tabs) {
    const preparedTabs = tabs.map(tab => {
      const favicon = tab.favIconUrl.startsWith('chrome://') ? chromeFavicon : tab.favIconUrl
      const title = tab.title.length > 75 ? tab.title.substr(0, 75) + '...' : tab.title

      return (
        <Tab key={tab.id} tabId={tab.id} favicon={favicon} title={title} onClick={this.handleTabClick} />
      )
    })

    return preparedTabs
  }

  render () {
    const tabs = this.prepareTabs(this.state.tabs)
    const searchResults = this.prepareTabs(this.state.search.results)
    const initialOrSearchResults = this.state.search.results.length > 0 ? searchResults : tabs

    return (
      <Container>
        <FuzzHeader headingLevel='h1' logo={logo} title='FuzzTabs' subtitle='Fuzzy search your tabs.' />
        <Grid>
          <Grid.Column width={16}>
            <div className='ui search'>
              <div className='ui icon input fullwidth-input'>
                <input
                  type='search'
                  onChange={this.handleSearchChange}
                  value={this.state.searchTerm}
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
          <Grid.Column width={16}>
            <div>Made by Slamcode</div>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
