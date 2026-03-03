import { GameType, LedgerEntry, MoodType } from '@/data/ledger'
import { Calendar, Trash2, ArrowUpRight, ArrowDownRight, Minus, DollarSign, Target, Dices, Layers, Spade, Clock, MapPin, Brain, ShieldCheck, ShieldX } from 'lucide-react'

interface LedgerTableProps {
  data: LedgerEntry[]
  onDelete?: (id: string) => void
}

const GAME_TYPE_CONFIG: Record<GameType, { color: string; bgColor: string; icon: any }> = {
  Keno: { color: 'text-purple-400', bgColor: 'bg-purple-500/10', icon: Target },
  Reel: { color: 'text-blue-400', bgColor: 'bg-blue-500/10', icon: Layers },
  Blackjack: { color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', icon: Spade },
  Poker: { color: 'text-red-400', bgColor: 'bg-red-500/10', icon: Spade },
  Craps: { color: 'text-orange-400', bgColor: 'bg-orange-500/10', icon: Dices },
  Roulette: { color: 'text-rose-400', bgColor: 'bg-rose-500/10', icon: Target },
}

const MOOD_COLOR: Record<MoodType, string> = {
  Focused: 'text-cyan-400',
  Calm: 'text-emerald-400',
  Bored: 'text-muted-foreground',
  Tired: 'text-orange-400',
  Tilted: 'text-red-400',
}

export default function LedgerTable({ data, onDelete }: LedgerTableProps) {
  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.sort((a, b) => b.timestamp - a.timestamp).map((entry) => {
          const profit = entry.cashOut - entry.buyIn
          const isProfit = profit > 0
          const isLoss = profit < 0
          const config = GAME_TYPE_CONFIG[entry.gameType]
          
          const disciplineHit = (entry.stopLoss && profit <= -entry.stopLoss) || (entry.takeProfit && profit >= entry.takeProfit);

          return (
            <div key={entry.id} className="p-5 rounded-2xl bg-card border border-white/5 grain-texture relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}>
                    <config.icon size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-cream leading-none mb-1">{entry.gameName}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-black">{entry.gameType}</p>
                      <span className="text-muted-foreground/20 text-[8px]">•</span>
                      <p className={`text-[8px] uppercase tracking-widest font-black ${MOOD_COLOR[entry.mood]}`}>{entry.mood}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete?.(entry.id)}
                  className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-black mb-1 flex items-center gap-1">
                    <Clock size={10} /> Duration
                  </p>
                  <p className="text-xs font-mono font-bold text-cream">{Math.floor(entry.duration / 60)}h {entry.duration % 60}m</p>
                </div>
                <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-black mb-1 flex items-center gap-1">
                    <MapPin size={10} /> Location
                  </p>
                  <p className="text-xs font-bold text-cream truncate">{entry.location}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={12} />
                    <span className="text-[8px] font-black uppercase tracking-wider">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {disciplineHit && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      <ShieldCheck size={10} className="text-primary" />
                      <span className="text-[8px] font-black uppercase text-primary">Target Hit</span>
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-black ${
                  isProfit ? 'bg-green-500/10 text-green-400' : isLoss ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-muted-foreground'
                }`}>
                  {isProfit && <ArrowUpRight size={12} />}
                  {isLoss && <ArrowDownRight size={12} />}
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
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black">Game & Mood</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-right">Time</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-right">Buy/Cash</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-right">Net P/L</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-center">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.sort((a, b) => b.timestamp - a.timestamp).map((entry) => {
                const profit = entry.cashOut - entry.buyIn
                const isProfit = profit > 0
                const isLoss = profit < 0
                const config = GAME_TYPE_CONFIG[entry.gameType]
                
                const targetProfitHit = entry.takeProfit && profit >= entry.takeProfit;
                const stopLossHit = entry.stopLoss && profit <= -entry.stopLoss;

                return (
                  <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-muted-foreground" />
                          <span className="text-xs text-cream font-bold">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={10} className="text-muted-foreground/50" />
                          <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[120px]">
                            {entry.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${config.bgColor} ${config.color}`}>
                          <config.icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-cream leading-tight">{entry.gameName}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{entry.gameType}</span>
                            <span className="text-muted-foreground/20 text-[8px]">•</span>
                            <span className={`text-[9px] uppercase tracking-widest font-black ${MOOD_COLOR[entry.mood]}`}>
                              {entry.mood}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-mono font-bold text-cream">
                          {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                        </span>
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter mt-1">
                          ${(profit / (entry.duration / 60)).toFixed(2)}/hr
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-mono text-muted-foreground">${entry.buyIn.toFixed(0)} in</span>
                        <span className="text-xs font-mono text-gold font-black">${entry.cashOut.toFixed(0)} out</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`text-sm font-mono font-black ${
                          isProfit ? 'text-green-400' : isLoss ? 'text-red-400' : 'text-muted-foreground'
                        }`}>
                          {isProfit ? '+' : ''}{profit.toFixed(2)}
                        </span>
                        {isProfit && <ArrowUpRight size={14} className="text-green-400" />}
                        {isLoss && <ArrowDownRight size={14} className="text-red-400" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {targetProfitHit ? (
                          <div className="p-1.5 rounded-full bg-green-500/10 text-green-400" title="Take Profit Hit">
                            <ShieldCheck size={16} />
                          </div>
                        ) : stopLossHit ? (
                          <div className="p-1.5 rounded-full bg-red-500/10 text-red-400" title="Stop Loss Hit">
                            <ShieldX size={16} />
                          </div>
                        ) : (
                          <div className="p-1.5 rounded-full bg-white/5 text-muted-foreground/30">
                            <Minus size={16} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => onDelete?.(entry.id)}
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
