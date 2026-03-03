import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import LedgerTable from '@/components/LedgerTable'
import LedgerForm from '@/components/LedgerForm'
import LedgerAnalytics from '@/components/LedgerAnalytics'
import ProfitTrendChart from '@/components/ProfitTrendChart'
import AnalyticsInsights from '@/components/AnalyticsInsights'
import { initialLedgerData, LedgerEntry } from '@/data/ledger'
import { BarChart3, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [ledgerData, setLedgerData] = React.useState(initialLedgerData)

  const addLedgerEntry = (newEntry: Omit<LedgerEntry, 'id' | 'timestamp'>) => {
    setLedgerData((prevData) => [
      {
        ...newEntry,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      },
      ...prevData,
    ])
  }

  const deleteLedgerEntry = (id: string) => {
    setLedgerData((prevData) => prevData.filter((entry) => entry.id !== id))
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-2 py-1 rounded">Real-Time</span>
                <ChevronRight size={12} className="text-muted-foreground" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Performance Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-cream uppercase">
                Bankroll <span className="text-primary">Intelligence</span>
              </h1>
            </div>
            <div className="hidden lg:flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                <BarChart3 size={18} className="text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest">Analytics Ready</span>
              </div>
            </div>
          </div>
        </header>

        {/* Primary Stats Row */}
        <LedgerAnalytics data={ledgerData} />
        
        <div className="mb-8">
          <ProfitTrendChart data={ledgerData} />
        </div>

        {/* Action Section */}
        <section className="mb-12">
          <LedgerForm addEntry={addLedgerEntry} />
        </section>

        {/* Insights & Strategy */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-6 bg-accent rounded-full" />
            <h2 className="text-2xl font-black uppercase tracking-tight text-cream">Strategy & Habits</h2>
          </div>
          <AnalyticsInsights data={ledgerData} />
        </div>
        
        {/* History Table */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-gold rounded-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight text-cream">Session History</h2>
            </div>
          </div>
          <LedgerTable data={ledgerData} onDelete={deleteLedgerEntry} />
        </section>
      </div>
    </main>
  )
}
