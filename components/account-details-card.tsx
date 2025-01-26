"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AccountDetailsCardProps {
  orderId: string
}

interface AccountDetails {
  order_id: string
  challenge_type: string
  account_size: string
  platform: string
  username: string
  server: string
  platform_login: string
  platform_password: string
}

export function AccountDetailsCard({ orderId }: AccountDetailsCardProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/order/account_detail/${orderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch account details')
        }
        const data = await response.json()
        setAccountDetails(data)
        
        // Save credentials to localStorage
        localStorage.setItem('platform_login', data.platform_login)
        localStorage.setItem('server', data.server)
        localStorage.setItem('password', data.platform_password)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchAccountDetails()
  }, [orderId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !accountDetails) {
    return <div>Error loading account details: {error}</div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-[#0a1929] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-white">Account Details</CardTitle>
          <Badge
            variant="outline"
            className="bg-orange-500/20 text-orange-300"
          >
            Active
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="font-medium text-white">{accountDetails.order_id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Account Type</p>
              <p className="font-medium text-orange-500">{accountDetails.challenge_type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Server</p>
              <p className="font-medium text-white">{accountDetails.server}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Platform</p>
              <p className="font-medium text-white">{accountDetails.platform}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Platform Credentials</h3>
            <div className="grid gap-3">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Username</p>
                <p className="font-medium text-white">{accountDetails.username}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Platform Login</p>
                <p className="font-medium text-white">{accountDetails.platform_login}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Platform Password</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">
                    {showPassword ? accountDetails.platform_password : "••••••••"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Account Size</p>
              <p className="text-lg font-bold text-orange-500">
                ${parseInt(accountDetails.account_size).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
