"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, FileCheck, CreditCard, LogOut, Menu, ShoppingCart } from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Referral", href: "/dashboard/referral" },
  { icon: FileCheck, label: "KYC", href: "/dashboard/kyc" },
  { icon: CreditCard, label: "Withdraw", href: "/dashboard/withdraw" },
  { icon: ShoppingCart, label: "Buy", href: "/dashboard/buy" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const SidebarContent = () => (
    <>
      <div className="relative h-20 flex items-center justify-center border-b border-orange-500/20 bg-gradient-to-r from-[#0a1929] to-[#132f4c]">
        <Link 
          href="/dashboard" 
          className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent hover:from-orange-300 hover:to-orange-500 transition-all duration-300"
        >
          PropFirm
        </Link>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>
      <nav className="flex-1 space-y-3 p-6">
        <AnimatePresence>
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setIsHovered(item.href)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-left rounded-xl transition-all duration-300",
                    pathname === item.href
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white backdrop-blur-sm",
                    isHovered === item.href && "scale-105"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isHovered === item.href && "rotate-12"
                  )} />
                  {item.label}
                </Button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>
      <div className="p-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-left text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </motion.div>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden fixed top-4 left-4 z-50 bg-[#0a1929]/80 backdrop-blur-lg hover:bg-[#132f4c] transition-all duration-300"
            >
              <Menu className="h-6 w-6 text-orange-500" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-gradient-to-b from-[#0a1929] to-[#132f4c] border-r border-orange-500/20">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <motion.div
      className="hidden md:flex h-screen w-72 flex-col bg-gradient-to-b from-[#0a1929] to-[#132f4c] text-white border-r border-orange-500/20 shadow-xl"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SidebarContent />
    </motion.div>
  )
}
