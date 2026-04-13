// "use client"

// import React, { useEffect, useRef } from "react"
// import * as THREE from "three"
// import { OrbitControls } from "three-stdlib"

// export default function SolarSystem() {

//   const mountRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {

//     if (!mountRef.current) return

//     const scene = new THREE.Scene()

//     /* CAMERA */
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / 520,
//       0.1,
//       2000
//     )
//     camera.position.set(60, 30, 60)

//     /* RENDERER */
//     const renderer = new THREE.WebGLRenderer({ antialias: true })
//    renderer.setSize(window.innerWidth, window.innerHeight)
//     renderer.setPixelRatio(window.devicePixelRatio)
//     mountRef.current.appendChild(renderer.domElement)

//     /* CONTROLS */
//     const controls = new OrbitControls(camera, renderer.domElement)
//     controls.enableDamping = true

//     /* LIGHT */
//     const sunLight = new THREE.PointLight(0xffffff, 3, 2000)
//     scene.add(sunLight)
//     scene.add(new THREE.AmbientLight(0xffffff, 0.2))

//     /* TEXTURE LOADER */
//     const loader = new THREE.TextureLoader()

//     function loadTexture(path: string) {
//       return new Promise<THREE.Texture>((resolve) => {
//         loader.load(
//           path,
//           (tex) => resolve(tex),
//           undefined,
//           () => {
//             // fallback if texture fails
//             const canvas = document.createElement("canvas")
//             canvas.width = 64
//             canvas.height = 64
//             const ctx = canvas.getContext("2d")!
//             ctx.fillStyle = "#777"
//             ctx.fillRect(0, 0, 64, 64)
//             resolve(new THREE.CanvasTexture(canvas))
//           }
//         )
//       })
//     }

//     async function init() {

//       /* LOAD TEXTURES */
//       const textures = {
//         sun: await loadTexture("/textures/sunSurfaceMaterial.jpg"),
//         mercury: await loadTexture("/textures/mercurymap.jpg"),
//         venus: await loadTexture("/textures/venusmap.jpg"),
//         earth: await loadTexture("/textures/earth.jpg"),
//         moon: await loadTexture("/textures/moon.jpg"),
//         mars: await loadTexture("/textures/mars.jpg"),
//         jupiter: await loadTexture("/textures/jupiter.jpg"),
//         saturn: await loadTexture("/textures/saturnmap.jpg"),
//         uranus: await loadTexture("/textures/uranusmap.jpg"),
//         neptune: await loadTexture("/textures/neptunemap.jpg"),
//         ring: await loadTexture("/textures/saturnringmap.png"),
//       }

//       /* STARS BACKGROUND */
//       const starGeo = new THREE.BufferGeometry()
//       const starVertices = []

//       for (let i = 0; i < 6000; i++) {
//         starVertices.push(
//           (Math.random() - 0.5) * 2000,
//           (Math.random() - 0.5) * 2000,
//           (Math.random() - 0.5) * 2000
//         )
//       }

//       starGeo.setAttribute(
//         "position",
//         new THREE.Float32BufferAttribute(starVertices, 3)
//       )

//       const stars = new THREE.Points(
//         starGeo,
//         new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
//       )

//       scene.add(stars)

//       /* SUN */
//       const sun = new THREE.Mesh(
//         new THREE.SphereGeometry(6, 64, 64),
//         new THREE.MeshBasicMaterial({ map: textures.sun })
//       )
//       scene.add(sun)

//       /* SUN GLOW */
//       const glow = new THREE.Mesh(
//         new THREE.SphereGeometry(7, 64, 64),
//         new THREE.MeshBasicMaterial({
//           color: 0xffaa00,
//           transparent: true,
//           opacity: 0.4,
//         })
//       )
//       scene.add(glow)

//       /* PLANET CREATOR */
//       function createPlanet(
//         size: number,
//         texture: THREE.Texture,
//         distance: number,
//         speed: number
//       ) {
//         const mesh = new THREE.Mesh(
//           new THREE.SphereGeometry(size, 32, 32),
//           new THREE.MeshStandardMaterial({ map: texture })
//         )

//         scene.add(mesh)

//         const orbit = new THREE.Mesh(
//           new THREE.RingGeometry(distance - 0.05, distance + 0.05, 64),
//           new THREE.MeshBasicMaterial({
//             color: 0x444444,
//             side: THREE.DoubleSide,
//             transparent: true,
//             opacity: 0.3,
//           })
//         )

//         orbit.rotation.x = Math.PI / 2
//         scene.add(orbit)

//         return {
//           mesh,
//           distance,
//           speed,
//           angle: Math.random() * Math.PI * 2,
//         }
//       }

//       /* PLANETS */
//       const mercury = createPlanet(0.5, textures.mercury, 10, 0.02)
//       const venus = createPlanet(0.9, textures.venus, 13, 0.015)
//       const earth = createPlanet(1.2, textures.earth, 16, 0.01)
//       const mars = createPlanet(0.9, textures.mars, 20, 0.008)
//       const jupiter = createPlanet(2.5, textures.jupiter, 28, 0.006)
//       const saturn = createPlanet(2.2, textures.saturn, 36, 0.005)
//       const uranus = createPlanet(1.8, textures.uranus, 44, 0.004)
//       const neptune = createPlanet(1.7, textures.neptune, 52, 0.003)

//       /* SATURN RING */
//       const ring = new THREE.Mesh(
//         new THREE.RingGeometry(3, 5, 64),
//         new THREE.MeshBasicMaterial({
//           map: textures.ring,
//           side: THREE.DoubleSide,
//           transparent: true,
//         })
//       )
//       ring.rotation.x = Math.PI / 2
//       saturn.mesh.add(ring)

//       /* MOON */
//       const moon = new THREE.Mesh(
//         new THREE.SphereGeometry(0.4, 32, 32),
//         new THREE.MeshStandardMaterial({ map: textures.moon })
//       )
//       scene.add(moon)

//       /* ANIMATION LOOP */
//       function animate() {
//         requestAnimationFrame(animate)

//         const planets = [
//           mercury,
//           venus,
//           earth,
//           mars,
//           jupiter,
//           saturn,
//           uranus,
//           neptune,
//         ]

//         planets.forEach((p) => {
//           p.angle += p.speed
//           p.mesh.position.set(
//             Math.cos(p.angle) * p.distance,
//             0,
//             Math.sin(p.angle) * p.distance
//           )
//         })

//         /* ROTATION */
//         sun.rotation.y += 0.01
//         earth.mesh.rotation.y += 0.02

//         /* MOON ORBIT */
//         const moonAngle = Date.now() * 0.002
//         moon.position.set(
//           earth.mesh.position.x + Math.cos(moonAngle) * 2,
//           0,
//           earth.mesh.position.z + Math.sin(moonAngle) * 2
//         )

//         /* STARS MOVE */
//         stars.rotation.y += 0.0003

//         controls.update()
//         renderer.render(scene, camera)
//       }

//       animate()
//     }

//     init()

//     /* CLEANUP (VERY IMPORTANT) */
//     return () => {
//       if (mountRef.current) {
//         mountRef.current.innerHTML = ""
//       }
//     }

//   }, [])

//   return (
//     <div className="w-full flex justify-center bg-black">
//       <div ref={mountRef} className="w-full h-[520px]" />
//     </div>
//   )
// }






































// "use client"

// import React, { useEffect, useRef } from "react"
// import * as THREE from "three"
// import { OrbitControls } from "three-stdlib"

// export default function SolarSystem() {

//   const mountRef = useRef<HTMLDivElement>(null)

//   // 🔊 AUDIO REF
//   const audioRef = useRef<HTMLAudioElement | null>(null)

//   useEffect(() => {

//     // 🔊 AUDIO CODE (ADDED)
//     const audio = new Audio('/solarsystem.wav')
//     audio.volume = 0.5
//     audioRef.current = audio

//     const playAudio = () => {
//       audio.play().catch(() => {
//         const resumeAudio = () => {
//           audio.play()
//           window.removeEventListener('click', resumeAudio)
//         }
//         window.addEventListener('click', resumeAudio)
//       })
//     }

//     playAudio()

//     // ===== YOUR ORIGINAL CODE START =====

//     if (!mountRef.current) return

//     const scene = new THREE.Scene()

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / 520,
//       0.1,
//       2000
//     )
//     camera.position.set(60, 30, 60)

//     const renderer = new THREE.WebGLRenderer({ antialias: true })
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     renderer.setPixelRatio(window.devicePixelRatio)
//     mountRef.current.appendChild(renderer.domElement)

//     const controls = new OrbitControls(camera, renderer.domElement)
//     controls.enableDamping = true

//     const sunLight = new THREE.PointLight(0xffffff, 3, 2000)
//     scene.add(sunLight)
//     scene.add(new THREE.AmbientLight(0xffffff, 0.2))

//     const loader = new THREE.TextureLoader()

//     function loadTexture(path: string) {
//       return new Promise<THREE.Texture>((resolve) => {
//         loader.load(
//           path,
//           (tex) => resolve(tex),
//           undefined,
//           () => {
//             const canvas = document.createElement("canvas")
//             canvas.width = 64
//             canvas.height = 64
//             const ctx = canvas.getContext("2d")!
//             ctx.fillStyle = "#777"
//             ctx.fillRect(0, 0, 64, 64)
//             resolve(new THREE.CanvasTexture(canvas))
//           }
//         )
//       })
//     }

//     async function init() {

//       const textures = {
//         sun: await loadTexture("/textures/sunSurfaceMaterial.jpg"),
//         mercury: await loadTexture("/textures/mercurymap.jpg"),
//         venus: await loadTexture("/textures/venusmap.jpg"),
//         earth: await loadTexture("/textures/earth.jpg"),
//         moon: await loadTexture("/textures/moon.jpg"),
//         mars: await loadTexture("/textures/mars.jpg"),
//         jupiter: await loadTexture("/textures/jupiter.jpg"),
//         saturn: await loadTexture("/textures/saturnmap.jpg"),
//         uranus: await loadTexture("/textures/uranusmap.jpg"),
//         neptune: await loadTexture("/textures/neptunemap.jpg"),
//         ring: await loadTexture("/textures/saturnringmap.png"),
//       }

//       const starGeo = new THREE.BufferGeometry()
//       const starVertices = []

//       for (let i = 0; i < 6000; i++) {
//         starVertices.push(
//           (Math.random() - 0.5) * 2000,
//           (Math.random() - 0.5) * 2000,
//           (Math.random() - 0.5) * 2000
//         )
//       }

//       starGeo.setAttribute(
//         "position",
//         new THREE.Float32BufferAttribute(starVertices, 3)
//       )

//       const stars = new THREE.Points(
//         starGeo,
//         new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
//       )

//       scene.add(stars)

//       const sun = new THREE.Mesh(
//         new THREE.SphereGeometry(6, 64, 64),
//         new THREE.MeshBasicMaterial({ map: textures.sun })
//       )
//       scene.add(sun)

//       const glow = new THREE.Mesh(
//         new THREE.SphereGeometry(7, 64, 64),
//         new THREE.MeshBasicMaterial({
//           color: 0xffaa00,
//           transparent: true,
//           opacity: 0.4,
//         })
//       )
//       scene.add(glow)

//       function createPlanet(size: number, texture: THREE.Texture, distance: number, speed: number) {
//         const mesh = new THREE.Mesh(
//           new THREE.SphereGeometry(size, 32, 32),
//           new THREE.MeshStandardMaterial({ map: texture })
//         )

//         scene.add(mesh)

//         const orbit = new THREE.Mesh(
//           new THREE.RingGeometry(distance - 0.05, distance + 0.05, 64),
//           new THREE.MeshBasicMaterial({
//             color: 0x444444,
//             side: THREE.DoubleSide,
//             transparent: true,
//             opacity: 0.3,
//           })
//         )

//         orbit.rotation.x = Math.PI / 2
//         scene.add(orbit)

//         return { mesh, distance, speed, angle: Math.random() * Math.PI * 2 }
//       }

//       const mercury = createPlanet(0.5, textures.mercury, 10, 0.02)
//       const venus = createPlanet(0.9, textures.venus, 13, 0.015)
//       const earth = createPlanet(1.2, textures.earth, 16, 0.01)
//       const mars = createPlanet(0.9, textures.mars, 20, 0.008)
//       const jupiter = createPlanet(2.5, textures.jupiter, 28, 0.006)
//       const saturn = createPlanet(2.2, textures.saturn, 36, 0.005)
//       const uranus = createPlanet(1.8, textures.uranus, 44, 0.004)
//       const neptune = createPlanet(1.7, textures.neptune, 52, 0.003)

//       const ring = new THREE.Mesh(
//         new THREE.RingGeometry(3, 5, 64),
//         new THREE.MeshBasicMaterial({
//           map: textures.ring,
//           side: THREE.DoubleSide,
//           transparent: true,
//         })
//       )
//       ring.rotation.x = Math.PI / 2
//       saturn.mesh.add(ring)

//       const moon = new THREE.Mesh(
//         new THREE.SphereGeometry(0.4, 32, 32),
//         new THREE.MeshStandardMaterial({ map: textures.moon })
//       )
//       scene.add(moon)

//       function animate() {
//         requestAnimationFrame(animate)

//         const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]

//         planets.forEach((p) => {
//           p.angle += p.speed
//           p.mesh.position.set(
//             Math.cos(p.angle) * p.distance,
//             0,
//             Math.sin(p.angle) * p.distance
//           )
//         })

//         sun.rotation.y += 0.01
//         earth.mesh.rotation.y += 0.02

//         const moonAngle = Date.now() * 0.002
//         moon.position.set(
//           earth.mesh.position.x + Math.cos(moonAngle) * 2,
//           0,
//           earth.mesh.position.z + Math.sin(moonAngle) * 2
//         )

//         stars.rotation.y += 0.0003

//         controls.update()
//         renderer.render(scene, camera)
//       }

//       animate()
//     }

//     init()

//     return () => {
//       if (mountRef.current) {
//         mountRef.current.innerHTML = ""
//       }
//       audio.pause()
//     }

//   }, [])

//   // 🔘 BUTTON FUNCTIONS
//   const playSound = () => {
//     audioRef.current?.play()
//   }

//   const stopSound = () => {
//     if (audioRef.current) {
//       audioRef.current.pause()
//       audioRef.current.currentTime = 0
//     }
//   }

//   return (
//     <div className="w-full flex justify-center bg-black relative">

//       {/* 🔘 BUTTON */}
//       <div className="fixed bottom-5 right-5 z-50 flex border border-white">
//         <button onClick={stopSound} className="bg-black text-white px-4 py-2">
//           ⏹
//         </button>
//         <button onClick={playSound} className="bg-white text-black px-4 py-2">
//           ▶️
//         </button>
//       </div>

//       <div ref={mountRef} className="w-full h-[520px]" />
//     </div>
//   )
// }


























"use client"


import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three-stdlib"

export default function SolarSystem() {
  const mountRef = useRef<HTMLDivElement>(null)
  
  // 🔊 AUDIO REF

  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {

    // ✅ AUDIO SETUP (NO AUTOPLAY)
    const audio = new Audio('/solarsystem.wav')
    audio.volume = 0.5
    audio.loop = true
    audioRef.current = audio

    // ===== YOUR ORIGINAL CODE START =====

    if (!mountRef.current) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 520,
      0.1,
      2000
    )
    camera.position.set(60, 30, 60)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const sunLight = new THREE.PointLight(0xffffff, 3, 2000)
    scene.add(sunLight)
    scene.add(new THREE.AmbientLight(0xffffff, 0.2))

    const loader = new THREE.TextureLoader()

    function loadTexture(path: string) {
      return new Promise<THREE.Texture>((resolve) => {
        loader.load(
          path,
          (tex) => resolve(tex),
          undefined,
          () => {
            const canvas = document.createElement("canvas")
            canvas.width = 64
            canvas.height = 64
            const ctx = canvas.getContext("2d")!
            ctx.fillStyle = "#777"
            ctx.fillRect(0, 0, 64, 64)
            resolve(new THREE.CanvasTexture(canvas))
          }
        )
      })
    }

    async function init() {

      const textures = {
        sun: await loadTexture("/textures/sunSurfaceMaterial.jpg"),
        mercury: await loadTexture("/textures/mercurymap.jpg"),
        venus: await loadTexture("/textures/venusmap.jpg"),
        earth: await loadTexture("/textures/earth.jpg"),
        moon: await loadTexture("/textures/moon.jpg"),
        mars: await loadTexture("/textures/mars.jpg"),
        jupiter: await loadTexture("/textures/jupiter.jpg"),
        saturn: await loadTexture("/textures/saturnmap.jpg"),
        uranus: await loadTexture("/textures/uranusmap.jpg"),
        neptune: await loadTexture("/textures/neptunemap.jpg"),
        ring: await loadTexture("/textures/saturnringmap.png"),
      }

      const starGeo = new THREE.BufferGeometry()
      const starVertices = []

      for (let i = 0; i < 6000; i++) {
        starVertices.push(
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000
        )
      }

      starGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
      )

      const stars = new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
      )

      scene.add(stars)

      const sun = new THREE.Mesh(
        new THREE.SphereGeometry(6, 64, 64),
        new THREE.MeshBasicMaterial({ map: textures.sun })
      )
      scene.add(sun)

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(7, 64, 64),
        new THREE.MeshBasicMaterial({
          color: 0xffaa00,
          transparent: true,
          opacity: 0.4,
        })
      )
      scene.add(glow)

      function createPlanet(size: number, texture: THREE.Texture, distance: number, speed: number) {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(size, 32, 32),
          new THREE.MeshStandardMaterial({ map: texture })
        )

        scene.add(mesh)

        const orbit = new THREE.Mesh(
          new THREE.RingGeometry(distance - 0.05, distance + 0.05, 64),
          new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3,
          })
        )

        orbit.rotation.x = Math.PI / 2
        scene.add(orbit)

        return { mesh, distance, speed, angle: Math.random() * Math.PI * 2 }
      }

      const mercury = createPlanet(0.5, textures.mercury, 10, 0.02)
      const venus = createPlanet(0.9, textures.venus, 13, 0.015)
      const earth = createPlanet(1.2, textures.earth, 16, 0.01)
      const mars = createPlanet(0.9, textures.mars, 20, 0.008)
      const jupiter = createPlanet(2.5, textures.jupiter, 28, 0.006)
      const saturn = createPlanet(2.2, textures.saturn, 36, 0.005)
      const uranus = createPlanet(1.8, textures.uranus, 44, 0.004)
      const neptune = createPlanet(1.7, textures.neptune, 52, 0.003)

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(3, 5, 64),
        new THREE.MeshBasicMaterial({
          map: textures.ring,
          side: THREE.DoubleSide,
          transparent: true,
        })
      )
      ring.rotation.x = Math.PI / 2
      saturn.mesh.add(ring)

      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 32, 32),
        new THREE.MeshStandardMaterial({ map: textures.moon })
      )
      scene.add(moon)

      function animate() {
        requestAnimationFrame(animate)

        const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]

        planets.forEach((p) => {
          p.angle += p.speed
          p.mesh.position.set(
            Math.cos(p.angle) * p.distance,
            0,
            Math.sin(p.angle) * p.distance
          )
        })

        sun.rotation.y += 0.01
        earth.mesh.rotation.y += 0.02

        const moonAngle = Date.now() * 0.002
        moon.position.set(
          earth.mesh.position.x + Math.cos(moonAngle) * 2,
          0,
          earth.mesh.position.z + Math.sin(moonAngle) * 2
        )

        stars.rotation.y += 0.0003

        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }

    init()

    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = ""
      }
      audio.pause()
    }

  }, [])

  // 🔘 BUTTON FUNCTIONS
  const playSound = () => {
    audioRef.current?.play()
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className="w-full flex justify-center bg-black relative">

      {/* 🔘 BUTTON */}
      <div className="fixed bottom-5 right-5 z-50 flex border border-white">
        <button onClick={stopSound} className="bg-black text-white px-4 py-2">
          ⏹
        </button>
        <button onClick={playSound} className="bg-white text-black px-4 py-2">
          ▶️
        </button>
      </div>


      <div ref={mountRef} className="w-full h-130" />
    </div>
  )
}