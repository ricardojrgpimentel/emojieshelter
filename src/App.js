import React, { Component } from 'react'
import './App.css'
import SiteBody from './siteBody'
import Header from './header'
import Footer from './footer'

class App extends Component {
  render() {
    return (
      <div className='wrap'>
        <Header />
        <SiteBody />
        <Footer />
      </div>
    )
  }
}

export default App
