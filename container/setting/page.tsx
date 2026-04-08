"use client"

import { CardSetting } from "@/components/custom/cards/card-setting"
import { usePwaInstall } from "@/hooks/use-pwa-install"
import { ChevronLeft, Download, Moon, Settings, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const LIST_SETTING = [
  {
    name: "Account",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
  {
    name: "Notifications",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
  {
    name: "Privacy",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
  {
    name: "Security",
    icon: <Settings size={16} strokeWidth={2} className="text-foreground/60" />,
  },
]

function ThemeToggleRow() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex w-full cursor-pointer items-center gap-2.5 p-2.5 hover:bg-accent"
    >
      <div className="text-foreground/60">
        {isDark ? (
          <Moon size={16} strokeWidth={2} />
        ) : (
          <Sun size={16} strokeWidth={2} />
        )}
      </div>
      <p className="flex-1 text-start text-lg font-semibold text-foreground/60">
        {isDark ? "Dark Mode" : "Light Mode"}
      </p>
      {/* Toggle switch */}
      <div
        className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
          isDark ? "bg-primary" : "bg-foreground/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform duration-300 ${
            isDark ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </div>
  )
}

export const Setting = () => {
  const route = useRouter()
  const { isInstallable, install } = usePwaInstall()
  const handleLogout = () => {
    toast.success("Logout successfully")
    redirect("/login")
  }
  return (
    <div>
      <div className="fixed top-2.5 w-full px-2.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => route.back()}
            className="flex h-12 w-12 items-center justify-center rounded-full border-t border-border bg-background shadow-lg shadow-border hover:bg-accent"
          >
            <ChevronLeft strokeWidth={2} className="text-foreground/60" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground/60">
            Settings
          </h1>
          <div className="h-12 w-12"></div>
        </div>
      </div>
      <div className="mt-24 flex flex-col gap-2 px-2.5">
        {isInstallable && (
          <CardSetting
            title="Install App"
            icon={
              <Download size={16} strokeWidth={2} className="text-primary" />
            }
            onClick={install}
            className="mx-auto rounded-lg border border-primary/20 bg-primary/50 text-primary hover:bg-primary/20"
          />
        )}
        <ThemeToggleRow />
        {LIST_SETTING.map((setting) => (
          <CardSetting
            key={setting.name}
            title={setting.name}
            icon={setting.icon}
          />
        ))}
        <CardSetting
          className="text-red-500"
          onClick={() => handleLogout()}
          title="Logout"
          icon={<Download size={16} className="text-red-500" strokeWidth={2} />}
        />
      </div>
    </div>
  )
}
