import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-blue-950 to-black text-white py-16">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -left-64 -top-64 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] -right-64 -bottom-64 bg-orange-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 border-b border-white/10 pb-16">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent">
              MyCampusFund
            </h2>
            <p className="mt-4 text-blue-200/80 max-w-md">
              Your trusted partner in the journey to becoming a successful funded trader.
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              Join Our Newsletter
            </h3>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 w-full lg:w-64"
              />
              <Button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:opacity-90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Contact Us</h3>
            <div className="space-y-4">
              <a href="mailto:support@mycampusfund.com" className="flex items-center gap-2 text-blue-200 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                support@mycampusfund.com
              </a>
              <div className="flex items-center gap-2 text-blue-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                LiveChat Available 24/7
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">FAQ</a>
              <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Rules</a>
              <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Privacy</a>
              <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Affiliate</a>
              <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors">Contact</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Community</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2 text-blue-200 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/></svg>
                Discord Community
              </a>
              <a href="#" className="flex items-center gap-2 text-blue-200 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0 5.989-4.394 10.954-10.13 11.855v-8.363h2.789l.531-3.46h-3.32V9.86c0-.947.464-1.869 1.95-1.869h1.509V5.045s-1.37-.234-2.679-.234c-2.734 0-4.52 1.657-4.52 4.656v2.637H7.091v3.46h3.039v8.363C4.395 23.025 0 18.061 0 12.073c0-6.627 5.373-12 12-12s12 5.372 12 12z"/></svg>
                Facebook Group
              </a>
              <a href="#" className="flex items-center gap-2 text-blue-200 hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12 6.63 0 12-5.37 12-12C24 5.37 18.63 0 12 0zm3.14 19.5h-2.25v-6.75H9.64v-2.25h3.25V8.25h2.25v2.25h3.25v2.25h-3.25v6.75z"/></svg>
                Telegram Channel
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Education</h3>
            <div className="space-y-4">
              <a href="#" className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-orange-400">Learn & Earn</h4>
                <p className="text-sm text-blue-200 mt-2">Master trading while earning rewards</p>
              </a>
              <a href="#" className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-orange-400">Trading Academy</h4>
                <p className="text-sm text-blue-200 mt-2">Free resources to boost your skills</p>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-blue-200/60">
          <p>© 2024 MyCampusFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
