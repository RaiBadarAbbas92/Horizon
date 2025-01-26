import { Button } from "@/components/ui/button"
import { TextIcon as Telegram, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"

export function CommunityCallToAction() {
  return (
    <section className="relative min-h-[400px] w-full bg-gradient-to-br from-[#0B1217] to-[#1a2630] flex items-center justify-center py-12 sm:py-20 overflow-hidden">
      {/* Animated Crypto Background */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => ( // Reduced number of particles for mobile
            <motion.div
              key={i}
              className="absolute"
              initial={{
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 0.5 + 0.5,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 0),
              }}
              animate={{
                y: [null, -1000],
                opacity: [null, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 20,
              }}
            >
              <div className="text-orange-500 text-xs font-mono">
                {['₿', 'Ξ', '₮', '◈'][Math.floor(Math.random() * 4)]}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1217]/50 to-[#0B1217]" />
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-blue-600 to-orange-500 mb-8 sm:mb-12 px-4"
        >
          Join Our Trading Community
        </motion.h2>

        {/* Social Media Icons Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto border border-white/10"
        >
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-8">
            {[
              { Icon: Telegram, color: "#1a365d", label: "Telegram" },
              { Icon: DiscordLogoIcon, color: "#1a365d", label: "Discord" },
              { Icon: Facebook, color: "#1a365d", label: "Facebook" },
              { Icon: Twitter, color: "#1a365d", label: "Twitter" },
              { Icon: Instagram, color: "#1a365d", label: "Instagram" },
              { Icon: Youtube, color: "#1a365d", label: "Youtube" }
            ].map(({ Icon, color, label }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer flex flex-col items-center"
              >
                <div 
                  className="p-3 sm:p-4 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${color}, #f97316)` }}
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-gray-300 mt-2">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
