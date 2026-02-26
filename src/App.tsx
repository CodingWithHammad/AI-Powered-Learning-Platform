import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Courses from './pages/Courses'
import Roadmap from './pages/Roadmap'
import Score from './pages/Score'
import ChatBot from './pages/ChatBot'
import Library from './pages/Library'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import VapiAgent from './pages/VapiAgent'
import VoiceAgent from './pages/VoiceAgent'
import MiniProjects from './pages/MiniProjects'
import Lightning from '@/components/Lightning' // ⚡ Import Lightning

const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your-clerk-key-here'

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      
      <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 relative">

        {/* ⚡ Global Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

          {/* Lightning */}
          <div className="absolute inset-0">
            <Lightning
              hue={266}
              xOffset={-0.1}
              speed={1.2}
              intensity={1}
              size={1}
            />
          </div>

          {/* Radial Glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        </div>

        {/* Main App Content */}
        <div className="relative z-10">
          <Routes>
            <Route
              path="/sign-in/*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <SignInPage />
                </div>
              }
            />

            <Route
              path="/sign-up/*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <SignUpPage />
                </div>
              }
            />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="courses" element={<Courses />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="scores" element={<Score />} />
              <Route path="chatbot" element={<ChatBot />} />
              <Route path="library" element={<Library />} />
              <Route path="vapi-agent" element={<VapiAgent />} />
              <Route path="voice-agent" element={<VoiceAgent />} />
              <Route path="mini-projects" element={<MiniProjects />} />
            </Route>
          </Routes>
        </div>


      </div>
    </ClerkProvider>
  )
}

export default App
