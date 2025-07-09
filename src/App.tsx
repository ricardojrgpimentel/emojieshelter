import React from 'react'
import SiteBody from './siteBody'
import Header from './header'
import Footer from './footer'

const App: React.FC = () => (
  <div className='wrap'>
    <Header />
    <SiteBody />
    <Footer />
  </div>
)

export default App
