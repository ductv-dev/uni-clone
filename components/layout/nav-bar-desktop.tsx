"use client"

import { CardSetting } from "@/components/custom/cards/card-setting"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { shortenHex } from "@/lib/utils"
import { useUser } from "@/store/user-store"
import { TUser } from "@/types"
import {
  ArrowLeftRight,
  Copy,
  History,
  Home,
  Search,
  Settings,
  User2,
  Wallet,
} from "lucide-react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

const NAVBAR_ITEMS = [
  { label: "Home", href: "/user/home", icon: <Home size={16} /> },
  { label: "Search", href: "/user/search", icon: <Search size={16} /> },
  { label: "History", href: "/user/history", icon: <History size={16} /> },
]

export const NavbarDesktop = () => {
  const currentPath = usePathname() || "/"
  const router = useRouter()
  const user = useUser((state: { user: TUser }) => state.user)
  const shortID = user?.id ? shortenHex(user.id) : ""
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.id)
      toast.success("Đã sao chép vào clipboard!", {
        duration: 2000,
        icon: <Copy size={16} strokeWidth={2} className="text-green-500" />,
      })
    } catch {
      toast.error("Failed to copy!")
    }
  }

  return (
    <header className="sticky top-0 z-50 hidden w-full  bg-background/80 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* ── Logo ── */}
        <a href="/user/home" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <ArrowLeftRight size={16} className="text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            Uni <span className="text-primary">Crypto</span>
          </span>
        </a>

        {/* ── Nav links ── */}
        <nav className="flex items-center gap-1 rounded-full border border-border bg-accent/30 p-1 backdrop-blur-xl">
          {NAVBAR_ITEMS.map((item) => {
            const isActive = currentPath === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive
                  ? "bg-background text-primary  border-primary border-t shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
                  }`}
              >
                <span className={isActive ? "text-primary" : ""}>
                  {item.icon}
                </span>
                {item.label}

              </a>
            )
          })}
        </nav>

        {/* ── Right: Swap + User ── */}
        <div className="flex items-center gap-3">


          {/* User avatar dropdown */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
            <DrawerTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User2 size={16} className="text-primary" />
                )}
              </button>
            </DrawerTrigger>
            <DrawerContent className="px-2.5">
              {/* Profile header */}
              <div className="mt-5 flex flex-col items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      width={64}
                      height={64}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User2 size={24} className="text-primary" />
                  )}
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-foreground/50">{shortID}</p>
                    <button onClick={handleCopy}>
                      <Copy
                        size={14}
                        strokeWidth={1.5}
                        className="text-foreground/50"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <CardSetting
                onClick={() => {
                  setIsDrawerOpen(false)
                  redirect("/user/my-wallet")
                }}
                title="My Wallet"
                icon={<Wallet strokeWidth={3} size={20} />}
              />
              <CardSetting
                onClick={() => {
                  setIsDrawerOpen(false)
                  redirect("/user/account")
                }}
                title="Account"
                icon={<User2 strokeWidth={3} size={20} />}
              />
              <CardSetting
                onClick={() => {
                  setIsDrawerOpen(false)
                  router.push("/user/setting")
                }}
                title="Settings"
                icon={<Settings strokeWidth={3} size={20} />}
              />


            </DrawerContent>
          </Drawer>
          <AnimatedThemeToggler />

        </div>
      </div>
    </header>
  )
}
