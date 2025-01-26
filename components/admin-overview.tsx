import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCard } from "@/components/overview-card"
import { Users, DollarSign, ShoppingCart, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminOverviewProps {
  onSelectSection: (section: "users" | "orders" | "completedOrders" | "failedOrders") => void
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | null
}

export function AdminOverview({ onSelectSection, selectedSection }: AdminOverviewProps) {
  return (
    <div className="space-y-6">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <OverviewCard
          title="Total Users"
          value="1,234"
          change={8}
          icon={<Users className="h-4 w-4 text-orange-500" />}
        />
        <OverviewCard
          title="Total Payout"
          value="$543,210"
          change={12}
          icon={<DollarSign className="h-4 w-4 text-orange-500" />}
        />
        <OverviewCard
          title="Orders Created"
          value="789"
          change={5}
          icon={<ShoppingCart className="h-4 w-4 text-orange-500" />}
        />
        <OverviewCard
          title="Orders Completed"
          value="456"
          change={-2}
          icon={<CheckCircle className="h-4 w-4 text-orange-500" />}
        />
        <OverviewCard
          title="Failed Orders"
          value="23"
          change={-15}
          icon={<XCircle className="h-4 w-4 text-orange-500" />}
        />
      </motion.div>
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={() => onSelectSection("users")}
          variant={selectedSection === "users" ? "default" : "outline"}
          className="flex-grow sm:flex-grow-0"
        >
          Users
        </Button>
        <Button
          onClick={() => onSelectSection("orders")}
          variant={selectedSection === "orders" ? "default" : "outline"}
          className="flex-grow sm:flex-grow-0"
        >
          Orders
        </Button>
        <Button
          onClick={() => onSelectSection("completedOrders")}
          variant={selectedSection === "completedOrders" ? "default" : "outline"}
          className="flex-grow sm:flex-grow-0"
        >
          Completed Orders
        </Button>
        <Button
          onClick={() => onSelectSection("failedOrders")}
          variant={selectedSection === "failedOrders" ? "default" : "outline"}
          className="flex-grow sm:flex-grow-0"
        >
          Failed Orders
        </Button>
      </motion.div>
    </div>
  )
}

