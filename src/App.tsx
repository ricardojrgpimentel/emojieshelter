import React from 'react'
import SiteBody from './siteBody'
import Header from './header'
import Footer from './footer'

const App: React.FC = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <Header />
    <div className="flex-grow">
      <SiteBody />
    </div>
    <Footer />
  </div>
)

export default App
