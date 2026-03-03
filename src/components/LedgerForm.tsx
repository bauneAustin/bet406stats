import React from 'react'
import { GameType, LedgerEntry, MoodType } from '@/data/ledger'
import { PlusCircle, Info, ChevronDown, ChevronUp, Search, Clock, MapPin, Brain, Target, ShieldAlert } from 'lucide-react'

interface LedgerFormProps {
  addEntry: (newEntry: Omit<LedgerEntry, 'id' | 'timestamp'>) => void
}

const GAME_TYPES: GameType[] = ['Keno', 'Reel', 'Blackjack', 'Poker', 'Craps', 'Roulette'];
const MOOD_TYPES: MoodType[] = ['Calm', 'Bored', 'Tilted', 'Tired', 'Focused'];

export default function LedgerForm({ addEntry }: LedgerFormProps) {
  const [gameType, setGameType] = React.useState<GameType>('Keno')
  const [gameName, setGameName] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [duration, setDuration] = React.useState('')
  const [mood, setMood] = React.useState<MoodType>('Focused')
  const [buyIn, setBuyIn] = React.useState('')
  const [cashOut, setCashOut] = React.useState('')
  const [betAmount, setBetAmount] = React.useState('')
  const [stopLoss, setStopLoss] = React.useState('')
  const [takeProfit, setTakeProfit] = React.useState('')
  const [isExpanded, setIsExpanded] = React.useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameName || !buyIn || !betAmount || !duration) return

    addEntry({
      gameType,
      gameName,
      location: location || 'Unknown',
      duration: parseInt(duration),
      mood,
      buyIn: parseFloat(buyIn),
      cashOut: parseFloat(cashOut) || 0,
      betAmount: parseFloat(betAmount),
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
    })
    
    setGameName('')
    setLocation('')
    setDuration('')
    setBuyIn('')
    setCashOut('')
    setBetAmount('')
    setStopLoss('')
    setTakeProfit('')
    
    if (window.innerWidth < 768) {
      setIsExpanded(false)
    }
  }

  return (
    <div className="p-5 md:p-8 rounded-3xl bg-card border border-white/5 grain-texture overflow-hidden relative mb-8 md:mb-12">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-cream">Log New Session</h2>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-2 text-muted-foreground hover:text-cream transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className={`space-y-8 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'hidden opacity-0'}`}>
          {/* Main Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                Game Architecture <Info size={12} className="text-primary/50" />
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5">
                {GAME_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGameType(type)}
                    className={`px-3 py-3 text-xs font-black uppercase tracking-tight rounded-xl transition-all ${
                      gameType === type 
                        ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                        : 'text-cream/40 hover:text-cream/60 hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                Session Name <Search size={12} className="text-muted-foreground/50" />
              </label>
              <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="e.g. Buffalo Gold"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-medium text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                Location <MapPin size={12} className="text-muted-foreground/50" />
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Grand Central"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-medium text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                Duration <Clock size={12} className="text-muted-foreground/50" />
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="60"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono font-bold text-base"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted-foreground uppercase">min</span>
              </div>
            </div>
          </div>

          {/* Financial Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6 bg-black/20 rounded-2xl border border-white/5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Buy-In ($)</label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={buyIn}
                onChange={(e) => setBuyIn(e.target.value)}
                placeholder="0.00"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono font-bold text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black text-gold">Cash-Out ($)</label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                placeholder="0.00"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gold focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono font-bold text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Bet Size ($)</label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.00"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono font-bold text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                Stop-Loss <ShieldAlert size={12} className="text-red-400/50" />
              </label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Optional"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-red-400 focus:ring-2 focus:ring-red-400/30 outline-none transition-all font-mono font-bold text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                Take-Profit <Target size={12} className="text-green-400/50" />
              </label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="Optional"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-green-400 focus:ring-2 focus:ring-green-400/30 outline-none transition-all font-mono font-bold text-base"
              />
            </div>
          </div>

          {/* Mood Selector Row */}
          <div className="flex flex-col gap-4">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
              Tilt Meter (Mood) <Brain size={12} className="text-primary/50" />
            </label>
            <div className="flex flex-wrap gap-2">
              {MOOD_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMood(type)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                    mood === type 
                      ? 'bg-primary text-black border-primary shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-black/40 text-muted-foreground border-white/5 hover:border-white/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-primary to-accent text-black font-black uppercase tracking-[0.15em] rounded-2xl shadow-2xl shadow-primary/20 active:scale-95 transition-all text-sm"
            >
              <PlusCircle size={20} />
              Finalize Session
            </button>
          </div>
        </form>
        
        {!isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full py-4 text-xs font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle size={16} />
            Quick Add Session
          </button>
        )}
      </div>
    </div>
  )
}
