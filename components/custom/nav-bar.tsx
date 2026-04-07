"use client"

import { BottomSheetSwap } from "@/container/home/bottom-sheet/bottom-sheet-swap"
import { motion } from "framer-motion"
import { ArrowRightLeft, History, Home, Search } from "lucide-react"
import { usePathname } from "next/navigation"

const NAVBAR_ITEMS = [
  {
    label: "Home",
    href: "/user/home",
    icon: <Home />,
  },
  {
    label: "Search",
    href: "/user/search",
    icon: <Search />,
  },
  {
    label: "History",
    href: "/user/history",
    icon: <History />,
  },
]
export const Navbar = () => {
  const currentPath = usePathname() || "/"

  return (
    <div className="to fixed bottom-0 flex w-full justify-center px-2 pb-5">
      <div className="flex w-full max-w-lg items-center gap-2.5">
        <motion.div
          animate={{ opacity: 1 }}
          className="flex flex-1 items-center rounded-full bg-gray-100/50 p-1 shadow-lg"
        >
          {NAVBAR_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-1 items-center justify-center rounded-full p-2 py-4 text-sm ${
                currentPath === item.href
                  ? "bg-black/10 text-blue-700 shadow-2xl backdrop-blur-2xl"
                  : "text-gray-600"
              } hover:bg-gray-200`}
            >
              {item.icon}
            </a>
          ))}
        </motion.div>
        <BottomSheetSwap
          isMini={true}
          className="flex h-15 w-20 items-center justify-center rounded-full border-t border-blue-300 bg-blue-100 shadow-lg shadow-blue-300/50"
        />
      </div>
    </div>
  )
}
