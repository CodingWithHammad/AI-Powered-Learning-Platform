import { useState, useMemo } from "react"
import { useAuth } from "@clerk/clerk-react"
import {
  ArrowLeft,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Search,
  Lock,
} from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import Lightning from "../components/Lightning"

/* ================= PROJECT DATA ================= */

const projects = [
  /* ========= MODERN GLASS CALCULATOR ========= */
  {
    id: "calculator",
    title: "Modern Glass Calculator",
    description: "Beautiful glass UI calculator.",
    difficulty: "Advanced",
    category: "Logic",
    thumbnail:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    html: `
      <div class="calc">
        <input id="display" readonly />
        <div class="buttons">
          <button onclick="clearDisplay()">C</button>
          <button onclick="append('/')">/</button>
          <button onclick="append('*')">*</button>
          <button onclick="append('-')">-</button>
          <button onclick="append('7')">7</button>
          <button onclick="append('8')">8</button>
          <button onclick="append('9')">9</button>
          <button onclick="append('+')">+</button>
          <button onclick="append('4')">4</button>
          <button onclick="append('5')">5</button>
          <button onclick="append('6')">6</button>
          <button onclick="calculate()">=</button>
          <button onclick="append('1')">1</button>
          <button onclick="append('2')">2</button>
          <button onclick="append('3')">3</button>
          <button onclick="append('0')">0</button>
        </div>
      </div>
    `,
    css: `
      body{
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:linear-gradient(135deg,#0f0f0f,#1a1a2e);
        font-family:sans-serif;
      }
      .calc{
        backdrop-filter:blur(20px);
        background:rgba(255,255,255,0.05);
        padding:20px;
        border-radius:20px;
        box-shadow:0 0 40px rgba(168,85,247,0.4);
      }
      #display{
        width:100%;
        padding:15px;
        font-size:20px;
        margin-bottom:15px;
        border:none;
        border-radius:10px;
      }
      .buttons{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:8px;
      }
      button{
        padding:15px;
        border:none;
        border-radius:10px;
        background:rgba(255,255,255,0.1);
        color:white;
        font-size:16px;
      }
      button:hover{
        background:rgba(168,85,247,0.6);
      }
    `,
    javascript: `
      function append(val){
        document.getElementById("display").value+=val;
      }
      function clearDisplay(){
        document.getElementById("display").value="";
      }
      function calculate(){
        try{
          const exp=document.getElementById("display").value;
          document.getElementById("display").value=eval(exp);
        }catch{
          alert("Invalid Expression");
        }
      }
    `,
  },

  /* ========= WEATHER APP ========= */
  {
    id: "weather",
    title: "Weather App (API)",
    description: "Fetch live weather using OpenWeather API.",
    difficulty: "Advanced",
    category: "API",
    thumbnail:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b",
    html: `
      <h2>Weather App</h2>
      <input id="city" placeholder="Enter city"/>
      <button onclick="getWeather()">Search</button>
      <div id="result"></div>
    `,
    css: `
      body{text-align:center;margin-top:100px;font-family:sans-serif}
      input{padding:8px}
      button{padding:8px;margin-left:5px}
      #result{margin-top:20px;font-size:18px}
    `,
    javascript: `
      async function getWeather(){
        const city=document.getElementById("city").value;
        const apiKey="YOUR_API_KEY";
        const url=\`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=metric&appid=\${apiKey}\`;
        const res=await fetch(url);
        const data=await res.json();
        if(data.main){
          document.getElementById("result").innerHTML=
          "Temp: "+data.main.temp+"°C <br> Condition: "+data.weather[0].main;
        }else{
          document.getElementById("result").innerText="City not found";
        }
      }
    `,
  },

  /* ========= QUIZ APP ========= */
  {
    id: "quiz",
    title: "Quiz App",
    description: "Simple MCQ quiz with score.",
    difficulty: "Intermediate",
    category: "Logic",
    thumbnail:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0",
    html: `
      <h2 id="question"></h2>
      <div id="options"></div>
      <p id="score"></p>
    `,
    css: `
      body{text-align:center;margin-top:100px;font-family:sans-serif}
      button{display:block;margin:10px auto;padding:8px 20px}
    `,
    javascript: `
      const quiz=[
        {q:"2+2=?",a:["3","4","5"],correct:1},
        {q:"Capital of India?",a:["Delhi","Mumbai","Agra"],correct:0}
      ];
      let index=0,score=0;

      function load(){
        if(index>=quiz.length){
          document.getElementById("question").innerText="Quiz Finished!";
          document.getElementById("score").innerText="Score: "+score;
          return;
        }
        document.getElementById("question").innerText=quiz[index].q;
        const options=document.getElementById("options");
        options.innerHTML="";
        quiz[index].a.forEach((opt,i)=>{
          const btn=document.createElement("button");
          btn.innerText=opt;
          btn.onclick=function(){
            if(i===quiz[index].correct) score++;
            index++; load();
          }
          options.appendChild(btn);
        });
      }
      load();
    `,
  },

  /* ========= NOTES APP ========= */
  {
    id: "notes",
    title: "Notes App",
    description: "Save notes using LocalStorage.",
    difficulty: "Advanced",
    category: "DOM",
    thumbnail:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    html: `
      <h2>Notes App</h2>
      <textarea id="note"></textarea><br>
      <button onclick="saveNote()">Save</button>
      <ul id="list"></ul>
    `,
    css: `
      body{text-align:center;margin-top:60px;font-family:sans-serif}
      textarea{width:250px;height:80px}
      li{margin:10px 0}
    `,
    javascript: `
      function loadNotes(){
        const notes=JSON.parse(localStorage.getItem("notes"))||[];
        const list=document.getElementById("list");
        list.innerHTML="";
        notes.forEach(n=>{
          const li=document.createElement("li");
          li.innerText=n;
          list.appendChild(li);
        });
      }

      function saveNote(){
        const note=document.getElementById("note").value;
        const notes=JSON.parse(localStorage.getItem("notes"))||[];
        notes.push(note);
        localStorage.setItem("notes",JSON.stringify(notes));
        document.getElementById("note").value="";
        loadNotes();
      }
      loadNotes();
    `,
  },
]

const categories = [
  "All",
  "Intermediate",
  "Advanced",
  "Logic",
  "DOM",
  "API",
]

/* ================= COMPONENT ================= */

const MiniProjects = () => {
  const { isSignedIn } = useAuth()
  const [selected, setSelected] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<
    "html" | "css" | "javascript" | "preview"
  >("html")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [copied, setCopied] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchCategory =
        activeCategory === "All" ||
        p.category === activeCategory ||
        p.difficulty === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const generatePreview = (p: any) => `
    <html>
      <head><style>${p.css}</style></head>
      <body>${p.html}<script>${p.javascript}</script></body>
    </html>
  `

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Lightning hue={266} xOffset={-0.1} speed={1.5} intensity={2} size={1}/>
      </div>

      <div className="relative z-10 px-6 py-16">
        {!selected ? (
          <>
            <h1 className="text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
              MINI PROJECTS
            </h1>

            <div className="max-w-xl mx-auto mb-8 relative">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full ${
                    activeCategory === cat
                      ? "bg-purple-600"
                      : "bg-white/5 border border-purple-500/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => isSignedIn && setSelected(project)}
                  className="relative cursor-pointer bg-white/5 rounded-xl border border-purple-500/20 p-6"
                >
                  {!isSignedIn && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Lock className="mr-2" /> Login Required
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-purple-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelected(null)}
              className="mb-6 text-purple-400 flex items-center"
            >
              <ArrowLeft className="mr-2" /> Back
            </button>

            <div className={`${fullscreen ? "fixed inset-0 bg-black z-50 p-10" : ""}`}>
              <div className="flex justify-between mb-4">
                <h1 className="text-3xl text-purple-400">
                  {selected.title}
                </h1>
                <button onClick={() => setFullscreen(!fullscreen)}>
                  {fullscreen ? <Minimize2 /> : <Maximize2 />}
                </button>
              </div>

              <div className="flex border-b border-purple-500/20 mb-4">
                {(["html", "css", "javascript", "preview"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 ${
                        activeTab === tab
                          ? "text-purple-400 border-b-2 border-purple-400"
                          : "text-gray-400"
                      }`}
                    >
                      {tab === "javascript" ? "JS" : tab}
                    </button>
                  )
                )}
              </div>

              {activeTab === "preview" ? (
                <iframe
                  srcDoc={generatePreview(selected)}
                  className="w-full h-[500px] bg-white rounded-xl"
                />
              ) : (
                <div className="relative">
                  <button
                    onClick={() => copyCode(selected[activeTab])}
                    className="absolute top-4 right-4 bg-purple-600 px-4 py-2 rounded-lg"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>

                  <SyntaxHighlighter
                    language={
                      activeTab === "javascript"
                        ? "javascript"
                        : activeTab
                    }
                    style={vscDarkPlus}
                    customStyle={{
                      background: "transparent",
                      padding: "2rem",
                    }}
                  >
                    {selected[activeTab]}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MiniProjects




















// const projects = [
//   /* ================= TODO APP ================= */
//   {
//     id: "todo",
//     title: "To-Do App",
//     description: "Add & delete tasks dynamically with DOM.",
//     difficulty: "Beginner",
//     category: "DOM",
//     thumbnail:
//       "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
//     html: `
//       <div class="todo-container">
//         <h2>Todo App</h2>
//         <input id="taskInput" placeholder="Enter task" />
//         <button onclick="addTask()">Add</button>
//         <ul id="taskList"></ul>
//       </div>
//     `,
//     css: `
//       body{font-family:sans-serif;text-align:center;margin-top:40px}
//       input{padding:8px}
//       button{padding:8px;margin-left:5px}
//       li{margin:10px 0}
//     `,
//     javascript: `
//       function addTask(){
//         const input=document.getElementById("taskInput");
//         const li=document.createElement("li");
//         li.innerText=input.value;
//         li.onclick=function(){this.remove();}
//         document.getElementById("taskList").appendChild(li);
//         input.value="";
//       }
//     `,
//   },

//   /* ================= CALCULATOR ================= */
//   {
//     id: "calculator",
//     title: "Calculator",
//     description: "Fully working calculator with all operations.",
//     difficulty: "Intermediate",
//     category: "Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1580910051074-3eb694886505",
//     html: `
//       <div class="calc">
//         <input id="display" readonly />
//         <div class="buttons">
//           <button onclick="clearDisplay()">C</button>
//           <button onclick="append('/')">/</button>
//           <button onclick="append('*')">*</button>
//           <button onclick="append('-')">-</button>
//           <button onclick="append('7')">7</button>
//           <button onclick="append('8')">8</button>
//           <button onclick="append('9')">9</button>
//           <button onclick="append('+')">+</button>
//           <button onclick="append('4')">4</button>
//           <button onclick="append('5')">5</button>
//           <button onclick="append('6')">6</button>
//           <button onclick="calculate()">=</button>
//           <button onclick="append('1')">1</button>
//           <button onclick="append('2')">2</button>
//           <button onclick="append('3')">3</button>
//           <button onclick="append('0')">0</button>
//         </div>
//       </div>
//     `,
//     css: `
//       body{display:flex;justify-content:center;margin-top:50px;font-family:sans-serif}
//       .calc{width:250px}
//       #display{width:100%;padding:10px;font-size:18px;margin-bottom:10px}
//       .buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
//       button{padding:15px;font-size:16px}
//     `,
//     javascript: `
//       function append(val){
//         document.getElementById("display").value+=val;
//       }
//       function clearDisplay(){
//         document.getElementById("display").value="";
//       }
//       function calculate(){
//         const exp=document.getElementById("display").value;
//         document.getElementById("display").value=eval(exp);
//       }
//     `,
//   },

//   /* ================= COUNTER ================= */
//   {
//     id: "counter",
//     title: "Counter App",
//     description: "Increase and decrease counter.",
//     difficulty: "Beginner",
//     category: "Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
//     html: `
//       <h1 id="count">0</h1>
//       <button onclick="increase()">+</button>
//       <button onclick="decrease()">-</button>
//     `,
//     css: `
//       body{text-align:center;margin-top:100px;font-family:sans-serif}
//       button{padding:10px 20px;font-size:18px;margin:5px}
//     `,
//     javascript: `
//       let count=0;
//       function increase(){
//         count++;
//         document.getElementById("count").innerText=count;
//       }
//       function decrease(){
//         count--;
//         document.getElementById("count").innerText=count;
//       }
//     `,
//   },

//   /* ================= PASSWORD GENERATOR ================= */
//   {
//     id: "password",
//     title: "Password Generator",
//     description: "Generate random secure password.",
//     difficulty: "Intermediate",
//     category: "Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
//     html: `
//       <h2>Password Generator</h2>
//       <input id="password" readonly />
//       <button onclick="generate()">Generate</button>
//     `,
//     css: `
//       body{text-align:center;margin-top:100px;font-family:sans-serif}
//       input{padding:10px;width:200px}
//       button{padding:10px;margin-left:10px}
//     `,
//     javascript: `
//       function generate(){
//         const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
//         let pass="";
//         for(let i=0;i<8;i++){
//           pass+=chars[Math.floor(Math.random()*chars.length)];
//         }
//         document.getElementById("password").value=pass;
//       }
//     `,
//   },

//   /* ================= RANDOM COLOR ================= */
//   {
//     id: "color",
//     title: "Random Color Generator",
//     description: "Change background randomly.",
//     difficulty: "Beginner",
//     category: "DOM",
//     thumbnail:
//       "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
//     html: `
//       <h2>Random Color</h2>
//       <button onclick="changeColor()">Change Color</button>
//     `,
//     css: `
//       body{text-align:center;margin-top:100px;font-family:sans-serif;transition:0.5s}
//       button{padding:10px 20px}
//     `,
//     javascript: `
//       function changeColor(){
//         const color="#"+Math.floor(Math.random()*16777215).toString(16);
//         document.body.style.background=color;
//       }
//     `,
//   },
// ]



























// import { useState, useMemo } from "react"
// import { useAuth } from "@clerk/clerk-react"
// import {
//   Eye,
//   ArrowLeft,
//   Copy,
//   Check,
//   Lock,
//   Maximize2,
//   Minimize2,
//   Search,
// } from "lucide-react"
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
// import Lightning from "../components/Lightning"

// /* ---------------- PROJECT DATA ---------------- */

// const projects = [
//   {
//     id: "todo",
//     title: "To-Do App",
//     description: "Add & delete tasks dynamically.",
//     difficulty: "Beginner",
//     category: "DOM",
//     thumbnail:
//       "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
//     html: `<h2>Todo</h2>`,
//     css: `body{font-family:sans-serif}`,
//     javascript: `console.log("Todo")`,
//   },
//   {
//     id: "calculator",
//     title: "Calculator",
//     description: "Basic 2 number calculator.",
//     difficulty: "Intermediate",
//     category: "Logic",
//     thumbnail:
//       "https://images.unsplash.com/photo-1580910051074-3eb694886505",
//     html: `<h2>Calculator</h2>`,
//     css: `body{text-align:center}`,
//     javascript: `console.log("Calc")`,
//   },
//   {
//     id: "clock",
//     title: "Digital Clock",
//     description: "Live real-time digital clock.",
//     difficulty: "Intermediate",
//     category: "DOM",
//     thumbnail:
//       "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
//     html: `<h1 id="clock"></h1>`,
//     css: `body{text-align:center;margin-top:100px}`,
//     javascript: `setInterval(()=>{clock.innerText=new Date().toLocaleTimeString()},1000)`,
//   },
// ]

// const categories = ["All", "Beginner", "Intermediate", "DOM", "Logic"]

// /* ---------------- COMPONENT ---------------- */

// const MiniProjects = () => {
//   const { isSignedIn } = useAuth()

//   const [selected, setSelected] = useState<any>(null)
//   const [activeTab, setActiveTab] = useState<
//     "html" | "css" | "javascript" | "preview"
//   >("html")
//   const [search, setSearch] = useState("")
//   const [activeCategory, setActiveCategory] = useState("All")
//   const [copied, setCopied] = useState(false)
//   const [fullscreen, setFullscreen] = useState(false)

//   const filteredProjects = useMemo(() => {
//     return projects.filter((p) => {
//       const matchSearch = p.title
//         .toLowerCase()
//         .includes(search.toLowerCase())

//       const matchCategory =
//         activeCategory === "All" ||
//         p.category === activeCategory ||
//         p.difficulty === activeCategory

//       return matchSearch && matchCategory
//     })
//   }, [search, activeCategory])

//   const copyCode = async (code: string) => {
//     await navigator.clipboard.writeText(code)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 1500)
//   }

//   const generatePreview = (p: any) => `
//     <html>
//       <head><style>${p.css}</style></head>
//       <body>${p.html}<script>${p.javascript}</script></body>
//     </html>
//   `

//   return (
//     <div className="relative min-h-screen bg-black text-white">

//       {/* ⚡ Lightning Background */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         <Lightning hue={266} xOffset={-0.1} speed={1.5} intensity={2} size={1} />
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
//       </div>

//       <div className="relative z-10 px-4 md:px-10 py-16">

//         {!selected ? (
//           <>
//             {/* BIG PURPLE HEADING */}
//             <h1 className="text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//               MINI PROJECTS
//             </h1>

//             {/* SEARCH */}
//             <div className="max-w-xl mx-auto mb-8 relative">
//               <Search className="absolute left-4 top-3 text-gray-400" />
//               <input
//                 placeholder="Search projects..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 focus:border-purple-400 outline-none"
//               />
//             </div>

//             {/* CATEGORY FILTER */}
//             <div className="flex flex-wrap justify-center gap-4 mb-12">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-5 py-2 rounded-full text-sm transition ${
//                     activeCategory === cat
//                       ? "bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.7)]"
//                       : "bg-white/5 border border-purple-500/20 text-gray-300 hover:border-purple-400"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* PROJECT GRID */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredProjects.map((project) => (
//                 <div
//                   key={project.id}
//                   onClick={() => isSignedIn && setSelected(project)}
//                   className="relative group rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400 bg-white/5 backdrop-blur-md transition duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:-translate-y-2 cursor-pointer"
//                 >
//                   <img
//                     src={project.thumbnail}
//                     className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
//                   />

//                   {!isSignedIn && (
//                     <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
//                       <Lock className="text-purple-400 mr-2" />
//                       <span>Login Required</span>
//                     </div>
//                   )}

//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold mb-2 text-purple-300">
//                       {project.title}
//                     </h3>
//                     <p className="text-gray-400 text-sm mb-4">
//                       {project.description}
//                     </p>

//                     <div className="flex gap-2 flex-wrap">
//                       <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
//                         {project.category}
//                       </span>
//                       <span
//                         className={`text-xs px-3 py-1 rounded-full ${
//                           project.difficulty === "Beginner"
//                             ? "bg-green-500/20 text-green-400"
//                             : "bg-yellow-500/20 text-yellow-400"
//                         }`}
//                       >
//                         {project.difficulty}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => setSelected(null)}
//               className="mb-6 text-purple-400 flex items-center"
//             >
//               <ArrowLeft className="mr-2" /> Back
//             </button>

//             <div className={`${fullscreen ? "fixed inset-0 bg-black z-50 p-10" : ""}`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-3xl font-bold text-purple-400">
//                   {selected.title}
//                 </h1>
//                 <button onClick={() => setFullscreen(!fullscreen)}>
//                   {fullscreen ? <Minimize2 /> : <Maximize2 />}
//                 </button>
//               </div>

//               {/* Tabs */}
//               <div className="flex border-b border-purple-500/20 mb-4">
//                 {(["html", "css", "javascript", "preview"] as const).map(
//                   (tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-6 py-2 ${
//                         activeTab === tab
//                           ? "text-purple-400 border-b-2 border-purple-400"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {tab === "javascript" ? "JS" : tab}
//                     </button>
//                   )
//                 )}
//               </div>

//               {activeTab === "preview" ? (
//                 <iframe
//                   srcDoc={generatePreview(selected)}
//                   className="w-full h-[500px] bg-white rounded-xl"
//                 />
//               ) : (
//                 <div className="relative">
//                   <button
//                     onClick={() => copyCode(selected[activeTab])}
//                     className="absolute top-4 right-4 bg-purple-600 px-4 py-2 rounded-lg text-sm"
//                   >
//                     {copied ? <Check size={16} /> : <Copy size={16} />}
//                   </button>

//                   <SyntaxHighlighter
//                     language={
//                       activeTab === "javascript"
//                         ? "javascript"
//                         : activeTab
//                     }
//                     style={vscDarkPlus}
//                     customStyle={{
//                       background: "transparent",
//                       padding: "2rem",
//                     }}
//                   >
//                     {selected[activeTab]}
//                   </SyntaxHighlighter>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MiniProjects

























// import { useState, useMemo } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Eye, ArrowLeft, Copy, Check, Lock, Maximize2, Minimize2, Search } from 'lucide-react'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import Lightning from '../components/Lightning'
// import { Project } from '@/types/index'

// /* ------------------ PROJECT DATA ------------------ */

// const projects: Project[] = [
//   {
//     id: "todo",
//     title: "To-Do App",
//     description: "Add & delete tasks dynamically.",
//     difficulty: "Beginner",
//     technologies: ["HTML","CSS","JavaScript"],
//     thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
//     html:`<h2>Todo App</h2><input id="task"/><button onclick="add()">Add</button><ul id="list"></ul>`,
//     css:`body{text-align:center;font-family:sans-serif}
// li{margin:5px}`,
//     javascript:`function add(){
// const val=document.getElementById("task").value;
// const li=document.createElement("li");
// li.innerText=val;
// document.getElementById("list").appendChild(li);
// }`
//   },
//   {
//     id:"counter",
//     title:"Counter App",
//     description:"Increment & decrement counter.",
//     difficulty:"Beginner",
//     technologies:["HTML","CSS","JavaScript"],
//     thumbnail:"https://images.unsplash.com/photo-1508780709619-79562169bc64",
//     html:`<h1 id="count">0</h1>
// <button onclick="inc()">+</button>
// <button onclick="dec()">-</button>`,
//     css:`body{text-align:center;margin-top:100px}`,
//     javascript:`let c=0;
// function inc(){c++;count.innerText=c}
// function dec(){c--;count.innerText=c}`
//   },
//   {
//     id:"calculator",
//     title:"Simple Calculator",
//     description:"Basic 2 number calculator.",
//     difficulty:"Intermediate",
//     technologies:["HTML","CSS","JavaScript"],
//     thumbnail:"https://images.unsplash.com/photo-1580910051074-3eb694886505",
//     html:`<input id="a"/><input id="b"/>
// <button onclick="add()">Add</button>
// <h3 id="res"></h3>`,
//     css:`body{text-align:center;margin-top:100px}`,
//     javascript:`function add(){
// let a=+document.getElementById("a").value;
// let b=+document.getElementById("b").value;
// res.innerText=a+b;
// }`
//   },
//   {
//     id:"color",
//     title:"Color Changer",
//     description:"Random background color generator.",
//     difficulty:"Beginner",
//     technologies:["HTML","CSS","JavaScript"],
//     thumbnail:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
//     html:`<button onclick="change()">Change Color</button>`,
//     css:`body{text-align:center;margin-top:100px}`,
//     javascript:`function change(){
// document.body.style.background=
// "hsl("+Math.random()*360+",70%,70%)"
// }`
//   },
//   {
//     id:"digital-clock",
//     title:"Digital Clock",
//     description:"Live real-time clock.",
//     difficulty:"Intermediate",
//     technologies:["HTML","CSS","JavaScript"],
//     thumbnail:"https://images.unsplash.com/photo-1503387762-592deb58ef4e",
//     html:`<h1 id="clock"></h1>`,
//     css:`body{text-align:center;margin-top:100px}`,
//     javascript:`setInterval(()=>{
// clock.innerText=new Date().toLocaleTimeString()
// },1000)`
//   }
// ]

// /* ------------------ COMPONENT ------------------ */

// const MiniProjects = () => {
//   const { isSignedIn } = useAuth()
//   const [selected, setSelected] = useState<Project | null>(null)
//   const [activeTab, setActiveTab] = useState<'html'|'css'|'javascript'|'preview'>('html')
//   const [copied, setCopied] = useState(false)
//   const [search, setSearch] = useState("")
//   const [fullscreen, setFullscreen] = useState(false)

//   const filteredProjects = useMemo(() =>
//     projects.filter(p =>
//       p.title.toLowerCase().includes(search.toLowerCase())
//     ), [search]
//   )

//   const copyCode = async (code:string)=>{
//     await navigator.clipboard.writeText(code)
//     setCopied(true)
//     setTimeout(()=>setCopied(false),1500)
//   }

//   const generatePreview = (p:Project)=>`
//     <html>
//       <head><style>${p.css}</style></head>
//       <body>${p.html}<script>${p.javascript}</script></body>
//     </html>
//   `

//   return (
//     <div className="relative min-h-screen bg-black text-white">

//       {/* Lightning Background */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         <Lightning hue={266} xOffset={-0.1} speed={1.5} intensity={2} size={1}/>
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"/>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"/>
//       </div>

//       <div className="relative z-10 px-4 md:px-10 py-16">

//         {!selected ? (
//           <>
//             <div className="text-center mb-10">
//               <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//                 Mini Projects
//               </h1>
//             </div>

//             {/* Search */}
//             <div className="max-w-xl mx-auto mb-12 relative">
//               <Search className="absolute left-4 top-3 text-gray-400"/>
//               <input
//                 type="text"
//                 placeholder="Search project..."
//                 value={search}
//                 onChange={(e)=>setSearch(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 focus:border-purple-400 outline-none"
//               />
//             </div>

//             {/* Grid */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredProjects.map(project=>(
//                 <div
//                   key={project.id}
//                   onClick={()=>isSignedIn && setSelected(project)}
//                   className="relative group cursor-pointer rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400 transition duration-300 bg-white/5 backdrop-blur-md hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
//                 >
//                   <img src={project.thumbnail} className="h-48 w-full object-cover"/>
                  
//                   {!isSignedIn && (
//                     <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
//                       <Lock className="text-purple-400 mr-2"/>
//                       <span>Login Required</span>
//                     </div>
//                   )}

//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//                     <p className="text-gray-400 text-sm mb-3">{project.description}</p>

//                     <span className={`text-xs px-3 py-1 rounded-full ${
//                       project.difficulty==="Beginner"
//                       ? "bg-green-500/20 text-green-400"
//                       : "bg-yellow-500/20 text-yellow-400"
//                     }`}>
//                       {project.difficulty}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ):(
//           <>
//             <button onClick={()=>setSelected(null)} className="mb-6 text-purple-400 flex items-center">
//               <ArrowLeft className="mr-2"/> Back
//             </button>

//             <div className={`${fullscreen ? "fixed inset-0 bg-black z-50 p-10" : ""}`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-3xl font-bold">{selected.title}</h1>
//                 <button onClick={()=>setFullscreen(!fullscreen)}>
//                   {fullscreen ? <Minimize2/> : <Maximize2/>}
//                 </button>
//               </div>

//               <div className="flex border-b border-purple-500/20 mb-4">
//                 {(['html','css','javascript','preview'] as const).map(tab=>(
//                   <button
//                     key={tab}
//                     onClick={()=>setActiveTab(tab)}
//                     className={`px-6 py-2 ${
//                       activeTab===tab
//                       ? "text-purple-400 border-b-2 border-purple-400"
//                       : "text-gray-400"
//                     }`}
//                   >
//                     {tab==="javascript"?"JS":tab}
//                   </button>
//                 ))}
//               </div>

//               {activeTab==="preview" ? (
//                 <iframe
//                   srcDoc={generatePreview(selected)}
//                   className="w-full h-[500px] bg-white rounded-xl"
//                 />
//               ):(
//                 <div className="relative">
//                   <button
//                     onClick={()=>copyCode(selected[activeTab])}
//                     className="absolute top-4 right-4 bg-purple-600 px-4 py-2 rounded-lg text-sm"
//                   >
//                     {copied ? <Check size={16}/> : <Copy size={16}/>}
//                   </button>

//                   <SyntaxHighlighter
//                     language={activeTab==="javascript"?"javascript":activeTab}
//                     style={vscDarkPlus}
//                     customStyle={{background:"transparent",padding:"2rem"}}
//                   >
//                     {selected[activeTab]}
//                   </SyntaxHighlighter>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MiniProjects




























// import { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { Code, Copy, CheckCircle, Eye, ArrowLeft } from 'lucide-react'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { Project } from '@/types/index'
// import { projects as originalProjects } from '../constant/index'

// const extraProjects: Project[] = [
//   {
//     id: "todo-app",
//     title: "To-Do App",
//     description: "Simple task manager with add & delete functionality.",
//     difficulty: "Beginner",
//     technologies: ["HTML", "CSS", "JavaScript"],
//     thumbnail: "https://via.placeholder.com/600x400",
//     html: `<div class="container">
//   <h2>To-Do App</h2>
//   <input id="taskInput" placeholder="Enter task"/>
//   <button onclick="addTask()">Add</button>
//   <ul id="list"></ul>
// </div>`,
//     css: `body{font-family:sans-serif;background:#f4f4f4}
// .container{text-align:center;margin-top:50px}
// li{margin:5px 0}`,
//     javascript: `function addTask(){
//   const input=document.getElementById("taskInput");
//   const li=document.createElement("li");
//   li.innerText=input.value;
//   document.getElementById("list").appendChild(li);
//   input.value="";
// }`
//   },
//   {
//     id: "counter-app",
//     title: "Counter App",
//     description: "Increment & decrement counter project.",
//     difficulty: "Beginner",
//     technologies: ["HTML", "CSS", "JavaScript"],
//     thumbnail: "https://via.placeholder.com/600x400",
//     html: `<div class="box">
//   <h2 id="count">0</h2>
//   <button onclick="inc()">+</button>
//   <button onclick="dec()">-</button>
// </div>`,
//     css: `.box{text-align:center;margin-top:100px}
// button{padding:10px;margin:5px}`,
//     javascript: `let c=0;
// function inc(){c++;document.getElementById("count").innerText=c}
// function dec(){c--;document.getElementById("count").innerText=c}`
//   },
//   {
//     id: "color-changer",
//     title: "Background Color Changer",
//     description: "Click button to change background color randomly.",
//     difficulty: "Beginner",
//     technologies: ["HTML", "CSS", "JavaScript"],
//     thumbnail: "https://via.placeholder.com/600x400",
//     html: `<button onclick="changeColor()">Change Color</button>`,
//     css: `body{text-align:center;margin-top:100px}`,
//     javascript: `function changeColor(){
//   document.body.style.background=
//   "hsl(" + Math.random()*360 + ",70%,70%)"
// }`
//   }
// ]

// const MiniProjects = () => {
//   const { isSignedIn } = useAuth()
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript' | 'preview'>('html')
//   const [copiedCode, setCopiedCode] = useState<string | null>(null)

//   const projects = [...originalProjects, ...extraProjects]

//   const copyToClipboard = async (code: string, type: string) => {
//     await navigator.clipboard.writeText(code)
//     setCopiedCode(`${selectedProject?.id}-${type}`)
//     setTimeout(() => setCopiedCode(null), 2000)
//   }

//   const generatePreviewHTML = (project: Project) => `
//     <html>
//       <head><style>${project.css}</style></head>
//       <body>
//         ${project.html}
//         <script>${project.javascript}</script>
//       </body>
//     </html>
//   `

//   if (selectedProject) {
//     return (
//       <div className="min-h-screen bg-black text-white px-4 md:px-10 py-16">
//         <div className="max-w-6xl mx-auto">

//           <button
//             onClick={() => setSelectedProject(null)}
//             className="flex items-center text-purple-400 mb-8 hover:text-purple-300"
//           >
//             <ArrowLeft className="mr-2" /> Back
//           </button>

//           <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//             {selectedProject.title}
//           </h1>

//           <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl overflow-hidden">

//             <div className="flex border-b border-purple-500/20">
//               {(['html','css','javascript','preview'] as const).map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-3 capitalize ${
//                     activeTab === tab
//                       ? 'text-purple-400 border-b-2 border-purple-400'
//                       : 'text-gray-400 hover:text-purple-300'
//                   }`}
//                 >
//                   {tab === "javascript" ? "JS" : tab}
//                 </button>
//               ))}
//             </div>

//             {activeTab === "preview" ? (
//               <iframe
//                 srcDoc={generatePreviewHTML(selectedProject)}
//                 className="w-full h-[500px] bg-white"
//               />
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => copyToClipboard(selectedProject[activeTab], activeTab)}
//                   className="absolute top-4 right-4 bg-purple-600 px-4 py-2 rounded text-sm"
//                 >
//                   {copiedCode === `${selectedProject.id}-${activeTab}` ? "Copied!" : "Copy"}
//                 </button>

//                 <SyntaxHighlighter
//                   language={activeTab === "javascript" ? "javascript" : activeTab}
//                   style={vscDarkPlus}
//                   customStyle={{ background: "transparent", padding: "2rem" }}
//                 >
//                   {selectedProject[activeTab]}
//                 </SyntaxHighlighter>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-black text-white px-4 md:px-10 py-20">
//       <div className="max-w-7xl mx-auto">

//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//             Mini Projects
//           </h1>
//           <p className="text-gray-400 mt-4">
//             Practice projects with live preview & full source code.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map(project => (
//             <div
//               key={project.id}
//               onClick={() => isSignedIn && setSelectedProject(project)}
//               className="cursor-pointer bg-purple-500/10 border border-purple-500/20 rounded-xl overflow-hidden hover:scale-105 transition"
//             >
//               <img src={project.thumbnail} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-white mb-2">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-400 text-sm mb-4">
//                   {project.description}
//                 </p>
//                 <div className="flex items-center text-purple-400 text-sm">
//                   <Eye className="w-4 h-4 mr-2" />
//                   View Project
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default MiniProjects



















// import { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { Code, Copy, CheckCircle, Eye, ArrowLeft } from 'lucide-react'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { Project } from '@/types/index'
// import { projects } from '../constant/index'

// const MiniProjects = () => {
//   const { isSignedIn } = useAuth()
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript' | 'preview'>('html')
//   const [copiedCode, setCopiedCode] = useState<string | null>(null)


//   const copyToClipboard = async (code: string, type: string) => {
//     try {
//       await navigator.clipboard.writeText(code)
//       setCopiedCode(`${selectedProject?.id}-${type}`)
//       setTimeout(() => setCopiedCode(null), 2000)
//     } catch (error) {
//       console.error('Failed to copy code:', error)
//     }
//   }

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
//       case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
//       case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
//       default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
//     }
//   }

//   const generatePreviewHTML = (project: Project) => {
//     return `
//       <html>
//         <head>
//           <style>${project.css}</style>
//         </head>
//         <body>
//           ${project.html.replace(/<script.*<\/script>/s, '')}
//           <script>${project.javascript}</script>
//         </body>
//       </html>
//     `
//   }

//   if (selectedProject) {
//     return (
//       <div className="min-h-screen">
//         <section className="container mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="flex items-center mb-12">
//             <button
//               onClick={() => setSelectedProject(null)}
//               className="mr-6 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
//             >
//               <ArrowLeft className="w-6 h-6 text-purple-400" />
//             </button>
//             <div className="flex-1">
//               <div className="flex items-center gap-4 mb-2">
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   {selectedProject.title}
//                 </h1>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedProject.difficulty)}`}>
//                   {selectedProject.difficulty}
//                 </span>
//               </div>
//               <p className="text-gray-300">{selectedProject.description}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 {selectedProject.technologies.map((tech) => (
//                   <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Code Editor */}
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
//             {/* Tabs */}
//             <div className="flex border-b border-purple-500/20 bg-black/20">
//               {(['html', 'css', 'javascript', 'preview'] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-3 font-medium transition-colors capitalize ${
//                     activeTab === tab
//                       ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-400'
//                       : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
//                   }`}
//                 >
//                   {tab === 'javascript' ? 'JS' : tab}
//                 </button>
//               ))}
//             </div>

//             {/* Content */}
//             <div className="relative">
//               {activeTab === 'preview' ? (
//                 <div className="p-6">
//                   <div className="bg-white rounded-lg overflow-hidden" style={{ height: '500px' }}>
//                     <iframe
//                       srcDoc={generatePreviewHTML(selectedProject)}
//                       className="w-full h-full border-0"
//                       title="Project Preview"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="relative">
//                   <button
//                     onClick={() => copyToClipboard(selectedProject[activeTab], activeTab)}
//                     className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-colors"
//                   >
//                     {copiedCode === `${selectedProject.id}-${activeTab}` ? (
//                       <>
//                         <CheckCircle className="w-4 h-4" />
//                         <span className="text-sm">Copied!</span>
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="w-4 h-4" />
//                         <span className="text-sm">Copy</span>
//                       </>
//                     )}
//                   </button>
                  
//                   <SyntaxHighlighter
//                     language={activeTab === 'javascript' ? 'javascript' : activeTab}
//                     style={vscDarkPlus}
//                     customStyle={{
//                       margin: 0,
//                       padding: '2rem',
//                       background: 'transparent',
//                       fontSize: '0.9rem',
//                       lineHeight: '1.5'
//                     }}
//                   >
//                     {selectedProject[activeTab]}
//                   </SyntaxHighlighter>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
//             <button
//               onClick={() => copyToClipboard(
//                 `${selectedProject.html}\n\n/* CSS */\n${selectedProject.css}\n\n/* JavaScript */\n${selectedProject.javascript}`,
//                 'all'
//               )}
//               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//             >
//               <Copy className="mr-2 w-5 h-5" />
//               Copy All Code
//             </button>
            
//             <button
//               onClick={() => setSelectedProject(null)}
//               className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
//             >
//               Back to Projects
//             </button>
//           </div>
//         </section>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen">
//       <section className="container mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="flex justify-center mb-8">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
//               <Code className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Mini Projects
//           </h1>
          
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
//             Explore beginner-friendly projects with complete source code. Each project includes 
//             HTML, CSS, and JavaScript with live preview and copy-to-clipboard functionality.
//           </p>
          
//           {!isSignedIn && (
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
//               <p className="text-purple-300 mb-4">Sign in to access mini projects</p>
//               <Link
//                 to="/sign-up"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Features */}
//         <div className="grid md:grid-cols-4 gap-6 mb-16">
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-3xl mb-3">💻</div>
//             <h3 className="text-lg font-bold text-white mb-2">Complete Code</h3>
//             <p className="text-gray-300 text-sm">Full HTML, CSS, and JavaScript source code</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-3xl mb-3">👁️</div>
//             <h3 className="text-lg font-bold text-white mb-2">Live Preview</h3>
//             <p className="text-gray-300 text-sm">See projects running in real-time</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-3xl mb-3">📋</div>
//             <h3 className="text-lg font-bold text-white mb-2">Easy Copy</h3>
//             <p className="text-gray-300 text-sm">One-click copy to clipboard functionality</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-3xl mb-3">🎯</div>
//             <h3 className="text-lg font-bold text-white mb-2">Beginner Friendly</h3>
//             <p className="text-gray-300 text-sm">Perfect for learning and practice</p>
//           </div>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project) => (
//             <button
//               key={project.id}
//               onClick={() => isSignedIn && setSelectedProject(project)}
//               disabled={!isSignedIn}
//               className={`group bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left ${
//                 !isSignedIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-purple-400/40'
//               }`}
//             >
//               <div className="aspect-video overflow-hidden">
//                 <img
//                   src={project.thumbnail}
//                   alt={project.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
              
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
//                     {project.title}
//                   </h3>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
//                     {project.difficulty}
//                   </span>
//                 </div>
                
//                 <p className="text-gray-300 text-sm mb-4 line-clamp-2">
//                   {project.description}
//                 </p>
                
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.technologies.map((tech) => (
//                     <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
                
//                 <div className="flex items-center text-purple-400 text-sm font-medium">
//                   <Eye className="w-4 h-4 mr-2" />
//                   View Project
//                 </div>
//               </div>
              
//               {!isSignedIn && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
//                   <span className="text-purple-300 font-medium">Sign in required</span>
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Call to Action */}
//         {!isSignedIn && (
//           <div className="text-center mt-16">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Start Building Today</h3>
//               <p className="text-gray-300 mb-6">
//                 Access all mini projects with complete source code and start building your portfolio.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/sign-up"
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//                 >
//                   Create Free Account
//                 </Link>
//                 <Link
//                   to="/about"
//                   className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   )
// }

// export default MiniProjects