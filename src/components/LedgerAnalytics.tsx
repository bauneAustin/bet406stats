import { LedgerEntry } from '@/data/ledger'
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react'

interface AnalyticsProps {
  data: LedgerEntry[]
}

export default function LedgerAnalytics({ data }: AnalyticsProps) {
  const totalBuyIn = data.reduce((acc, entry) => acc + entry.buyIn, 0)
  const totalCashOut = data.reduce((acc, entry) => acc + entry.cashOut, 0)
  const totalProfit = totalCashOut - totalBuyIn
  const winRate = (data.filter(entry => entry.cashOut > entry.buyIn).length / data.length) * 100

  const stats = [
    {
      label: 'Total Net P/L',
      value: `$${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: totalProfit >= 0 ? TrendingUp : TrendingDown,
      color: totalProfit >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: totalProfit >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
      borderColor: totalProfit >= 0 ? 'border-green-500/20' : 'border-red-500/20'
    },
    {
      label: 'Total Buy-In',
      value: `$${totalBuyIn.toLocaleString()}`,
      icon: Wallet,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      borderColor: 'border-gold/20'
    },
    {
      label: 'Total Cash-Out',
      value: `$${totalCashOut.toLocaleString()}`,
      icon: Target,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={`p-6 rounded-2xl bg-card border ${stat.borderColor} card-hover grain-texture`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
                {stat.label}
              </p>
              <h3 className={`text-2xl font-black font-mono tracking-tight ${stat.color}`}>
                {stat.value}
              </h3>
            </div>
            <div className={`p-2 rounded-xl ${stat.bgColor}`}>
              <stat.icon size={20} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { Wallet } from 'lucide-react'
