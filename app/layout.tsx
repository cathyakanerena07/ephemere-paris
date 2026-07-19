import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ÉPHÉMÈRE PARIS — Eyewear',
  description:
    'Sculpted acetate eyewear, made in France. Nothing lasts. Wear it beautifully.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
    <body>{children}</body>
  </html>
)

export default RootLayout
