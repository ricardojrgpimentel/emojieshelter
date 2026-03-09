import React from 'react'
import SiteBody from './siteBody'
import Header from './header'
import Footer from './footer'

import NavBar from './NavBar'

const App: React.FC = () => {
  const [zenMode, setZenMode] = React.useState(false)

  return (
    <div className={`flex flex-col min-h-screen ${zenMode ? 'bg-slate-950' : ''}`}>
      {!zenMode && <NavBar />}
      {!zenMode && <Header />}
      <main className="flex-grow">
        <SiteBody zenMode={zenMode} onToggleZen={() => setZenMode(!zenMode)} />
      </main>
      {!zenMode && <Footer />}
    </div>
  )
}

export default App
