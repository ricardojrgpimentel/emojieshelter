import React from 'react'
import SiteBody from './siteBody'
import Header from './header'
import Footer from './footer'

import NavBar from './NavBar'

const App: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <Header />
    <main className="flex-grow">
      <SiteBody />
    </main>
    <Footer />
  </div>
)

export default App
