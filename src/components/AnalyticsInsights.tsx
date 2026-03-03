import { LedgerEntry, GameType, MoodType } from '@/data/ledger'
import { Target, Zap, AlertTriangle, TrendingUp, DollarSign, ShieldAlert, Trophy, Clock, Brain, MapPin, ShieldCheck } from 'lucide-react'

interface AnalyticsProps {
  data: LedgerEntry[]
}

export default function AnalyticsInsights({ data }: AnalyticsProps) {
  if (data.length === 0) return null;

  // 1. Profit by Category
  const categoryStats = data.reduce((acc, entry) => {
    const net = entry.cashOut - entry.buyIn
    if (!acc[entry.gameType]) {
      acc[entry.gameType] = { net: 0, wins: 0, count: 0, duration: 0 }
    }
    acc[entry.gameType].net += net
    acc[entry.gameType].count += 1
    acc[entry.gameType].duration += entry.duration
    if (net > 0) acc[entry.gameType].wins += 1
    return acc
  }, {} as Record<GameType, { net: number, wins: number, count: number, duration: number }>)

  // 2. Profit by Mood
  const moodStats = data.reduce((acc, entry) => {
    const net = entry.cashOut - entry.buyIn
    if (!acc[entry.mood]) {
      acc[entry.mood] = { net: 0, count: 0 }
    }
    acc[entry.mood].net += net
    acc[entry.mood].count += 1
    return acc
  }, {} as Record<MoodType, { net: number, count: number }>)

  // 3. Profit by Location
  const locationStats = data.reduce((acc, entry) => {
    const net = entry.cashOut - entry.buyIn
    acc[entry.location] = (acc[entry.location] || 0) + net
    return acc
  }, {} as Record<string, number>)

  const sortedByNet = Object.entries(categoryStats).sort(([, a], [, b]) => b.net - a.net)
  const sortedMoods = Object.entries(moodStats).sort(([, a], [, b]) => b.net / b.count - a.net / a.count)
  const sortedLocations = Object.entries(locationStats).sort(([, a], [, b]) => b - a)

  const bestGame = sortedByNet[0]
  const worstMood = Object.entries(moodStats).sort(([, a], [, b]) => a.net / a.count - b.net / b.count)[0]
  const bestLocation = sortedLocations[0]

  // Hourly Rate Calculation
  const totalDurationHours = data.reduce((acc, entry) => acc + entry.duration, 0) / 60
  const totalNet = data.reduce((acc, entry) => acc + (entry.cashOut - entry.buyIn), 0)
  const hourlyRate = totalNet / (totalDurationHours || 1)

  // Discipline Check
  const disciplineSessions = data.filter(entry => {
    const profit = entry.cashOut - entry.buyIn
    const hitStopLoss = entry.stopLoss && profit <= -entry.stopLoss
    const hitTakeProfit = entry.takeProfit && profit >= entry.takeProfit
    return hitStopLoss || hitTakeProfit
  }).length
  const disciplineRate = (disciplineSessions / data.length) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Time & Efficiency */}
      <div className="p-6 rounded-3xl bg-card border border-white/5 grain-texture relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Clock size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-cream">Time Efficiency</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Avg Hourly Rate</p>
              <h4 className={`text-2xl font-mono font-black ${hourlyRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${hourlyRate.toFixed(2)}/hr
              </h4>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Time</p>
              <p className="text-sm font-mono font-bold text-cream">{totalDurationHours.toFixed(1)} hrs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/20 border border-white/5">
            <MapPin size={16} className="text-primary" />
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase leading-none mb-1">Best Location</p>
              <p className="text-xs font-black text-cream uppercase">{bestLocation?.[0] || 'None'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Psychology & Mood */}
      <div className="p-6 rounded-3xl bg-card border border-white/5 grain-texture relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Brain size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-cream">Tilt Analysis</h3>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Performance by Mood</p>
          {sortedMoods.map(([mood, stats]) => (
            <div key={mood} className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase">{mood}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stats.net >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                    style={{ width: `${Math.min(Math.abs(stats.net / 10), 100)}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono font-black w-10 text-right ${stats.net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${(stats.net / stats.count).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy & Discipline */}
      <div className="p-6 rounded-3xl bg-card border border-white/5 grain-texture relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gold/10 text-gold">
            <ShieldCheck size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-cream">Discipline Score</h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Target Adherence</p>
              <span className="text-xl font-mono font-black text-gold">{disciplineRate.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold transition-all shadow-[0_0_10px_rgba(var(--gold),0.5)]"
                style={{ width: `${disciplineRate}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {worstMood && worstMood[1].net < 0 && (
              <div className="flex gap-3 p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
                <ShieldAlert size={16} className="text-red-400 shrink-0" />
                <p className="text-[10px] font-bold text-red-400/80 uppercase leading-tight">
                  Warning: Playing while {worstMood[0]} is costing you ${(Math.abs(worstMood[1].net / worstMood[1].count)).toFixed(0)} per session.
                </p>
              </div>
            )}
            
            <div className="flex gap-3 p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
              <Trophy size={16} className="text-green-400 shrink-0" />
              <p className="text-[10px] font-bold text-green-400/80 uppercase leading-tight">
                Your discipline in {bestGame?.[0]} sessions is your strongest asset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
