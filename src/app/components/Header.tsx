'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Brain className="mr-2" />
             AI Insights
          </Link>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <ul className={`lg:flex lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative top-full left-0 right-0 bg-primary lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 mt-2 lg:mt-0 z-50`}>
            <li><Link href="/" className="block py-2 lg:py-0 hover:text-secondary transition-colors">Home</Link></li>
            <li><Link href="/about" className="block py-2 lg:py-0 hover:text-secondary transition-colors">About</Link></li>
            <li><Link href="/blog" className="block py-2 lg:py-0 hover:text-secondary transition-colors">Blog</Link></li>
            <li><Link href="/submit-blog" className="block py-2 lg:py-0 hover:text-secondary transition-colors">Submit Blog</Link></li>
            <li><Link href="/contact" className="block py-2 lg:py-0 hover:text-secondary transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

