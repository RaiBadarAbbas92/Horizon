'use client'

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ForexRatesSection } from "./app_page"
import { useState, useEffect } from "react"
import { Sparkles, TrendingUp, ChevronRight, CandlestickChart, LineChart, BarChart } from 'lucide-react'

export default function Hero() {
  // Sample data for cards with enhanced details
  const traders = [
    { name: "Chase Williams", amount: "$50,000", image: "/re.jpg", profit: "10.5%", trades: 156, winRate: "89%" },
    { name: "Sarah Chen", amount: "$75,000", image: "/harr.jpg", profit: "12.3%", trades: 243, winRate: "92%" },
    { name: "Mike Johnson", amount: "$62,000", image: "/r.jpg", profit: "8.7%", trades: 178, winRate: "85%" },
    { name: "Emma Davis", amount: "$48,000", image: "/rr.jpg", profit: "15.2%", trades: 134, winRate: "91%" }
  ]

  const weeklyTraders = [
    { name: "John Smith", amount: "+$4,000", image: "/rrr.jpg", strategy: "Swing Trading" },
    { name: "Lisa Zhang", amount: "+$5,200", image: "/r.jpg", strategy: "Day Trading" },
    { name: "Sarah Wilson", amount: "+$3,800", image: "/harr.jpg", strategy: "Scalping" },
    { name: "Kate Brown", amount: "+$6,100", image: "/rrrr.jpg", strategy: "Position Trading" }
  ]

  const [currentTraderIndex, setCurrentTraderIndex] = useState(0)
  const [currentWeeklyTraderIndex, setCurrentWeeklyTraderIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTraderIndex((prev) => (prev + 1) % traders.length)
      setCurrentWeeklyTraderIndex((prev) => (prev + 1) % weeklyTraders.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#0A0F1C] to-[#1A1F3C]">
      {/* Enhanced animated background with trading patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10" />
        
        {/* Animated candlestick patterns */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`candlestick-${i}`}
              className="absolute h-16 w-1 bg-green-400"
              initial={{ 
                x: Math.random() * 100 + i * 50,
                y: Math.random() * window.innerHeight,
                height: Math.random() * 40 + 20
              }}
              animate={{
                y: [0, -20, 0],
                height: [20, 40, 20],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced animated particles with trading icons */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {index % 3 === 0 ? (
              <CandlestickChart className="w-4 h-4 text-orange-400/30" />
            ) : index % 3 === 1 ? (
              <LineChart className="w-4 h-4 text-blue-400/30" />
            ) : (
              <BarChart className="w-4 h-4 text-green-400/30" />
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Enhanced mobile-friendly left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-white/10 mb-6 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white/80">Join 10,000+ Professional Traders</span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-7xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Trade Smarter,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                Grow Faster
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Join the elite community of funded traders. Access up to $400,000 in trading capital, advanced analytics, and real-time mentorship from industry experts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
            >
              <Button 
                className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 w-full sm:w-auto"
                onClick={() => window.location.href = '/Signup'}
              >
                Start Trading <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
                onClick={() => window.location.href = '/Learn'}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Mobile-optimized stats section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              {[
                { label: "Active Traders", value: "10,000+", icon: "👥" },
                { label: "Success Rate", value: "92%", icon: "📈" },
                { label: "Avg. Monthly Profit", value: "$8.5K", icon: "💰" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-3">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced mobile-friendly floating cards */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] w-full max-w-[500px] mx-auto mt-8 lg:mt-0">
            <AnimatePresence mode="popLayout">
              {/* Rest of the cards code remains the same */}
              {/* Top card */}
              <motion.div
                key={`top-${currentTraderIndex}`}
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.3, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 top-12 w-full sm:w-[380px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <motion.img
                      src={traders[currentTraderIndex].image}
                      alt="Profile"
                      className="h-16 sm:h-20 w-16 sm:w-20 rounded-xl object-cover ring-2 ring-orange-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-white/60">{traders[currentTraderIndex].name}</div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">{traders[currentTraderIndex].amount}</div>
                    <div className="text-sm text-white/40">Total Portfolio</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/5">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-400">{traders[currentTraderIndex].profit}</div>
                    <div className="text-xs text-white/40">Monthly ROI</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">{traders[currentTraderIndex].trades}</div>
                    <div className="text-xs text-white/40">Total Trades</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-green-400">{traders[currentTraderIndex].winRate}</div>
                    <div className="text-xs text-white/40">Win Rate</div>
                  </div>
                </div>
              </motion.div>

              {/* Middle card */}
              <motion.div
                key={`middle-${currentWeeklyTraderIndex}`}
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.3, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute right-4 sm:right-48 top-60 w-[280px] sm:w-[320px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <motion.img
                    src={weeklyTraders[currentWeeklyTraderIndex].image}
                    alt="Profile"
                    className="h-14 sm:h-16 w-14 sm:w-16 rounded-xl object-cover ring-2 ring-blue-500"
                  />
                  <div>
                    <div className="text-white/60">{weeklyTraders[currentWeeklyTraderIndex].name}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{weeklyTraders[currentWeeklyTraderIndex].amount}</div>
                    <div className="text-sm text-blue-400">{weeklyTraders[currentWeeklyTraderIndex].strategy}</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom card */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute right-0 top-96 w-[260px] sm:w-[280px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-8 sm:h-10 w-8 sm:w-10 text-orange-400" />
                  <div className="text-right">
                    <div className="text-sm text-white/60">Maximum Funding</div>
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                      $400,000
                    </div>
                    <div className="text-xs text-white/40">No Hidden Fees</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}