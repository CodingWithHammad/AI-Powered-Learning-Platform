"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Lightning from "@/components/Lightning"

class TreeNode {
  value: number
  left: TreeNode | null = null
  right: TreeNode | null = null
  x = 0
  y = 0

  constructor(value: number) {
    this.value = value
  }
}

export default function BSTVisualizer() {

  const mountRef = useRef<HTMLDivElement>(null)

  const [root, setRoot] = useState<TreeNode | null>(null)
  const [input, setInput] = useState("")
  const [inorderResult, setInorderResult] = useState<number[]>([])

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {

    if (!node) return new TreeNode(value)

    if (value < node.value)
      node.left = insertNode(node.left, value)

    else if (value > node.value)
      node.right = insertNode(node.right, value)

    return node
  }

  const handleInsert = () => {

    const val = parseInt(input)

    if (isNaN(val)) return

    const newRoot = insertNode(root, val)

    setRoot({ ...newRoot })

    setInput("")
  }

  const deleteNode = (node: TreeNode | null, value: number): TreeNode | null => {

    if (!node) return null

    if (value < node.value)
      node.left = deleteNode(node.left, value)

    else if (value > node.value)
      node.right = deleteNode(node.right, value)

    else {

      if (!node.left && !node.right) return null

      if (!node.left) return node.right

      if (!node.right) return node.left

      let min = node.right

      while (min.left) min = min.left

      node.value = min.value

      node.right = deleteNode(node.right, min.value)
    }

    return node
  }

  const handleDelete = () => {

    const val = parseInt(input)

    if (isNaN(val)) return

    const newRoot = deleteNode(root, val)

    setRoot(newRoot ? { ...newRoot } : null)

    setInput("")
  }

  const inorder = (node: TreeNode | null, arr: number[] = []) => {

    if (!node) return

    inorder(node.left, arr)

    arr.push(node.value)

    inorder(node.right, arr)

    return arr
  }

  const handleInorder = () => {

    const result = inorder(root, [])

    setInorderResult(result || [])
  }

  const calculatePositions = (
    node: TreeNode | null,
    depth: number,
    minX: number,
    maxX: number
  ) => {

    if (!node) return

    node.x = (minX + maxX) / 2
    node.y = -depth * 3

    calculatePositions(node.left, depth + 1, minX, node.x - 1)
    calculatePositions(node.right, depth + 1, node.x + 1, maxX)
  }

  useEffect(() => {

    if (!mountRef.current) return

    mountRef.current.innerHTML = ""

    const width = mountRef.current.clientWidth
    const height = 500

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )

    camera.position.set(0, 5, 20)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })

    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)

    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(10, 20, 10)

    scene.add(light)

    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambient)

    if (root) {

      calculatePositions(root, 0, -15, 15)

      const drawNode = (node: TreeNode | null) => {

        if (!node) return

        const geometry = new THREE.SphereGeometry(0.8, 32, 32)

        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8
        })

        const sphere = new THREE.Mesh(geometry, material)

        sphere.position.set(node.x, node.y, 0)

        scene.add(sphere)

        const canvas = document.createElement("canvas")

        const ctx = canvas.getContext("2d")!

        canvas.width = 256
        canvas.height = 256

        ctx.fillStyle = "white"
        ctx.font = "bold 90px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText(node.value.toString(), 128, 128)

        const texture = new THREE.CanvasTexture(canvas)

        const spriteMaterial = new THREE.SpriteMaterial({ map: texture })

        const sprite = new THREE.Sprite(spriteMaterial)

        sprite.scale.set(2, 2, 1)

        sprite.position.set(node.x, node.y, 1)

        scene.add(sprite)

        const drawLine = (child: TreeNode) => {

          const points = [
            new THREE.Vector3(node.x, node.y, 0),
            new THREE.Vector3(child.x, child.y, 0)
          ]

          const geometry = new THREE.BufferGeometry().setFromPoints(points)

          const line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: 0xffffff })
          )

          scene.add(line)
        }

        if (node.left) drawLine(node.left)
        if (node.right) drawLine(node.right)

        drawNode(node.left)
        drawNode(node.right)
      }

      drawNode(root)
    }

    const animate = () => {

      requestAnimationFrame(animate)

      controls.update()

      renderer.render(scene, camera)
    }

    animate()

    return () => renderer.dispose()

  }, [root])

  return (

    <div className="relative flex flex-col items-center text-white mt-10">

      <div className="w-full max-w-5xl p-6">

        <div className="flex gap-3 justify-center mb-6">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter number"
            className="px-4 py-2 rounded bg-white/10 border border-sky-500/30"
          />

          <button
            onClick={handleInsert}
            className="px-4 py-2 bg-sky-600 rounded"
          >
            Insert
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 rounded"
          >
            Delete
          </button>

          <button
            onClick={handleInorder}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Inorder
          </button>

        </div>

        {inorderResult.length > 0 && (
          <div className="text-center mb-4">
            Inorder: {inorderResult.join(" → ")}
          </div>
        )}

        <div
          ref={mountRef}
          className="w-full h-[500px] rounded-xl overflow-hidden"
        />

      </div>

    </div>
  )
}