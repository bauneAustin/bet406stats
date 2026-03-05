import { SportsBet } from '@/data/sports'
import { Trash2, TrendingUp, TrendingDown, Minus, Calendar, Trophy, Target, DollarSign, Activity } from 'lucide-react'

interface SportsBetTableProps {
  data: SportsBet[]
  onDelete: (id: string) => void
}

export default function SportsBetTable({ data, onDelete }: SportsBetTableProps) {
  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.sort((a, b) => b.timestamp - a.timestamp).map((bet) => {
          const profit = bet.status === 'Win' ? bet.payout - bet.stake : bet.status === 'Loss' ? -bet.stake : 0
          const isProfit = profit > 0
          const isLoss = profit < 0

          return (
            <div key={bet.id} className="p-5 rounded-2xl bg-card border border-white/5 grain-texture relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
                    <Trophy size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-cream leading-none mb-1">{bet.event}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-black">{bet.sport}</p>
                      <span className="text-muted-foreground/20 text-[8px]">•</span>
                      <p className="text-[8px] uppercase tracking-widest font-black text-primary/70">{bet.betType}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(bet.id)}
                  className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-black mb-1 flex items-center gap-1">
                    <Target size={10} /> Odds
                  </p>
                  <p className="text-xs font-mono font-bold text-cream">{bet.odds}</p>
                </div>
                <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-black mb-1 flex items-center gap-1">
                    <DollarSign size={10} /> Stake
                  </p>
                  <p className="text-xs font-bold text-cream">${bet.stake}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={12} />
                    <span className="text-[8px] font-black uppercase tracking-wider">
                      {new Date(bet.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                      bet.status === 'Win' ? 'bg-green-500/10 text-green-400' : 
                      bet.status === 'Loss' ? 'bg-red-500/10 text-red-400' :
                      bet.status === 'Push' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                    <Activity size={10} />
                    <span className="text-[8px] font-black uppercase">{bet.status}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-black ${
                  isProfit ? 'bg-green-500/10 text-green-400' : isLoss ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-muted-foreground'
                }`}>
                  {isProfit && <TrendingUp size={12} />}
                  {isLoss && <TrendingDown size={12} />}
                  {isProfit ? '+' : ''}{profit.toFixed(2)}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-3xl bg-card border border-white/5 overflow-hidden grain-texture">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black">Date & Context</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black">Sport & Market</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-right">Odds</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-right">Stake/Payout</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-right">Net P/L</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-center">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.sort((a, b) => b.timestamp - a.timestamp).map((bet) => {
                const profit = bet.status === 'Win' ? bet.payout - bet.stake : bet.status === 'Loss' ? -bet.stake : 0
                const isProfit = profit > 0
                const isLoss = profit < 0

                return (
                  <tr key={bet.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-muted-foreground" />
                          <span className="text-xs text-cream font-bold">
                            {new Date(bet.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity size={10} className="text-muted-foreground/50" />
                          <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[120px]">
                            {bet.event}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-primary/10 text-primary`}>
                          <Trophy size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-cream leading-tight">{bet.details}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{bet.sport}</span>
                            <span className="text-muted-foreground/20 text-[8px]">•</span>
                            <span className={`text-[9px] uppercase tracking-widest font-black text-primary/70`}>
                              {bet.betType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-mono font-bold text-cream">
                        {bet.odds}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-mono text-muted-foreground">${bet.stake.toFixed(0)} in</span>
                        <span className="text-xs font-mono text-gold font-black">${bet.payout.toFixed(0)} out</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`text-sm font-mono font-black ${
                          isProfit ? 'text-green-400' : isLoss ? 'text-red-400' : 'text-muted-foreground'
                        }`}>
                          {isProfit ? '+' : ''}{profit.toFixed(2)}
                        </span>
                        {isProfit && <TrendingUp size={14} className="text-green-400" />}
                        {isLoss && <TrendingDown size={14} className="text-red-400" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                          bet.status === 'Win' ? 'bg-green-500/20 text-green-400' : 
                          bet.status === 'Loss' ? 'bg-red-500/20 text-red-400' :
                          bet.status === 'Push' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {bet.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => onDelete(bet.id)}
                        className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
