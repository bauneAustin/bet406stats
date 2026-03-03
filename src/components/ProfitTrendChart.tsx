import { LedgerEntry } from '@/data/ledger'

interface ChartProps {
  data: LedgerEntry[]
}

export default function ProfitTrendChart({ data }: ChartProps) {
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp)
  
  let cumulative = 0
  const points = sortedData.map((entry) => {
    cumulative += (entry.cashOut - entry.buyIn)
    return cumulative
  })

  // Start from zero
  const allPoints = [0, ...points]
  const min = Math.min(...allPoints)
  const max = Math.max(...allPoints)
  const range = max - min || 100
  
  // Professional SVG coordinates
  const width = 800
  const height = 200
  const paddingLeft = 70
  const paddingRight = 30
  const paddingTop = 20
  const paddingBottom = 40

  const chartWidth = width - paddingLeft - paddingRight
  const chartHeight = height - paddingTop - paddingBottom

  const getX = (i: number) => (i / (allPoints.length - 1)) * chartWidth + paddingLeft
  const getY = (val: number) => height - paddingBottom - ((val - min) / range) * chartHeight

  // Path for the line
  const linePath = allPoints.map((val, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`).join(' ')
  
  // Path for the area fill
  const areaPath = `${linePath} L ${getX(allPoints.length - 1)} ${height - paddingBottom} L ${getX(0)} ${height - paddingBottom} Z`

  // Define Y-axis grid increments
  const step = range / 4
  const gridValues = [min, min + step, min + step * 2, min + step * 3, max]

  return (
    <div className="p-6 md:p-10 rounded-3xl bg-card border border-white/5 grain-texture shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex items-end justify-between mb-10 relative">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-cream/90">Bankroll Journey</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-mono font-black tracking-tighter ${cumulative >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${cumulative.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Cumulative P/L</span>
          </div>
        </div>
        
        <div className="hidden sm:flex gap-10">
          <div className="text-right">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Peak Bankroll</p>
            <p className="text-xl font-mono font-black text-gold leading-none">${max.toLocaleString()}</p>
          </div>
          <div className="text-right border-l border-white/10 pl-10">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Sessions</p>
            <p className="text-xl font-mono font-black text-cream leading-none">{data.length}</p>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[4/1]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid */}
          {gridValues.map((val, i) => (
            <g key={i}>
              <line 
                x1={paddingLeft} 
                y1={getY(val)} 
                x2={width - paddingRight} 
                y2={getY(val)} 
                stroke="white" 
                strokeOpacity="0.03" 
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 15}
                y={getY(val)}
                textAnchor="end"
                alignmentBaseline="middle"
                className="fill-muted-foreground/50 text-[10px] font-mono font-medium"
              >
                {Math.abs(val) > 1000 ? `${(val/1000).toFixed(1)}k` : Math.round(val)}
              </text>
            </g>
          ))}

          {/* Baseline (0) */}
          <line 
            x1={paddingLeft} 
            y1={getY(0)} 
            x2={width - paddingRight} 
            y2={getY(0)} 
            stroke="white" 
            strokeOpacity="0.1" 
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#areaGradient)" />
          
          {/* Main Trend Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {allPoints.map((val, i) => {
            const dateStr = i === 0 
              ? new Date(sortedData[0]?.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              : new Date(sortedData[i-1]?.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            
            return (
              <g key={i} className="group/point">
                <circle
                  cx={getX(i)}
                  cy={getY(val)}
                  r="3"
                  className="fill-card stroke-primary stroke-[1.5] transition-all group-hover/point:r-5 group-hover/point:stroke-cream cursor-pointer"
                />
                <g className="opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                  <rect 
                    x={getX(i) - 40} 
                    y={getY(val) - 45} 
                    width="80" 
                    height="32" 
                    rx="8" 
                    className="fill-black/95 stroke-white/10 shadow-2xl" 
                  />
                  <text
                    x={getX(i)}
                    y={getY(val) - 30}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[8px] font-black uppercase tracking-widest"
                  >
                    {dateStr}
                  </text>
                  <text
                    x={getX(i)}
                    y={getY(val) - 18}
                    textAnchor="middle"
                    className="fill-cream text-[11px] font-mono font-black"
                  >
                    ${val.toFixed(0)}
                  </text>
                </g>
              </g>
            )
          })}
        </svg>
      </div>

      {/* X-Axis Dates */}
      <div className="flex justify-between items-center mt-6 px-1 relative">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">First Session</span>
          <span className="text-[10px] font-bold text-cream/70 uppercase">
            {new Date(sortedData[0]?.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}
          </span>
        </div>
        <div className="h-px flex-1 mx-8 bg-white/5" />
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Current Standing</span>
          <span className="text-[10px] font-bold text-cream/70 uppercase">
            {new Date(sortedData[sortedData.length - 1]?.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}
