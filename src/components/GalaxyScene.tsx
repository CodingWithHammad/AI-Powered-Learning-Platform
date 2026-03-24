import { useEffect, useRef } from "react"
import * as THREE from "three"

const GalaxyScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    )
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const loader = new THREE.TextureLoader()

    // 🔥 DEBUG TEXTURE LOAD
    const galaxyTexture = loader.load(
      "/textures/galaxy.png",
      () => console.log("✅ galaxy loaded"),
      undefined,
      () => console.log("❌ galaxy failed")
    )

    const sunTexture = loader.load(
      "/textures/sunSurface.jpg",
      () => console.log("✅ sun loaded"),
      undefined,
      () => console.log("❌ sun failed")
    )

    // 🌌 BACKGROUND
    scene.background = galaxyTexture

    // 💡 LIGHT (VERY IMPORTANT warna sab black)
    const light = new THREE.PointLight(0xffffff, 3, 1000)
    scene.add(light)

    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    // ⭐ STARS
    const starGeo = new THREE.BufferGeometry()
    const starVertices = []

    for (let i = 0; i < 2000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500
      )
    }

    starGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    )

    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 1.2 })
    )

    scene.add(stars)

    // ☀️ SUN (TEXTURE APPLIED)
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(20, 64, 64),
      new THREE.MeshStandardMaterial({
        map: sunTexture,
        emissive: 0xffaa00,
        emissiveIntensity: 1.5
      })
    )

    scene.add(sun)

    // 🌍 EARTH (TEST TEXTURE OR COLOR)
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(6, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x2d7cff // fallback blue
      })
    )

    earth.position.x = 40
    scene.add(earth)

    // 🎬 ANIMATION
    const animate = () => {
      requestAnimationFrame(animate)

      sun.rotation.y += 0.003
      earth.rotation.y += 0.01
      stars.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }

  }, [])

  return <div ref={mountRef} className="w-full h-screen" />
}

export default GalaxyScene






















// import { useEffect, useRef } from "react"
// import * as THREE from "three"

// const GalaxyScene = () => {
//   const mountRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     if (!mountRef.current) return

//     const scene = new THREE.Scene()

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       2000
//     )
//     camera.position.z = 100

//     const renderer = new THREE.WebGLRenderer({ antialias: true })
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     mountRef.current.appendChild(renderer.domElement)

//     const loader = new THREE.TextureLoader()

//     // 🔥 DEBUG TEXTURE LOAD
//     const galaxyTexture = loader.load(
//       "/textures/galaxy.png",
//       () => console.log("✅ galaxy loaded"),
//       undefined,
//       () => console.log("❌ galaxy failed")
//     )

//     const sunTexture = loader.load(
//       "/textures/sunSurface.jpg",
//       () => console.log("✅ sun loaded"),
//       undefined,
//       () => console.log("❌ sun failed")
//     )

//     // 🌌 BACKGROUND
//     scene.background = galaxyTexture

//     // 💡 LIGHT (VERY IMPORTANT warna sab black)
//     const light = new THREE.PointLight(0xffffff, 3, 1000)
//     scene.add(light)

//     const ambient = new THREE.AmbientLight(0xffffff, 0.4)
//     scene.add(ambient)

//     // ⭐ STARS
//     const starGeo = new THREE.BufferGeometry()
//     const starVertices = []

//     for (let i = 0; i < 2000; i++) {
//       starVertices.push(
//         (Math.random() - 0.5) * 1500,
//         (Math.random() - 0.5) * 1500,
//         (Math.random() - 0.5) * 1500
//       )
//     }

//     starGeo.setAttribute(
//       "position",
//       new THREE.Float32BufferAttribute(starVertices, 3)
//     )

//     const stars = new THREE.Points(
//       starGeo,
//       new THREE.PointsMaterial({ size: 1.2 })
//     )

//     scene.add(stars)

//     // ☀️ SUN (TEXTURE APPLIED)
//     const sun = new THREE.Mesh(
//       new THREE.SphereGeometry(20, 64, 64),
//       new THREE.MeshStandardMaterial({
//         map: sunTexture,
//         emissive: 0xffaa00,
//         emissiveIntensity: 1.5
//       })
//     )

//     scene.add(sun)

//     // 🌍 EARTH (TEST TEXTURE OR COLOR)
//     const earth = new THREE.Mesh(
//       new THREE.SphereGeometry(6, 64, 64),
//       new THREE.MeshStandardMaterial({
//         color: 0x2d7cff // fallback blue
//       })
//     )

//     earth.position.x = 40
//     scene.add(earth)

//     // 🎬 ANIMATION
//     const animate = () => {
//       requestAnimationFrame(animate)

//       sun.rotation.y += 0.003
//       earth.rotation.y += 0.01
//       stars.rotation.y += 0.0005

//       renderer.render(scene, camera)
//     }
//     animate()
//     return () => {
//       mountRef.current?.removeChild(renderer.domElement)
    
//     }

//   }, [])


//   return <div ref={mountRef} className="w-full h-screen" />
// }

// export default GalaxyScene