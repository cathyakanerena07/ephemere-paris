'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ColorReveal } from '@/components/ui/color-reveal'

const EASE = [0.22, 1, 0.36, 1] as const

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const navLinks = ['Collection', 'Maison', 'Boutiques']

export const Hero = () => {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  })

  const scale = useTransform(progress, [0, 1], [1, 0.86])
  const radius = useTransform(progress, [0, 1], [0, 36])
  const lift = useTransform(progress, [0, 1], [0, -28])
  const contentOpacity = useTransform(progress, [0, 0.42], [1, 0])
  const contentLift = useTransform(progress, [0, 1], [0, -40])

  const shell = reduceMotion ? {} : { scale, y: lift }
  const content = reduceMotion
    ? {}
    : { opacity: contentOpacity, y: contentLift }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.25,
      },
    },
  }

  return (
    <section ref={trackRef} className="relative h-[190svh] bg-white">
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden">
        <motion.div
          style={{ ...shell, borderRadius: reduceMotion ? 0 : radius }}
          className="relative h-full w-full overflow-hidden bg-ivory will-change-transform"
        >
          <ColorReveal />

          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,var(--color-ivory)_4%,color-mix(in_srgb,var(--color-ivory)_82%,transparent)_34%,transparent_66%)] md:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-ivory)_92%,transparent)_0%,transparent_58%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-ivory/70 to-transparent" />
          <div className="grain-layer pointer-events-none absolute inset-0 z-10 opacity-[0.055] mix-blend-multiply" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={content}
            className="pointer-events-none relative z-20 flex h-full flex-col justify-between px-6 py-6 md:px-10 md:py-8"
          >
            <motion.header
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-start justify-between"
            >
              <p className="font-display text-[13px] tracking-[0.42em] uppercase md:text-sm">
                Éphémère
                <span className="ml-2 font-sans text-[10px] tracking-[0.3em] text-ash md:text-[11px]">
                  Paris
                </span>
              </p>

              <nav className="pointer-events-auto hidden items-center gap-10 md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="group relative text-[11px] tracking-[0.24em] text-ash uppercase transition-colors duration-300 hover:text-ink"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
                  </a>
                ))}
              </nav>

              <p className="text-[11px] tracking-[0.24em] text-ash uppercase md:hidden">
                Menu
              </p>
            </motion.header>

            <div className="flex items-end justify-between gap-8">
              <div className="max-w-[46ch]">
                <motion.p
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mb-6 text-[10px] tracking-[0.36em] text-ash uppercase md:text-[11px]"
                >
                  Collection Nº1 — Été
                </motion.p>

                <motion.h1
                  variants={rise}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="font-display text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em]"
                >
                  Nothing
                  <br />
                  lasts.
                  <span className="block italic opacity-90">Wear it well.</span>
                </motion.h1>

                <motion.p
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-7 max-w-[38ch] text-sm leading-relaxed text-ash md:text-[15px]"
                >
                  Hand-polished acetate, sculpted in Paris. Six frames, one idea
                  — light held for a moment, and held beautifully.
                </motion.p>

                <motion.a
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  href="#collection"
                  className="group pointer-events-auto mt-9 inline-flex cursor-pointer items-center gap-3 border-b border-ink/25 pb-2 text-[11px] tracking-[0.26em] uppercase transition-colors duration-300 hover:border-ink"
                >
                  Discover the collection
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </motion.a>
              </div>

              <motion.p
                variants={rise}
                transition={{ duration: 0.7, ease: EASE }}
                className="hidden shrink-0 pb-2 text-right text-[10px] leading-loose tracking-[0.26em] text-ash uppercase lg:block"
              >
                Move your cursor
                <br />
                to see it in colour
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
