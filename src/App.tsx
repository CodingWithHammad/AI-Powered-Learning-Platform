import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Courses from './pages/Courses'
import Roadmap from './pages/Roadmap'
import Score from './pages/Score'
import ChatBot from './pages/ChatBot'
import Library from './pages/Library'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your-clerk-key-here'

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/sign-in/*" element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                    }
                  }}
                  routing="path"
                  path="/sign-in"
                  redirectUrl="/courses"
                />
              </div>
            } />
            <Route path="/sign-up/*" element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "mx-auto"
                    }
                  }}
                  routing="path"
                  path="/sign-up"
                  redirectUrl="/courses"
                />
              </div>
            } />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="courses" element={<Courses />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="score" element={<Score />} />
              <Route path="chatbot" element={<ChatBot />} />
              <Route path="library" element={<Library />} /> 
            </Route>
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  )
}

export default App