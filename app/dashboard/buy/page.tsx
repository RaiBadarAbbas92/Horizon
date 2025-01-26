"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaymentDetails } from "@/components/payment-details"
import { Loader2, CreditCard, User, Mail, Coins, DollarSign, FileImage } from "lucide-react"

export default function BuyPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    challenge_type: "",
    account_size: "",
    platform: "",
    payment_coin: "",
    txid: "",
    img: null as File | null
  })

  const paymentOptions = [
    { name: "Binance", logo: "/binance.svg?height=40&width=120" },
    { name: "BitPay", logo: "/bithumb.svg?height=40&width=120" }
  ]

  const handleCoinSelect = (value: string) => {
    setSelectedCoin(value)
    setFormData(prev => ({ ...prev, payment_coin: value }))
    setShowPaymentDetails(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        img: e.target.files![0]
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('username', formData.username)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('challenge_type', formData.challenge_type)
      formDataToSend.append('account_size', formData.account_size)
      formDataToSend.append('platform', formData.platform)
      formDataToSend.append('payment_method', formData.payment_coin)
      formDataToSend.append('txid', formData.txid)
      if (formData.img) {
        formDataToSend.append('img', formData.img)
      }

      const response = await fetch('http://127.0.0.1:8000/order/order', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Failed to submit order')
      }

      const data = await response.json()
      console.log('Order submitted successfully:', data)

    } catch (error) {
      console.error('Error submitting order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200"
    >
      {/* Animated Promo Banner */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-4 px-4 text-center text-sm md:text-base sticky top-0 z-50 shadow-lg"
      >
        <span className="font-bold text-lg">🎉 Special Offer:</span> Get 15% OFF on all accounts with code{" "}
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-white/20 px-4 py-2 rounded-full cursor-pointer inline-block font-mono font-bold tracking-wider shadow-inner"
        >
          NEW15
        </motion.span>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12 py-12 md:py-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
              Begin Your Trading Journey
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join the elite community of professional traders and unlock your true potential
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {paymentOptions.map((option) => (
              <motion.div
                key={option.name}
                whileHover={{ scale: 1.03, rotateZ: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className={`cursor-pointer transition-all bg-gradient-to-br from-slate-800 to-slate-900 border-2 hover:border-orange-500 ${
                    selectedPayment === option.name ? 'ring-4 ring-orange-500/50 border-orange-500' : 'border-slate-700'
                  } shadow-xl hover:shadow-orange-500/20`}
                  onClick={() => setSelectedPayment(option.name)}
                >
                  <CardContent className="flex items-center justify-center p-8">
                    <Image 
                      src={option.logo || "/placeholder.svg"} 
                      alt={`${option.name} logo`} 
                      width={160} 
                      height={50}
                      className="h-12 md:h-14 w-auto transition-transform duration-300 hover:scale-110"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedPayment && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-500/20 shadow-2xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent"
                      >
                        Complete Your Purchase
                      </motion.h2>
                      
                      <div className="space-y-6">
                        {[
                          { id: "username", label: "Name", type: "text", placeholder: "Your full name", icon: <User className="text-orange-400" /> },
                          { id: "email", label: "Email", type: "email", placeholder: "your@email.com", icon: <Mail className="text-orange-400" /> }
                        ].map((field) => (
                          <motion.div 
                            key={field.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-2"
                          >
                            <Label htmlFor={field.id} className="text-slate-200 flex items-center gap-2 text-lg">
                              {field.icon}
                              {field.label}
                            </Label>
                            <Input 
                              id={field.id}
                              type={field.type}
                              placeholder={field.placeholder}
                              className="bg-slate-900/50 border-slate-700 text-slate-200 w-full h-12 rounded-lg focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                              required
                              onChange={handleInputChange}
                              value={formData[field.id as keyof typeof formData] as string}
                            />
                          </motion.div>
                        ))}

                        {[
                          { id: "challenge_type", label: "Challenge Type", icon: <CreditCard className="text-orange-400" />, options: [
                            { value: "type1", label: "One Step Challenge" },
                            { value: "type2", label: "Two Step Challenge" },
                            { value: "type3", label: "Express Challenge" }
                          ]},
                          { id: "account_size", label: "Account Size", icon: <DollarSign className="text-orange-400" />, options: [
                            { value: "5000", label: "$5,000" },
                            { value: "10000", label: "$10,000" },
                            { value: "25000", label: "$25,000" },
                            { value: "50000", label: "$50,000" }
                          ]},
                          { id: "platform", label: "Platform", icon: <Coins className="text-orange-400" />, options: [
                            { value: "mt4", label: "MetaTrader 4" },
                            { value: "mt5", label: "MetaTrader 5" },
                            { value: "ctrader", label: "cTrader" }
                          ]},
                          { id: "payment_coin", label: "Payment Coin", icon: <Coins className="text-orange-400" />, options: [
                            { value: "btc", label: "Bitcoin (BTC)" },
                            { value: "eth", label: "Ethereum (ETH)" },
                            { value: "usdt", label: "Tether (USDT)" }
                          ]}
                        ].map((field) => (
                          <motion.div 
                            key={field.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-2"
                          >
                            <Label htmlFor={field.id} className="text-slate-200 flex items-center gap-2 text-lg">
                              {field.icon}
                              {field.label}
                            </Label>
                            <Select onValueChange={(value) => 
                              field.id === "payment_coin" 
                                ? handleCoinSelect(value)
                                : handleSelectChange(field.id, value)
                            }>
                              <SelectTrigger 
                                id={field.id}
                                className="bg-slate-900/50 border-slate-700 text-slate-200 h-12 rounded-lg focus:ring-2 focus:ring-orange-500/50"
                              >
                                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                {field.options.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </motion.div>
                        ))}

                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="txid" className="text-slate-200 flex items-center gap-2 text-lg">
                              <FileImage className="text-orange-400" />
                              Transaction ID
                            </Label>
                            <Input 
                              id="txid" 
                              placeholder="Enter transaction ID" 
                              className="bg-slate-900/50 border-slate-700 text-slate-200 h-12 rounded-lg focus:ring-2 focus:ring-orange-500/50"
                              required
                              onChange={handleInputChange}
                              value={formData.txid}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="img" className="text-slate-200 flex items-center gap-2 text-lg">
                              <FileImage className="text-orange-400" />
                              Proof of Payment
                            </Label>
                            <Input 
                              id="img" 
                              type="file" 
                              accept="image/*" 
                              className="bg-slate-900/50 border-slate-700 text-slate-200 file:bg-orange-500 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:hover:bg-orange-600 transition-all"
                              required
                              onChange={handleFileChange}
                            />
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-14 text-lg font-semibold rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Complete Purchase'
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <PaymentDetails 
        isOpen={showPaymentDetails}
        onClose={() => setShowPaymentDetails(false)}
        selectedCoin={selectedCoin}
      />
    </motion.div>
  )
}
