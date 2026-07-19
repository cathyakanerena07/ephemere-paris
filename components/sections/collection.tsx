'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'

const EASE = [0.22, 1, 0.36, 1] as const

export const Collection = () => {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  const product = products[index]
  const flipped = index % 2 === 1

  const go = (next: number) =>
    setIndex((next + products.length) % products.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const blurIn = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.06, filter: 'blur(14px)' }
  const blurOut = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, filter: 'blur(10px)' }
  const settled = { opacity: 1, scale: 1, filter: 'blur(0px)' }

  return (
    <section
      id="collection"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Colour flood — a whisper of the frame's own tint, blooming on change. */}
      <AnimatePresence>
        <motion.div
          key={`bloom-${index}`}
          aria-hidden
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: [0, 0.5, 0.14], scale: [0.65, 1.25, 1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE, times: [0, 0.35, 1] }}
          style={{
            background: `radial-gradient(60% 55% at 50% 45%, ${product.accent}2E 0%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0"
        />
      </AnimatePresence>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-5">
          <div>
            <p className="text-[10px] tracking-[0.36em] text-ash uppercase md:text-[11px]">
              The Collection
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none tracking-[-0.02em]">
              Five frames, one light.
            </h2>
          </div>

          <nav className="-mx-6 flex w-full items-center gap-x-7 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:w-auto md:overflow-visible md:px-0">
            {products.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => go(i)}
                aria-current={i === index}
                className={`relative shrink-0 cursor-pointer pb-2 text-[10px] tracking-[0.22em] whitespace-nowrap uppercase transition-colors duration-300 md:text-[11px] ${
                  i === index ? 'text-ink' : 'text-ash hover:text-ink'
                }`}
              >
                {item.name}
                {i === index && (
                  <motion.span
                    layoutId="collection-tab"
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute bottom-0 left-0 h-px w-full bg-ink"
                  />
                )}
              </button>
            ))}
          </nav>
        </header>

        <div className="relative mt-20 md:mt-40">
          {/* Ghost wordmark, sitting behind the pair. */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`ghost-${product.slug}`}
              aria-hidden
              initial={blurIn}
              animate={{ ...settled, opacity: 0.1 }}
              exit={blurOut}
              transition={{ duration: 0.9, ease: EASE }}
              className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[54%] text-center font-display text-[clamp(1.75rem,9.5vw,8.5rem)] leading-none tracking-[-0.04em] whitespace-nowrap select-none"
            >
              {product.name.toUpperCase()}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial="hidden"
              animate="show"
              exit="out"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.08,
                    delayChildren: reduceMotion ? 0 : 0.12,
                  },
                },
                out: { transition: { staggerChildren: 0.04 } },
              }}
              className="relative grid items-center gap-10 md:grid-cols-12 md:gap-12"
            >
              {/* Frame */}
              <motion.div
                variants={{ hidden: blurIn, show: settled, out: blurOut }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`md:col-span-6 ${flipped ? 'md:order-2' : 'md:order-1'}`}
              >
                <div className="relative aspect-3/2 w-full overflow-hidden bg-paper">
                  <Image
                    src={product.image}
                    alt={`ÉPHÉMÈRE ${product.name} sunglasses`}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                <div className="mt-8 flex items-start justify-between gap-8">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-ash uppercase">
                      Nº {product.index} — {product.design}
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[0.95] tracking-[-0.03em]">
                      {product.name}
                    </h3>
                    <p className="mt-2 font-display text-lg italic text-ash">
                      {product.line}
                    </p>
                  </div>
                  <p className="shrink-0 pt-1 font-display text-2xl tracking-tight">
                    {product.price}
                  </p>
                </div>

                <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-ash">
                  {product.copy}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink/10 pt-6 text-[11px] tracking-[0.12em] uppercase">
                  <div>
                    <dt className="text-ash">Material</dt>
                    <dd className="mt-1.5">{product.material}</dd>
                  </div>
                  <div>
                    <dt className="text-ash">Lens</dt>
                    <dd className="mt-1.5">{product.lens}</dd>
                  </div>
                </dl>
              </motion.div>

              {/* Film */}
              <motion.div
                variants={{ hidden: blurIn, show: settled, out: blurOut }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`md:col-span-6 ${flipped ? 'md:order-1' : 'md:order-2'}`}
              >
                {/* The studio backdrop is a flat #EFEFEF — lifted to white,
                    then multiplied away so the model sits on the page. */}
                <div className="relative aspect-[560/704] w-full">
                  <video
                    key={product.film}
                    src={product.film}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{ filter: `brightness(${product.filmLift})` }}
                    className="h-full w-full object-cover mix-blend-multiply"
                  />
                </div>

                <p className="mt-5 text-[10px] tracking-[0.28em] text-ash uppercase">
                  Worn — {product.name}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-ink/10 pt-6">
          <p className="font-display text-sm tracking-tight text-ash">
            <span className="text-ink">{product.index}</span> / 05
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous frame"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next frame"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
