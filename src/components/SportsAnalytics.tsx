import { SportsBet } from '@/data/sports'
import { Trophy, TrendingUp, Percent, Banknote } from 'lucide-react'

interface SportsAnalyticsProps {
  data: SportsBet[]
}

export default function SportsAnalytics({ data }: SportsAnalyticsProps) {
  const settledBets = data.filter(b => b.status !== 'Pending')
  const totalStake = settledBets.reduce((acc, b) => acc + b.stake, 0)
  const totalPayout = settledBets.reduce((acc, b) => acc + b.payout, 0)
  const netProfit = totalPayout - totalStake
  
  const wins = settledBets.filter(b => b.status === 'Win').length
  const winRate = settledBets.length > 0 ? (wins / settledBets.length) * 100 : 0
  const roi = totalStake > 0 ? (netProfit / totalStake) * 100 : 0

  const stats = [
    {
      label: 'Total Profit',
      value: `$${netProfit.toLocaleString()}`,
      icon: Banknote,
      color: netProfit >= 0 ? 'text-green-400' : 'text-red-400',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      icon: Trophy,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'ROI',
      value: `${roi.toFixed(1)}%`,
      icon: Percent,
      color: 'text-gold',
      bg: 'bg-gold/10'
    },
    {
      label: 'Total Wagered',
      value: `$${totalStake.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-accent',
      bg: 'bg-accent/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-card/50 border border-white/5 backdrop-blur-sm rounded-3xl overflow-hidden group hover:border-white/20 transition-all p-6 relative grain-texture">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} transition-transform group-hover:scale-110 shadow-lg`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Settled</span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <h3 className={`text-3xl font-black tracking-tighter ${stat.color} drop-shadow-sm`}>{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
