// import { Outlet, Link, useLocation } from 'react-router-dom'
// import { UserButton, useAuth } from '@clerk/clerk-react'
// import { Menu } from 'lucide-react'
// import Lightning from "@/components/Lightning"

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// const Layout = () => {
//   const location = useLocation()
//   const { isSignedIn } = useAuth()

//   const navLinks = [
//     { name: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//     { name: 'About', path: '/about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
//     { name: 'Contact', path: '/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', special: true },
//     { name: 'Courses', path: '/courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
//     { name: 'Roadmap', path: '/roadmap', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
//     { name: 'Scores', path: '/scores', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
//     { name: 'Chatbot', path: '/chatbot', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
//     { name: 'Library', path: '/library', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
//     { name: 'Voice Agent', path: '/voice-agent', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' }
//   ]

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">

//       {/* ⚡ GLOBAL LIGHTNING BACKGROUND */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//         <Lightning
//           hue={266}
//           xOffset={-0.1}
//           speed={1.2}
//           intensity={1}
//           size={1}
//         />

//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       </div>

//       {/* UI CONTENT */}
//       <div className="relative z-10">

//         {/* HEADER */}
//         <header className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/10">
//           <div className="container mx-auto px-6 lg:px-12 py-3 flex justify-between items-center">

//             <Link to="/" className="flex items-center gap-2">
//               <span className="text-purple-500 font-black text-xl">&lt; &gt;</span>
//               <h1 className="text-xl font-black text-white">
//                 Learn<span className="text-purple-500">AI</span>
//               </h1>
//             </Link>

//             <div className="hidden xl:flex items-center gap-4">
//               {navLinks.map((link) => (
//                 <Link key={link.name} to={link.path}
//                   className={`px-4 py-2 text-sm ${
//                     location.pathname === link.path
//                       ? 'text-purple-400'
//                       : 'text-white/60 hover:text-white'
//                   }`}>
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             <div className="flex items-center gap-4">
//               {isSignedIn ? (
//                 <UserButton afterSignOutUrl="/" />
//               ) : (
//                 <Link to="/sign-in" className="text-white/60 hover:text-white">
//                   Sign In
//                 </Link>
//               )}

//               {/* Mobile Menu */}
//               <div className="xl:hidden">
//                 <Sheet>
//                   <SheetTrigger asChild>
//                     <button className="text-white">
//                       <Menu className="w-6 h-6" />
//                     </button>
//                   </SheetTrigger>

//                   <SheetContent side="right" className="bg-slate-900 text-white">
//                     <SheetHeader>
//                       <SheetTitle>LearnAI</SheetTitle>
//                     </SheetHeader>

//                     <nav className="mt-6 flex flex-col space-y-4">
//                       {navLinks.map((link) => (
//                         <Link key={link.name} to={link.path}>
//                           {link.name}
//                         </Link>
//                       ))}
//                     </nav>
//                   </SheetContent>
//                 </Sheet>
//               </div>

//             </div>
//           </div>
//         </header>

//         {/* MAIN */}
//         <main className="pt-20">
//           <Outlet />
//         </main>

//         {/* FOOTER */}
//         <footer className="py-10 text-center text-white/30 border-t border-wh















































import { Outlet, Link, useLocation } from 'react-router-dom'
import { UserButton, useAuth } from '@clerk/clerk-react'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Layout = () => {
  const location = useLocation()
  const { isSignedIn } = useAuth()

  const navLinks = [
    { name: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'About', path: '/about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Contact', path: '/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', special: true },
    { name: 'Courses', path: '/courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Roadmap', path: '/roadmap', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { name: 'Scores', path: '/scores', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Chatbot', path: '/chatbot', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'Library', path: '/library', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Voice Agent', path: '/voice-agent', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group cursor-pointer flex-shrink-0">
              <span className="text-purple-500 font-black text-xl group-hover:scale-110 transition-transform tracking-tighter">
                &lt; &gt;
              </span>
              <h1 className="text-xl font-black uppercase tracking-tighter text-white">
                Learn<span className="text-purple-500">AI</span>
              </h1>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 transition-all group relative ${
                    link.special 
                      ? 'bg-purple-600/10 border border-purple-500/30 rounded-lg text-purple-400' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${link.special ? 'text-purple-500' : 'text-white/40 group-hover:text-purple-500'} transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-tight">{link.name}</span>
                  {!link.special && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side - Auth & Mobile Menu */}
            <div className="flex items-center gap-6">
              {/* Auth Actions - Desktop */}
              <div className="hidden xl:flex items-center gap-6">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-[10px] font-black uppercase px-6 py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transform hover:-translate-y-0.5"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu */}
              <div className="xl:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="p-2 text-white/60 hover:text-white transition-colors">
                      <Menu className="w-6 h-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-slate-900 text-white border-l border-purple-500/20">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <span className="text-purple-500 font-black text-xl">&lt; &gt;</span>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-white">
                          Learn<span className="text-purple-500">AI</span>
                        </h3>
                      </SheetTitle>
                    </SheetHeader>

                    {/* Mobile Nav Links */}
                    <nav className="mt-6 flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${
                            location.pathname === link.path
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                          </svg>
                          <span className="text-sm font-bold uppercase tracking-wide">{link.name}</span>
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Auth */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      {isSignedIn ? (
                        <UserButton afterSignOutUrl="/" />
                      ) : (
                        <div className="space-y-3">
                          <Link
                            to="/sign-in"
                            className="block w-full text-center text-gray-300 hover:text-purple-300 py-3 font-bold uppercase tracking-wide text-sm transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/sign-up"
                            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-sm font-black uppercase px-6 py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transform hover:-translate-y-0.5 block text-center"
                          >
                            Sign Up
                          </Link>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN - Add top padding to account for fixed header */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="py-24 px-6 lg:px-24 bg-black relative border-t border-white/5 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            {/* Brand Column */}
            <div className="md:col-span-6 space-y-6">
              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="text-purple-500 font-black text-2xl group-hover:scale-110 transition-transform tracking-tighter">
                  &lt; &gt;
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                  Learn<span className="text-purple-500">AI</span>
                </h3>
              </div>

              <p className="text-white/40 text-lg leading-relaxed max-w-md">
                Master programming languages with AI-powered quizzes and personalized learning roadmaps.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-8">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white border-b border-purple-500/20 pb-4 inline-block">
                {/* Quick Links */}
                Made By 
              </h4>

              <ul className="space-y-4">
                {["Home", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-white/40 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-purple-500 transition-all"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning */}
            <div className="md:col-span-3 space-y-8">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white border-b border-purple-500/20 pb-4 inline-block">
                Learning
              </h4>

              <ul className="space-y-4">
                {["Courses", "Roadmap", "Scores", "Chatbot", "Library", "Voice Agent"].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-purple-500 transition-all"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-[8px] text-white/20 uppercase tracking-[0.5em]">
              SYSTEM_FOOTER_v2.0 // EOF
            </div>

            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em]">
              © 2025 LearnAI. All rights reserved.
            </p>
          </div>
        </div>

        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
      </footer>
    </div>
  )
}

export default Layout
