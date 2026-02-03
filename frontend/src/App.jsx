import { useState } from 'react'
import Home from './pages/Home'
import PasswordGenerator from './pages/PasswordGenerator'
import PhishingDetector from './pages/PhishingDetector'
import BreachChecker from './pages/BreachChecker'
import MalwareChecker from './pages/MalwareChecker'
import WebsiteStatus from './pages/WebsiteStatus'
import SecurityTutorial from './pages/SecurityTutorial'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="w-full min-h-screen bg-terminal-black font-terminal text-terminal-green overflow-x-hidden">
      {currentPage === 'home' && <Home onNavigate={navigateTo} />}
      {currentPage === 'password' && <PasswordGenerator onBack={() => navigateTo('home')} />}
      {currentPage === 'phishing' && <PhishingDetector onBack={() => navigateTo('home')} />}
      {currentPage === 'breach' && <BreachChecker onBack={() => navigateTo('home')} />}
      {currentPage === 'malware' && <MalwareChecker onBack={() => navigateTo('home')} />}
      {currentPage === 'website' && <WebsiteStatus onBack={() => navigateTo('home')} />}
      {currentPage === 'tutorial' && <SecurityTutorial onBack={() => navigateTo('home')} />}
    </div>
  )
}

export default App