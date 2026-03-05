import { Link } from '@tanstack/react-router'
import { LayoutDashboard, Wallet } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center glow-copper group-hover:scale-105 transition-transform">
              <Wallet size={18} className="text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-cream to-cream/70 bg-clip-text text-transparent">
              Bet406 Stats
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-sm font-medium text-cream/70 hover:text-cream hover:bg-white/5 rounded-md transition-all"
              activeProps={{ className: 'bg-white/10 text-cream' }}
            >
              Dashboard
            </Link>
            <Link 
              to="/sports" 
              className="px-4 py-2 text-sm font-medium text-cream/70 hover:text-cream hover:bg-white/5 rounded-md transition-all"
              activeProps={{ className: 'bg-white/10 text-cream' }}
            >
              Sports
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Session</span>
            <span className="text-xs font-mono text-gold leading-none">ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  )
}
