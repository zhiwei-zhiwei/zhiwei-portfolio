"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

const PARTICLE_COUNT = 200
const CONNECTION_THRESHOLD = 1.8

function ParticleNetwork() {
  const mousePosition = useMousePosition()
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      velocities[i * 3] = (Math.random() - 0.5) * 0.004
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }

    return { positions, velocities }
  }, [])

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const maxLines = PARTICLE_COUNT * PARTICLE_COUNT
    const linePositions = new Float32Array(maxLines * 6)
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return geo
  }, [])

  const pointsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#00e5ff'),
        size: 0.045,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      }),
    []
  )

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#00e5ff'),
        transparent: true,
        opacity: 0.12,
      }),
    []
  )

  const currentPositions = useRef(positions.slice())

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = currentPositions.current

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]

      if (Math.abs(pos[i * 3]) > 5.5) velocities[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 4.5) velocities[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 3.5) velocities[i * 3 + 2] *= -1
    }

    const pointsAttr = pointsGeometry.attributes.position as THREE.BufferAttribute
    pointsAttr.array.set(pos)
    pointsAttr.needsUpdate = true

    // Update line connections
    const lineAttr = lineGeometry.attributes.position as THREE.BufferAttribute
    const lineArray = lineAttr.array as Float32Array
    let lineIdx = 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_THRESHOLD && lineIdx + 5 < lineArray.length) {
          lineArray[lineIdx++] = pos[i * 3]
          lineArray[lineIdx++] = pos[i * 3 + 1]
          lineArray[lineIdx++] = pos[i * 3 + 2]
          lineArray[lineIdx++] = pos[j * 3]
          lineArray[lineIdx++] = pos[j * 3 + 1]
          lineArray[lineIdx++] = pos[j * 3 + 2]
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIdx / 3)
    lineAttr.needsUpdate = true

    // Mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = mousePosition.x * 0.4 + Math.sin(t * 0.1) * 0.05
      groupRef.current.rotation.x = -mousePosition.y * 0.3 + Math.cos(t * 0.1) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeometry} material={pointsMaterial} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <ParticleNetwork />
    </Canvas>
  )
}
