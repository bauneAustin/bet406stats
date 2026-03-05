import React from 'react'
import { SportType, BetType, SportsBet } from '@/data/sports'
import { Trophy, DollarSign, Target, Plus, Info, Search, Activity, ChevronDown, ChevronUp } from 'lucide-react'

interface SportsBetFormProps {
    addBet: (bet: Omit<SportsBet, 'id' | 'timestamp'>) => void
}

export default function SportsBetForm({ addBet }: SportsBetFormProps) {
    const [sport, setSport] = React.useState<SportType>('Football')
    const [betType, setBetType] = React.useState<BetType>('Money Line')
    const [event, setEvent] = React.useState('')
    const [details, setDetails] = React.useState('')
    const [stake, setStake] = React.useState('')
    const [odds, setOdds] = React.useState('')
    const [status, setStatus] = React.useState<SportsBet['status']>('Pending')
    const [payout, setPayout] = React.useState('')
    const [isExpanded, setIsExpanded] = React.useState(true)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addBet({
            sport,
            betType,
            event,
            details,
            stake: parseFloat(stake) || 0,
            payout: parseFloat(payout) || 0,
            status,
            odds,
        })
        setEvent('')
        setDetails('')
        setStake('')
        setOdds('')
        setPayout('')
    }

    const getBetTypes = (selectedSport: SportType): BetType[] => {
        const common: BetType[] = ['Money Line', 'Prop']
        if (selectedSport === 'Golf') {
            return [...common, 'Winner', 'FRL', 'Top 5', 'Top 10', 'Top 20']
        }
        return common
    }

    return (
        <div className="p-5 md:p-8 rounded-3xl bg-card border border-white/5 grain-texture overflow-hidden relative mb-8 md:mb-12">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-cream">Log New Bet</h2>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="md:hidden p-2 text-muted-foreground hover:text-cream transition-colors"
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={`space-y-8 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'hidden opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                                Market <Info size={12} className="text-primary/50" />
                            </label>
                            <div className="grid grid-cols-2 gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5">
                                {(['Football', 'Basketball', 'Hockey', 'Golf'] as SportType[]).map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => {
                                            setSport(s)
                                            if (!getBetTypes(s).includes(betType)) {
                                                setBetType('Money Line')
                                            }
                                        }}
                                        className={`px-3 py-3 text-[10px] font-black uppercase tracking-tight rounded-xl transition-all ${sport === s
                                                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                                                : 'text-cream/40 hover:text-cream/60 hover:bg-white/5'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                                Bet Type <Target size={12} className="text-muted-foreground/50" />
                            </label>
                            <select
                                value={betType}
                                onChange={(e) => setBetType(e.target.value as BetType)}
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-medium text-base appearance-none cursor-pointer"
                            >
                                {getBetTypes(sport).map((t) => (
                                    <option key={t} value={t} className="bg-charcoal text-cream">{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                                Event / Matchup <Search size={12} className="text-muted-foreground/50" />
                            </label>
                            <input
                                type="text"
                                value={event}
                                onChange={(e) => setEvent(e.target.value)}
                                placeholder="e.g. KC vs PHI"
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-medium text-base"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-1.5">
                                Status <Activity size={12} className="text-muted-foreground/50" />
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-medium text-base appearance-none cursor-pointer"
                            >
                                <option value="Pending" className="bg-charcoal text-cream">Pending</option>
                                <option value="Win" className="bg-charcoal text-cream">Win</option>
                                <option value="Loss" className="bg-charcoal text-cream">Loss</option>
                                <option value="Push" className="bg-charcoal text-cream">Push</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 lg:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Bet Details</label>
                            <input
                                type="text"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="e.g. Patrick Mahomes Over 2.5 Passing TDs"
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-medium text-base"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 lg:col-span-2 p-4 bg-black/20 rounded-2xl border border-white/5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black text-primary">Odds</label>
                                <input
                                    type="text"
                                    value={odds}
                                    onChange={(e) => setOdds(e.target.value)}
                                    placeholder="-110"
                                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono font-bold text-base"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Stake</label>
                                <input
                                    type="number"
                                    value={stake}
                                    onChange={(e) => setStake(e.target.value)}
                                    placeholder="0.00"
                                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cream focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono font-bold text-base"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-black text-gold">Payout</label>
                                <input
                                    type="number"
                                    value={payout}
                                    onChange={(e) => setPayout(e.target.value)}
                                    placeholder="0.00"
                                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all font-mono font-bold text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                        <button
                            type="submit"
                            className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-primary to-accent text-black font-black uppercase tracking-[0.15em] rounded-2xl shadow-2xl shadow-primary/20 active:scale-95 transition-all text-sm group"
                        >
                            <Trophy size={20} className="group-hover:rotate-12 transition-transform" />
                            Lock In Bet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
