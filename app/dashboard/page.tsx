"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, DollarSign, Target, TrendingUp, Percent } from "lucide-react"

import { Header } from "@/components/header"
import { OverviewCard } from "@/components/overview-card"
import { AccountDetailsCard } from "@/components/account-details-card"
import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardPage() {
  const [accountDetails, setAccountDetails] = useState(null)
  const [tradeHistory, setTradeHistory] = useState([])
  const [performanceData, setPerformanceData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountNumber = localStorage.getItem('account_number')
        const password = localStorage.getItem('password')

        const formData = new FormData()
        formData.append('account_number', localStorage.getItem('server') || '')
        formData.append('password', localStorage.getItem('platform_login') || '')
        formData.append('server', localStorage.getItem('password') || '')

        const response = await fetch('http://127.0.0.1:8000/meta/fetch_account_details', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()
        setAccountDetails(data.account_details)
        
        // Transform trade history data
        const formattedTrades = data.trade_details
          .filter(trade => trade.profit !== 0) // Only show closed trades
          .map(trade => ({
            id: trade.ticket,
            symbol: trade.symbol,
            type: trade.trade_type,
            openPrice: trade.price,
            closePrice: trade.price,
            profit: trade.profit,
            date: trade.date,
            volume: trade.volume
          }))
        setTradeHistory(formattedTrades)

        // Create performance data from trade history
        const perfData = data.trade_details
          .filter(trade => trade.date)
          .reduce((acc, trade) => {
            const date = trade.date
            const existingEntry = acc.find(entry => entry.period === date)
            if (existingEntry) {
              existingEntry.accountBalance += trade.profit
              existingEntry.portfolioEquity = existingEntry.accountBalance
            } else {
              acc.push({
                period: date,
                accountBalance: data.account_details.balance,
                portfolioEquity: data.account_details.equity
              })
            }
            return acc
          }, [])
        setPerformanceData(perfData)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a1929] flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2339] to-[#0a1929]">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <Header />

      <main className="container mx-auto py-4 sm:py-8 px-3 sm:px-8 space-y-4 sm:space-y-8 relative z-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6"
          >
            <OverviewCard
              title="Account Balance"
              value={`$${accountDetails?.balance.toLocaleString()}`}
              change={((accountDetails?.equity - accountDetails?.balance) / accountDetails?.balance * 100).toFixed(2)}
              icon={<DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />}
            />
            <OverviewCard
              title="Total Trades"
              value={tradeHistory.length.toString()}
              change={0}
              icon={<Activity className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />}
            />
            <OverviewCard 
              title="Success Rate" 
              value={`${((tradeHistory.filter(t => t.profit > 0).length / tradeHistory.length) * 100).toFixed(1)}%`}
              change={0}
              icon={<Target className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />} 
            />
            <OverviewCard
              title="Net Profit"
              value={`$${tradeHistory.reduce((sum, trade) => sum + trade.profit, 0).toLocaleString()}`}
              change={0}
              icon={<TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />}
            />
            <OverviewCard
              title="Daily Drawdown"
              value={`${(Math.min(...tradeHistory.map(trade => trade.profit)) / accountDetails?.balance * 100).toFixed(2)}%`} 
              change={0}
              icon={<Percent className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />}
            />
          </motion.div>

          <AccountDetailsCard
            orderId={localStorage.getItem('selectedAccountId') || ""}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full backdrop-blur-sm"
          >
            <Card className="p-4 sm:p-6 md:p-8 bg-[#0d2339]/80 border-gray-800/50 shadow-xl">
              <motion.h2
                className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Portfolio Performance
              </motion.h2>
              <motion.div
                className="h-[300px] sm:h-[400px] md:h-[500px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ 
                      top: 20, 
                      right: 30, 
                      left: 20, 
                      bottom: 20 
                    }}
                  >
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#2d3748" 
                      opacity={0.15}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="period" 
                      stroke="#718096"
                      tick={{ fill: '#94a3b8', fontSize: '12px' }}
                      axisLine={{ stroke: '#334155', strokeWidth: 1 }}
                      tickLine={{ stroke: '#334155' }}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#718096"
                      tick={{ fill: '#94a3b8', fontSize: '12px' }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                      axisLine={{ stroke: '#334155', strokeWidth: 1 }}
                      tickLine={{ stroke: '#334155' }}
                      width={90}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                        padding: '12px 16px'
                      }}
                      labelStyle={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}
                      itemStyle={{ color: '#94a3b8', fontSize: '12px', padding: '4px 0' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      cursor={{ 
                        stroke: '#475569',
                        strokeWidth: 1,
                        strokeDasharray: '4 4'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ 
                        paddingTop: '20px',
                        fontSize: '12px'
                      }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Area
                      type="monotone"
                      dataKey="accountBalance"
                      stroke="#f97316"
                      strokeWidth={2}
                      fill="url(#balanceGradient)"
                      dot={{ fill: '#f97316', strokeWidth: 0, r: 4 }}
                      activeDot={{ 
                        r: 6,
                        stroke: '#fff',
                        strokeWidth: 2,
                        strokeOpacity: 0.8
                      }}
                      name="Account Balance"
                    />
                    <Area
                      type="monotone"
                      dataKey="portfolioEquity"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#equityGradient)"
                      dot={{ fill: '#22c55e', strokeWidth: 0, r: 4 }}
                      activeDot={{ 
                        r: 6,
                        stroke: '#fff', 
                        strokeWidth: 2,
                        strokeOpacity: 0.8
                      }}
                      name="Portfolio Equity"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full backdrop-blur-sm"
          >
            <Card className="p-4 sm:p-6 md:p-8 bg-[#0d2339]/80 border-gray-800/50 shadow-xl">
              <motion.h2
                className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Trade History
              </motion.h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-300 font-medium">Symbol</TableHead>
                      <TableHead className="text-gray-300 font-medium">Type</TableHead>
                      <TableHead className="text-gray-300 font-medium">Volume</TableHead>
                      <TableHead className="text-gray-300 font-medium">Open Price</TableHead>
                      <TableHead className="text-gray-300 font-medium">Profit/Loss</TableHead>
                      <TableHead className="text-gray-300 font-medium">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradeHistory.map((trade, index) => (
                      <motion.tr
                        key={trade.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group hover:bg-white/5 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-200">{trade.symbol}</TableCell>
                        <TableCell className={`${trade.type === "Buy" ? "text-green-500" : "text-red-500"} font-medium`}>{trade.type}</TableCell>
                        <TableCell className="text-gray-300">{trade.volume}</TableCell>
                        <TableCell className="text-gray-300">{trade.openPrice}</TableCell>
                        <TableCell className={`${trade.profit >= 0 ? "text-green-500" : "text-red-500"} font-medium`}>
                          ${trade.profit.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-300">{trade.date}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
