'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export default function ZolarMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null)
  const particles = useRef<Particle[]>([])
  const numParticles = 200 // Increased for higher density and better flow

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particles.current = []
    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5, // Vary size for depth
        opacity: Math.random() * 0.4 + 0.2, // Increased opacity range for more visibility
        speed: Math.random() * 0.4 + 0.1, // Slightly slower speed for a smoother flow
      })
    }
  }, [numParticles])

  const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!logoImage) return

    // Draw a semi-transparent black rectangle over the entire canvas
    // This creates the "fading trail" effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)' // Adjust the last value (alpha) for longer/shorter trails
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.current.forEach(p => {
      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.filter = `drop-shadow(0 0 ${p.size / 2}px rgba(0, 255, 0, 0.7))` // Neon glow effect

      // Draw the logo image
      ctx.drawImage(logoImage, p.x, p.y, p.size, p.size)

      ctx.restore()

      p.y += p.speed // Move particle down
      if (p.y > canvas.height) {
        // Reset particle to top if it goes off screen, with a new random X
        p.y = -p.size // Start slightly above the canvas to ensure smooth re-entry
        p.x = Math.random() * canvas.width
        // Keep size, opacity, speed for this particle consistent, or re-randomize subtly if desired
        // For a more consistent flow, we'll keep them for now.
      }
    })

    animationFrameId.current = requestAnimationFrame(() => draw(ctx, canvas))
  }, [logoImage])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions to fill parent
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles(canvas) // Re-initialize particles on resize
    }

    resizeCanvas() // Initial resize
    window.addEventListener('resize', resizeCanvas)

    // Load the logo image
    const img = new window.Image()
    img.crossOrigin = "anonymous" // Important for canvas if image is from different origin
    img.src = '/zolar-logo-bg.webp'
    img.onload = () => {
      setLogoImage(img)
      initParticles(canvas) // Initialize particles after image loads
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      animationFrameId.current = requestAnimationFrame(() => draw(ctx, canvas))
    }
    img.onerror = (err) => {
      console.error("Failed to load ZOLAR background logo:", err)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [draw, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'transparent' }} // Ensure canvas background is transparent
    />
  )
}
