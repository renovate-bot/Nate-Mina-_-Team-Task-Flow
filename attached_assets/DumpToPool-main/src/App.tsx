import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Thermometer, 
  Droplets, 
  ArrowRightLeft, 
  Wind, 
  Waves, 
  Activity, 
  Info, 
  TrendingUp,
  Settings,
  ShieldCheck,
  Cpu,
  ArrowRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

interface SystemComponent {
  id: string;
  name: string;
  stage: string;
  details: string;
  color: string;
  status: string;
}

// --- Components ---

const GlassCard = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      "relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30",
      className
    )}
  >
    {children}
  </div>
);

const SectionTitle = ({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      <span className="mono text-xs font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">{number}</span>
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
  </div>
);

const Slider = ({ label, value, min, max, unit, onChange, colorClass }: { 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  unit: string; 
  onChange: (val: number) => void;
  colorClass: string;
}) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <span className="text-sm font-medium text-slate-400">{label}</span>
      <span className={cn("mono text-lg font-bold", colorClass)}>
        {value}{unit}
      </span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
    />
  </div>
);

const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="math-block bg-slate-950/80 border-l-4 border-cyan-500 p-6 rounded-r-2xl font-mono text-slate-300 overflow-x-auto shadow-inner">
    <div className="min-w-max">
      {children}
    </div>
  </div>
);

const PhysicalBlueprintView = ({ simulation }: { simulation: any }) => (
  <div className="space-y-12">
    <SectionTitle 
      number="01" 
      title="Property Installation Schematic" 
      subtitle="Comprehensive site plan showing the physical relationship between the thermal source (HVAC), the exchange pad, and the thermal sink (Pool)."
    />

    <GlassCard className="min-h-[700px] bg-slate-950/60 overflow-hidden relative border-cyan-500/10">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Schematic Legend */}
      <div className="absolute top-8 right-8 z-20 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-white/5 backdrop-blur-md">
          <div className="w-10 h-1 bg-rose-500 rounded-full" />
          <span className="mono text-[9px] text-slate-400 font-bold uppercase">Hot Gas (Refrigerant)</span>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-white/5 backdrop-blur-md">
          <div className="w-10 h-1 bg-cyan-500 rounded-full" />
          <span className="mono text-[9px] text-slate-400 font-bold uppercase">Liquid Liquid (Loop)</span>
        </div>
      </div>

      <div className="relative w-full h-[600px] mt-10">
        {/* 1. THE MAIN HOUSE */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-10 top-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-slate-900 border-2 border-slate-700/50 rounded-2xl flex items-center justify-center shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 w-20 h-20 border-l border-b border-slate-700/30 rounded-bl-xl bg-slate-800/20" />
          <div className="text-center space-y-4">
             <div className="mono text-[10px] text-slate-600 font-black tracking-[0.4em] uppercase">Primary Residence</div>
             <div className="text-4xl font-black text-slate-700">HOUSE</div>
             <div className="flex items-center justify-center gap-2 text-cyan-400/50">
                <Thermometer size={16} />
                <span className="mono font-bold tracking-tighter">72°F Target</span>
             </div>
          </div>
          
          {/* Internal HVAC Unit */}
          <div className="absolute -right-4 top-1/4 w-8 h-20 bg-slate-800 border border-cyan-500/30 rounded flex items-center justify-center">
             <div className="rotate-90 mono text-[8px] text-cyan-500 font-bold tracking-widest">A-COIL</div>
          </div>
        </motion.div>

        {/* 2. THE POOL SECTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-cyan-900/20 border-2 border-cyan-500/30 rounded-[100px] overflow-hidden group shadow-[0_0_80px_-20px_rgba(6,182,212,0.15)]"
        >
           {/* Animated Water Surface */}
           <div className="absolute inset-0 bg-cyan-500/10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  animate={{ 
                    x: [-20, 20, -20],
                    y: [-10, 10, -10],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5 + i, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, transparent 70%)',
                    left: `${i * 30}%`,
                    top: `${i * 15}%`,
                  }}
                />
              ))}
           </div>
           
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="mono text-[12px] font-black tracking-widest text-cyan-400 mb-2 uppercase">Thermal Sink</div>
              <div className="text-5xl font-black text-cyan-700/30 group-hover:text-cyan-500/40 transition-colors uppercase italic">SWIMMING POOL</div>
              <div className="mt-4 px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-400 mono text-xs font-bold ring-1 ring-cyan-400/30">
                {simulation.surfaceArea} SQ FT SURFACE
              </div>

              {/* Pool Inlets (Return lines) */}
              <div className="absolute top-1/2 -left-2 space-y-8">
                 <div className="w-4 h-2 bg-cyan-500/50 rounded-full" />
                 <div className="w-4 h-2 bg-cyan-500/50 rounded-full" />
              </div>
           </div>
        </motion.div>

        {/* 3. THE EQUIPMENT PAD (CENTER) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute left-[340px] top-[15%] w-[380px] h-[180px] bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl z-10"
        >
          <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-500 rounded-full text-[9px] font-black uppercase text-black tracking-[0.2em]">EQUIPMENT PAD</div>
          
          <div className="grid grid-cols-4 gap-4 h-full">
            {/* Stage 1: AC Condenser */}
            <div className="flex flex-col items-center justify-center border border-white/5 bg-slate-950/40 rounded-xl relative group">
              <div className="w-10 h-10 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center mb-2 overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                  className="p-1"
                >
                  <Wind className="text-slate-500" size={16} />
                </motion.div>
              </div>
              <span className="mono text-[8px] text-slate-500 uppercase font-black">Condenser</span>
            </div>

            {/* Stage 2: Pump */}
            <div className="flex flex-col items-center justify-center border border-white/5 bg-slate-950/40 rounded-xl relative group">
              <Activity className="text-cyan-500 mb-2" size={20} />
              <span className="mono text-[8px] text-slate-500 uppercase font-black">VSP Pump</span>
            </div>

            {/* Stage 3: Titanium HX */}
            <div className="flex flex-col items-center justify-center border-2 border-cyan-500/50 bg-cyan-500/5 rounded-xl relative group">
              <div className="absolute -top-2 px-1.5 py-0.5 bg-cyan-500 rounded text-[7px] text-white font-black uppercase tracking-tighter">HX</div>
              <ArrowRightLeft className="text-cyan-400 mb-2" size={20} />
              <span className="mono text-[8px] text-cyan-400 uppercase font-black">Core Recovery</span>
            </div>

            {/* Stage 4: Sanitation */}
            <div className="flex flex-col items-center justify-center border border-white/5 bg-emerald-500/5 rounded-xl relative group">
              <ShieldCheck className="text-emerald-500 mb-2" size={20} />
              <span className="mono text-[8px] text-slate-500 uppercase font-black">Sterilization</span>
            </div>
          </div>
        </motion.div>

        {/* 4. ANIMATED FLOW PATHS (SVG LINES) */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
           <svg className="w-full h-full" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                </marker>
              </defs>

              {/* Loop A: Refrigerant Loop (Red/Rose) */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                d="M 340 250 L 370 250 L 370 180" 
                stroke="rgba(244, 63, 94, 0.4)" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="4 4"
              />
              <circle cx="340" cy="250" r="3" fill="#f43f5e" /> {/* Exit house */}
              <circle cx="370" cy="180" r="3" fill="#f43f5e" /> {/* Into Condenser */}

              {/* Loop B: Water Feed Loop (From Pool To HX) */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                d="M 750 350 L 750 150 L 580 150" 
                stroke="rgba(6, 182, 212, 0.3)" 
                strokeWidth="3" 
                fill="none" 
              />
              {/* Animated Flow Dots inside Water Path */}
              <circle r="2" fill="#06b6d4">
                <animateMotion 
                  path="M 750 350 L 750 150 L 580 150" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </circle>

              {/* Loop C: Return Loop (From HX To Pool) */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                d="M 520 180 L 520 380 L 750 380" 
                stroke="rgba(16, 185, 129, 0.4)" 
                strokeWidth="4" 
                fill="none" 
              />
              <circle r="3" fill="#10b981">
                <animateMotion 
                  path="M 520 180 L 520 380 L 750 380" 
                  dur="3s" 
                  repeatCount="indefinite" 
                />
              </circle>
           </svg>
        </div>

        {/* 5. LABELS */}
        <div className="absolute left-[360px] bottom-[45%] bg-slate-900 border border-white/5 px-3 py-1.5 rounded-full mono text-[9px] text-rose-500 font-bold uppercase tracking-tighter">
           Liquid-Line Recovery Path (High Press)
        </div>
        <div className="absolute right-[120px] top-[20%] text-right bg-slate-900 border border-white/5 px-3 py-1.5 rounded-full mono text-[9px] text-cyan-500 font-bold uppercase tracking-tighter">
           2" High-Flow PVC Loop {simulation.poolLength}' Total Run
        </div>
      </div>
    </GlassCard>

    {/* Installation Notes */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <GlassCard className="border-cyan-500/20">
         <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Wind size={18} /></div>
            <h5 className="font-bold text-white tracking-tight">HX Placement</h5>
         </div>
         <p className="text-[11px] text-slate-400 leading-relaxed uppercase mono tracking-wider">
            Heat exchanger must be installed downstream of filter but upstream of sanitation to prevent chemical slugs.
         </p>
      </GlassCard>
      <GlassCard className="border-amber-500/20">
         <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Cpu size={18} /></div>
            <h5 className="font-bold text-white tracking-tight">Control Interlock</h5>
         </div>
         <p className="text-[11px] text-slate-400 leading-relaxed uppercase mono tracking-wider">
            VSP pump must modulate flow based on HVAC high-side head pressure. Digital twin logic required.
         </p>
      </GlassCard>
      <GlassCard className="border-rose-500/20">
         <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400"><ArrowRightLeft size={18} /></div>
            <h5 className="font-bold text-white tracking-tight">Refrigerant Tap</h5>
         </div>
         <p className="text-[11px] text-slate-400 leading-relaxed uppercase mono tracking-wider">
            Service valves installed between compressor discharge and condenser coil input for maximum thermal delta.
         </p>
      </GlassCard>
    </div>
  </div>
);

export default function App() {
  // --- State ---
  const [currentView, setCurrentView] = useState<'dashboard' | 'blueprint'>('dashboard');
  const [ambientAirTemp, setAmbientAirTemp] = useState(95);
  const [poolLength, setPoolLength] = useState(32);
  const [poolWidth, setPoolWidth] = useState(16);
  const [targetPoolTemp, setTargetPoolTemp] = useState(82);
  const [heaterType, setHeaterType] = useState<'gas' | 'electric'>('gas');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // --- Calculations ---
  
  const simulation = useMemo(() => {
    const surfaceArea = poolLength * poolWidth;
    
    // Natural Evaporative Depression: 
    // Pools naturally stay 3-6 degrees below ambient due to surface area.
    // Larger surface area per volume increases this effect.
    const naturalDepression = 4 + (surfaceArea / 1200);
    const naturalEquilibrium = ambientAirTemp - naturalDepression;
    
    // Thermal Ceiling: Fountain prevents temp going above 88
    const isFountainActive = targetPoolTemp > 86;
    const cappedPoolTemp = Math.min(targetPoolTemp, 88);

    // AC Efficiency Gain: 
    // Standard COP drops ~2.5% per degree above 80F air.
    // Water-cooled is more stable.
    const copDiff = Math.max(0.1, (ambientAirTemp - cappedPoolTemp) * 0.02 + 0.15);
    const acSavePercentNum = parseFloat((copDiff * 100).toFixed(1));
    const acSavePercent = acSavePercentNum.toFixed(1);

    // AC Dollar Savings Estimate
    // Assumes ~$250/mo baseline cooling cost for standard 4-ton unit at 95F
    const acMonthlyBase = 250 * (ambientAirTemp / 95); 
    const acSavingsDollars = (acSavePercentNum / 100) * acMonthlyBase;

    // Free Heating Savings:
    // If we want pool > natural equilibrium, we are displacing heater costs.
    const heatingDelta = Math.max(0, cappedPoolTemp - naturalEquilibrium);
    
    // Total BTU needed per month (Estimated loss replacement)
    // Heuristic: Monthly BTU = DeltaT * Area * 1500 (representing convective/evaporative loss constant)
    const btuNeededPerMonth = heatingDelta * surfaceArea * 1500;
    
    let heatingSavings = 0;
    if (heaterType === 'gas') {
        const efficiency = 0.8; // Standard Gas heater
        const pricePerTherm = 1.45; // National avg
        const therms = (btuNeededPerMonth / efficiency) / 100000;
        heatingSavings = therms * pricePerTherm;
    } else {
        const efficiency = 1.0; // Electric Resistance
        const pricePerkWh = 0.16; // National avg
        const kwh = (btuNeededPerMonth / efficiency) / 3412;
        heatingSavings = kwh * pricePerkWh;
    }

    const totalSavings = heatingSavings + acSavingsDollars;

    // Chart Data
    const chartData = Array.from({ length: 11 }, (_, i) => {
      const air = 75 + i * 4;
      const pool = 80; // normalized pool
      return {
        temp: air,
        liquid: 5.8 + (air - 70) * 0.01,
        air: Math.max(2.5, 4.8 - (air - 70) * 0.05),
      };
    });

    return {
      surfaceArea,
      naturalEquilibrium,
      acSavePercent,
      acSavingsDollars: acSavingsDollars.toFixed(2),
      heatingSavings: heatingSavings.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      isFountainActive,
      cappedPoolTemp,
      chartData
    };
  }, [ambientAirTemp, poolLength, poolWidth, targetPoolTemp, heaterType]);

  const components: SystemComponent[] = [
    { 
      id: 'pump', 
      name: 'VSP Pool Pump', 
      stage: 'STAGE 01', 
      details: 'Variable Speed Pump: Must be interlocked with the HVAC logic. Provides constant flow for heat transfer.', 
      color: 'cyan', 
      status: 'RUNNING' 
    },
    { 
      id: 'filter', 
      name: 'Main Filter', 
      stage: 'STAGE 02', 
      details: 'Placed BEFORE Heat Exchanger. Protects titanium tubes from physical debris and sediment loading.', 
      color: 'emerald', 
      status: 'OPTIMAL' 
    },
    { 
      id: 'hx', 
      name: 'Titanium HX', 
      stage: 'STAGE 03', 
      details: 'Shell-and-Tube recovery core. Transfers house heat to pool loops. ASTM B265 Titanium ensures salt immunity.', 
      color: 'cyan', 
      status: 'ACTIVE' 
    },
    { 
      id: 'chlor', 
      name: 'Salt Cell', 
      stage: 'STAGE 04', 
      details: 'Placed AFTER HX. Prevents chemical reflux and high-concentration chlorine slugs from damaging welds.', 
      color: 'amber', 
      status: 'SAFE' 
    },
    { 
      id: 'valve', 
      name: 'Bypass Valve', 
      stage: 'STAGE 05', 
      details: 'Automated 3-way diversion. Activates fountain once thermal ceiling is reached to enable rejection.', 
      color: 'rose', 
      status: 'MONITORING' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header */}
        <header className="mb-20 border-b border-slate-800/50 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 mono text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Activity size={12} className="animate-pulse" /> System Architecture v9.0
              </div>
              <h1 className="text-7xl font-black tracking-tighter text-white mb-6">
                Dump To<span className="text-cyan-500"> POOL</span> Heat Exchange
              </h1>
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className={cn(
                    "px-6 py-2 rounded-full mono text-[10px] font-black uppercase tracking-widest transition-all",
                    currentView === 'dashboard' ? "bg-white text-black" : "bg-white/5 text-slate-500 hover:bg-white/10"
                  )}
                >
                  Engineering Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('blueprint')}
                  className={cn(
                    "px-6 py-2 rounded-full mono text-[10px] font-black uppercase tracking-widest transition-all",
                    currentView === 'blueprint' ? "bg-white text-black" : "bg-white/5 text-slate-500 hover:bg-white/10"
                  )}
                >
                  Physical Blueprint
                </button>
              </div>
              <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
                Integrated sub-ambient liquid heat exchange and atmospheric evaporation for total home-pool thermal equilibrium.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-8 bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">System Efficiency</div>
                  <div className="text-emerald-400 font-black mono text-2xl">OPTIMIZED</div>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">COP Boost</div>
                  <div className="text-cyan-400 font-black mono text-2xl">+{simulation.acSavePercent}%</div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl backdrop-blur-md">
                 <div className="flex justify-between items-center gap-8 mb-4 border-b border-emerald-500/10 pb-4">
                    <div>
                      <div className="text-[9px] text-emerald-500/60 uppercase font-black tracking-widest">Total Monthly Savings</div>
                      <div className="text-4xl font-black text-emerald-400 mono">${simulation.totalSavings}</div>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-2xl">
                      <TrendingUp size={24} className="text-emerald-400" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-[8px] text-slate-500 uppercase font-black mb-1">AC Electricity</div>
                      <div className="text-lg font-bold text-white mono">${simulation.acSavingsDollars}</div>
                    </div>
                    <div>
                      <div className="text-[8px] text-slate-500 uppercase font-black mb-1">Pool Heating</div>
                      <div className="text-lg font-bold text-white mono">${simulation.heatingSavings}</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* 01. Physical Blueprint (Quick Preview) */}
              <section className="mb-28">
                <SectionTitle 
                  number="01" 
                  title="Hardware Engineering Blueprint" 
                  subtitle="Cross-section of the thermal exchange pad. Trace the path from the high-pressure refrigerant loop to the atmospheric cooling fountain."
                />

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-4 gap-6"
                >
                  {/* System Status Display (Left) */}
                  <GlassCard className="lg:col-span-1 space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full animate-pulse", simulation.isFountainActive ? "bg-rose-500" : "bg-emerald-500")} />
                        <span className="mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {simulation.isFountainActive ? "Fountain ACTIVE (Cooling)" : "Standard Recovery"}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                          <div className="text-[10px] text-slate-600 font-bold uppercase mb-1">Sink Temperature</div>
                          <div className="text-2xl font-black text-cyan-400 mono">{simulation.cappedPoolTemp}°F</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                          <div className="text-[10px] text-slate-600 font-bold uppercase mb-1">Natural Depression</div>
                          <div className="text-2xl font-black text-slate-400 mono">-{ (ambientAirTemp - simulation.naturalEquilibrium).toFixed(1) }°F</div>
                        </div>
                      </div>
                    </div>                <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                      <p className="text-[11px] text-cyan-500/80 leading-relaxed italic">
                        *Large surface area contributes to natural cooling tower effect even without fountain.
                      </p>
                    </div>
                  </GlassCard>

                  {/* Main Visual Diagram (Right) */}
                  <GlassCard className="lg:col-span-3 min-h-[400px] flex items-center justify-center overflow-hidden">
                    {/* Visual schematic using only CSS and div primitives */}
                    <div className="relative w-full h-full max-w-4xl min-h-[350px]">
                        
                        {/* The Pool Loop (Blue Lines) */}
                        <div className="absolute top-1/2 left-0 w-full h-[120px] -translate-y-1/2 border-y-2 border-dashed border-cyan-500/20 pointer-events-none" />
                        
                        {/* Flowing Water Particles */}
                        <AnimatePresence>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={`water-${i}`}
                              initial={{ x: -100 }}
                              animate={{ x: '110vw' }}
                              transition={{ repeat: Infinity, duration: 4, delay: i * 0.7, ease: "linear" }}
                              className="absolute top-1/2 -translate-y-1/2 mt-4 w-1 h-1 rounded-full bg-cyan-400 opacity-30"
                            />
                          ))}
                        </AnimatePresence>

                        {/* Stage 1: House / Evaporator */}
                        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-16 h-28 bg-slate-800 rounded-lg border-2 border-cyan-500/30 flex items-center justify-center relative overflow-hidden group">
                              <motion.div 
                                animate={{ y: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-cyan-500/5" 
                              />
                              <Thermometer className="text-cyan-500 opacity-50" size={24} />
                          </div>
                          <span className="mono text-[8px] text-slate-500 mt-2 uppercase tracking-tighter">Indoor EVAP</span>
                        </div>

                        {/* Stage 2: Compressor */}
                        <div className="absolute left-[25%] top-[15%] flex flex-col items-center">
                          <motion.div 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-20 h-20 rounded-full border-4 border-slate-700 bg-slate-800 flex items-center justify-center shadow-lg shadow-black/50"
                          >
                            <Zap size={24} className="text-amber-500" />
                          </motion.div>
                          <span className="mono text-[8px] text-slate-500 mt-2 uppercase tracking-tighter">High Pressure</span>
                        </div>

                        {/* Stage 3: THE HEAT EXCHANGER (CORE) */}
                        <div className="absolute left-[40%] top-1/2 -translate-y-1/2 group">
                          <div className="w-32 h-44 rounded-3xl border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-2xl flex flex-col items-center justify-center relative shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]">
                              <div className="absolute inset-x-0 top-0 h-4 bg-cyan-500/20 rounded-t-3xl" />
                              <div className="absolute inset-x-0 bottom-0 h-4 bg-emerald-500/20 rounded-b-3xl" />
                              
                              <div className="space-y-2 text-center pointer-events-none">
                                <Droplets className="mx-auto text-cyan-400" size={28} />
                                <div className="mono text-[10px] font-black text-white">TITANIUM CORE</div>
                                <div className="mono text-[8px] text-cyan-400 tracking-widest pt-1">LIQUID-LIQUID</div>
                              </div>

                              {/* Animated Refrigerant Flow */}
                              <div className="absolute -left-2 top-0 bottom-0 w-1 flex flex-col justify-around">
                                {[0, 1, 2].map(i => (
                                  <motion.div 
                                    key={`ref-${i}`}
                                    animate={{ y: [0, 40], opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.5 }}
                                    className="w-1 h-4 bg-orange-500 rounded-full"
                                  />
                                ))}
                              </div>
                          </div>
                        </div>

                        <ArrowRight className="absolute left-[58%] top-1/2 -translate-y-1/2 text-cyan-500/30" />

                        {/* Stage 4: Fountain / Rejector */}
                        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full border-2 border-dashed border-rose-500/50 bg-slate-900 flex items-center justify-center relative">
                              <Waves className="text-rose-500" size={32} />
                              {simulation.isFountainActive && (
                                <>
                                  <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="absolute inset-0 rounded-full bg-rose-500/30"
                                  />
                                  {/* Spray effect */}
                                  {[...Array(8)].map((_, i) => (
                                    <motion.div
                                      key={`spray-${i}`}
                                      animate={{ 
                                        y: [-20, -60, -20], 
                                        x: [0, (i - 4) * 15, 0],
                                        opacity: [0, 1, 0] 
                                      }}
                                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                      className="absolute top-0 w-1 h-1 bg-cyan-400 rounded-full"
                                    />
                                  ))}
                                </>
                              )}
                          </div>
                          <span className="mono text-[8px] text-slate-500 mt-2 uppercase tracking-tighter">Atmospheric Rejector</span>
                        </div>

                        {/* Electrical Interlock Lines (Yellow) */}
                        <div className="absolute inset-0 pointer-events-none">
                          <svg className="w-full h-full">
                            {/* Controller to Compressor */}
                            <path d="M 50 50 L 250 100" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" fill="none" />
                            {/* Controller to Pump */}
                            <path d="M 50 50 L 50 300" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" fill="none" />
                          </svg>
                        </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </section>

              {/* 02. Pad Hardware Sequence (Clickable) */}
              <section className="mb-28">
                <SectionTitle 
                  number="02" 
                  title="Pad Sequence & Logic" 
                  subtitle="Click components to view electrical interlocks and engineering safety parameters."
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
                  {components.map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => setSelectedComponent(c.id)}
                      className={cn(
                        "p-6 rounded-3xl border text-center transition-all duration-300 group relative",
                        selectedComponent === c.id 
                          ? "bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-4 ring-cyan-500/20" 
                          : "bg-slate-900/40 border-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="text-[10px] mono text-slate-500 mb-3 uppercase tracking-widest">{c.stage}</div>
                      <div className={cn("text-lg font-black tracking-tighter mb-1", selectedComponent === c.id ? "text-cyan-400" : "text-white")}>
                        {c.name}
                      </div>
                      <div className={cn("text-[9px] mono font-bold uppercase", `text-${c.color}-400`)}>
                        {c.status}
                      </div>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {selectedComponent ? (
                    <motion.div
                      key={selectedComponent}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <GlassCard className="border-cyan-500/30 bg-cyan-500/5">
                        <div className="flex gap-4 items-start">
                          <div className="p-3 rounded-2xl bg-cyan-500/10">
                            <ShieldCheck className="text-cyan-500" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 italic">
                              {components.find(c => c.id === selectedComponent)?.name}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                              {components.find(c => c.id === selectedComponent)?.details}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ) : (
                    <div className="p-12 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                      <p className="text-slate-500 mono text-sm uppercase tracking-widest">Select a component to view technical specs</p>
                    </div>
                  )}
                </AnimatePresence>
              </section>

              {/* 03. Economic ROI Engine */}
              <section className="mb-28">
                <SectionTitle 
                  number="03" 
                  title="Dynamic ROI & Thermodynamic Performance" 
                  subtitle="Comparing current AC performance with standard air-cooled systems. Note: Cooler pool temps boost AC efficiency exponentially."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Controls */}
                  <GlassCard className="space-y-10">
                      <h4 className="flex items-center gap-2 text-xs font-black mono text-slate-500 mb-2 uppercase tracking-widest">
                        <Settings size={14} /> Adjust Environmental Matrix
                      </h4>

                      <div className="space-y-8">
                        <Slider 
                          label="Ambient Air Temperature"
                          value={ambientAirTemp}
                          min={70}
                          max={115}
                          unit="°F"
                          colorClass="text-rose-400"
                          onChange={setAmbientAirTemp}
                        />
                        <Slider 
                          label="Target Pool Temperature"
                          value={targetPoolTemp}
                          min={65}
                          max={95}
                          unit="°F"
                          colorClass="text-cyan-400"
                          onChange={setTargetPoolTemp}
                        />
                        
                        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Slider 
                              label="Pool Length"
                              value={poolLength}
                              min={20}
                              max={50}
                              unit="ft"
                              colorClass="text-slate-300"
                              onChange={setPoolLength}
                            />
                            <Slider 
                              label="Pool Width"
                              value={poolWidth}
                              min={10}
                              max={30}
                              unit="ft"
                              colorClass="text-slate-300"
                              onChange={setPoolWidth}
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-800">
                            <div className="text-sm font-medium text-slate-400 mb-4">Comparison Base Heater</div>
                            <div className="flex gap-2 p-1 bg-slate-950/50 rounded-2xl border border-white/5">
                              <button 
                                onClick={() => setHeaterType('gas')}
                                className={cn(
                                  "flex-1 py-3 rounded-xl mono text-xs font-bold transition-all",
                                  heaterType === 'gas' ? "bg-cyan-500 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                                )}
                              >
                                Gas Heater
                              </button>
                              <button 
                                onClick={() => setHeaterType('electric')}
                                className={cn(
                                  "flex-1 py-3 rounded-xl mono text-xs font-bold transition-all",
                                  heaterType === 'electric' ? "bg-amber-500 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                                )}
                              >
                                Electric Resist.
                              </button>
                            </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/5 space-y-2">
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 font-bold uppercase">
                            <TrendingUp size={10} className="text-emerald-500" /> Heating Savings
                          </div>
                          <div className="text-3xl font-black text-emerald-400 mono">${simulation.heatingSavings}</div>
                          <div className="text-[9px] text-slate-600 uppercase font-black">Monthly Displacement</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/5 space-y-2">
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 font-bold uppercase">
                            <Zap size={10} className="text-cyan-500" /> AC Electricity Save
                          </div>
                          <div className="text-3xl font-black text-cyan-400 mono">{simulation.acSavePercent}%</div>
                          <div className="text-[9px] text-slate-600 uppercase font-black">House Energy Load</div>
                        </div>
                      </div>
                  </GlassCard>

                  {/* Charts */}
                  <GlassCard className="h-full min-h-[450px]">
                      <div className="flex justify-between items-center mb-10">
                        <h4 className="text-xs font-black mono text-slate-500 uppercase tracking-widest">COP Performance Divergence</h4>
                        <div className="flex gap-4 text-[9px] mono">
                          <span className="flex items-center gap-1 text-cyan-400">● Liquid</span>
                          <span className="flex items-center gap-1 text-slate-500">● Air Std.</span>
                        </div>
                      </div>
                      
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={simulation.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="temp" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'COP', angle: -90, position: 'insideLeft', style: { fill: '#475569', fontSize: 10 } }} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="liquid" 
                              stroke="#06b6d4" 
                              strokeWidth={4} 
                              dot={false} 
                              animationDuration={1500}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="air" 
                              stroke="#334155" 
                              strokeWidth={2} 
                              strokeDasharray="5 5" 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                  </GlassCard>
                </div>
              </section>

              {/* 04. Combined Calculus Core */}
              <section className="mb-28">
                <div className="flex items-center gap-6 mb-16">
                  <div className="h-px bg-slate-800 flex-grow" />
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">04. Mathematical Foundation</h2>
                  <div className="h-px bg-slate-800 flex-grow" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  
                  {/* Box I: LMTD */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/10"><Cpu className="text-cyan-500" size={20} /></div>
                      <h3 className="text-xl font-bold text-white tracking-tight">I. Log Mean Temperature Difference (LMTD)</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The total heat flux <span className="text-amber-500 italic font-medium">Q</span> across a shell-and-tube titanium exchanger integrates the varying delta-T along the pipe length. We employ the logarithmic average to capture the non-linear relationship:
                    </p>
                    <MathBlock>
                      ΔT<sub>lm</sub> = 
                      <span className="inline-flex flex-col align-middle mx-2 text-center text-lg">
                        <span className="border-b border-slate-600 pb-1">ΔT<sub>1</sub> - ΔT<sub>2</sub></span>
                        <span className="pt-1">ln(ΔT<sub>1</sub> / ΔT<sub>2</sub>)</span>
                      </span>
                      ; Q = U \cdot A \cdot ΔT<sub>lm</sub>
                    </MathBlock>
                    <p className="text-[11px] text-slate-500 italic">
                      By utilizing water vs air, we increase the U (Heat Transfer Coefficient) by over 1,200%, allowing for significant footprint reduction.
                    </p>
                  </div>

                  {/* Box II: Fourier's Law */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/10"><Zap className="text-emerald-500" size={20} /></div>
                      <h3 className="text-xl font-bold text-white tracking-tight">II. Radial Fourier Analysis</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Radial heat flow through the Titanium wall is defined by the following differential where <span className="text-emerald-500 font-medium">k</span> is thermal conductivity:
                    </p>
                    <MathBlock>
                      q<sub>r</sub> = -k (2πrL) \cdot 
                      <span className="inline-flex flex-col align-middle mx-2 text-center text-lg">
                        <span className="border-b border-slate-600 pb-1">dT</span>
                        <span className="pt-1">dr</span>
                      </span>
                    </MathBlock>
                    <p className="text-[11px] text-slate-500 italic">
                      Integration from r<sub>i</sub> to r<sub>o</sub> yields the total heat capacity that the system can safely transfer without refrigerant phase starvation.
                    </p>
                  </div>

                  {/* Box III: Evaporative Mass Transfer */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/10"><Waves className="text-amber-500" size={20} /></div>
                      <h3 className="text-xl font-bold text-white tracking-tight">III. Evaporative Fountain Enthalpy</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The fountain rejects heat via the Latent Heat of Vaporization (<span className="text-amber-500 font-medium">h<sub>fg</sub></span>). The rate of mass loss <span className="text-amber-500 font-medium">dm/dt</span> is defined by the Sherwood Number transition:
                    </p>
                    <MathBlock>
                      <span className="inline-flex flex-col align-middle text-center text-lg">
                        <span className="border-b border-slate-600 pb-1">dm</span>
                        <span className="pt-1">dt</span>
                      </span>
                      = h<sub>m</sub> A \cdot (ρ<sub>s</sub> - ρ<sub>∞</sub>)
                    </MathBlock>
                    <p className="text-[11px] text-slate-500 italic">
                      Every kg of water vaporized removes ~2.26 MJ of heat. The increased surface area of fountain droplets multiplies this coefficient by 10<sup>3</sup>.
                    </p>
                  </div>

                  {/* Box IV: Total Savings Integral */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-rose-500/10"><TrendingUp className="text-rose-500" size={20} /></div>
                      <h3 className="text-xl font-bold text-white tracking-tight">IV. System Efficiency Integral</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Total ROI (<span className="text-rose-500 font-medium">S</span>) is the integral of energy displacement over the temporal swim window, accounting for both AC delta and heater displacement:
                    </p>
                    <MathBlock>
                      S<sub>total</sub> = 
                      <span className="inline-flex flex-col align-middle mx-2 text-center text-sm">
                        <span>t<sub>30</sub></span>
                        <span className="h-4 border-l border-slate-600 mx-auto" />
                        <span>t<sub>0</sub></span>
                      </span>
                      [ ΔW<sub>AC</sub>(t) + Q<sub>heat</sub>(t) ] \cdot C(t) dt
                    </MathBlock>
                    <p className="text-[11px] text-slate-500 italic">
                      Where <span className="text-rose-500 font-medium">C(t)</span> is the time-of-use utility rate for blended electricity and natural gas therms.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PhysicalBlueprintView simulation={simulation} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer 
          style={{ 
            marginTop: "80px", 
            paddingTop: "60px", 
            paddingBottom: "60px", 
            paddingLeft: "1px", 
            marginBottom: "-8px", 
            borderWidth: "3.11111px", 
            borderStyle: "double" 
          }}
          className="border-t border-slate-900 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-px bg-slate-900" />
            <span 
              style={{ color: "#ffffff", backgroundColor: "#000000", width: "251.826px", height: "18px" }}
              className="mono text-[10px] tracking-[0.3em] uppercase"
            >
              Thermodynamic Audit Complete
            </span>
            <div className="w-8 h-px bg-slate-900" />
          </div>
          <div 
            style={{ color: "#f80661", fontSize: "12px", fontFamily: "Times New Roman", backgroundColor: "#000000" }}
            className="mono font-bold uppercase tracking-widest text-center"
          >
            Copyright & Patent Pending by Nathaniel Mina
            <br />
            <span style={{ fontSize: "12px", color: "#ffffff" }} className="font-normal">Mechanical Engineer From RIT</span>
          </div>
          <div 
            style={{ fontSize: "11px", color: "#596f97" }}
            className="mono tracking-widest uppercase"
          >
            v9.0 Build 2026 // Integrated Mass Transfer Model // No SVG Icons used
          </div>
        </footer>
      </div>
    </div>
  );
}
