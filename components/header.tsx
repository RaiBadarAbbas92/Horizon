"use client"

import { Bell, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccountSwitcher } from "@/components/account-switcher"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  isAdmin?: boolean
  onAccountSwitch: (account: { id: string; name: string; balance: number }) => void
}

interface AccountData {
  order_id: string
  balance: string 
  username: string
}

export function Header({ isAdmin, onAccountSwitch }: HeaderProps) {
  const [accounts, setAccounts] = useState<AccountData[]>([])
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/order/order_ids')
        const data = await response.json()
        setAccounts(data)
      } catch (error) {
        console.error('Error fetching accounts:', error)
      }
    }

    fetchAccounts()
  }, []) 

  const formattedAccounts = accounts.map(account => ({
    id: account.order_id,
    name: `${account.username} - ${account.order_id}`,
    balance: parseInt(account.balance)
  }))

  const handleAccountSwitch = (account: { id: string; name: string; balance: number }) => {
    const numericId = account.id.replace(/[^\d]/g, '')
    localStorage.setItem('selectedAccountId', numericId)
    localStorage.setItem('Name', account.username)
    onAccountSwitch(account)
  }

  return (
    <motion.header 
      className={`sticky top-0 z-40 w-full border-b border-gray-800/50 bg-[#0a1929]/95 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-blue-900/20' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <AccountSwitcher accounts={formattedAccounts} onSwitch={handleAccountSwitch} />
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                  <Bell className="h-4 w-4 transition-colors group-hover:text-blue-400" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] text-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 backdrop-blur-lg bg-[#0a1929]/95">
                <DropdownMenuLabel className="text-blue-400">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">New trade opened</span>
                    <span className="text-xs text-gray-400">2 minutes ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Account funded</span>
                    <span className="text-xs text-gray-400">1 hour ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Challenge completed</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 group">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium">A</span>
                  </div>
                  <span className="hidden md:inline group-hover:text-blue-400">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-lg bg-[#0a1929]/95">
                <DropdownMenuLabel className="text-blue-400">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 cursor-pointer gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
