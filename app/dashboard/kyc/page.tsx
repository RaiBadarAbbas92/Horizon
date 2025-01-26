'use client'

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function KYCPage() {
  return (
    <><Header/>
    <div className="min-h-[70vh] relative flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 backdrop-blur-sm z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-2xl"
      >
        <Card className="bg-gradient-to-br from-[#0a1929] to-[#132f4c] border border-orange-500/20 shadow-xl shadow-orange-500/10 p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Know Your Customer
            </h1>
            <p className="mt-6 text-lg text-slate-300 text-center leading-relaxed">
              Complete your KYC verification to unlock full platform features and ensure secure transactions.
            </p>
            <div className="mt-8 p-6 bg-orange-500/10 rounded-xl">
              <p className="text-orange-400 font-medium text-center">
                🔒 Secure Verification
                <span className="mx-4">•</span>
                ⚡ Quick Process
                <span className="mx-4">•</span>
                ✅ Enhanced Security
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div></>
  )
}
