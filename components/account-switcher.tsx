import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Account {
  username: string;
  order_id: string;
  balance: number;
}

interface AccountSwitcherProps {
  accounts: Account[];
  onSwitch: (account: Account) => void;
}

export function AccountSwitcher({ accounts, onSwitch }: AccountSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(accounts[0])
  const [displayName, setDisplayName] = useState(accounts[0]?.username || 'Select Account')

  useEffect(() => {
    const storedName = localStorage.getItem('Name')
    if (storedName) {
      setDisplayName(storedName)
    }
  }, [])

  const handleSwitch = (account: Account) => {
    setSelectedAccount(account)
    onSwitch(account)
    setIsOpen(false)
    const storedName = localStorage.getItem('Name')
    if (storedName) {
      setDisplayName(storedName)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {displayName}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? 'up' : 'down'}
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              exit={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <AnimatePresence>
          {accounts.map((account) => (
            <motion.div
              key={account.order_id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem onSelect={() => handleSwitch(account)}>
                {account.username} - ${account.balance.toLocaleString()}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
