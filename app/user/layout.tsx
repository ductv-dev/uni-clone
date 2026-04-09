import { NavbarDesktop } from "@/components/layout/nav-bar-desktop"
import { Navbar } from "@/components/layout/nav-bar-mobile"
import { TNavItem } from "@/types"
import { History, Home, Search } from "lucide-react"

// Module-level constant — chỉ tạo 1 lần khi module load
const NAVBAR_ITEMS: TNavItem[] = [
  { label: "Home",    href: "/user/home",    icon: <Home /> },
  { label: "Search",  href: "/user/search",  icon: <Search /> },
  { label: "History", href: "/user/history", icon: <History /> },
]

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full">
      <div className="md:hidden">
        <Navbar data={NAVBAR_ITEMS} />
      </div>
      <div className="hidden md:block">
        <NavbarDesktop data={NAVBAR_ITEMS} />
      </div>
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  )
}
