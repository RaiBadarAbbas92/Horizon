import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

export function OverviewCard({ title, value, change, icon }: OverviewCardProps) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="text-2xl font-bold"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {value}
          </motion.div>
          <motion.div
            className={cn(
              "flex items-center text-sm",
              isPositive ? "text-green-500" : "text-red-500"
            )}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isPositive ? (
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowDownRight className="h-4 w-4" />
              </motion.div>
            )}
            <span>{Math.abs(change)}%</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

