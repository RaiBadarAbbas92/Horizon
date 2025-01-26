
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AdminOverview } from "@/components/admin-overview"
import { AdminTables } from "@/components/admin-tables"

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState<
    "users" | "orders" | "completedOrders" | "failedOrders" | null
  >(null)

  return (
    <div className="container py-6 px-4 md:px-6">
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AdminOverview onSelectSection={setSelectedSection} selectedSection={selectedSection} />
      </motion.div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AdminTables selectedSection={selectedSection} />
      </motion.div>
    </div>
  )
}

