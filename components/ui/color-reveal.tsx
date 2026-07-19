'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

type Box = { w: number; h: number }

const IMAGE = { w: 2096, h: 1184 }
// object-position of both layers, as fractions.
const FOCUS = { x: 0.5, y: 0.28 }
// Where the sunglasses sit inside the source photograph.
const GLASSES = { x: 0.5, y: 0.394 }
// Lens window width, as a fraction of the rendered photograph — sized to sit
// around the model rather than spilling into the empty studio backdrop.
const LENS_RATIO = 0.21

const geometry = (box: Box) => {
  const scale = Math.max(box.w / IMAGE.w, box.h / IMAGE.h)
  const rendered = { w: IMAGE.w * scale, h: IMAGE.h * scale }
  const offset = {
    x: (box.w - rendered.w) * FOCUS.x,
    y: (box.h - rendered.h) * FOCUS.y,
  }

  const width = Math.min(rendered.w * LENS_RATIO, box.w * 0.92, 620)
  const lens = { w: width, h: width * 0.52 }

  const rest = {
    x: offset.x + GLASSES.x * rendered.w - lens.w / 2,
    y: offset.y + GLASSES.y * rendered.h - lens.h / 2,
  }

  return { lens, rest }
}

export const ColorReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<Box>({ w: 0, h: 0 })
  const [ready, setReady] = useState(false)
  const reduceMotion = useReducedMotion()

  const { lens, rest } = geometry(box)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, { stiffness: 260, damping: 34, mass: 0.7 })
  const sy = useSpring(y, { stiffness: 260, damping: 34, mass: 0.7 })

  const innerX = useTransform(sx, (v) => -v)
  const innerY = useTransform(sy, (v) => -v)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      setBox({ w: rect.width, h: rect.height })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Park the lens on the sunglasses whenever the frame is re-measured.
  useEffect(() => {
    if (!box.w || !box.h) return
    const { rest: point } = geometry(box)
    x.jump(point.x)
    y.jump(point.y)
    setReady(true)
  }, [box.w, box.h, x, y])

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === 'touch') return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    // The hero shrinks on scroll, so map pointer coords back to unscaled space.
    const zoom = rect.width / el.offsetWidth || 1
    x.set((e.clientX - rect.left) / zoom - lens.w / 2)
    y.set((e.clientY - rect.top) / zoom - lens.h / 2)
  }

  const handleLeave = () => {
    if (!box.w) return
    x.set(rest.x)
    y.set(rest.y)
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="absolute inset-0 overflow-hidden"
    >
      <Image
        src="/hero.webp"
        alt="Model wearing ÉPHÉMÈRE oval acetate sunglasses"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_28%] grayscale contrast-[1.04]"
      />

      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, width: lens.w, height: lens.h }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.94 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="absolute top-0 left-0 overflow-hidden rounded-[2rem] shadow-[0_28px_90px_-36px_rgba(11,11,11,0.5)] ring-1 ring-white/60"
      >
        <motion.div
          style={{ x: innerX, y: innerY, width: box.w, height: box.h }}
          className="absolute top-0 left-0"
        >
          <Image
            src="/hero_hover.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_28%]"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
