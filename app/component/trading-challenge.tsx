"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HelpCircle, TrendingUp, DollarSign, Target, Shield, Calendar, Clock, Zap, Award, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type AccountSize = '$5k' | '$10k' | '$25k' | '$50k' | '$100k' | '$200k'
type ChallengePhase = 'Phase 1' | 'Phase 2' | 'HFT Pro'

// ... [Previous type definitions and data remain the same]

export default function TradingChallenge() {
  const [selectedSize, setSelectedSize] = useState<AccountSize>('$5k')
  const [selectedPhase, setSelectedPhase] = useState<ChallengePhase>('Phase 1')
  
  const accountSizeData = {
    '$5k': {
      price: '$297',
      funded: {
        maxDrawdown: '10%',
        profitTarget: '$500',
        tradingPeriod: '30 Days',
        minTradingDays: '10 Days',
        leverage: '1:100',
        tradingHours: '24/5'
      }
    },
    '$10k': {
      price: '$397',
      funded: {
        maxDrawdown: '10%',
        profitTarget: '$1,000',
        tradingPeriod: '30 Days', 
        minTradingDays: '10 Days',
        leverage: '1:100',
        tradingHours: '24/5'
      }
    },
    '$25k': {
      price: '$597',
      funded: {
        maxDrawdown: '10%',
        profitTarget: '$2,500',
        tradingPeriod: '30 Days',
        minTradingDays: '10 Days',
        leverage: '1:100',
        tradingHours: '24/5'
      }
    },
    '$50k': {
      price: '$997',
      funded: {
        maxDrawdown: '10%',
        profitTarget: '$5,000',
        tradingPeriod: '30 Days',
        minTradingDays: '10 Days',
        leverage: '1:100',
        tradingHours: '24/5'
      }
    },
    '$100k': {
      price: '$1,497',
      funded: {
        maxDrawdown: '10%',
        profitTarget: '$10,000',
        tradingPeriod: '30 Days',
        minTradingDays: '10 Days',
        leverage: '1:100',
        tradingHours: '24/5'
      }
    },
    '$200k': {
      price: '$2,497',
      funded: {
        maxDrawdown: '10%',
        profitTarget: '$20,000',
        tradingPeriod: '30 Days',
        minTradingDays: '10 Days',
        leverage: '1:100',
        tradingHours: '24/5'
      }
    }
  }

  const phaseData = {
    'Phase 1': {
      minTradingDays: '10 Days',
      maxDrawdown: '5%',
      dailyDrawdown: '4%',
      profitTarget: '8%',
      tradingPeriod: '30 Days',
      minimumDays: '5 Days'
    },
    'Phase 2': {
      minTradingDays: '10 Days', 
      maxDrawdown: '8%',
      dailyDrawdown: '5%',
      profitTarget: '5%',
      tradingPeriod: '60 Days',
      minimumDays: '10 Days'
    },
    'HFT Pro': {
      minTradingDays: '5 Days',
      maxDrawdown: '10%',
      dailyDrawdown: '6%',
      profitTarget: '10%',
      tradingPeriod: '15 Days',
      minimumDays: '3 Days'
    }
  }

  const accountData = accountSizeData[selectedSize]
  const currentPhaseData = phaseData[selectedPhase]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] -left-96 -top-96 bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -right-96 -bottom-96 bg-purple-500/10 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl space-y-12 relative z-10">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="lg" className="bg-gradient-to-r from-orange-500 to-blue-700 text-white border-none hover:opacity-90">
            <TrendingUp className="w-5 h-5 mr-2" /> Trading Challenges
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-600 to-blue-800 leading-tight mb-6">
            Master The Markets With<br />
            Syndicate Funded
          </h1>
          <p className="text-xl sm:text-2xl text-blue-200/80 mt-4 max-w-3xl mx-auto">
            Join the elite community of professional traders and prove your worth.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Challenge Phase Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
            {['Phase 1', 'Phase 2', 'HFT Pro'].map((phase) => (
              <motion.div
                key={phase}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  variant={phase === selectedPhase ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedPhase(phase as ChallengePhase)}
                  className={`w-full h-16 text-lg font-bold rounded-xl ${
                    phase === selectedPhase
                      ? "bg-gradient-to-r from-orange-500 to-blue-700 hover:opacity-90 shadow-lg shadow-orange-500/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  }`}
                >
                  <Zap className={`w-5 h-5 mr-2 ${phase === selectedPhase ? 'text-white' : 'text-orange-400'}`} />
                  {phase}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Account Size Selection */}
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(accountSizeData) as AccountSize[]).map((size) => (
              <motion.div
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={size === selectedSize ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedSize(size)}
                  className={`${
                    size === selectedSize
                      ? "bg-gradient-to-r from-orange-500 to-blue-700 hover:opacity-90 shadow-lg shadow-orange-500/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  } min-w-[100px] sm:min-w-[120px] h-14 rounded-xl font-bold`}
                >
                  <DollarSign className={`w-4 h-4 mr-1 ${size === selectedSize ? 'text-white' : 'text-orange-400'}`} />
                  {size}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {/* Challenge Phase Card */}
            <motion.div
              key={selectedPhase + "phase1"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 rounded-2xl overflow-hidden">
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <Award className="w-8 h-8 text-orange-400" />
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-700">
                      {selectedPhase}
                    </h3>
                  </div>
                  
                  {Object.entries(currentPhaseData).map(([key, value]) => (
                    <motion.div 
                      key={key} 
                      className="flex justify-between items-center text-base p-3 rounded-lg hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-blue-200/80">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <HelpCircle className="w-4 h-4 text-orange-400/70 cursor-help" />
                      </div>
                      <span className="text-white font-medium">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Funded Account Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhase + "funded"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:shadow-2xl hover:shadow-blue-700/10 transition-all duration-300 rounded-2xl overflow-hidden">
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                      Funded Account
                    </h3>
                  </div>

                  {Object.entries(accountData?.funded || {}).map(([key, value]) => (
                    <motion.div 
                      key={key} 
                      className="flex justify-between items-center text-base p-3 rounded-lg hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-blue-200/80">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <HelpCircle className="w-4 h-4 text-blue-600/70 cursor-help" />
                      </div>
                      <span className="text-white font-medium">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-4xl sm:text-5xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-700">
              {accountData.price}
            </span>
            <span className="text-white"> For {selectedSize} Account</span>
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-700 hover:opacity-90 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl"
            >
              Start Your Journey <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
