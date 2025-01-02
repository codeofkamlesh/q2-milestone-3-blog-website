import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Insights Blog',
  description: 'Exploring the world of Artificial Intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className="fixed inset-0 z-[-1]">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=AI+Background"
            alt="AI Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="flex flex-col min-h-screen backdrop-blur-sm bg-white/70">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 mt-16 lg:mt-0">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

