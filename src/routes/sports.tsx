import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import SportsBetTable from '@/components/SportsBetTable'
import SportsBetForm from '@/components/SportsBetForm'
import SportsAnalytics from '@/components/SportsAnalytics'
import { initialSportsData, SportsBet } from '@/data/sports'
import { Trophy, ChevronRight, Activity } from 'lucide-react'

export const Route = createFileRoute('/sports')({
    component: SportsPage,
})

function SportsPage() {
    const [bets, setBets] = React.useState(initialSportsData)

    const addBet = (newBet: Omit<SportsBet, 'id' | 'timestamp'>) => {
        setBets((prev) => [
            {
                ...newBet,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: Date.now(),
            },
            ...prev,
        ])
    }

    const deleteBet = (id: string) => {
        setBets((prev) => prev.filter((b) => b.id !== id))
    }

    return (
        <main className="min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-2 py-1 rounded">Live Odds</span>
                                <ChevronRight size={12} className="text-muted-foreground" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sports Betting Ledger</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-cream uppercase">
                                Sports <span className="text-primary">Intelligence</span>
                            </h1>
                        </div>
                        <div className="hidden lg:flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                                <Activity size={18} className="text-primary" />
                                <span className="text-sm font-bold text-primary uppercase tracking-widest">Market Tracking Active</span>
                            </div>
                        </div>
                    </div>
                </header>

                <SportsAnalytics data={bets} />

                <section className="mb-12">
                    <SportsBetForm addBet={addBet} />
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-gold rounded-full" />
                            <h2 className="text-2xl font-black uppercase tracking-tight text-cream">Betting History</h2>
                        </div>
                    </div>
                    <SportsBetTable data={bets} onDelete={deleteBet} />
                </section>
            </div>
        </main>
    )
}
