"use client"

import { ArrowRightLeft, History, Home, Search } from "lucide-react"
import { usePathname } from "next/navigation"

const NAVBAR_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    label: "Search",
    href: "/search",
    icon: <Search />,
  },
  {
    label: "History",
    href: "/history",
    icon: <History />,
  },
  {
    label: "Swap",
    href: "/swap",
    icon: <ArrowRightLeft />,
  },
]
export const Navbar = () => {
  const currentPath = usePathname() || "/"

  return (
    <div className="to fixed bottom-0 flex w-full justify-center px-2 pb-2.5">
      <div className="flex w-full items-center rounded-full bg-gray-100/50 p-1 shadow-lg">
        {NAVBAR_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex flex-1 items-center justify-center rounded-full p-2 py-4 text-sm ${
              currentPath === item.href
                ? "bg-white/80 text-blue-700 shadow-2xl"
                : "text-gray-600"
            } hover:bg-gray-200`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
